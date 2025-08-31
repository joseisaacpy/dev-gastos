// Importa elementos do react-router
import { BrowserRouter, Routes, Route } from "react-router-dom";

const AllRoutes = () => {
  return (
    <BrowserRouter>
      {/* Conjunto de rotas */}
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="text-4xl">test</h1>
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AllRoutes;
