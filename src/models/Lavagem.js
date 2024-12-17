const mongoose = require('mongoose');

const LavagemSchema = new mongoose.Schema({
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' },
  placa: { type: String, required: true },
  modelo: { type: String, required: true },
  tipoLavagem: { type: String, required: true },
  status: { type: String, enum: ['em andamento', 'concluído'], default: 'em andamento' },
});

module.exports = mongoose.model('Lavagem', LavagemSchema);