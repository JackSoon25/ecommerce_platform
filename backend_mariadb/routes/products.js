const express = require('express');
const router = express.Router();

const productServices = require('../services/productServices');


router.get('/', async (req, res) =>{
    const products = await productServices.getAllProducts();
    res.json(products)
})

router.get('/latest', async (req, res) =>{
    const products = await productServices.getLatestProducts(5);
    res.json(products);
})

module.exports = router;