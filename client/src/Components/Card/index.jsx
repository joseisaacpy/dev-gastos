const Card = ({ nomeCartao, valor, tipo }) => {
  return (
    <>
      <div
        className={`flex flex-col border-2 p-4 bg-slate-200 shadow-lg hover:shadow-xl rounded-lg
 hover:scale-[1.02] hover:bg-slate-100 transition-all duration-300 ${
   tipo === "gasto" ? "border-red-900" : "border-primary"
 }`}
      >
        {/* Imagem */}
        {/* Texto */}
        <div>
          <h2
            className="font-bold text-lg md:text-xl mb-2
"
          >
            {nomeCartao}
          </h2>
          <strong
            className={`text-center block font-extrabold text-lg md:text-2xl ${
              tipo === "gasto" ? "text-red-900" : "text-primary"
            }
`}
          >
            {valor}
          </strong>
        </div>
      </div>
    </>
  );
};
export default Card;
