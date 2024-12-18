const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Criar serviço
router.post('/', async (req, res) => {
  const service = new Service(req.body);
  try {
    const savedService = await service.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Listar serviços
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;