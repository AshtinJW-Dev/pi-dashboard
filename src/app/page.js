import Image from "next/image";
import Link from "next/link";
import { IoFastFoodOutline, IoCheckboxOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import { GiCoins } from "react-icons/gi";
import { LuPartyPopper } from "react-icons/lu";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { FaRegStickyNote } from "react-icons/fa";

const projects = [
  { title: "Muncharoo", description: "Recipe sharing website", thumbnail: "/images/placeholder.png", icon: IoFastFoodOutline, link: "/muncharoo" },
  { title: "File Renamer", description: "A program that renames files based on moviedb data", thumbnail: "/images/placeholder.png", icon: TfiWrite, link: "/file" },
  { title: "Budgeting App", description: "Tracking Finances, Income & Expenses", thumbnail: "/images/placeholder.png", icon: GiCoins, link: "/budget" },
  { title: "Where To?", description: "An App that dulls data from google and tells you where is busy/a vibe", thumbnail: "/images/placeholder.png", icon: LuPartyPopper, link: "/where-to" },
  { title: "Weather App", description: "Tracking weather and trends", thumbnail: "/images/placeholder.png", icon: TiWeatherPartlySunny, link: "/weather" },
  { title: "Todo List", description: "tracking to dos and tasks", thumbnail: "/images/placeholder.png", icon: IoCheckboxOutline, link: "/todo" },
  { title: "Notes App", description: "track notes and ideas", thumbnail: "/images/placeholder.png", icon: FaRegStickyNote, link: "/notes" },


  // Add more projects as needed
];

export default function Home() {
  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

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
