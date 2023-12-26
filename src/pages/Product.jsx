import { useLocation } from "react-router-dom";
import Container from "../components/Container";
import { Select } from "@chakra-ui/react";
import { ThemeContext } from "@emotion/react";
import { useContext } from "react";
import { Button } from "@chakra-ui/react";

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
   let nums = [];
   for (let i = 1; i <= 20; i++) {
      nums.push(i);
   }
   return (
      <Container classes={`flex mt-24 gap-14`}>
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
                     className="w-6 h-6 rounded-full cursor-pointer mb-5"
                     style={{ backgroundColor: `${color}` }}
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
                     <option key={index} value={num}>
                        {num}
                     </option>
                  ))}
               </Select>
            </div>
            <Button className="w-1/6" colorScheme="purple">
               ADD TO BAG
            </Button>
         </div>
      </Container>
   );
}

export default Product;
