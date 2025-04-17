"use client"

import type React from "react"
import Link from "next/link"
import { Microscope } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { motion } from "framer-motion"
import "./globals.css"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between py-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <Microscope className="h-6 w-6" />
              <h1 className="text-xl font-bold">MATrixAI Platform</h1>
            </motion.div>
            <motion.nav
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <Link href="/" className="text-sm font-medium relative group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Dashboard</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/data-management" className="text-sm font-medium relative group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Data</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/model-training" className="text-sm font-medium relative group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">Training</span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link href="/parameter-prediction" className="text-sm font-medium relative group">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-primary">
                  Prediction
                </span>
                <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <ThemeToggle />
            </motion.nav>
          </div>
        </header>
        {children}
      </div>
    </ThemeProvider>
  )
}
