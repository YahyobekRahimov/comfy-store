import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { ThemeContext } from "./contexts/ThemeContext";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Products from "./pages/Products";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useLocation } from "react-router-dom";

function App() {
   const { pathname } = useLocation();
   let result = "";
   if (pathname != "/login" && pathname != "/register") {
      result = <Header />;
   }
   let themeFromLocal = localStorage.getItem("theme");
   const [theme, setTheme] = useState(themeFromLocal ?? "light");
   function toggleTheme() {
      let newTheme =
         theme == "light" ? "dark" : theme == "dark" ? "light" : "";
      localStorage.setItem("theme", newTheme);
      setTheme(newTheme);
   }
   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         {result}
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
         </Routes>
      </ThemeContext.Provider>
   );
}

export default App;
