CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(30),
    surname VARCHAR(30),
    password VARCHAR(255),
    information VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);