const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const path = require('path');

const app = express();

// // mongoose.Promise = global.Promise;
// // mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/node-react-starter`);

app.use(bodyParser.json());

// // Each node file/script is a process, process has all info about a node app.
// // if(process.env.NODE_ENV === 'production'){
// //     app.use(express.)
// // }
app.get('*', (req, res) => {
    res.json({
        name: 'node app'
    });
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
});



// `javascript
// const express = require('express')
// const app = express()

// app.get('/', ( req, res ) => {
// res.sendFile(path.resolve(__dirname, 'index.html'));
// })

// app.get('/about', (req, res) => {
// res.sendFile(path.resolve(__dirname, 'about.html'));
// })

// app.listen(5000, () => {
// console.log('Listening on port 5000!')
// })
// `