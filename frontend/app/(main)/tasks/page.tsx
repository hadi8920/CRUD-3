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
import { Label } from "recharts";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "./loading";
import LoadingSpinner from "@/components/loading-spinner";

const Tasks = () => {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState();
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("");
  const [order, setOrder] = useState("");
  const [loader, setLoader] = useState(false);
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
        setLoader(true);
        const res = await getTasks(priority, sort, order);
        setTasks(res.data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    };
    fetchTasks();
  }, [router, priority, sort, order]);

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

  const priorityItems = [
    { label: "All priorities", value: "" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const sortItems = [
    { label: "Title", value: "title" },
    { label: "Priority", value: "priority" },
    { label: "Status", value: "status" },
  ];

  const orderItems = [
    { label: "Ascending", value: "asc" },
    { label: "Descending", value: "desc" },
  ];
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
      <h1 className="text-2xl font-bold mb-4">All Tasks</h1>
      <ScrollArea className="rounded-md border h-85">
        <div className="sticky top-0 z-10 bg-background mb-5 flex gap-4">
          <Select
            items={priorityItems}
            value={priority}
            onValueChange={(value) => {
              setPriority(value ?? "");
            }}
          >
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
          <Select
            items={sortItems}
            value={sort}
            onValueChange={(value) => {
              setSort(value ?? "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sort</SelectLabel>
                {sortItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            items={orderItems}
            value={order}
            onValueChange={(value) => {
              setOrder(value ?? "");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Order</SelectLabel>
                {orderItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
            {loader ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <LoadingSpinner />
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task: any) => (
                <TableRow onClick={() => {
                  toTask(task._id)
                }} key={task._id}>
                  <TableCell className="font-medium">{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.status}</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger 
                      onClick={(e) => e.stopPropagation()}
                        render={
                          <Button  onClick={(e) => e.stopPropagation()} className="cursor-pointer" variant="outline">
                            ⋮
                          </Button>
                        }
                      />
                      <DropdownMenuContent onClick={(e) => e.stopPropagation()}>
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
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
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

                setTasks(tasks.filter((t: any) => t._id !== toDeleteTask._id));

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
