-- Menu categories
CREATE TABLE MENU_CATEGORY (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL CHECK (NAME <> '')
);

-- Menu table
CREATE TABLE MENU (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL CHECK (NAME <> ''),
	CATEGORY_ID INTEGER NOT NULL REFERENCES MENU_CATEGORY (ID) ON DELETE CASCADE,
	PRICE NUMERIC(10,2) NOT NULL,
	IMG_PATH TEXT NOT NULL CHECK (IMG_PATH <> '')
);

-- User
CREATE TABLE USERS (
	ID SERIAL PRIMARY KEY,
	FIRST_NAME VARCHAR(50) NOT NULL CHECK (FIRST_NAME <> ''),
	LAST_NAME VARCHAR(50) NOT NULL CHECK (LAST_NAME <> ''),
	EMAIL VARCHAR(100) NOT NULL UNIQUE CHECK (EMAIL <> ''),
	PASSWORD_HASH CHAR(60) NOT NULL CHECK (PASSWORD_HASH <> '')
);

-- order status
CREATE TABLE ORDER_STATUS (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL CHECK (NAME <> '')
);

-- Transaction history
CREATE TABLE TRANSACTION (
	ID SERIAL PRIMARY KEY,
	USER_ID INTEGER NOT NULL REFERENCES USERS (ID) ON DELETE SET NULL,
	STATUS_ID INTEGER REFERENCES ORDER_STATUS (ID) ON DELETE SET NULL DEFAULT 1,
	TOTAL_PRICE NUMERIC(10,2) NOT NULL,
	DATETIME TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Order details
CREATE TABLE ORDER_DETAILS (
	ID SERIAL PRIMARY KEY,
	TRANSACTION_ID INTEGER REFERENCES TRANSACTION (ID) ON DELETE SET NULL,
	ITEM_ID INTEGER REFERENCES MENU (ID) ON DELETE SET NULL,
	QUANTITY INTEGER NOT NULL,
	SUBTOTAL NUMERIC(10,2) NOT NULL
);

-- Promotions
CREATE TABLE PROMOTIONS (
	ID SERIAL PRIMARY KEY,
	NAME VARCHAR(100) NOT NULL CHECK (NAME <> ''),
	DESCRIPTION TEXT NOT NULL CHECK (DESCRIPTION <> ''),
	IMG_PATH TEXT NOT NULL CHECK (IMG_PATH <> '')
);

-- Insert data
INSERT INTO MENU_CATEGORY (NAME) VALUES ('Burgers');
INSERT INTO MENU_CATEGORY (NAME) VALUES ('Sides');
INSERT INTO MENU_CATEGORY (NAME) VALUES ('Drinks');
INSERT INTO MENU_CATEGORY (NAME) VALUES ('Desserts');

INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Cheeseburger', 1, 6.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_02/003.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Shack Stack', 1, 6.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_02/001.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Shack Burger', 1, 6.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_02/006.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('CheeseDog', 1, 5.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_02/009.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Chicken Shack', 1, 7.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_03/001.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Avocado n Bacon', 1, 7.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_03/002.jpg');

INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Fries', 2, 2.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_04/001.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Cheese Fries', 2, 3.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_04/002.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Curry Fries', 2, 4.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_01/006.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Chicken Nuggets', 2, 3.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_03/003.jpg');

INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Lmonade', 3, 2.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/001.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Fifty Fifty', 3, 2.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/002.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Iced Tea', 3, 2.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/003.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Coffee', 3, 3.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/012.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Latte', 3, 3.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/013.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Milk', 3, 2.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/010.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Apple Juice', 3, 2.49, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_05/011.jpg');

INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Vanilla Icecream', 4, 3.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_08/001.jpg');
INSERT INTO MENU (NAME, CATEGORY_ID, PRICE, IMG_PATH) VALUES ('Chocolate Icecream', 4, 3.99, 'https://shakeshack.jp/wp2/wp-content/themes/shake_shack/assets/img/menu/sec_08/002.jpg');


INSERT INTO USERS (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD_HASH) VALUES ('John', 'Doe', 'john@doe.com', '123456');
INSERT INTO USERS (FIRST_NAME, LAST_NAME, EMAIL, PASSWORD_HASH) VALUES ('Jane', 'Doe', 'jane@doe.com', '123456');

INSERT INTO ORDER_STATUS (NAME) VALUES ('Pending');
INSERT INTO ORDER_STATUS (NAME) VALUES ('Completed');

INSERT INTO TRANSACTION (USER_ID, TOTAL_PRICE) VALUES (1, 14.47);
INSERT INTO TRANSACTION (USER_ID, TOTAL_PRICE) VALUES (1, 26.94);
INSERT INTO TRANSACTION (USER_ID, TOTAL_PRICE) VALUES (2, 10.48);

INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (1, 1, 1, 6.99);
INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (1, 8, 1, 3.99);
INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (1, 15, 1, 3.49);

INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (2, 3, 2, 13.98);
INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (2, 10, 2, 7.98);
INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (2, 12, 2, 4.98);

INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (3, 6, 1, 7.99);
INSERT INTO ORDER_DETAILS (TRANSACTION_ID, ITEM_ID, QUANTITY, SUBTOTAL) VALUES (3, 11, 1, 2.49);

INSERT INTO PROMOTIONS (NAME, DESCRIPTION, IMG_PATH) VALUES ('Curry Shack', 'Curry fries and curry burger', 'https://akinori-s.github.io/mobile_order_reactgo/frontend/src/assets/curry_shack.jpg');
INSERT INTO PROMOTIONS (NAME, DESCRIPTION, IMG_PATH) VALUES ('Gochujang Chicken', 'Gochujang chicken burger and fries', 'https://akinori-s.github.io/mobile_order_reactgo/frontend/src/assets/gochujang_chicken.jpg');
INSERT INTO PROMOTIONS (NAME, DESCRIPTION, IMG_PATH) VALUES ('Match Shake', 'Matcha shake and matcha icecream', 'https://akinori-s.github.io/mobile_order_reactgo/frontend/src/assets/matcha_shake.jpg');
