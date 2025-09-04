const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 overflow-hidden h-screen w-screen bg-slate-100 flex flex-col items-center justify-center">
        <div className="border-6 border-primary-dark rounded-full border-t-transparent w-15 h-15 animate-spin"></div>
      </div>
    </>
  );
};
export default Loader;
