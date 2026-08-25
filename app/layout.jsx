import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "StyleHub - Enterprise Salon Management System",
  description: "High-end salon booking and management platform",
  icons: {
    icon: "/gemini-svg.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0b0f19] text-gray-100 min-h-screen flex flex-col font-sans antialiased selection:bg-indigo-600 selection:text-white">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}