import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Sora, Manrope } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap"
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap"
});

export const metadata = {
  title: "Md Raihanul Islam Bhuiyan | Portfolio",
  description: "AI-focused software portfolio with projects, experience, and recruiter-ready profile."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${manrope.variable}`}>
        <NavBar />
        <main className="page-wrap">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
