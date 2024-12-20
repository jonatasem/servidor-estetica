const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  telefone: { type: String, required: true },
  endereco: {
    rua: { type: String, required: true },
    numero: { type: String, required: true },
    cidade: { type: String, required: true }
  }
});

module.exports = mongoose.model('Cliente', ClienteSchema);