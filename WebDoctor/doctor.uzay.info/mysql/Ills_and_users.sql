CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    date_of_birth VARCHAR(10) NOT NULL,
    password VARCHAR(255) NOT NULL,
    information VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;

CREATE TABLE Ills (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    medicine VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    age VARCHAR(20) NOT NULL,
    weight DOUBLE NOT NULL,
    dose VARCHAR(14) NOT NULL,
    daily_amount VARCHAR(14) NOT NULL,
    discomfort VARCHAR(100) NOT NULL,
    sub_discomfort VARCHAR(100) NOT NULL,
    guidance VARCHAR(200) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;

CREATE TABLE pharmacies (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    pharmacy_name VARCHAR(100) NOT NULL,
    pharmacy_address VARCHAR(255) NOT NULL,
    pharmacy_location VARCHAR(41) NOT NULL,
    confirmation_code VARCHAR(11) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;

CREATE TABLE medicine_results (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    name VARCHAR(30) NOT NULL,
    surname VARCHAR(30) NOT NULL,
    information VARCHAR(255) NOT NULL,
    pharmacy_name VARCHAR(100) NOT NULL,
    conclusion_rationale VARCHAR(123) NOT NULL,
    detail_conclusion_rationale VARCHAR(255),
    result VARCHAR(15) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) CHARACTER SET utf8mb4
COLLATE utf8mb4_turkish_ci;
