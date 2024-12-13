import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    async function handleRegistration(e: React.FormEvent<HTMLFormElement>, email: string, password: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/auth/register`,
            {
                method: "POST",
                body: JSON.stringify({ email, p: password }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (res.status != 200) { setAlert("Couldn't Register") }

        const data = await res.json();

        setAlert("");
        if (!data.success) { setAlert("Couldn't Register") }
        else { navigate("/verify") }
    }

    return <>
        <form className="flex flex-col gap-4 mt-16 m-auto max-w-xl min-w-[250px] w-96" onSubmit={(e) => { handleRegistration(e, email, password, setAlert) }}>
            <h2 className="text-3xl">New Registration</h2>
            <div className="text-red-400 drop-shadow-2xl self-start h-5">{alert}</div>
            <input className="bg-white px-4 py-2 rounded-lg text-black" type="email" placeholder="Email*" autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            <input className="bg-white px-4 py-2 rounded-lg text-black" type="password" placeholder="Password*" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            <input className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" type="submit"></input>
            <div className="flex justify-between flex-col">
                <div>
                    Already have an account?
                    <Link className="underline" to={"/login"}>Login now</Link>
                </div>
            </div>
        </form>
    </>
}