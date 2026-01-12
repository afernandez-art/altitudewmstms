"use client"

import { Bell, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
      {/* Search */}
      <div className="flex-1">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="pl-9 w-full"
          />
        </div>
      </div>
      
      {/* Right side */}
      <div className="flex items-center gap-2">
        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-xs text-destructive-foreground">
            3
          </span>
        </Button>
        
        {/* User menu */}
        <div className="flex items-center gap-3 border-l pl-4 ml-2">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Admin</p>
            <p className="text-xs text-muted-foreground">admin@altitude.com</p>
          </div>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
