"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"


const Dashboard = () => {
    const router = useRouter()
    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.replace('/login')
      }
    })
    const handlelogOut = () => {
      localStorage.removeItem("token")
      router.replace("/login")
    }
    const toTask = () => {
      router.replace('/tasks')
    }
    const toCreateTask = () => {
      router.replace('/tasks/add')
    }
  return (
    <div className=' rounded flex flex-row justify-between bg-black text-white'>
      <h1 className='pt-0.5 pl-1'>Dashboard</h1>
      <div>
        <Button onClick={toTask} >All Tasks</Button>
      <Button onClick={toCreateTask}>Create Task</Button>
      <Button onClick={handlelogOut}>Logout</Button>
      </div>

    </div>
  )
}

export default Dashboard
