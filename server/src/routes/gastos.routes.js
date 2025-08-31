// Importa o Router do Express
import { Router } from "express";

// Cria uma instância do Router
const router = Router();

// Rotas
router.get("/", (req, res) => {
  res.json({ message: "Rotas de gastos!" });
});

// Exporta o Router para ser usado em outros arquivos da aplicação
export default router;
