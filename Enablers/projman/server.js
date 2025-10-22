const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const filePath = path.resolve(__dirname, '/Users/n091733/Projects/bb-prescription/Enablers/Enabler_Overview.txt');

app.get('/', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading the file');
        } else {
            res.send(`
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>File Editor</title>
                </head>
                <body>
                    <h1>Edit File</h1>
                    <form action="/save" method="POST">
                        <textarea name="content" rows="20" cols="80">${data}</textarea><br>
                        <button type="submit">Save</button>
                    </form>
                </body>
                </html>
            `);
        }
    });
});

app.post('/save', (req, res) => {
    const content = req.body.content;
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            res.status(500).send('Error saving the file');
        } else {
            res.send('File saved successfully!');
        }
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
