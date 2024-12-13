import { useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [email, setEmail] = useState("");
    const [alert, setAlert] = useState("");
    const [otpInput, setOtpInput] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [verifiedOtp, setVerifiedOtp] = useState(false);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function handleResetPassword(e: React.FormEvent<HTMLFormElement>, email: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/send-password-reset-otp`,
            {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (res.status != 200) { setAlert("Couldn't send OTP") }

        const data = await res.json();

        setAlert("");
        if (!data.success) { setAlert("Couldn't send OTP") }
        else { setOtpSent(true); }
    }


    async function handleVerification(e: React.FormEvent<HTMLButtonElement>, otpInput: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/verify`,
            {
                method: "POST",
                body: JSON.stringify({ email, otp: otpInput }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (res.status != 200) { setAlert("Couldn't Verify") }

        const data = await res.json();

        setAlert("");
        if (!data.success) { setAlert("Couldn't Verify") }
        else { setVerifiedOtp(true); }
    }

    async function handleUpdatingPassword(e: React.FormEvent<HTMLButtonElement>, password: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/reset-password`,
            {
                method: "POST",
                body: JSON.stringify({ p: password }),
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        if (res.status != 200) { setAlert("Couldn't Update Password") };
        const data = await res.json();

        setAlert("");
        if (!data.success) { setAlert("Couldn't Update Password") }
        else { navigate("/") }
    }

    return <>
        <form className="flex flex-col gap-4 mt-16 m-auto max-w-xl min-w-[250px] w-96" onSubmit={(e) => { handleResetPassword(e, email, setAlert) }}>
            <h2 className="text-3xl">Reset Password</h2>
            <div className="text-red-400 drop-shadow-2xl self-start h-5">{alert}</div>
            <input className="bg-white px-4 py-2 rounded-lg text-black" type="email" placeholder="Email*" value={email} onChange={(e) => setEmail(e.target.value)}></input>
            {!otpSent && <input className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" type="submit" placeholder="Password*" value={"Next"}></input>}

            {otpSent && <input className="bg-white px-4 py-2 rounded-lg text-black" type="text" onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP" value={otpInput}></input>}

            {!verifiedOtp && otpSent && <button className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" onClick={(e) => { handleVerification(e, otpInput, setAlert) }}>Verify OTP</button>}

            {verifiedOtp && <input className="bg-white px-4 py-2 rounded-lg text-black" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Enter New Password*" required={true} value={password}></input>}

            {verifiedOtp && <button className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" onClick={(e) => { handleUpdatingPassword(e, password, setAlert) }}>Update Password</button>}

        </form >
    </>
}