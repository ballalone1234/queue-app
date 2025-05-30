import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthModalContainer } from "@/components/auth-modal-container"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Room Booking System",
  description: "A simple room booking interface",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="relative">
          <AuthModalContainer />
          {children}
        </div>
      </body>
    </html>
  )
}
