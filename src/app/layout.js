
import "./output.css";
import Navbar from "@/components/custom/Navbar";
import Head from "next/head"; // Import Head


export const metadata = {
  title: "Pi Dashboard",
  description: "App Dashboard Hosted on Raspberry Pi",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" /> {/* Add this line */}
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
      </Head>
      <body>
        <header>
         <Navbar/>
        </header>
        <main>{children}</main>
        <footer className="flex gap-6 flex-wrap items-center justify-center">
          {/* Footer content can go here */}
        </footer>
      </body>
    </html>
  );
}
