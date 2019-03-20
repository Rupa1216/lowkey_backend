DROP DATABASE IF EXISTS lowkey;
CREATE DATABASE lowkey;

\c lowkey;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    password VARCHAR NOT NULL,
    token VARCHAR, 
    acct_type VARCHAR NOT NULL,
    created TIMESTAMPTZ
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author INT REFERENCES users(id) NOT NULL,
    created TIMESTAMPTZ,
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
    time TIMESTAMPTZ
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    author_id INT REFERENCES users(id) NOT NULL,
    post_id INT REFERENCES posts(id) NOT NULL,
    time TIMESTAMPTZ
);

INSERT INTO users (id, username, email, password, token, acct_type, created) VALUES
('1', 'John123', 'john@email.com', '123', 'xyz', 'private', 'today'), ('2', 'Michelle123', 'michelle@email.com', '123', 'xyz', 'public', 'yesterday');

INSERT INTO posts (id, author, created, attachments, content) VALUES
('01', '2', 'today', 'none', 'hello world'), ('002', '1', 'today', 'photo', 'skghskfhskh'), ('003', '1', 'yesterday', 'video', 'asksdgff');

INSERT INTO connections (id, follower_user_id, following_user_id, status) VALUES
('001', '2', '1', 'pending'), ('002', '1', '2', 'active');

INSERT INTO likes (id, user_id, post_id, time) VALUES
('0001', '1', '002', 'today');

INSERT INTO comments (id, author_id, post_id, time) VALUES
('00001', '2', '01', 'today');


