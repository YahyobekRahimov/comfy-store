import Container from "../components/Container";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Products() {
   const { theme } = useContext(ThemeContext);
   function putNewProduct() {
      const product = {
         name: "Redmi note 9 pro",
         description: "Yangi",
         status: "active",
         price: 200,
         category_id: "1",
      };
      fetch("https://auth-rg69.onrender.com/api/products/", {
         method: "POST",
         headers: {
            "Content-Type": "application/json;charset=utf-8",
         },
         body: JSON.stringify(product),
      })
         .then((res) => res.json())
         .then((json) => setState(json))
         .catch((err) => {
            console.error(err);
         });
   }
   return (
      <Container>
         <div
            className={`w-full h-20 mt-20 p-6 ${
               theme == "light" ? "bg-blue-100" : "bg-slate-700"
            }`}
         >
            Something
         </div>

         {/* <button
            className="px-4 py-2 bg-blue-700 hover:bg-blue-800 text-slate-100"
            onClick={putNewProduct}
         >
            Add new product
         </button> */}
      </Container>
   );
}

export default Products;
