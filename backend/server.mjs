import dotenv from 'dotenv';

dotenv.config();
import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// API routes
app.get('/api/flashcards', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM flashcards');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/flashcards', async (req, res) => {
    const { question, answer } = req.body;
    try {
        const [result] = await pool.query(
            'INSERT INTO flashcards (question, answer) VALUES (?, ?)',
            [question, answer]
        );
        res.status(201).json({ id: result.insertId, question, answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.put('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;
    try {
        await pool.query(
            'UPDATE flashcards SET question = ?, answer = ? WHERE id = ?',
            [question, answer, id]
        );
        res.json({ id, question, answer });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.delete('/api/flashcards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM flashcards WHERE id = ?', [id]);
        res.json({ message: 'Flashcard deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});