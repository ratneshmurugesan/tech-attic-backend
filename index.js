const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');

const app = express();

// mongoose.Promise = global.Promise;
// mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());

// Each node file/script is a process, process has all info about a node app.
// if(process.env.NODE_ENV === 'production'){
//     app.use(express.)
// }
app.get('*', (req, res) => {
    res.json({
        name: 'node app'
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});