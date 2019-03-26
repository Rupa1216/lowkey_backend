DROP DATABASE IF EXISTS lowkey;
CREATE DATABASE lowkey;

\c lowkey;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    token VARCHAR, 
    is_private BOOLEAN DEFAULT true,
    created_at INT DEFAULT CAST(EXTRACT(epoch FROM NOW()) AS INT) 
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    content VARCHAR NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    image_url VARCHAR,
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    follower_id INT NOT NULL,
    following_id INT NOT NULL,
    status VARCHAR NOT NULL,
        FOREIGN KEY (follower_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY (following_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMPTZ,
        FOREIGN KEY (user_id)
        REFERENCES users(id) 
        ON DELETE CASCADE,
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMPTZ,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);

INSERT INTO users (username, email, token, is_private) VALUES
('John123', 'john@email.com', 'xyz', 'true'), 
('Michelle123', 'michelle@email.com', 'xyz', 'false');

INSERT INTO posts (user_id, created_at, content) VALUES
('2', 'today', 'hello world'), 
('1', 'today', 'skghskfhskh'), 
('1', 'yesterday', 'asksdgff');

INSERT INTO attachments (post_id, user_id, image_url) VALUES
('1', '2', 'www.google.com'),
('3', '1', 'www.google.com');

INSERT INTO connections (follower_id, following_id, status) VALUES
('2', '1', 'pending'), 
('1', '2', 'active');

INSERT INTO likes (user_id, post_id, created_at) VALUES
('1', '002', 'today');

INSERT INTO comments (user_id, post_id, created_at) VALUES
('2', '01', 'today');


