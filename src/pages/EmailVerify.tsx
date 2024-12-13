import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Login() {
    const [otpInput, setOtpInput] = useState("");
    const navigate = useNavigate();
    const [alert, setAlert] = useState("");

    async function handleVerification(e: React.FormEvent<HTMLFormElement>, otpInput: string, setAlert: React.Dispatch<React.SetStateAction<string>>) {
        e.preventDefault();

        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/verify`,
            {
                method: "POST",
                body: JSON.stringify({ otp: otpInput }),
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
        else { navigate("/") }
    }

    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER_URL}/auth/send-otp`, { credentials: "include" })
            .then((res) => res.json())
            .then((data) => {
                setAlert("");
                if (!data.success) { setAlert("Couldn't Send OTP") }
                else { setAlert("") }
            });
    }, []);

    return <>
        <form className="flex flex-col gap-4 mt-16 m-auto max-w-xl min-w-[250px] w-96" onSubmit={(e) => { handleVerification(e, otpInput, setAlert) }}>
            <div>Enter OTP sent to your registered Email.</div>
            <div>OTP Sent is valid for 5 min.</div>

            <div className="text-red-400 drop-shadow-2xl self-start h-5">{alert}</div>

            <input className="bg-white px-4 py-2 rounded-lg text-black" type="text" onChange={(e) => setOtpInput(e.target.value)} placeholder="Enter OTP" value={otpInput}></input>
            <input className="bg-slate-700 px-4 py-2 rounded-lg active:bg-slate-500 cursor-pointer" type="submit" value={"Next"}></input>
        </form>
    </>
}