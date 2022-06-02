require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser')
const middleware = require('./utils/middleware')
const PORT = process.env.PORT

app.use(cors());
//Second idea for solving CORS
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', '*');
// 	res.setHeader('Access-Control-Allow-Headers', '*');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
//   next();
// });

app.use(bodyParser.json())
app.use(middleware.requestLogger)

// app.get("/", (req, res) => {
//   res.render('index'); // render frontpage
// });

app.get('/api/test', (req, res) => {res.send('Success')})

app.post('/api/bins', require('./routes/create_bin'))
app.get('/api/bins/:path', require('./routes/get_bins'))
app.all('/api/bins/:path', require('./routes/all_bins'))

app.listen(PORT, () => console.log(`Running on port ${PORT}`))
