require('dotenv').config();
const express = require('express');
const app = express();
const {client, createTables,createProduct,createUser,fetchUsers} = require('./db');
const router = require('./routes');
PORT = process.env.PORT || 3000;
app.use(express.json());




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
    

    app.use("/api/", router)

    app.listen(PORT, () => {
        console.log(`The server is up on ${PORT}`);
    });

   
})();

