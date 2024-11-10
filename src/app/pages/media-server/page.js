import Image from "next/image";
import Link from "next/link";
import { IoFastFoodOutline, IoCheckboxOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { GiCoins } from "react-icons/gi";
import { LuPartyPopper } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaRegStickyNote } from "react-icons/fa";

const projects = [
  { title: "Tautulli", description: "This app tracks Plex server usage statistics, so you can monitor who’s watching, bandwidth usage, and top content. It can be added as a page on your dashboard to show live Plex server stats.", thumbnail: "/images/placeholder.png", icon: IoFastFoodOutline, link: "/muncharoo" },
  { title: "Radarr", description: "A movie collection manager, Radarr integrates well with Plex by helping you automate the downloading, organization, and management of movies.", thumbnail: "/images/placeholder.png", icon: GiCoins, link: "/budget" },
  { title: "Sonarr", description: "Similar to Radarr but focused on TV shows, Sonarr can automatically search for new episodes, manage downloads, and organize files for seamless integration with Plex.", thumbnail: "/images/placeholder.png", icon: GiCoins, link: "/budget" },
  { title: "Ombi/Overseerr", description: "lets your users request new content directly from Plex, and it can integrate with Radarr and Sonarr to fulfill those requests. This is helpful for managing requests if you share your Plex server.", thumbnail: "/images/placeholder.png", icon: GiCoins, link: "/tradingbot" },
  { title: "FileBot", description: "FileBot is great for renaming and organizing downloaded media files to ensure they follow the format Plex requires. This can help if you’re manually adding media to the server.", thumbnail: "/images/placeholder.png", icon: LuPartyPopper, link: "/where-to" },
  { title: "Plex Media Scanner", description: "A script or shortcut to trigger Plex’s media scanner remotely from the Pi dashboard could be handy for quickly updating your library without accessing the main server.", thumbnail: "/images/placeholder.png", icon: TiWeatherPartlySunny, link: "/weather" },
  { title: "Media Center Monitor", description: "If you’d like to visualize real-time resource usage or network traffic on your Plex server, you could set up a custom monitor on the Pi dashboard that tracks your desktop server's CPU, memory, and network traffic, providing a health overview.", thumbnail: "/images/placeholder.png", icon: IoCheckboxOutline, link: "/todo" },
  


  // Add more projects as needed
];

export default function Home() {
  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold text-foreground">Media Server</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link href={project.link} key={project.title}>
              <div className="bg-background shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center flex flex-col items-center">
                  <project.icon className="h-6 w-6 text-green-500 mb-2" />
                  <h2 className="text-lg font-semibold text-foreground">{project.title}</h2>
                  <p className="">{project.description}</p>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
