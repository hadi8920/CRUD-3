"use client";
import { getTask, updateTask } from "@/lib/tasks/tasks";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import React from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Updatetask = () => {
  const router = useRouter();
  const params = useParams();
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchBook = async () => {
      const res = await getTask(params.id as string);
      setTitle(res.data.title);
      setDescription(res.data.description);
      setStatus(res.data.status);
      setPriority(res.data.priority);
    };

    fetchBook();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      setError("");
      setLoader(true);

      const res = await updateTask(
        params.id as string,
        title,
        description,
        status,
        priority,
      );
      if (res.data) {
        router.replace("/tasks");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.messsge);
    } finally {
      setLoader(false);
    }
  };
  const toDashboard = () => {
    router.push("/dashboard");
  };
  const handlelogOut = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  const toTask = () => {
    router.replace("/tasks");
  };
  const toCreateTask = () => {
    router.replace("/tasks/add");
  };

  type Option = {
  label: string;
  value: string;
};
  const statusItems : Option[] = [
    { label: "Select a status", value: "" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];
  const priorityItems = [
    { label: "Select a priority", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

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
      <div>
        {error && (
          <Alert>
            <InfoIcon />
            <AlertTitle>Heads up!</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
            <AlertAction></AlertAction>
          </Alert>
        )}
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Update Task</CardTitle>
            <CardDescription>Update your selected Task</CardDescription>
            <CardAction></CardAction>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>Title</Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder="Enter your title"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Description</Label>
                  </div>
                  <Input
                    type="text"
                    name="desc"
                    placeholder="Enter your task description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Status</Label>
                  </div>
                  <Select items={statusItems}
                  value={status}
                  onValueChange={(value)=>{
                    setStatus(value)
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Status</SelectLabel>
                        {statusItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label>Priority</Label>
                  </div>
                  <Select items={priorityItems}
                  value={priority}
                  onValueChange={(value)=>{
                    setPriority(value)
                  }}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Priority</SelectLabel>
                        {priorityItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            {loader && <Loading />}
            <Button
              onClick={handleSubmit}
              disabled={loader}
              type="submit"
              className="w-full"
            >
              Update task
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Updatetask;
