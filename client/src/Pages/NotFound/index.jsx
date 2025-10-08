import { useEffect } from "react";
import { Link } from "react-router-dom";

import { FaArrowLeft } from "react-icons/fa";

const NotFound = () => {
  useEffect(() => {
    document.title = "Página não encontrada";
  });

  return (
    <>
      <section className="min-w-screen min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-primary to-primary-light">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="text-4xl font-bold text-white text-center">
            Ops, página não encontrada...
          </h1>
          <button className="">
            <Link
              to={"/"}
              className="flex items-center justify-center bg-white rounded-full p-4 transition-all duration-300 hover:scale-110 hover:bg-primary hover:text-white text-2xl"
            >
              <FaArrowLeft />
            </Link>
          </button>
        </div>
      </section>
    </>
  );
};

export default NotFound;
