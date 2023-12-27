import { Input } from "@chakra-ui/react";
import { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";
import {
   Alert,
   AlertIcon,
   AlertTitle,
   AlertDescription,
} from "@chakra-ui/react";

function Register() {
   const navigate = useNavigate();
   const [hasError, setHasError] = useState("");
   const [response, setResponse] = useState({});
   const [success, setSuccess] = useState(false);
   const { theme } = useContext(ThemeContext);
   const emailRef = useRef();
   const usernameRef = useRef();
   const passwordRef = useRef();
   function handleRegister() {
      let email = emailRef.current.value;
      let username = usernameRef.current.value;
      let password = passwordRef.current.value;
      let data = {
         email,
         username,
         password,
      };
      if (!email || !username || !password) {
         setHasError("Iltimos ma'lumotlarni kiriting");
         return;
      }
      fetch(
         `https://strapi-store-server.onrender.com/api/auth/local/register`,
         {
            method: "POST",
            headers: {
               "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(data),
         }
      )
         .then((res) => res.json())
         .then((json) => setResponse(json))
         .catch((err) => {
            console.error(err);
            setHasError(response.error.message);
            console.log("Error");
         });
   }
   useEffect(() => {
      if (!response.user) {
         return;
      }
      if (response.error) {
         setHasError(response.error.message);
      }
      if (response.user.confirmed) {
         setSuccess(true);
         setTimeout(() => {
            navigate("/login");
         }, 1800);
      }
   }, [response]);
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
               Register
            </h2>
            <div className={`flex flex-col gap-2`}>
               <label htmlFor="username-input">Username</label>
               <Input
                  className={`${
                     theme == "light" ? "text-black" : "text-white"
                  }`}
                  ref={usernameRef}
                  style={
                     theme == "light"
                        ? { background: "white" }
                        : { background: "#334155" }
                  }
                  size="lg"
                  id="username-input"
               />
            </div>
            <div className={`flex flex-col gap-2`}>
               <label htmlFor="Register-input">Email</label>
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
                  id="Register-input"
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
               onClick={handleRegister}
            >
               REGISTER
            </Button>
            {success && (
               <Alert status="success">
                  <AlertIcon />
                  <AlertTitle>Success!</AlertTitle>
                  <AlertDescription>
                     You have successfully registered!
                  </AlertDescription>
               </Alert>
            )}
            <div className="text-center text-lg">
               <span className="mr-2">Already a member?</span>
               <Link
                  className="text-blue-500 hover:underline"
                  to="/login"
               >
                  Login
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Register;
