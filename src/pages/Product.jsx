import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import { Select } from "@chakra-ui/react";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";
import { useState } from "react";

function Product() {
   const { theme } = useContext(ThemeContext);
   const location = useLocation();
   const {
      id,
      image,
      title,
      description,
      colors,
      price,
      company,
      shipping,
   } = location.state.params;
   const [selectedColor, setSelectedColor] = useState(colors[0]);
   let nums = [];
   for (let i = 1; i <= 20; i++) {
      nums.push(i);
   }
   const optionsStyles =
      theme == "light"
         ? { backgroundColor: "white" }
         : { backgroundColor: "#475569" };
   function handleColorClick(color) {
      setSelectedColor(color);
   }
   return (
      <Container
         classes={`flex pt-24 pb-20 gap-14 ${
            theme == "light"
               ? "text-slate-700 bg-white"
               : "text-slate-200 bg-slate-800"
         }`}
      >
         <img
            src={image}
            alt={title}
            className="rounded-lg object-cover"
            style={{
               height: "500px",
               width: "700px",
            }}
         />
         <div className="flex flex-col gap-2">
            <h1 className={`capitalize font-bold text-3xl`}>
               {title}
            </h1>
            <h2 className="text-2xl font-bold">{company}</h2>
            <h3 className="text-2xl font-semibold">${price}</h3>
            <h5>{description}</h5>
            <h4 className="font-semibold mt-5">Colors: </h4>
            <div className="flex gap-2">
               {colors.map((color, index) => (
                  <div
                     key={index}
                     className={`w-6 h-6 rounded-full cursor-pointer mb-5 ${
                        color == selectedColor
                           ? "outline outline-4 outline-blue-100"
                           : "outline-none"
                     }`}
                     style={{ backgroundColor: `${color}` }}
                     onClick={() => handleColorClick(color)}
                  ></div>
               ))}
            </div>
            <div className="flex flex-col gap-2 mb-5">
               <label className="font-semibold" htmlFor="count">
                  Amount
               </label>
               <Select
                  id="count"
                  style={
                     theme == "light"
                        ? { backgroundColor: "white" }
                        : {
                             backgroundColor: "#475569",
                          }
                  }
               >
                  {nums.map((num, index) => (
                     <option
                        key={index}
                        value={num}
                        style={optionsStyles}
                     >
                        {num}
                     </option>
                  ))}
               </Select>
            </div>
            <Button className="w-max" colorScheme="purple">
               ADD TO BAG
            </Button>
         </div>
      </Container>
   );
}

export default Product;
