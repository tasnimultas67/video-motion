import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata = {
  title: "Video Motion",
  description:
    "Your ultimate destination for dynamic and engaging video content! From trending topics to creative tutorials, our platform offers a wide array of videos tailored to captivate, entertain, and inspire. Join us and dive into a world of motion and excitement, right here on Video Motion! 🚀📹",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased`}>
        <Header></Header>
        {children}
      </body>
    </html>
  );
}
