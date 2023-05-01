import express from "express";
const router = express.Router()

router.get('/', (req, res) => {
    try {
        res.json({
            status: 200,
            message: 'Получить данные '
        })
    }catch (e) {
        console.log(e)
        return res.status(500).send('server error')
    }
})
module.exports = router