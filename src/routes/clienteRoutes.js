const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');

// Criar cliente
router.post('/', async (req, res) => {
  const cliente = new Cliente(req.body);
  try {
    const savedCliente = await cliente.save();
    res.status(201).json(savedCliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Editar cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(cliente);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir cliente
router.delete('/:id', async (req, res) => {
  try {
    await Cliente.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
