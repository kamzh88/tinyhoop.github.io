DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
    );

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 11", "smartphone",699,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 11 PRO", "smartphone",999,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iphone 11 PRO MAX", "smartphone",1099,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods Pro", "accessories",249,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Airpods", "accessories",199,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Air", "computer",1299,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macbook Pro", "computer",2799,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Pro", "iPad",799,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iWatch", "iPad",699,10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("iPad Air", "iPad",499,10);

SELECT * FROM products;