const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.port || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let resturant = {
    current:[],
    waitList:[]
};


//Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.get('/reserve', (req, res) => {

    res.sendFile(path.join(__dirname, 'reserve.html'))
    res.json(current);
});

app.get('/tables', (req, res) => {
    res.sendFile(path.join(__dirname, 'tables.html'))
    res.json(resturant)
});

app.post('/reserve', (req,res) =>{
    const newReservation = req.body;

    if(resturant.current.length == 5){
        resturant.waitList.push(newReservation);
    }
    else{
        resturant.current.push(newReservation);

    }

    res.json(newReservation);
})

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
