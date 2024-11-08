const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json());

const db = new sqlite3.Database('./itemsdb.sqlite', (err) => {
    if(err) {
        console.err('Deu erro!');
    } else {
        console.log('Deu certo!');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    descricao TEXT,
    dataCriacao TEXT DEFAULT CURRENT_TIMESTAMP)`, (err) => {
        if (err) {
            console.error('Deu erro ao criar a tabela');
        }
});

app.post('/items', (req, res) => {
    const { name, descricao } = req.body;
    const query = 'INSERT INTO items(name, descricao) VALUES (?, ?)';

    db.run(query, [name, descricao], (err) => {
        if (err) {
            res.status(400).json('Erro ao inserir o item');
        } else {
            res.status(201).json({id: this.lastID, name, descricao});
        }
    });
});

app.get('/items', (req, res) => {
    const query = 'SELECT * FROM items';

    db.all(query, (err, rows) => {
        if (err) {
            res.error({MessageEvent: 'Erro ao buscar os itens'});
        } else {
            res.status(200).json({rows});
        }
    });
});

app.listen(port, () => {
    console.log("Servidor rodando na porta http://localhost:${port}");
});

// o desafio de construir as operações GET getById, PUT, *DELETE* e PATCH na rota /items do Express. 

app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM items WHERE id = ?';

    db.get(query, [id], (err, row) => {
        if (err) {
            res.error({MessageEvent: 'Erro ao buscar o item'});
        } else {
            res.status(200).json({row});
        }
    });
});

app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, descricao } = req.body;
    const query = 'UPDATE items SET name = ?, descricao = ? WHERE id = ?';

    db.run(query, [name, descricao, id], (err) => {
        if (err) {
            res.error({MessageEvent: 'Erro ao atualizar o item'});
        } else {
            res.status(200).json({id, name, descricao});
        }
    });
});

app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM items WHERE id = ?';

    db.run(query, [id], (err) => {
        if (err) {
            res.error({MessageEvent: 'Erro ao deletar o item'});
        } else {
            res.status(200).json({id});
        }
    });
});

app.patch('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, descricao } = req.body;
    const query = 'UPDATE items SET name = ?, descricao = ? WHERE id = ?';

    db.run(query, [name, descricao, id], (err) => {
        if (err) {
            res.error({MessageEvent: 'Erro ao atualizar o item'});
        } else {
            res.status(200).json({id, name, descricao});
        }
    });
});

