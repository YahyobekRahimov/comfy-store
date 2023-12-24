function Button({ children, classes }) {
   return (
      <button className={`rounded-lg px-4 py-2 text-2xl ${classes}`}>
         {children}
      </button>
   );
}

export default Button;
