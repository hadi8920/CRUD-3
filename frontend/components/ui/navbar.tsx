"use client"
import React from 'react'
import { usePathname } from "next/navigation";
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
import {Bell, Edit} from 'lucide-react'


const navbar = () => {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)
  const breadcrumbsNames = {
    dashboard : "Dashboard",
    tasks : "All Tasks",
    add : "Create Task",
    edit : "Edit Task",

  }

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-row gap-1.5">
        <SidebarTrigger />
      <Breadcrumb className="p-1">
        <BreadcrumbList>
          <BreadcrumbItem className="hidden md:block">
            <BreadcrumbLink href="/">Task Manager</BreadcrumbLink>
          </BreadcrumbItem>
          {segments.map((segment , index) => {
            let text= segment
            if(segment.length === 24){
              if(segments[index-1] === 'edit'){
                text = "Edit"
              }else{
                text = "Details"
              }
            }
            return(
              <React.Fragment key={segment}>
              <BreadcrumbSeparator className="hidden md:block" />
          <BreadcrumbItem>
            <BreadcrumbLink>{breadcrumbsNames[text] ?? text}</BreadcrumbLink>
          </BreadcrumbItem>
            </React.Fragment>
            )
            
          })}
          
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
