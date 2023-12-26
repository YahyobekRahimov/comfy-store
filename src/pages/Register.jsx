import { Input } from "@chakra-ui/react";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Register() {
   const { theme } = useContext(ThemeContext);
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
            <h2 className="text-3xl font-semibold text-center">
               Register
            </h2>
            <div className={`flex flex-col gap-2`}>
               <label htmlFor="username-input">Username</label>
               <Input
                  className={`${
                     theme == "light" ? "text-black" : "text-white"
                  }`}
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
            <Button colorScheme="blue" size="lg">
               REGISTER
            </Button>
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
