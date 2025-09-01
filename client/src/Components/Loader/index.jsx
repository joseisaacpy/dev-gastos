const Loader = () => {
  return (
    <>
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center gap-2">
        <div className="border-2 rounded-full border-t-transparent w-20 h-20 animate-spin"></div>
        <h1 className="text-2xl">Carregando...</h1>
      </div>
    </>
  );
};
export default Loader;
