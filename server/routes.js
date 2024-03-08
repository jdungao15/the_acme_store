const express = require('express');
const router = express.Router();
const {client, createTables, fetchUsers, createProduct, createUser, createFavorite, fetchProducts} = require('./db');

router.get('/users', async (req, res, next) => {
    try {
        res.send(await fetchUsers());
    } catch (error) {
        next(error);
    }
});



module.exports = router;