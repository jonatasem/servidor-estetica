const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registro de usuário
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se os campos estão preenchidos
  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    // Verifica se o usuário já existe
    const existingUser = await Usuario.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe.' });
    }

    // Gera o salt e cria um novo usuário
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const usuario = new Usuario({ username, password: hashedPassword });

    // Salva o usuário no banco de dados
    const savedUsuario = await usuario.save();
    res.status(201).json({ message: 'Usuário registrado com sucesso!', usuario: savedUsuario });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Verifica se os campos estão preenchidos
  if (!username || !password) {
    return res.status(400).json({ message: 'Nome de usuário e senha são obrigatórios.' });
  }

  try {
    // Verifica se o usuário existe
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(400).json({ message: 'Usuário não encontrado.' });
    }

    // Verifica se a senha está correta
    const isMatch = bcrypt.compareSync(password, usuario.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta.' });
    }

    // Gera o token JWT
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login.' });
  }
});

module.exports = router;