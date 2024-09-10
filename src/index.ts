import 'reflect-metadata';
import express from 'express';
import AppDataSource from './data-source';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log('Conectado com o banco de dados!');
    app.listen(3000, () => console.log('Servidor iniciado na porta 3000'));
  })
  .catch((error) => {
    console.error('Falha na conexão com o banco de dados', error); 
  });
