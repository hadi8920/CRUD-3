"use client";
import { registerUser } from "@/lib/auth/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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


const ResgiterUser = () => {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setError("");
            setLoader(true);

            const res = await registerUser(username, email, password);
            if (res.data) {
                localStorage.setItem("token", res.token);
                router.replace("/dashboard");
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoader(false);
        }
    };

    const toDashboard = () => {
        router.push("/dashboard");
    };
    return (
        <div>
            <Button onClick={toDashboard} className='text-3xl'>Dashboard</Button>


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
                    <CardTitle>Create Account</CardTitle>
                    <CardDescription>
                        Already have an account?
                    </CardDescription>
                    <CardAction>
                        <Button variant="link">
                            <Link href='/login'>Login</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    type="text"
                                    name='text'
                                    placeholder='Enter your Username'
                                    value={username}
                                    onChange={(e) => { setUsername(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name='email'
                                    placeholder='Enter your email'
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input type="password"
                                    name='password'
                                    placeholder='Enter your password'
                                    value={password}
                                    onChange={(e) => { setPassword(e.target.value) }} required />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    {loader && <Loading />}
                    <Button onClick={handleSubmit} disabled={loader} type="submit" className="w-full">
                        Login
                    </Button>
                </CardFooter>
            </Card>


        </div>
    );
};

export default ResgiterUser;
