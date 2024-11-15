import os from "os";
import { exec } from "child_process";
import { promisify } from "util";

// Promisify exec for asynchronous execution
const execAsync = promisify(exec);

// Function to get CPU usage percentage
function getCpuUsage() {
  const cpus = os.cpus();
  return cpus.map((cpu) => {
    const total = Object.values(cpu.times).reduce((acc, tv) => acc + tv, 0);
    const usage = 100 - (100 * cpu.times.idle) / total;
    return usage.toFixed(1);
  });
}

// Function to get CPU temperature (Raspberry Pi specific)
async function getCpuTemp() {
  const { stdout } = await execAsync("vcgencmd measure_temp");
  return parseFloat(stdout.replace("temp=", "").replace("'C", ""));
}

// Helper function to convert bytes to GB
function bytesToGB(bytes: number) {
  return (bytes / (1024 * 1024 * 1024)).toFixed(2);
}

// Function to get disk usage stats

async function getDiskUsage() {
  try {
    const { stdout } = await execAsync("df -k --output=source,size,used,avail,target | grep '^/dev/'");

    const disks = stdout.trim().split("\n").map(line => {
      const [source, total, used, avail, target] = line.split(/\s+/);

      // Exclude partitions like /boot/firmware, which are not relevant
      if (target.includes("/boot") || source.includes("/boot")) {
        return null;
      }

      // Improved logic to identify external and internal drives
      const isExternal = target.startsWith("/media") || target.startsWith("/mnt");

      return {
        name: isExternal ? `External (${target})` : `Internal (${target})`,
        total: parseFloat(total), // Total space in KB
        used: parseFloat(used), // Used space in KB
        available: parseFloat(avail) // Available space in KB
      };
    });

    // Filter out any null entries that were skipped (e.g., /boot)
    return disks.filter(disk => disk !== null);
  } catch (error) {
    console.error("Error retrieving disk usage:", error);
    return [];
  }
}


// Function to gather all system details (CPU, memory, and disk)
export async function getSystemDetails() {
  const cpuUsage = getCpuUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const cpuTemp = await getCpuTemp();
  const storage = await getDiskUsage();

  return {
    os: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
    },
    cpuTemp,
    cpuUsage,
    memoryUsage: {
      total: parseFloat(bytesToGB(totalMem)),
      used: parseFloat(bytesToGB(usedMem)),
      free: parseFloat(bytesToGB(freeMem)),
    },
    storage,
  };
}

// API handler function to respond with system details
export default async function handler(req, res) {
  try {
    const systemDetails = await getSystemDetails();
    res.status(200).json(systemDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve system details" });
  }
}
