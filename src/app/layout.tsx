import type { Metadata } from "next";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "Altitude WMS/TMS",
  description: "Sistema de Gestion de Almacen y Transporte",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="font-body antialiased min-h-screen bg-background-dark">
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <header className="h-16 border-b border-border-dark bg-surface-dark flex items-center px-6 flex-shrink-0">
              <h1 className="text-xl font-bold text-primary lg:hidden">Altitude WMS/TMS</h1>
            </header>
            <main className="flex-1 overflow-auto p-6 lg:p-8">
              <div className="max-w-7xl mx-auto">{children}</div>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
