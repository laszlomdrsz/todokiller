const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();


const index = path.join(__dirname, 'dist', 'index.html');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('**', (req, res, next) => {
        res.sendFile(index);
});




//Set Port
const port = process.env.PORT || '52000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));