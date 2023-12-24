import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import { useContext } from "react";
import { ThemeContext } from "./contexts/ThemeContext";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Products from "./pages/Products";

function App() {
   const [theme, setTheme] = useState("light");
   function toggleTheme() {
      setTheme(
         theme == "light" ? "dark" : theme == "dark" ? "light" : ""
      );
   }
   return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
         <BrowserRouter>
            <Header />
            <Routes>
               <Route path="/" element={<Home />} />
               <Route path="/about" element={<About />} />
               <Route path="/cart" element={<Cart />} />
               <Route path="/products" element={<Products />} />
            </Routes>
         </BrowserRouter>
      </ThemeContext.Provider>
   );
}

export default App;
