const app = require('./app2');
const PORT = 4000;
 
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
}); 