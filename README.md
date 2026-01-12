# Altitude WMS/TMS

Sistema de gestión de depósito y transporte.

## Requisitos

- Node.js 18+
- Cuenta en Supabase (ya configurada)

## Instalación

```bash
# 1. Clonar el repositorio
git clone <tu-repo>
cd altitude-wms

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# El archivo .env.local ya está configurado con tu Supabase

# 4. Ejecutar en desarrollo
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## Deploy en Vercel

1. Subir código a GitHub
2. Ir a [vercel.com](https://vercel.com)
3. Importar repositorio
4. Agregar variables de entorno:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy

## Estructura del Proyecto

```
src/
├── app/                    # Páginas (App Router)
│   ├── page.tsx           # Dashboard
│   ├── inbound/           # Módulo Recepción
│   │   └── asn/          # ASN / Órdenes de ingreso
│   └── settings/          # Configuración
│       └── clientes/     # Gestión de clientes
├── components/            # Componentes React
│   ├── ui/               # Componentes Shadcn
│   ├── sidebar.tsx       # Navegación lateral
│   └── header.tsx        # Cabecera
└── lib/                   # Utilidades
    ├── supabase.ts       # Cliente Supabase
    └── utils.ts          # Funciones auxiliares
```

## Módulos Disponibles

- ✅ Dashboard con KPIs
- ✅ ASN / Órdenes de Ingreso
- ✅ Gestión de Clientes
- 🔜 Turnos y Andenes
- 🔜 Recepción
- 🔜 Stock
- 🔜 Pedidos
- 🔜 Despacho

## Stack Tecnológico

- **Frontend**: Next.js 14, React, TypeScript
- **Estilos**: Tailwind CSS, Shadcn UI
- **Backend**: Supabase (PostgreSQL)
- **Deploy**: Vercel
