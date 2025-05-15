import type { Metadata } from "next";
import { Poppins} from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";



const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GCTU Clearance System",
  description: "A system for managing GCTU student clearance requests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} antialiased min-h-screen`}
      >    
        
        {children}
        <Footer/>
      </body>
    </html>
  );
}
