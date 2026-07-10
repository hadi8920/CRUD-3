"use client"
import { getTask } from '@/lib/tasks/tasks'
import { useParams } from 'next/navigation'
import { useRouter  } from 'next/navigation'
import React, { useEffect , useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";


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
      <Card className="w-full max-w-xl mx-auto">
  <CardHeader>
    <CardTitle>Task Details</CardTitle>
    <CardDescription>
      View complete information about this task.
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-6">

    <div>
      <h3 className="text-sm font-medium text-muted-foreground">
        Title
      </h3>

      <p className="mt-1 text-lg font-semibold">
        {task?.title}
      </p>
    </div>

    <Separator />

    <div>
      <h3 className="text-sm font-medium text-muted-foreground">
        Description
      </h3>

      <p className="mt-1">
        {task?.description}
      </p>
    </div>

    <Separator />

    <div>
      <h3 className="text-sm font-medium text-muted-foreground">
        Status
      </h3>

      <Badge>
        {task?.status}
      </Badge>
    </div>

    <Separator />

    <div>
      <h3 className="text-sm font-medium text-muted-foreground">
        Priority
      </h3>

      <Badge variant="secondary">
        {task?.priority}
      </Badge>
    </div>

  </CardContent>

  <CardFooter className="flex justify-between">

    <Button
      variant="outline"
      onClick={() => router.back()}
    >
      Back
    </Button>

    <Button
      onClick={() => router.push(`/tasks/edit/${task._id}`)}
    >
      Edit Task
    </Button>

  </CardFooter>
</Card>
    </div>
  )
}

export default GetTask
