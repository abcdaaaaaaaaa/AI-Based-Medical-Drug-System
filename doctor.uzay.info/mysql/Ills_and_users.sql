CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    name VARCHAR(30),
    surname VARCHAR(30),
    date_of_birth VARCHAR(10),
    password VARCHAR(255),
    information VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;

CREATE TABLE Ills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    medicine VARCHAR(30),
    name VARCHAR(30),
    surname VARCHAR(30),
    age VARCHAR(20),
    weight DOUBLE,
    dose DOUBLE,
    daily_amount VARCHAR(4),
    discomfort VARCHAR(100),
    sub_discomfort VARCHAR(100),
    guidance VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;
