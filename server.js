const express = require('express');
const app = express();

app.use(express.static('./dist/apps/demo-app'));

app.get('/transactions.json', (req, res) => 
    res.sendFile('transactions.json', {root: 'dist/apps/demo-app/assets/'})
);

app.get('/*', (req, res) => 
    res.sendFile('index.html', {root: 'dist/apps/demo-app/'})
);
app.listen(process.env.PORT || 8080);