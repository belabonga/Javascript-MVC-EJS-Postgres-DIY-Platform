const express = require('express');
const route = require("./routes/route");
const path = require('path');
const app = express()

// SET RENDERING ENGINE FOR VIEWS (EJS)
app.set('views', path.join(__dirname,'/app/views'))
app.set('view engine','ejs');

// SET CSS FILES
app.use('/static', express.static(path.join(__dirname, 'static')))

// FOR req.body
app.use(express.urlencoded({ extended : true }))

app.use('/', route)

// CHECK CONNECTION
app.listen(3000, () => {
    console.log('this app running on port : 3000')
});