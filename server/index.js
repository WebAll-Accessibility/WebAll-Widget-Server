const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, './static')));

// app.get('/:lang/:file', (req, res) => {
//     console.log(req.params);
    
// });

app.listen(8081, () => {
});

