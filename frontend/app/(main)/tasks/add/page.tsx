"use client"
import { createTask } from '@/lib/tasks/tasks'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import Loading from './loading'
import {
    Alert,
    AlertAction,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { InfoIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const CreateTasks = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [loader, setLoader] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [status, setStatus] = useState('')
    const [priority, setPriority] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            setError("")
            setLoader(true)

            const res = await createTask(title, description, status, priority)
            if (res.data) {
                router.replace('/tasks')
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoader(false)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            router.replace('/login')
            return
        }
    })
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
            {/* <div className=' rounded flex flex-row justify-between bg-black text-white'>
                            <Button onClick={toDashboard} className='pt-0.5 pl-1'>Dashboard</Button>
                              <div>
                                <Button onClick={toTask} >All Tasks</Button>
                              <Button onClick={toCreateTask}>Create Task</Button>
                              <Button onClick={handlelogOut}>Logout</Button>
                              </div>
                        
                            </div> */}
               
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

                    <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Create Task</CardTitle>
                    <CardDescription>
                        Create your task
                    </CardDescription>
                    <CardAction>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Title</Label>
                                <Input
                                    type="text"
                                    name='title'
                                    placeholder='Enter your title'
                                    value={title}
                                    onChange={(e) => { setTitle(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Description</Label>
                                </div>
                                <Input type="text"
                                    name='desc'
                                    placeholder='Enter your task description'
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }} required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Status</Label>
                                </div>
                                <Input type="text"
                                    name='status'
                                    placeholder='Enter your task status'
                                    value={status}
                                    onChange={(e) => { setStatus(e.target.value) }} required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Priority</Label>
                                </div>
                                <Input type="text"
                                    name='priority'
                                    placeholder='Enter your task priority'
                                    value={priority}
                                    onChange={(e) => { setPriority(e.target.value) }} required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {loader && <Loading />}
                    <Button onClick = {handleSubmit} disabled={loader} type="submit" className="w-full">
                        Create Task
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

export default CreateTasks
