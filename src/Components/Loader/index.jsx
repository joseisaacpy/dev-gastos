const Loader = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-16 h-16 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      <h1 className="text-3xl font-bold">Carregando...</h1>
    </div>
  );
};

export default Loader;
