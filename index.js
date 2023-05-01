import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import bodyParser from "body-parser";
import product from './api/product.js'
import axios from "axios";

const app = express()
const port = 3001
const token = '1ea755ea1ea755ea1ea755ea4d1db49e8511ea71ea755ea7aecc9153d03fedd15bd59a8'
const version = 5.131

const TOKEN = '5993869459:AAGp-JUqJ8CwF9LQSiFskdq9AWV5y2rGa1E'
const chat_id = '-1001935542586'
const uri_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`


const urlencodedPareser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:3000', 'https://api.vk.com/', 'https://back-tvk.vercel.app/', 'http://localhost:3001']
}))
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use("/api/product.js", product)
app.get('/albom', async (req, res) => {
    try {
        let response = await fetch(`https://api.vk.com/method/photos.get?album_id=${req.query.album_id}&access_token=${token}&v=${version}&owner_id=-106770370`);
        response = await response.json();
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: ` Server Error.`});
    }
})


app.post('/bot', urlencodedPareser, (req, res) => {
    try {
        let message = `<b>Заявка с сайта ТВК</b>\n>`
        message += `<b>Имя того, кто отправил: </b> ${req.body.name}\n>`
        message += `<b>Email: </b> ${req.body.value}\n>`
        message += `<b>Процедура: </b> ${req.body.selectOption}`
        axios.post(uri_api, {
            chat_id: chat_id,
            parse_mode: 'html',
            text: message
        })
        res.json({
            msg:'Отправка успешно'
        })
    }catch (e) {
        console.log(e)
        res.status(500).json({msg:'Bot Error'})
    }
})


app.listen(port, (err) => {
    if(err){
        return console.log(err)
    }
    console.log('server OK')
})

