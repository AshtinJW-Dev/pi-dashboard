import { getSystemDetails } from "@/lib/system";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const SystemInfoItem = ({ label, value }) => (
  <div className="flex justify-between text-sm">
    <span className="text-muted-foreground">{label}:</span>
    <span className="text-foreground font-medium">{value}</span>
  </div>
);

const CpuUsageItem = ({ index, usage }) => (
  <div key={index} className="space-y-1">
    <div className="flex justify-between text-sm text-muted-foreground">
      <span>Core {index}</span>
      <span>{usage}%</span>
    </div>
    <Progress value={parseFloat(usage)} className="h-2" aria-valuenow={parseFloat(usage)} aria-valuemin={0} aria-valuemax={100} aria-label={`CPU Core ${index} Usage`} />
  </div>
);

export default async function Stats() {
  const systemInfo = await getSystemDetails();
  const { os, cpuTemp, cpuUsage, memoryUsage } = systemInfo;

  const memoryUsagePercent = (memoryUsage.used / memoryUsage.total) * 100;

  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>System Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[
              ["Hostname", os.hostname()],
              ["Platform", os.platform()],
              ["Architecture", os.arch()],
              ["CPU Temperature", `${cpuTemp.toFixed(1)}°C`],
            ].map(([label, value]) => (
              <SystemInfoItem key={label} label={label} value={value} />
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">CPU Usage</h3>
            {cpuUsage.map((usage, index) => (
              <CpuUsageItem key={index} index={index} usage={usage} />
            ))}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">Memory Usage</h3>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Used</span>
              <span>{memoryUsage.used.toFixed(2)} / {memoryUsage.total.toFixed(2)} GB</span>
            </div>
            <Progress
              value={memoryUsagePercent}
              className="h-2"
              aria-valuenow={memoryUsagePercent}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Memory Usage"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
