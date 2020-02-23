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
    garment_name VARCHAR NOT NULL,
    description VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
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

INSERT INTO users(username, email, password, avatar_url, isPublic) 
        VALUES('johnnyBravo', 'jbravo@cnetwork.com', '0123', 'http://localhost:3100/public/avatar_url/johnnyBravo.jpeg', 'true'),
            ('bananaoutfit', 'bananaoutfit@random.com', '1234', 'http://localhost:3100/public/avatar_url/bananaoutfit.jpeg', 'true'),
            ('simbawindsor', 'simbawindsor@random.com', '2345', 'http://localhost:3100/public/avatar_url/simbawindsor.jpeg', 'true'),
            ('avengergating', 'avengergating@random.com', '3456', 'http:localhost:3100/public/avatar_url/avengergating.jpeg', 'true');



INSERT INTO garments(user_id, garment_name, description, img_url, QR_id, prime_location) 
        VALUES(1, 'White shirt', 'Just a white shirt', 'https://www.elevennewyork.com/wp-content/uploads/2018/02/02_white-tee_back.jpg', 1, 'Cartoon Network');

