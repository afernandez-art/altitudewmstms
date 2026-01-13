import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "Altitude WMS/TMS",
  description: "Sistema de Gestion de Almacen y Transporte",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-display antialiased`}>
        <div className="min-h-screen bg-background-light dark:bg-background-dark">
          <header className="h-16 border-b border-slate-200 dark:border-border-dark bg-white dark:bg-surface-dark flex items-center px-6">
            <h1 className="text-xl font-bold text-primary">Altitude WMS/TMS</h1>
          </header>
          <main className="p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}