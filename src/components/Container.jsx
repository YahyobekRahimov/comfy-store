function Container({ classes, children }) {
   return (
      <div className={`xl:container xl:mx-auto px-40 ${classes}`}>
         {children}
      </div>
   );
}

export default Container;
