import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config"; // Corrected import path
import { Button } from "@material-tailwind/react";
import { toast } from "react-toastify";


function Signup() {

    const userInfo = getAuth();

    onAuthStateChanged(userInfo, (user) => {
        if (user) {
            navigate("/");
        }
    });


    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRpassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            return;
        }
        if (password !== rpassword) {
            setError("Passwords do not match!");
            return;
        }
        try {
            await createUserWithEmailAndPassword(auth, email, password);
           toast.success("Registered successfully! Redirecting..."); 
            navigate("/");
           
        } catch (error) {
            console.error("Error occurred", error);
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="flex justify-center items-center h-[80vh]">
            <div className="rounded-lg shadow-2xl bg-white p-[50px]  ">
                {message && <div className="message">{message}</div>}
                <h1 className="font-bold text-lg text-black">Create an account</h1>
                <form onSubmit={handleRegister} className="form" >
                    <div className="input-container my-4">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className='bg-transparent border-b-2 px-3 py-2 w-full focus:outline-none border-gray-300 focus:border-black '
                        />
                    </div>
                    <div className="input-container">
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className='bg-transparent border-b-2 px-3 py-2 w-full focus:outline-none border-gray-300 focus:border-black '
                        />
                    </div>
                    <div className="input-container my-4">
                        <input
                            type="password"
                            placeholder="Repeat Password"
                            value={rpassword}
                            onChange={(e) => setRpassword(e.target.value)}
                            required
                            className='bg-transparent border-b-2 px-3 py-2 w-full focus:outline-none border-gray-300 focus:border-black '
                        />
                    </div>

                    <Button type="submit" 
                        size="sm"
                        className="bg-ajio-1 hover:bg-ajio-2">Create an account</Button>


                    {error && <div className="text-red-900">{error}</div>}
                    <div className="flex gap-2">
                        <p className="mt-1">Already have an account?</p>
                        <Button
                            
                            size="sm"
                            className="bg-ajio-1 hover:bg-ajio-2"
                            onClick={() => navigate("/login")}
                        >
                            LOGIN
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
