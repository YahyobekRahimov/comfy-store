import Container from "../components/Container";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function About() {
   const { theme } = useContext(ThemeContext);
   return (
      <Container
         classes={`about__container flex flex-col items-center pt-20 min-h-screen ${
            theme === "light"
               ? `text-slate-700 bg-white`
               : `text-slate-100 bg-slate-700`
         }`}
      >
         <h1 className="text-inherit text-6xl font-medium mb-8">
            We love{" "}
            <span
               className={`rounded-xl tracking-widest relative bottom-2 px-6 pb-1 pt-3 text-4xl font-bold ${
                  theme == "light"
                     ? `text-slate-200 bg-blue-600`
                     : `text-slate-700 bg-pink-300`
               }`}
            >
               comfy
            </span>
         </h1>
         <p className="max-w-3xl text-xl">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Tempore quae quam blanditiis vitae, dolor non eveniet
            ipsum voluptatibus, quia optio aut! Perferendis ipsa
            cumque ipsam nostrum reprehenderit ad illo sed officiis ea
            tempore! Similique eos minima sit porro, ratione
            aspernatur!
         </p>
      </Container>
   );
}

export default About;
