// Importa Outlet para partes filhas do layout
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex flex-col p-2 text-2xl text-center bg-primary text-white">
          <h1>Dev-Gastos</h1>
        </header>
        {/* Main */}
        <main className="flex-1">
          <Outlet />
        </main>
        {/* Footer */}
        <footer className="flex flex-col p-2 text-2xl text-center bg-primary text-white">
          <p>Dev-Gastos</p>
        </footer>
      </div>
    </>
  );
};

export default MainLayout;
