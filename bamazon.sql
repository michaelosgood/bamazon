-- Drops database if it exists
DROP DATABASE IF EXISTS bamazaon_db;

-- Creates database
CREATE DATABASE bamazon_db;

-- Makes it so that the following code will affect bamazon_db
USE bamazon_db;

-- Creates a products table in bamazaon_db with:
-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)
CREATE TABLE products (
    item_id INTEGER NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INTEGER DEFAULT 0,
    stock_quantity INTEGER DEFAULT 0,
    PRIMARY KEY (item_id)
);

-- Inserts mock data into products table
INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
('Fidget Spinner', 'Toys', 4.99, 45),
('MacBook', 'Electronics', 1623.49, 23),
('PlayStation', 'Electronics', 299.99, 10),
('Electric Fan', 'Appliances', 24.99, 43),
('Hot Wheels Car', 'Toys', 2.49, 500),
('Bicycle', 'Sporting Goods', 494.79, 34),
('Skateboard', 'Sporting Goods', 145.99, 12),
('Basketball', 'Sporting Goods', 64.99, 55),
('iPhone', 'Electronics', 600.00, 159),
('Hover Board', 'Toys', 444.59, 452);

