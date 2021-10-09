const express = require('express');
const http = require('http');
const cors = require('cors');

// подключение модуля практика 2
const Sequelize = require("sequelize");

const app = express();

app.use(cors());
app.use(express.urlencoded({express: true}));
app.use(express.json());

app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.originalUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('IsSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    next();
})

http.createServer(app).listen(3000, () =>{
    console.log('Server is working on port 3000');
})

// практика 1
app.get('/test', (req, res) => {
    res.status(200).json({ message: 'GET'});
})

app.post('/test', (req, res) => {
    res.status(200).json({ message: 'POST'});
})

app.put('/test', (req, res) => {
    res.status(200).json({ message: 'PUT'});
})

app.patch('/test', (req, res) => {
    res.status(200).json({ message: 'PATCH'});
})

app.delete('/test', (req, res) => {
    res.status(200).json({ message: 'DELETE'});
})

// дз практика 1
function Sum(num1, num2){
    this.x=num1;
	this.y=num2;
	this.sum=sum(this.x, this.y);
}
function sum(a, b){
    return a + b;
}

app.get('/sum', (req, res) => {
    let sum_numbers = new Sum(req.body.a, req.body.b);
    res.status(200).json({ message: sum_numbers.sum});
})

function ReverseCase(word){
    this.wrd = word;
    this.reverseCase = reverseCase(this.wrd);
}
function reverseCase(string){
    for (i=0; i< string.length; i++){        
        string = string.replace(string[i], string[i] == string[i].toUpperCase() ? string[i].toLowerCase() : string[i].toUpperCase());
    }
    return string;
}

app.get('/reverseCase', (req, res) => {
    let word = new ReverseCase(req.body.a);
    res.status(200).json({ message: word.reverseCase});
})

app.get('/reverseArray', (req, res) => {
    let array = req.body.a;
    res.status(200).json({ message: array.reverse()});
})

// if (typeof localStorage === "undefined" || localStorage === null) {
//     var LocalStorage = require('node-localstorage').LocalStorage;
//     localStorage = new LocalStorage('./scratch');
//   }
  
// let strings = ["hello"];

// app.post('/api/strings',(req, res) => {
//     if(req.body.string != null){
//         localStorage.setItem(req.body.string);
//     }
//     res.status(200).json({ message: "add in"});
// });

// app.get('/api/strings', (req, res)=>{
//     res.status(200).json({ string: localStorage});
// });

// app.get('/api/strings/:index', (req, res)=>{
//     if(req.body.index > 0 && req.body.index < strings.length){
//         res.status(200).json(localStorage.getItem(localStorage[req.body.index]));
//     }
// });

// app.delete('/api/strings', (req, res)=>{
//     localStorage.removeItem(req.body.string)
//     res.status(200).json("delete string");
// });

// app.delete('/api/strings/:index', (req, res)=>{
//     if(req.body.index > 0 && req.body.index < strings.length){
//         res.status(200).json(localStorage.removeItem(localStorage[req.body.index]));
//     }
// });



// авторизация в бд практика 2
const sequelize = new Sequelize("TODO_DB", "postgres", "298471", {
  dialect: "postgres"
});

// проверка соединения
sequelize.authenticate()
  .then(() => {
    console.log('Соединение установлено.');
  })
  .catch(err => {
    console.error('Ошибка соединения:', err);
  });


// создание модели таблицы
//   const ToDo = sequelize.define("todo", {  изменить название таблицы
//     id: {
//       type: Sequelize.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false
//     },
//     title: {
//       type: Sequelize.STRING,
//       allowNull: false
//     },
//     description:{
//         type: Sequelize.STRING,
//         allowNull: false
//     }
//   });

//создание записи
//   ToDO.create({
//     title: "",
//     description: ""
//   }).then(res=>{
//     const user = {id: res.id, title: res.title, description: res.description}
//     console.log(user);
//   }).catch(err=>console.log(err));


//синхронизация с бд (sync({force: true}) для изменения силой)
  sequelize.sync().then(result => {
    //console.log(result);
  })
  .catch(err => console.log(err));
  
