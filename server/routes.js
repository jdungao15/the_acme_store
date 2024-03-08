const express = require('express');
const router = express.Router();
const {client, createTables, fetchUsers, createProduct, createUser, createFavorite, fetchProducts, fetchFavorites} = require('./db');

router.get('/api/users', async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    } catch (error) {
        next(error);
    }
});

router.get('/api/products', async (req, res, next) => {
    try {
        res.send(await fetchProducts());
    } catch (error) {
        next(error);
    }
});

router.get('/api/users/:id/favorites', async (req, res, next) => {
    try {
        res.send(await fetchFavorites(req.params.id));
    } catch (error) {
        next(error);
    }
});

router.post('/api/users/:user_id/favorites', async (req, res, next) => {
    const {user_id} = req.params;
    const {product_id} = req.body;
    console.log({user_id, product_id})
    try {
        res.send(await createFavorite({user_id, product_id}));
    } catch (error) {
        next(error);
    }
});


module.exports = router;