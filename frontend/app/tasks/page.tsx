"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { deleteTask, getTasks } from '@/lib/tasks/tasks'
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"



const Tasks = () => {
    const router = useRouter()
    const [tasks, setTasks] = useState([])
    const [error, setError] = useState()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.replace('/login')
            return
        }

        const fetchTasks = async () => {
            try {
                const res = await getTasks()
                setTasks(res.data)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message)
            }

        }
        fetchTasks()
    }, [router])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const toUpdate = async (id: any) => {
        router.replace(`/tasks/edit/${id}`)
    }
    const toDashboard = () => {
        router.push("/dashboard");
    };
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
        <div>
            {error &&
                <Alert>
                    <InfoIcon />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        {error}
                    </AlertDescription>
                    <AlertAction>
                    </AlertAction>
                </Alert>}
            <div className=' rounded flex flex-row justify-between bg-black text-white'>
                                        <Button onClick={toDashboard} className='pt-0.5 pl-1'>Dashboard</Button>
                                          <div>
                                            <Button onClick={toTask} >All Tasks</Button>
                                          <Button onClick={toCreateTask}>Create Task</Button>
                                          <Button onClick={handlelogOut}>Logout</Button>
                                          </div>
                                    
                                        </div>
            <h1>All tasks</h1>
            <div>
                {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    tasks.map((task: any) => (
                        <div key={task._id}>
                            <p>{task.title}</p>
                            <p>{task.description}</p>
                            <p>{task.status}</p>
                            <p>{task.priority}</p>
                            <Button onClick={() => {
                                toUpdate(task._id)
                            }}>Update Task</Button>
                            <Button onClick={async () => {
                                await deleteTask(task._id)
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                setTasks(tasks.filter((s: any) => s._id !== task._id))
                            }}>Delete Task</Button>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Tasks
