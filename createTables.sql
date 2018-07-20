DROP TABLE users;
DROP TABLE categories;
DROP TABLE cuisine;
DROP TABLE recipes;

CREATE TABLE IF NOT EXISTS users (
	user_id serial PRIMARY KEY,
	first_name VARCHAR(50) NOT NULL,
	last_name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL UNIQUE,
	password VARCHAR(255) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
	id serial PRIMARY KEY,
	label VARCHAR(40)
);

CREATE TABLE IF NOT EXISTS cuisine (
	id serial PRIMARY KEY,
	label VARCHAR(25)
);

CREATE TABLE IF NOT EXISTS recipes (
	recipe_id serial PRIMARY KEY,
	image_url VARCHAR(255),
	recipe_category_id INTEGER REFERENCES categories(id),
	recipe_cuisine_id INTEGER REFERENCES cuisine(id),
	title VARCHAR(50) NOT NULL,
	recipe_description VARCHAR(255),
	recipe_ingredients TEXT,
	recipe_instructions TEXT,
	recipe_yield VARCHAR(50),
	source_url VARCHAR(255),
	publisher VARCHAR(50),
	user_id  INTEGER REFERENCES users(user_id),
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
