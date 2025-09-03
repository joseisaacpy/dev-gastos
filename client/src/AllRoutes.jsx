// Importa elementos do react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Importa o layout padrão com header e footer
import MainLayout from "./Components/MainLayout";
// Importa as páginas
import Painel from "./Pages/Painel";
import CadastrarGasto from "./Pages/Gastos/CadastrarGasto";
import ListarGastos from "./Pages/Gastos/ListarGastos";
import Dashboard from "./Pages/Dashboard";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      {/* Conjunto de rotas */}
      <Routes>
        {/* Rota inicial sem layout */}
        <Route path="/" element={<Painel />} />
        {/* Rota com o layout */}
        <Route element={<MainLayout />}>
          {/* Rota de cadastro */}
          <Route path="/novoGasto" element={<CadastrarGasto />} />
          {/* Rota para listar gastos */}
          <Route path="/gastos" element={<ListarGastos />} />
          {/* Rota para dash */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
        {/* Rota de login */}
        {/* <Route></Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
