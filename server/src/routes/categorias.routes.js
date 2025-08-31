// Importa o Router do Express
import { Router } from "express";
// Importa o prisma
import prisma from "../../prisma/prisma.js";

// Cria uma instância do Router
const router = Router();

// Rotas
// GET
router.get("/", async (req, res) => {
  try {
    const categorias = await prisma.categoria.findMany();
    // mostra a quantidade e as categorias
    res.status(200).json({
      quantidade: categorias.length,
      categorias,
    });
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);

    res.status(500).json({ msg: "Erro ao buscar categorias." });
  }
});

// Exporta o Router para ser usado em outros arquivos da aplicação
export default router;
