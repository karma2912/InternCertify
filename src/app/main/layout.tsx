import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import "../globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entwicklera - Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <SidebarProvider>
          <div className="flex h-screen w-screen overflow-hidden">
            <div className="h-[100vh]">
            <AppSidebar />
            </div>
            <main className="flex-1 overflow-auto">
              <SidebarTrigger />
              <div className="p-4 h-[calc(100vh-4rem)]">
                {children}
              </div>
            </main>
          </div>
        </SidebarProvider>
     </div>
  );
}
