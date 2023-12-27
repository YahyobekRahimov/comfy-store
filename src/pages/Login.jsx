import { Input } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import {
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
} from "@chakra-ui/react";

function Login() {
   const { theme } = useContext(ThemeContext);
   const emailRef = useRef();
   const passwordRef = useRef();
   const [response, setResponse] = useState({ firstTime: true });
   const [hasError, setHasError] = useState("");
   const [success, setSuccess] = useState(false);
   const navigate = useNavigate();
   async function handleLogin() {
      const identifier = emailRef.current.value;
      const password = passwordRef.current.value;
      const data = {
         identifier,
         password,
      };
      console.log(data);
      if (!identifier) {
         setHasError("You must enter email");
         return;
      }
      if (password >= 3) {
         setHasError("Password must include more than 3 characters");
         return;
      }
      try {
         const res = await fetch(
            `${import.meta.env.VITE_BASE_URL}api/auth/local`,
            {
               method: "POST",
               headers: {
                  "Content-Type": "application/json; charset=utf-8",
               },
               body: JSON.stringify(data),
            }
         );
         const json = await res.json();
         setResponse(json);
      } catch (error) {
         console.log(error);
      }
   }
   useEffect(() => {
      console.log("response: ", response);
      console.log(response.error);
      if (response.firstTime) {
         return;
      }
      if (response.error) {
         setHasError(response.error.message);
         return;
      }
      if (!response.user) {
         setHasError("Email or password is incorrect");
         return;
      }
      setCookie("token", response.jwt);
      if (response.user.confirmed) {
         setSuccess(true);
         setHasError("");
         setTimeout(() => {
            navigate("/", {
               state: {
                  user: response.user,
               },
            });
         }, 1800);
      }
   }, [response]);
   function setCookie(name, value) {
      const date = new Date();
      date.setFullYear(date.getFullYear() + 1); // Set to expire in a year

      const expires = "; expires=" + date.toUTCString();
      document.cookie = name + "=" + value + expires + "; path=/";
   }

   return (
      <div
         className={`pt-20 min-h-screen ${
            theme == "light" ? "bg-white" : "bg-slate-600"
         }`}
      >
         <div
            className={`w-1/4 mr-auto ml-auto p-10 rounded-xl flex flex-col gap-5 ${
               theme == "light"
                  ? "bg-slate-100 text-black"
                  : "bg-slate-700 text-white"
            }`}
         >
            {hasError && (
               <Alert status="error">
                  <AlertIcon />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{hasError}</AlertDescription>
               </Alert>
            )}
            <h2 className="text-3xl font-semibold text-center">
               Login
            </h2>
            <div className={`flex flex-col gap-2`}>
               <label htmlFor="login-input">Email</label>
               <Input
                  ref={emailRef}
                  className={`${
                     theme == "light" ? "text-black" : "text-white"
                  }`}
                  style={
                     theme == "light"
                        ? { background: "white" }
                        : { background: "#334155" }
                  }
                  size="lg"
                  id="login-input"
               />
            </div>
            <div className="flex flex-col gap-2">
               <label htmlFor="password-input">Password</label>
               <Input
                  ref={passwordRef}
                  type="password"
                  style={
                     theme == "light"
                        ? { background: "white" }
                        : { background: "#334155" }
                  }
                  className={`${
                     theme == "light" ? "text-black" : "text-white"
                  }`}
                  size="lg"
                  id="password-input"
               />
            </div>
            <Button
               colorScheme="blue"
               size="lg"
               onClick={handleLogin}
            >
               LOGIN
            </Button>
            <Button colorScheme="purple">GUEST USER</Button>
            {success && (
               <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                     You have successfully logged in!
                  </AlertDescription>
               </Alert>
            )}
            <div className="text-center text-lg">
               <span className="mr-2">Not a member yet?</span>
               <Link
                  className="text-blue-500 hover:underline"
                  to="/register"
               >
                  Register
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Login;
