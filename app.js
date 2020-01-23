const express = require('express');
const morgan = require('morgan'); //logging tool

const app = express();

// This is middleware that requests pass through
// on their way to the final handler
app.use(morgan('dev'));

//This is the final request handler
//app.get(PATH, HANDLER);
//HANDLER = (requestObject, responseObject)

app.get('/sum', (req, res) => {
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    const c = a + b;

    if(!a) {
        return res.status(400).send('Please give a number for a.');
      }
    
    if(!b) {
    return res.status(400).send('Please give a number for b.');
    }

    const sumString = `The sum of ${a} and ${b} is ${c}.`;
    res.send(sumString);

});

app.get('/cipher', (req, res) => {
    const text = req.query.text; // Hi
    const shift = parseInt(req.query.shift); //6

    if(!text) {
        return res.status(400).send('Please enter some text for text.');
      }
    
      if(!shift) {
        return res.status(400).send('Please give a number for shift.');
      }

    let splitText = text.toUpperCase().split('');
    // console.log(splitText); //['H', 'I']
    let getCharaCode = splitText.map( letter => letter.charCodeAt() );
    // console.log(getCharaCode); //[72, 73]
    let shiftChara = getCharaCode.map( chara => parseInt(chara) + shift);
    // console.log(shiftChara); //[78, 79] add 6
    let encrytedText = String.fromCharCode(...shiftChara);
    // console.log(encrytedText); //NO
    res.send(encrytedText);
});

app.get('/lotto', (req, res) => {
    let numbers = req.query.arr;
    let lottoNumbers = [];

    let newNumbers = numbers.map( num => parseInt(num));

    if(!numbers) {
        return res.status(400).send("Please return 6 numbers between 1-20.");
    };

    if(newNumbers.length != 6) {
        return res.status(400).send('Please only enter 6 numbers.');
    };

    for(let i = 0; i < newNumbers.length; i++) {
        if(newNumbers[i] > 20) {
            return res.status(400).send('Please enter numbers between 1 and 20.');
        }
        newNumbers;
    };

    for(let i = 0; i < 6; i++) {
        let randomNums = Math.floor(Math.random() * 20);
        lottoNumbers.push(randomNums);
    };
    
    let result = newNumbers.filter( num => lottoNumbers.includes(num));
    console.log(result);
    console.log(lottoNumbers);

    if(result.length < 4) {
        return res.send(`
            Sorry, you lose. 
            Your numbers: ${newNumbers}.
            Lotto numbers: ${lottoNumbers}
        `)
    } else if(result.length == 4) {
        return res.send(`
            Congratulations, you win a free ticket. 
            Your numbers: ${newNumbers}.
            Lotto numbers: ${lottoNumbers}
        `)
    } else if(result.length == 5) {
        return res.send(`
            Congratulations! You win $100!. 
            Your numbers: ${newNumbers}.
            Lotto numbers: ${lottoNumbers}
        `)
    } else if(result.length == 6) {
        return res.send(`
            Wow! Unbelievable! You could have won the mega millions!!. 
            Your numbers: ${newNumbers}.
            Lotto numbers: ${lottoNumbers}
        `)
    };
});

app.get('/', (req, res) => {
    res.send('Hello Express Pizza!');
});

app.get('/burgers', (req, res) => {
    res.send('We have juicy cheezy veggie burgers!');
});

app.get('/pizza/pepperoni', (req, res) => {
    res.send('Your pizza is on the way!');
});

app.get('/pizza/pineapple', (req, res) => {
    res.send("We don't serve that here. Never call again! BYE!");
});

app.get('/echo', (req, res) => {
    const responseText = `Here are some details of your request: 
        Base URL: ${req.baseUrl}
        Host: ${req.hostname}
        Path: ${req.path}
    `;
    res.send(responseText);
});

app.get('/ip', (req, res) => {
    const responseText = `Here are some details of your request: 
        IP: ${req.ip}
    `;
    res.send(responseText);
});

///queryViewer?name=Legolas&race=elf
app.get('/queryViewer', (req, res) => {
    console.log(req.query); //{ name: 'Legolas', race: 'elf' }
    res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
    const name = req.query.name;
    const race = req.query.race;

    if(!name) {
        return res.status(400).send('Please provide a name.');
    };

    if(!race) {
        return res.status(400).send('Please provide a race.');
    };

    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

    res.send(greeting);
})

app.listen(8000, () => {
    console.log('Express server is listening on port 8000!');
});