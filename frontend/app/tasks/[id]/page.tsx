"use client"
import { getTask } from '@/lib/tasks/tasks'
import { useParams } from 'next/navigation'
import { useRouter  } from 'next/router'
import React, { useEffect , useState } from 'react'
import { Button } from "@/components/ui/button"


const GetTask = () => {
    const router = useRouter()
    const params = useParams()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [task, setTask] = useState<any>(null)

    useEffect(() => {
      const token = localStorage.getItem("token")
      if(!token){
        router.replace('/login')
        return
      }

      const fetchBook = async () => {
        const res = await getTask(params.id as string)
        setTask(res.data)
      }

      fetchBook()
    })
    const toDashboard = () => {
        router.push("/dashboard");
    };
  return (
    <div>
        <Button onClick={toDashboard} className="text-3xl">Dashboard</Button>
      <h1>Task Information</h1>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>{task.status}</p>
      <p>{task.priority}</p>
    </div>
  )
}

export default GetTask
