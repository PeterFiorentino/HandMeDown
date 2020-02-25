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
    category VARCHAR NOT NULL,
    caption VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    QR_id INT REFERENCES QR(id),
    prime_location VARCHAR NOT NULL
);

CREATE TABLE history (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users (id),
    garment_id INT REFERENCES garments (id),
    location VARCHAR NOT NULL,
    time_created TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR NOT NULL,
    img_url VARCHAR NOT NULL,
    isPublic BOOLEAN
);

-- INSERT INTO users(username, email, password, avatar_url, isPublic) 
--         VALUES('johnnyBravo', 'jbravo@cnetwork.com', '0123', 'http://localhost:3100/public/avatar_url/johnnyBravo.jpeg', 'true'),
--               ('bananaoutfit', 'bananaoutfit@random.com', '1234', 'http://localhost:3100/public/avatar_url/bananaoutfit.jpeg', 'true'),
--               ('simbawindsor', 'simbawindsor@random.com', '2345', 'http://localhost:3100/public/avatar_url/simbawindsor.jpeg', 'true'),
--               ('avengergating', 'avengergating@random.com', '3456', 'http:localhost:3100/public/avatar_url/avengergating.jpeg', 'true');


-- INSERT INTO garments(user_id, garment_name, category, caption, img_url, prime_location)
--         VALUES(4, 'luckyblueshirt','shirt', 'My favorite shirt', 'http://localhost:3100/public/image_url/luckBlueShirt.jpeg', 'New York, NY'),
--               (2, 'favedress', 'dress', 'I love this dress', 'http://localhost:3100/public/image_url/favedress.jpeg', 'Denver, CO'),
--               (1, 'gojeans', 'jeans', 'good jeans', 'http://localhost:3100/public/image_url/jeans.jpeg', 'San Francisco, CA'),
--               (3, 'leatherjacket', 'jacket', 'Best jacket', 'http://localhost:3100/public/image_url/jacket.jpeg', 'Chicago, IL');


-- INSERT INTO history (user_id, garment_id, location, time_created, body, img_url, isPublic) 
--         VALUES(1, 3, 'Barcelona, Spain', '2019-10-23, 10:15:30', 'I wore these jeans when I went to visit barcelona', 'http://localhost:3100/public/image_url/jeans.jpeg', 'true'),
--                (2, 2, 'Istanbul, Turkey', '2019-07-30, 02:30:00', 'Summer in Istanbul', 'http://localhost:3100/public/image_url/favedress.jpeg', 'true'),
--                (3, 4, 'St. Tropez, France', '2019-09-10, 05:10:40', 'Perfect jacket for a beautiful place', 'http://localhost:3100/public/image_url/jacket.jpeg', 'true'),
--                (4, 1, 'Cape Town, South Africa', '2020-02-23, 12:11:59', 'Great time with a good shirt', 'http://localhost:3100/public/image_url/luckBlueShirt.jpeg', 'true');


