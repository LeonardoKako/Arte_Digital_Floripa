import express from 'express';

const app = express();
const port = 3000;
app.use(express.json());

app.get("/teste", (req, res) => {
    return res.send("Teste");
});

app.listen(port);