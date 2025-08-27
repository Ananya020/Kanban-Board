import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

let boardData = null; //in-memory

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/board', (req,res) => {
    res.json(boardData || {message: 'No data yet'});
});

app.post('/board', (req, res)=>{
    boardData = req.body;
    res.json({ status: 'ok'});
});

app.listen(4000, () => console.log('Server running on http://localhost:4000'))