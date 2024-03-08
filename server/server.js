require('dotenv').config();
const express = require('express');
const app = express();
const {client, createTables,createProduct,fetchUsers,createUser,createFavorite} = require('./db');





(async () => {
    // Connect the client to the database
    await client.connect();

    // Create the tables
    await createTables();

    //seed the database
    const users = [
        { username: 'moe', password: 'MOE' },
        { username: 'larry', password: 'LARRY' },
        { username: 'curly', password: 'CURLY' }
    ];

    const products = [
        { name: 'Candy', price: 2 },
        { name: 'Soda', price: 3 },
        { name: 'Ice cream', price: 4 }
    ];

    const [moe, larry, curly] = await Promise.all(users.map(createUser));
    const [candy, soda, iceCream] = await Promise.all(products.map(createProduct));
    
    console.log({moe, larry, curly, candy, soda, iceCream});

    app.listen(3000, () => {
        console.log(`The server is up on ${process.env.PORT || 4000}`);
    }
    );
})();

