import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, } from "firebase/auth";
import { auth } from "../../../firebase/firebase.config";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { Button, Spinner } from "@material-tailwind/react";
import GoogleButton from "./GoogleButton";


function SignIn() {

  const userInfo = getAuth();

  onAuthStateChanged(userInfo, (user) => {
    if (user) {
      navigate("/");
    }
  });

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("User logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error occurred", error);
      setError("Failed to log in. Please try again.");
    }
  };


  const googleAuthHandler = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      await signInWithPopup(auth, provider);
      setLoading(false);
      toast.success("User logged in successfully");
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

  if (loading) {
    return (
      <Spinner className="mx-auto text-black mt-[20%] h-20 w-20" />
    )
  }

  return (

    <div className="flex justify-center items-center h-[80vh]">


      <div className="rounded-lg shadow-2xl bg-white p-[50px]  text-black">
        <h1 className="font-bold text-[30px] my-7">Welcome to ajio</h1>

        <p>Sign In using</p>
        <div className="my-4">
          <GoogleButton onItemClick={googleAuthHandler} />
        </div> 
        <div className="flex w-full justify-center">
          <hr className="flex-grow border-gray-400 mt-3 mx-3" />
          <span>OR</span>
          <hr className="flex-grow border-gray-400 mt-3 mx-3"/>
        </div >
        <h1 className="font-bold text-lg">Sign In with Email/Password</h1>
        <form onSubmit={handleSubmit} className="form" >
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


          <Button type="submit"
            size="sm"
            className="bg-ajio-1 hover:bg-ajio-2 my-4">Sign In</Button>


          {error && <div className="text-red-900">{error}</div>}
          <div className="flex gap-2 ">
            <p className="mt-1">{`Don't have an account?`}</p>
            <Button

              size="sm"
              className="bg-ajio-1 hover:bg-ajio-2"
              onClick={() => navigate("/signup")}
            >
              Create an Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;