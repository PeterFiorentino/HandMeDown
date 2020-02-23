DROP DATABASE if exists handmedown;
CREATE DATABASE handmedown;

\c handmedown;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    avatar_url VARCHAR,
    isPublic BOOLEAN
);

CREATE TABLE QR (
    id SERIAL PRIMARY KEY,
    img_url VARCHAR NOT NULL
);

CREATE TABLE garments (
    id SERIAL PRIMARY KEY, 
    user_id INT REFERENCES users (id),
    description VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    rating INT,
    QR_id INT,
    prime_location VARCHAR NOT NULL
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    garment_id INT REFERENCES garments (id),
    location VARCHAR NOT NULL,
    timeline TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    isPublic BOOLEAN
);

INSERT INTO users(username, email, password, )




