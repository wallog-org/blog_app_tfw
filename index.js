const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

const allowedPages = ['about', 'blog'];

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/blog', express.static(path.join(__dirname, 'public')));
app.use('/tag', express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.get('/blog/:name', (req, res) => {
    const blog = req.params.name;


    const blogPath = path.join(__dirname, 'blogs', `${blog}.html`);
    if (fs.existsSync(blogPath)) {
        res.sendFile(blogPath);
    } else {
        res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
    }
});

app.get('/tag/:name', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', `${"blog"}.html`));
});

app.get('/:page', (req, res) => {
    const page = req.params.page;
    if (allowedPages.includes(page)) {
        res.sendFile(path.join(__dirname, 'pages', `${page}.html`));
    } else {
        res.status(404).sendFile(path.join(__dirname, 'pages', '404.html'));
    }
});

// Sunucu başlatma
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});