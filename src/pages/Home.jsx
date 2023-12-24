import { useContext } from "react";
import Container from "../components/Container";
import { ThemeContext } from "../contexts/ThemeContext";
import Button from "../components/Button";
import Hero1 from "../images/hero1.webp";
import Hero2 from "../images/hero2.webp";
import Hero3 from "../images/hero3.webp";
import Hero4 from "../images/hero4.webp";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";

function Home() {
   const { theme } = useContext(ThemeContext);
   const products = [
      {
         id: 1,
         img: "https://picsum.photos/300/200",
         name: "Avant-Garde Lamp",
         price: 179.99,
         currency: "$",
      },
      {
         id: 2,
         img: "https://picsum.photos/300/200",
         name: "Coffee Table",
         price: 179.99,
         currency: "$",
      },
      {
         id: 3,
         img: "https://picsum.photos/300/200",
         name: "Comfy bed",
         price: 129.99,
         currency: "$",
      },
   ];
   const mappedProducts = products.map((product, index) => {
      return (
         <div
            key={product.id}
            className={`text-center rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-solid border px-4 py-4 cursor-pointer ${
               theme == "light"
                  ? "shadow-black bg-gray-50"
                  : "shadow-white bg-slate-900 border-none"
            }`}
         >
            <img
               className={`rounded-xl`}
               src={product.img}
               alt={product.name}
            />
            <h3 className={`text-xl font-semibold mt-8 mb-2`}>
               {product.name}
            </h3>
            <h4 className={``}>{product.price}</h4>
         </div>
      );
   });
   return (
      <>
         <Container
            classes={`py-2 grid grid-cols-2 py-20 gap-x-32 items-center ${
               theme == "light" ? `bg-white` : `bg-slate-800`
            }`}
         >
            <div
               className={`${
                  theme == "light"
                     ? `text-slate-700`
                     : `text-slate-100`
               }`}
            >
               <h1 className="text-6xl font-semibold">
                  We are changing the way people shop
               </h1>
               <p className="text-base font-normal mt-5">
                  Lorem ipsum, dolor sit amet consectetur adipisicing
                  elit. Tempore repellat explicabo enim soluta
                  temporibus asperiores aut obcaecati perferendis
                  porro nobis.
               </p>
               <Button
                  classes={`text-lg mt-12 transition-all duration-300 ${
                     theme == "light"
                        ? `text-slate-200 hover:bg-blue-700 bg-blue-600`
                        : `text-slate-700 bg-pink-300 hover:bg-pink-400`
                  }`}
               >
                  Our products
               </Button>
            </div>
            <div className="hero-scroll w-76 min-h-96 py-4 px-4 bg-slate-700 rounded-2xl flex overflow-x-scroll gap-4">
               <img
                  className="object-cover w-80 rounded-lg"
                  style={{ height: "25rem" }}
                  src={Hero1}
                  alt="hero1"
               />
               <img
                  className="object-cover w-80 rounded-lg"
                  style={{ height: "25rem" }}
                  src={Hero2}
                  alt="hero2"
               />
               <img
                  className="object-cover w-80 rounded-lg"
                  style={{ height: "25rem" }}
                  src={Hero3}
                  alt="hero3"
               />
               <img
                  className="object-cover w-80 rounded-lg"
                  style={{ height: "25rem" }}
                  src={Hero4}
                  alt="hero4"
               />
            </div>
         </Container>
         <Container
            classes={`py-2 py-20 gap-x-32 items-center ${
               theme == "light" ? `bg-white` : `bg-slate-800`
            }`}
         >
            <div
               className={
                  theme == "light"
                     ? "text-slate-700"
                     : "text-slate-100"
               }
            >
               <h2
                  className={`text-3xl font-semibold border-b border-solid pb-4 mb-10 ${
                     theme == "light"
                        ? "text-slate-700 border-slate-200"
                        : "text-slate-100 border-black"
                  }`}
               >
                  Featured products
               </h2>
               <div
                  className={`grid grid-cols-3 justify-items-center`}
               >
                  {mappedProducts}
               </div>
            </div>
            <Select>
               <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Theme" />
               </SelectTrigger>
               <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
               </SelectContent>
            </Select>
         </Container>
      </>
   );
}

export default Home;
