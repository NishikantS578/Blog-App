import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AppContext } from "../context/AppContext";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState("");
    const navigate = useNavigate();

    const { backendUrl, login } = useContext(AppContext);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>, email: string, password: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${backendUrl}/auth/login`,
            {
                method: "POST",
                body: JSON.stringify({ email, p: password }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (res.status != 200) { setAlert("Couldn't Login") }

        const data = await res.json();

        setAlert("");
        if (!data.success) { setAlert("Couldn't Login") }
        else {
            await login();
            navigate("/");
        }
    }

    return <>
        <form className="flex flex-col gap-4 mt-16 m-auto max-w-xl min-w-[250px] w-96" onSubmit={(e) => { handleLogin(e, email, password, setAlert) }}>
            <h2 className="text-3xl">Login to continue</h2>
            <div className="text-red-400 drop-shadow-2xl self-start h-5">{alert}</div>

            <input className="bg-white px-4 py-2 rounded-lg text-black" type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="username"></input>

            <input className="bg-white px-4 py-2 rounded-lg text-black" type="password" placeholder="Password*" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password"></input>

            <input className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" type="submit"></input>
            <div className="flex justify-between flex-col">
                <div>
                    Don't have an account?
                    <Link className="underline" to={"/register"}>Register now</Link>
                </div>
                <Link className="underline" to={"/reset-password"}>Forgot password</Link>
            </div>
        </form>
    </>
}