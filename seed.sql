DROP DATABASE IF EXISTS lowkey;
CREATE DATABASE lowkey;

\c lowkey;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    token VARCHAR, 
    acct_type VARCHAR NOT NULL,
    created_at INT DEFAULT CAST(EXTRACT(epoch FROM NOW()) AS INT) 
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    attachments VARCHAR NOT NULL,
    content VARCHAR
);

CREATE TABLE connections (
    id SERIAL PRIMARY KEY,
    follower_user_id INT REFERENCES users(id) NOT NULL,
    following_user_id INT REFERENCES users(id) NOT NULL,
    status VARCHAR NOT NULL
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    post_id INT REFERENCES posts(id) NOT NULL,
    created_at TIMESTAMPTZ
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    post_id INT REFERENCES posts(id) NOT NULL,
    created_at TIMESTAMPTZ
);

INSERT INTO users (username, email, token, acct_type) VALUES
('John123', 'john@email.com', 'xyz', 'private'), 
('Michelle123', 'michelle@email.com', 'xyz', 'public');

INSERT INTO posts (user_id, created_at, attachments, content) VALUES
('2', 'today', 'none', 'hello world'), 
('1', 'today', 'photo', 'skghskfhskh'), 
('1', 'yesterday', 'video', 'asksdgff');

INSERT INTO connections (follower_user_id, following_user_id, status) VALUES
('2', '1', 'pending'), 
('1', '2', 'active');

INSERT INTO likes (user_id, post_id, created_at) VALUES
('1', '002', 'today');

INSERT INTO comments (user_id, post_id, created_at) VALUES
('2', '01', 'today');


