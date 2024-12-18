// Rota de usuários para autenticação
const clienteRoutes = require('./src/routes/clienteRoutes');
const lavagemRoutes = require('./src/routes/lavagemRoutes');
const usuarioRoutes = require('./src/routes/usuarioRoutes');
const serviceRoutes = require('./src/routes/serviceRoutes');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors(
  {
    origin: "*"
  }
));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Conexão com o MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.log('Erro ao conectar ao MongoDB:', err));

// Definindo as rotas
app.use('/api/clientes', clienteRoutes);
app.use('/api/lavagens', lavagemRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/servicos', serviceRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
