const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Hello');
});


const PORT = process.env.PORT || 3000
const server = app.listen(PORT, () => {
    console.log(`App running ${PORT}`);
})