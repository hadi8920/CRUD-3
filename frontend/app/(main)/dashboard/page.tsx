"use client"

import { AppSidebar } from "@/components/app-sidebar"
import {useEffect} from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {Bell} from 'lucide-react'
import Navbar from "@/components/ui/navbar";
import { useRouter } from "next/navigation";


export default function Page() {
  const router = useRouter()
   useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }
  });
  return (

    <div>Dash</div>

  )
}
