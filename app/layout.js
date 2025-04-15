import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import FixedLeftBar from "./components/FixedLeftBar";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Video Motion — Capturing the Pulse of Entertainment",
  description:
    "Your ultimate destination for dynamic and engaging video content! From trending topics to creative tutorials, our platform offers a wide array of videos tailored to captivate, entertain, and inspire. Join us and dive into a world of motion and excitement, right here on Video Motion! 🚀📹",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Header />
        <div className="flex">
          <div className="hidden w-[5%] md:block">
            <div className="">
              <FixedLeftBar></FixedLeftBar>
            </div>
          </div>
          <div className="md:w-[95%] w-full">{children}</div>
        </div>
      </body>
    </html>
  );
}
