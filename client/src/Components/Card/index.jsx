const Card = ({ nomeCartao, valor }) => {
  return (
    <>
      <div className="flex flex-col p-2 border-2 border-slate-800 gap-2 bg-slate-200 shadow rounded-2xl text-2xl hover:scale-[1.02] transition-all duration-300 ">
        <h2 className="font-bold">{nomeCartao}</h2>
        <strong className="font-bold ">{valor}</strong>
      </div>
    </>
  );
};
export default Card;
