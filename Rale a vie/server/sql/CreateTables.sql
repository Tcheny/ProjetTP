CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    user_lastname VARCHAR(60) NOT NULL,
    user_firstname VARCHAR(60) NOT NULL,
    user_email VARCHAR(80) NOT NULL,
    user_password VARCHAR NOT NULL,
    user_pseudo VARCHAR(60) NOT NULL,
    user_type VARCHAR NOT NULL,
    user_infos VARCHAR
)

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    post VARCHAR(500) NOT NULL,
    path_media VARCHAR NOT NULL,
    type_media INTEGER NOT NULL,
    date_creation TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE
)

CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    comment VARCHAR(500) NOT NULL,
    date_creation TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts ON DELETE CASCADE,
)

CREATE TABLE likes (
    like_id SERIAL PRIMARY KEY,
    like_type_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users ON DELETE CASCADE,
    post_id INTEGER NOT NULL REFERENCES posts ON DELETE CASCADE,
)
