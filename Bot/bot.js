
import axios from "axios";

const TOKEN = '5993869459:AAGp-JUqJ8CwF9LQSiFskdq9AWV5y2rGa1E'
const chat_id = '-1001935542586'
const uri_api = `https://api.telegram.org/bot${TOKEN}/sendMessage`


export const sendBot = (name, value, selectedOption) => {
    let message = `<b>Заявка с сайта ТВК</b>\n>`
    message += `<b>Имя того, кто отправил: </b> ${name}\n>`
    message += `<b>Email: </b> ${value}\n>`
    message += `<b>Процедура: </b> ${selectedOption}`
    axios.post(uri_api, {
        chat_id: chat_id,
        parse_mode: 'html',
        text: message
    })
}


