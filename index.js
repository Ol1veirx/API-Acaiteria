const express = require('express')
const uuid = require('uuid')

const app = express()
const PORT = 3000
app.use(express.json())

const orders = []

const checkedId = (req, res, next) => {
    const { id }= req.params
    const index = orders.findIndex(order => order.id === id)

    if(index < 0){
        res.json({error: 'order not found'})
    }

    req.orderId = id
    req.orderIndex = index
    next()
}

app.get('/order', (req, res) => {
    res.json(orders)
    console.log(`Method type: ${req.method} - URL: ${req.url}`)
})

app.post('/order', (req, res) => {
    const { order, nameClient, price } = req.body
    const newOrder = { id: uuid.v4(), order, nameClient, price }

    orders.push(newOrder)

    console.log(`Method type: ${req.method} - URL: ${req.url}`)
    res.status(201).json()
})

app.put('/order/:id', checkedId, (req,res) =>{
    const { order, nameClient, price } = req.body
    const index = req.orderIndex
    const id = req.orderId

    const updateOrder = { id, order, nameClient, price }

    orders[index] = updateOrder

    console.log(`Method type: ${req.method} - URL: ${req.url}`)
    res.json(updateOrder)

})

app.delete('/order/:id',checkedId, (req, res) => {
    const index = req.orderIndex

    orders.splice(index,1)

    console.log(`Method type: ${req.method} - URL: ${req.url}`)
    res.status(204).json()
})



app.listen(PORT, (req, res) => {
    console.log(`Servidor rodando na porta ${PORT}`)
})