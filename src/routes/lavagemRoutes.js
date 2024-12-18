const express = require('express');
const router = express.Router();
const Lavagem = require('../models/Lavagem');

// Criar lavagem
router.post('/', async (req, res) => {
  const lavagem = new Lavagem(req.body);
  try {
    const savedLavagem = await lavagem.save();
    res.status(201).json(savedLavagem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar lavagens
router.get('/', async (req, res) => {
  try {
    const lavagens = await Lavagem.find().populate('clienteId');
    res.json(lavagens);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Editar lavagem
router.put('/:id', async (req, res) => {
  const { status } = req.body; // Extraindo apenas o status do corpo da requisição
  
  if (!status) {
    return res.status(400).json({ message: 'Status é obrigatório.' });
  }

  try {
    const lavagem = await Lavagem.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lavagem) {
      return res.status(404).json({ message: 'Lavagem não encontrada.' });
    }
    res.json(lavagem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Excluir lavagem
router.delete('/:id', async (req, res) => {
  try {
    const deletedLavagem = await Lavagem.findByIdAndDelete(req.params.id);
    if (!deletedLavagem) {
      return res.status(404).json({ message: 'Lavagem não encontrada.' });
    }
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;