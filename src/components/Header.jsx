import { Link, useLocation } from "react-router-dom";
import * as Switch from "@radix-ui/react-switch";
import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import Container from "./Container";
import { Button } from "@chakra-ui/react";

export default function Header() {
   const location = useLocation();
   try {
      const [user, setUser] = useState(location.state.user);
   } catch (error) {
      console.log(error);
   }
   const [loggedIn, setLoggedIn] = useState(false);
   const { theme, toggleTheme } = useContext(ThemeContext);
   if (location.state.user) {
      setLoggedIn(true);
      delete location.state.user;
   }
   return (
      <header>
         <section
            className={`${
               theme == "light" ? "bg-slate-800" : "bg-slate-600"
            } `}
         >
            <Container
               classes={`py-2 gap-4 text-sm flex justify-end ${
                  theme == "light"
                     ? "text-slate-300"
                     : "text-slate-200"
               }`}
            >
               {loggedIn ? (
                  <div className="flex items-center gap-5">
                     <span>Hello, {user.username}</span>
                     <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={() => setLoggedIn(false)}
                     >
                        Log out
                     </Button>
                  </div>
               ) : (
                  <>
                     <Link className="hover:underline" to="/login">
                        Sing in / Guest
                     </Link>
                     <Link className="hover:underline" to="/register">
                        Create Account
                     </Link>
                  </>
               )}
            </Container>
         </section>
         <section
            className={`${
               theme == "light" ? "bg-blue-100" : "bg-slate-900"
            }`}
         >
            <Container classes="py-2 flex items-center justify-between">
               <div className="logo-wrapper">
                  <Link
                     to="/"
                     className={`transition-all font-semibold duration-300 lg:flex w-14 h-13 items-center rounded-lg justify-center text-3xl p-2 ${
                        theme === "light"
                           ? "bg-blue-500 hover:bg-blue-600 text-zinc-200"
                           : "bg-pink-400 hover:bg-pink-500 text-zinc-900"
                     }`}
                  >
                     C
                  </Link>
               </div>
               <nav>
                  <ul className="flex gap-3">
                     <li>
                        <Link
                           to="/"
                           className={`p-2.5 rounded-lg transition-all duration-300 ${
                              location.pathname == "/"
                                 ? `${
                                      theme == "light"
                                         ? "bg-slate-900 text-white"
                                         : "bg-slate-100 text-black"
                                   }`
                                 : `${
                                      theme == "light"
                                         ? "text-black hover:bg-slate-100"
                                         : "text-white hover:bg-slate-700"
                                   }`
                           }`}
                        >
                           Home
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/about"
                           className={`p-2.5 rounded-lg transition-all duration-300 ${
                              location.pathname == "/about"
                                 ? `${
                                      theme == "light"
                                         ? "bg-slate-900 text-white"
                                         : "bg-slate-100 text-black"
                                   }`
                                 : `${
                                      theme == "light"
                                         ? "text-black hover:bg-slate-100"
                                         : "text-white hover:bg-slate-700"
                                   }`
                           }`}
                        >
                           About
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/products"
                           className={`p-2.5 rounded-lg transition-all duration-300 ${
                              location.pathname == "/products"
                                 ? `${
                                      theme == "light"
                                         ? "bg-slate-900 text-white"
                                         : "bg-slate-100 text-black"
                                   }`
                                 : `${
                                      theme == "light"
                                         ? "text-black hover:bg-slate-100"
                                         : "text-white hover:bg-slate-700"
                                   }`
                           }`}
                        >
                           Products
                        </Link>
                     </li>
                     <li>
                        <Link
                           to="/cart"
                           className={`p-2.5 rounded-lg transition-all duration-300 ${
                              location.pathname == "/cart"
                                 ? `${
                                      theme == "light"
                                         ? "bg-slate-900 text-white"
                                         : "bg-slate-100 text-black"
                                   }`
                                 : `${
                                      theme == "light"
                                         ? "text-black hover:bg-slate-100"
                                         : "text-white hover:bg-slate-700"
                                   }`
                           }`}
                        >
                           Cart
                        </Link>
                     </li>
                  </ul>
               </nav>
               <div className="flex gap-4">
                  <label
                     className={
                        theme == "light" ? "text-black" : "text-white"
                     }
                     htmlFor="theme-toggle"
                  >
                     Dark Mode
                  </label>
                  <Switch.Root
                     className={`w-[42px] h-[25px]  rounded-full relative shadow-[0_2px_10px] focus:shadow-[0_0_0_2px] outline-none cursor-default ${
                        theme == "light"
                           ? "focus:shadow-black shadow-black bg-black"
                           : "data-[state=checked]:bg-teal-200 focus:shadow-teal-200 shadow-teal-200 bg-teal-200"
                     }
                     `}
                     id="theme-toggle"
                     style={{
                        WebkitTapHighlightColor: "rgba(0, 0, 0, 0)",
                     }}
                     onCheckedChange={toggleTheme}
                  >
                     <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
                  </Switch.Root>
               </div>
            </Container>
         </section>
      </header>
   );
}
