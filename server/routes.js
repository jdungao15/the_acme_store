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

router.post('/api/users/:id/favorites', async (req, res, next) => {
    try {
        res.send(await createFavorite({id, product_id}));
        res.sendStatus(201);
    } catch (error) {
        next(error);
    }
});

router.delete('/api/users/:user_id/favorites/:id', async (req, res, next) => {
    try {
        await destroyFavorite(req.params);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
});


module.exports = router;