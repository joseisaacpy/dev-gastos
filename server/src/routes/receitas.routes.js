// Importa o Router do Express
import e, { Router } from "express";
// Importa o prisma
import prisma from "../../prisma/prisma.js";

// Cria uma instância do Router
const router = Router();

// Rotas
// POST
router.post("/", async (req, res) => {
  try {
    const { nome, descricao, valor, categoria } = req.body;

    if (!nome || !valor || !categoria) {
      return res.status(400).json({
        msg: "Nome, Valor e Categoria são obrigatórios para cadastrar uma receita.",
      });
    }
    const novaReceita = await prisma.receita.create({
      data: { nome, descricao, valor, categoria },
    });
    // Retorna msg de criação
    return res
      .status(201)
      .json({ msg: "Receita criada com sucesso.", receita: novaReceita });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao cadastrar uma receita" });
  }
});
// GET
router.get("/", async (req, res) => {
  try {
    const receitas = await prisma.receita.findMany();
    return res.status(200).json(receitas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao buscar receitas" });
  }
});

export default router;
