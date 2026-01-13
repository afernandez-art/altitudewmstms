import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Altitude WMS/TMS",
  description: "Sistema de Gestion de Almacen y Transporte",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="font-body antialiased min-h-screen bg-background-dark">
        <header className="h-16 border-b border-border-dark bg-surface-dark flex items-center px-6">
          <h1 className="text-xl font-bold text-primary">Altitude WMS/TMS</h1>
        </header>
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </body>
    </html>
  );
}