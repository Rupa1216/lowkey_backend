DROP DATABASE IF EXISTS lowkey;
CREATE DATABASE lowkey;

\c lowkey;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    fbase_uid VARCHAR UNIQUE NOT NULL,
    is_private BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    display_name VARCHAR(20),
    bio VARCHAR(100),
    avatar_url VARCHAR,
    wallpaper_url VARCHAR,
    banner_url VARCHAR
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    content VARCHAR NOT NULL,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE attachments (
    id SERIAL PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    urls VARCHAR,
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

CREATE UNIQUE INDEX connection ON connections (follower_id, following_id);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)
        REFERENCES users(id) 
        ON DELETE CASCADE,
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);

CREATE UNIQUE INDEX a_like ON likes (user_id, post_id);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    post_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
        FOREIGN KEY (post_id)
        REFERENCES posts(id)
        ON DELETE CASCADE
);

INSERT INTO users (username, email, fbase_uid, is_private) VALUES
('John123', 'john@email.com', 'xyc', 'true'), 
('Michelle123', 'michelle@email.com', 'yyx', 'false');

INSERT INTO posts (user_id, content) VALUES
('2', 'hello world'), 
('1', 'skghskfhskh'), 
('1', 'asksdgff');

INSERT INTO attachments (post_id, user_id, urls) VALUES
('1', '2', 'www.google.com'),
('3', '1', 'www.google.com');

INSERT INTO connections (follower_id, following_id, status) VALUES
('2', '1', 'pending'), 
('1', '2', 'active');

INSERT INTO likes (user_id, post_id) VALUES
('1', '2');

INSERT INTO comments (user_id, post_id) VALUES
('2', '1');


