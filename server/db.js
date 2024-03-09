require('dotenv').config();
const uuid = require('uuid');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL) || 'postgres://localhost/the_acme_shop';



const createTables = async () => {
    try {
        await client.query(`
        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS users;

        CREATE TABLE users (
            id UUID PRIMARY KEY,
            username VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(100) UNIQUE NOT NULL
        );
        
        CREATE TABLE products (
            id UUID PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price INTEGER NOT NULL
        );

        CREATE TABLE favorites (
            id UUID PRIMARY KEY,
            user_id UUID REFERENCES users(id),
            product_id UUID REFERENCES products(id),
            CONSTRAINT unique_favorite UNIQUE(user_id, product_id)
        );

        `);
    } catch (error) {
        console.error(error);
    }
}

// CREATE 
const createProduct = async ({ name, price }) => {
    const SQL = 'INSERT INTO products(id, name, price) VALUES($1, $2, $3) RETURNING *';
    const response = await client.query(SQL, [uuid.v4(), name, price]);
    return response.rows[0];
};

const createUser = async({username, password}) => {
    const SQL = 'INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *';
    const response = await client.query(SQL, [uuid.v4(), username, password]);
    return response.rows[0];
}

const createFavorite = async({id, product_id}) => {
    const SQL = 'INSERT INTO favorites(id, user_id, product_id) VALUES($1, $2, $3) RETURNING *';
    const response = await client.query(SQL, [uuid.v4(), id, product_id]);
    return response.rows[0];
}

// READ
const fetchUsers = async () => {
    const response = await client.query('SELECT * FROM users');
    return response.rows;
}

const fetchProducts = async () => {
    const response = await client.query('SELECT * FROM products');
    return response.rows;
}

const fetchFavorites = async (user_id) => {
    const SQL = `SELECT * FROM favorites WHERE user_id=$1`;
    const response = await client.query(SQL, [user_id]);
    return response.rows;
}

// DELETE
const destroyFavorite = async ({user_id, id}) => {
    const SQL = 'DELETE FROM favorites WHERE user_id=$1 AND id=$2';
    const response = await client.query(SQL, [user_id, id]);
    return response.rows;
}




module.exports = {client, createTables, fetchUsers, createProduct, createUser, createFavorite, fetchProducts, fetchFavorites}