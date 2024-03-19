const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_talent_agency_db');

const createTables = async() => {
    const SQL = `
      DROP TABLE IF EXISTS product;
      DROP TABLE IF EXISTS users;
      DROP TABLE IF EXISTS favorite;
      CREATE TABLE users(
        id UUID PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255)
      );
      CREATE TABLE product(
        id UUID PRIMARY KEY,
        name VARCHAR(100) UNIQUE NOT NULL
      );
      CREATE TABLE favorite(
        id UUID PRIMARY KEY,
        product_id UUID REFERENCES product(id) NOT NULL,
        user_id UUID REFERENCES users(id) NOT NULL,
        CONSTRAINT unique_product_user UNIQUE (product_id, user_id)
      );
    `;
    await client.query(SQL);
  };

  const createUsers = async({ username, password }) => {
    const SQL = `
    INSERT INTO users(id, username, password) VALUES($1, $2, $3) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), username, password]);
  return response.rows[0];
  }

  const createProduct = async({ name }) => {
    const SQL = `
    INSERT INTO product(id, name) VALUES($1, $2) RETURNING *
  `;
  const response = await client.query(SQL, [uuid.v4(), name]);
  return response.rows[0];
  }

module.exports = {
    client,
    createTables,
    createUsers,
    createProduct
  };
  