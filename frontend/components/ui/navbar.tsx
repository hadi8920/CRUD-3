import React from 'react'

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


const navbar = () => {
  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-1.5">
        <SidebarTrigger />
      <Breadcrumb className="p-1">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="#">Task Manager</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      </div>

      <div className="flex flex-row gap-2">
        <Avatar size="sm">
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Bell />
      </div>

    </div>
  )
}

export default navbar
