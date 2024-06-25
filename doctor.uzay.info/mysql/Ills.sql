CREATE TABLE Ills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    medicine VARCHAR(30),
    name VARCHAR(30),
    surname VARCHAR(30),
    age DOUBLE,
    weight DOUBLE,
    dose DOUBLE,
    daily_amount VARCHAR(4),
    discomfort VARCHAR(100),
    guidance VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
