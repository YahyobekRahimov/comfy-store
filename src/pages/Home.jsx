import { useContext, useEffect, useState } from "react";
import Container from "../components/Container";
import { ThemeContext } from "../contexts/ThemeContext";
import Hero1 from "../images/hero1.webp";
import Hero2 from "../images/hero2.webp";
import Hero3 from "../images/hero3.webp";
import Hero4 from "../images/hero4.webp";
import { Link, useNavigate } from "react-router-dom";

function Home() {
   const navigate = useNavigate();
   const { theme } = useContext(ThemeContext);
   const [featuredProducts, setFeaturedProducts] = useState([]);

   // Fetching the products
   useEffect(() => {
      fetch(`https://strapi-store-server.onrender.com/api/products`)
         .then((res) => res.json())
         .then((json) => setFeaturedProducts(json.data))
         .catch((err) => {
            console.error(err);
         });
   }, []);

   //  This function deals with the passing the data related to the clicked product
   function handleProductClick(params) {
      const { id } = params;
      navigate(`/products/${id}`, { state: { params: params } });
   }

   //  Mapping all the featured product cards

   const mappedProducts = featuredProducts
      .slice(0, 3)
      .map((product) => {
         let {
            price,
            image,
            title,
            description,
            colors,
            shipping,
            company,
            category,
         } = product.attributes;
         let id = product.id;
         price = price.toString();
         price = price.slice(0, -2) + "." + price.slice(-2);
         return (
            <div
               onClick={() =>
                  handleProductClick({
                     image,
                     title,
                     price,
                     description,
                     colors,
                     shipping,
                     company,
                     category,
                     id,
                  })
               }
               key={id}
               className={`text-center rounded-xl transition-all duration-300 hover:shadow-2xl hover:scale-105 border-solid border px-4 py-4 cursor-pointer ${
                  theme == "light"
                     ? "shadow-black bg-gray-50"
                     : "shadow-white bg-slate-900 border-none"
               }`}
            >
               <img
                  className={`rounded-xl w-72 h-52 object-cover`}
                  src={image}
                  alt={title}
               />
               <h3
                  className={`text-xl font-semibold mt-8 mb-2 capitalize`}
               >
                  {title}
               </h3>
               <h4 className={`text-blue-700 text-xl font-semibold`}>
                  ${price}
               </h4>
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
               <div className="mt-12">
                  <Link
                     to="/products"
                     className={`rounded-lg px-4 py-2 text-lg transition-all duration-300 ${
                        theme == "light"
                           ? `text-slate-200 hover:bg-blue-700 bg-blue-600`
                           : `text-slate-700 bg-pink-300 hover:bg-pink-400`
                     }`}
                  >
                     Our products
                  </Link>
               </div>
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
         </Container>
      </>
   );
}

export default Home;
