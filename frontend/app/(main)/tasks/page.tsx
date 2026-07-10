"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteTask, getTasks } from "@/lib/tasks/tasks";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const Tasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [toDeleteTask, setToDeleteTask] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        setTasks(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      }
    };
    fetchTasks();
  }, [router]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toUpdate = async (id: any) => {
    router.replace(`/tasks/edit/${id}`);
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toTask = (id: any) => {
    router.replace(`/tasks/${id}`);
  };

  const toDashboard = () => {
    router.push("/dashboard");
  };
  const handlelogOut = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };
  const toCreateTask = () => {
    router.replace("/tasks/add");
  };
  return (
    <div>
      {error && (
        <Alert>
          <InfoIcon />
          <AlertTitle>Heads up!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
          <AlertAction></AlertAction>
        </Alert>
      )}
      {/* <div className=' rounded flex flex-row justify-between bg-black text-white'>
                                        <Button onClick={toDashboard} className='pt-0.5 pl-1'>Dashboard</Button>
                                          <div>
                                            <Button onClick={toTask} >All Tasks</Button>
                                          <Button onClick={toCreateTask}>Create Task</Button>
                                          <Button onClick={handlelogOut}>Logout</Button>
                                          </div>
                                    
                                        </div> */}
      <h1 className="text-2xl font-bold mb-4" >All Tasks</h1>
      <ScrollArea className="rounded-md border h-85">
        <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead className="w-[100px]">Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: any) => (
            <TableRow key={task._id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>{task.priority}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={<Button variant="outline">⋮</Button>}
                  />
                  <DropdownMenuContent>
                    <DropdownMenuGroup>
                      <DropdownMenuLabel>Options</DropdownMenuLabel>

                      <DropdownMenuItem
                        onClick={() => {
                          setToDeleteTask(task);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => {
                          toUpdate(task._id);
                        }}
                      >
                        Update
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          toTask(task._id);
                        }}
                      >
                        Details
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </ScrollArea>
      <AlertDialog
        open={toDeleteTask !== null}
        onOpenChange={(open) => {
          if (!open) {
            setToDeleteTask(null);
          }
        }}
      >
        {/* <AlertDialogTrigger render={<Button variant="outline" />}>
          Show Dialog
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteTask(toDeleteTask._id);

                setTasks(tasks.filter((t: any) => t._id !== toDeleteTask._id),
                );

                setToDeleteTask(null);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Tasks;
