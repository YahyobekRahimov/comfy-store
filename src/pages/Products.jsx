import Container from "../components/Container";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import {
   categories,
   sortByCategories,
   companies,
} from "../../data/data";
import {
   Slider,
   SliderTrack,
   SliderFilledTrack,
   SliderThumb,
   Checkbox,
   Button,
   Input,
   Select,
} from "@chakra-ui/react";
import SquareLayout from "../icons/grid.svg?react";
import MenuLayout from "../icons/menu-layout.svg?react";
import { useNavigate } from "react-router-dom";

function Products() {
   const [price, setPrice] = useState(1500);
   const [cardLayout, setCardLayout] = useState("grid");
   const { theme } = useContext(ThemeContext);
   const [data, setData] = useState({});
   const navigate = useNavigate();
   const BASE_URL = import.meta.env.VITE_BASE_URL;
   function toggleCardLayout(value) {
      setCardLayout(value);
   }
   useEffect(() => {
      fetch(
         `https://strapi-store-server.onrender.com/api/products?page=1`
      )
         .then((res) => res.json())
         .then((json) => setData(json))
         .catch((err) => {
            console.error(err);
         });
   }, []);
   function handlePriceChange(value) {
      setPrice(value);
   }
   const optionsStyles =
      theme == "light"
         ? { backgroundColor: "white" }
         : { backgroundColor: "#475569" };
   function handleProductClick(params) {
      const {
         image,
         title,
         price,
         description,
         colors,
         shipping,
         company,
         category,
         id,
      } = params;
      console.log(params);
      navigate(`/products/${id}`, {
         state: {
            params: params,
         },
      });
   }
   return (
      <>
         <Container
            classes={`pt-20 ${
               theme == "light" ? `bg-white` : `bg-slate-700`
            }`}
         >
            <div
               className={`w-full rounded-lg p-6 ${
                  theme == "light"
                     ? "bg-blue-100 text-black"
                     : "bg-slate-800 text-white"
               }`}
            >
               <div
                  className={`flex gap-5 w-full items-center justify-around ${
                     theme == "light"
                        ? "bg-blue-100 text-black"
                        : "bg-slate-800 text-white"
                  }`}
               >
                  <div className="w-full flex flex-col gap-1">
                     <label htmlFor="select-product">
                        Product name
                     </label>
                     <Input
                        variant="outline"
                        style={
                           theme == "light"
                              ? { backgroundColor: "white" }
                              : {
                                   backgroundColor: "#475569",
                                }
                        }
                        id="select-product"
                     />
                  </div>
                  <div className="w-full flex flex-col gap-1">
                     <label htmlFor="category">
                        Select a category
                     </label>
                     <Select
                        id="category"
                        style={
                           theme == "light"
                              ? { backgroundColor: "white" }
                              : {
                                   backgroundColor: "#475569",
                                }
                        }
                     >
                        {categories.map((category, index) => {
                           return (
                              <option
                                 key={index}
                                 value={category.value}
                                 style={optionsStyles}
                              >
                                 {category.name}
                              </option>
                           );
                        })}
                     </Select>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                     <label htmlFor="brands">Select a Brand</label>
                     <Select
                        style={
                           theme == "light"
                              ? { backgroundColor: "white" }
                              : {
                                   backgroundColor: "#475569",
                                }
                        }
                        id="brands"
                     >
                        {/* Mapping the filter for companies */}

                        {companies.map((category, index) => {
                           return (
                              <option
                                 key={index}
                                 value={category.value}
                                 style={optionsStyles}
                              >
                                 {category.name}
                              </option>
                           );
                        })}
                     </Select>
                  </div>
                  <div className="w-full flex flex-col gap-1">
                     <label htmlFor="order">Sort by</label>
                     <Select
                        id="order"
                        style={
                           theme == "light"
                              ? { backgroundColor: "white" }
                              : {
                                   backgroundColor: "#475569",
                                }
                        }
                     >
                        {/* Mapping categories for filter */}

                        {sortByCategories.map((category, index) => {
                           return (
                              <option
                                 key={index}
                                 value={category.value}
                                 style={optionsStyles}
                              >
                                 {category.name}
                              </option>
                           );
                        })}
                     </Select>
                  </div>
               </div>
               <div className="grid grid-cols-4 mt-5 items-center justify-items-center">
                  <div className="w-full">
                     <label className="flex justify-between">
                        <span>Select price</span>
                        <span className="text-lg">{price}$</span>
                     </label>
                     <Slider
                        defaultValue={price}
                        min={10}
                        max={1500}
                        step={10}
                        onChange={handlePriceChange}
                     >
                        <SliderTrack bg="red.200">
                           <SliderFilledTrack bg="tomato" />
                        </SliderTrack>
                        <SliderThumb boxSize={6} />
                     </Slider>
                     <div className="flex justify-between items-center font-bold">
                        <span>Min: 10$</span>
                        <span>Max: 1500$</span>
                     </div>
                  </div>
                  <div className="flex justify-center align-center">
                     <Checkbox
                        className="border-green-500"
                        size="lg"
                        colorScheme="green"
                     >
                        Free shipping
                     </Checkbox>
                  </div>
                  <Button className="w-11/12" colorScheme="blue">
                     Search
                  </Button>
                  <Button className="w-11/12" colorScheme="red">
                     Reset
                  </Button>
               </div>
            </div>
         </Container>

         <Container
            classes={`pt-20 ${
               theme == "light" ? `bg-white` : `bg-slate-700`
            }`}
         >
            <div
               className={`flex justify-between items-center border-b-2 border-slate-300 border-solid pb-5`}
            >
               <span
                  className={`text-2xl font-semibold ${
                     theme == "light" ? "text-black" : "text-white"
                  }`}
               >
                  {data.data && data.data.length} products
               </span>
               <div className="flex gap-2">
                  <div
                     className={`rounded-full h-10 w-10 flex items-center justify-center cursor-pointer ${
                        theme === "light"
                           ? `hover:bg-slate-300 ${
                                cardLayout === "grid"
                                   ? "bg-blue-400 hover:bg-blue-400"
                                   : "bg-white"
                             }`
                           : `${
                                cardLayout == "grid"
                                   ? "bg-pink-400"
                                   : "bg-transparent"
                             }`
                     }`}
                     onClick={() => toggleCardLayout("grid")}
                  >
                     <SquareLayout
                        className={`h-6 w-6 ${
                           cardLayout == "menu"
                              ? "fill-black"
                              : "fill-slate-100"
                        }`}
                     />
                  </div>
                  <div
                     className={`rounded-full h-10 w-10 flex items-center justify-center cursor-pointer ${
                        theme === "light"
                           ? `hover:bg-slate-300 ${
                                cardLayout === "menu"
                                   ? "bg-blue-400 hover:bg-blue-400"
                                   : "bg-white"
                             }`
                           : `${
                                cardLayout == "menu"
                                   ? "bg-pink-400"
                                   : "bg-transparent"
                             }`
                     }`}
                     onClick={() => toggleCardLayout("menu")}
                  >
                     <MenuLayout
                        className={`h-6 w-6 stroke-2 ${
                           cardLayout == "grid"
                              ? "fill-black"
                              : "fill-slate-100"
                        }`}
                     />
                  </div>
               </div>
            </div>
            <ul
               className={`grid grid-cols-3 justify-items-center mt-10 gap-8 pb-32`}
            >
               {data.data &&
                  data.data.map((product, index) => {
                     let {
                        image,
                        title,
                        price,
                        description,
                        colors,
                        shipping,
                        company,
                        category,
                        id,
                     } = product.attributes;
                     price = price.toString();
                     price =
                        price.slice(0, -2) + "." + price.slice(-2);
                     return (
                        <li
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
                           key={index}
                           className={`text-center p-5 pb-10 flex flex-col items-center gap-4 rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer
                           ${
                              theme == "light"
                                 ? `bg-white text-black`
                                 : `bg-slate-800 text-white`
                           }`}
                           style={{
                              boxShadow:
                                 "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                           }}
                        >
                           <img
                              className="rounded-xl w-72 h-52 object-cover"
                              src={image}
                              alt={title}
                           />
                           <h4 className="mt-3 font-bold text-2xl capitalize">
                              {title}
                           </h4>
                           <h5
                              className={`text-blue-700 text-xl font-semibold`}
                           >
                              ${price}
                           </h5>
                        </li>
                     );
                  })}
            </ul>
         </Container>
      </>
   );
}

export default Products;
