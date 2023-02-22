
const express = require('express')
const app = express ()
const PORT = process.env.PORT || 3001;
const apiRoute = require('./routes/api');
const htmlRoute = require('./routes/html');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./develop/public"));


app.use('/api', apiRoute);
app.use('/', htmlRoute);



app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})
