// Importa o Router do Express
import { Router } from "express";
// Importa o prisma
import prisma from "../../prisma/prisma.js";

// Cria uma instância do Router
const router = Router();

// Rotas
// POST de um gasto
router.post("/", async (req, res) => {
  try {
    // Gasto vem do body da req
    const { nome, descricao, preco, categoriaId } = req.body;
    // Validação de dados obrigatórios
    if (!nome || !preco || !categoriaId) {
      return res.status(400).json({
        msg: "Nome, Preço e Categoria são obrigatórios para cadastrar um gasto.",
      });
    }
    // Cria o novo gasto com os dados
    const novoGasto = await prisma.gasto.create({
      data: {
        nome,
        descricao,
        preco,

        categoriaId,
      },
      include: {
        categoria: true,
      },
    });
    // Retorna msg de criação
    return res
      .status(201)
      .json({ msg: "Gasto criado com sucesso.", gasto: novoGasto });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao cadastrar gasto." });
  }
});

// GET todos os gastos
router.get("/", async (req, res) => {
  try {
    const gastos = await prisma.gasto.findMany({
      include: {
        categoria: true,
      },
    });
    return res.status(200).json(gastos);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erro ao buscar gastos." });
  }
});

// UPDATE

// DELETE
router.delete("/:id", async (req, res) => {
  // Pega o ID nos parâmetros
  const { id } = req.params;
  try {
    // Se não tiver id, lança uma mensagem
    if (!id) {
      return res.status(400).json({ msg: "ID é obrigatório" });
    }
    // Deleta o gasto pelo id
    await prisma.gasto.delete({
      where: { id: id },
    });
    return res.json({ msg: "Gasto deletado com sucesso" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Erro ao deletar gasto" });
  }
});

// Exporta o Router para ser usado em outros arquivos da aplicação
export default router;
