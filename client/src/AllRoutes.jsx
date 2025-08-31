// Importa elementos do react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importa o layout padrão com header e footer
import MainLayout from "./Components/MainLayout";
// Importa as páginas
// import ListarGastos from "./Pages/Gastos/ListarGastos";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      {/* Conjunto de rotas */}
      <Routes>
        {/* Rota com o layout */}
        <Route element={<MainLayout />}>
          {/* Rota inicial */}
          <Route
            path="/"
            element={
              <>
                <h1 className="text-4xl">test</h1>
              </>
            }
          />
        </Route>
        {/* Rota de login */}
        {/* <Route></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
