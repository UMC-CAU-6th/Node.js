/*
// const express = require('express')   // common JS
import express from 'express'          // ES6

const app = express()
const port = 3000

app.get('/', function (req, res) {
    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
*/

/*import express from 'express';

const app = express();
const port = 7000;

const myLogger = (req, res, next) => {
    console.log("LOGGED");
    next();
}

app.use(myLogger);

app.get('/', (req, res) => {
    console.log("/");
    res.send('Hello UMC!');
});

app.get('/hello', (req, res) => {
    console.log("/hello");
    res.send('Hello world!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
*/

// index.js

import express from 'express';
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';

const app = express();
const port = 3000;

// router setting
app.use('/temp', tempRouter);

/*app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
### app.listen이 두 번 호출되고 있었으므로 계속 포트가 사용 중이라는 에러가 생성됨.
*/
//
// index.js

// router setting
app.use('/temp', tempRouter);


app.use((err, req, res, next) => {
    // 템플릿 엔진 변수 설정
    res.locals.message = err.message;   
    // 개발환경이면 에러를 출력하고 아니면 출력하지 않기
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
		console.log(`Example app listening on port ${port}`);
});
