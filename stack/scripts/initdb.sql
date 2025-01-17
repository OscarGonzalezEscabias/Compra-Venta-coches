CREATE DATABASE IF NOT EXISTS `compraventa`;

USE `compraventa`;

DROP TABLE IF EXISTS Cliente;
DROP TABLE IF EXISTS Vehiculo;
DROP TABLE IF EXISTS Venta;
DROP TABLE IF EXISTS Compra;
DROP TABLE IF EXISTS Venta_Vehiculo;
DROP TABLE IF EXISTS Compra_Vehiculo;


-- Tabla Cliente
CREATE TABLE Cliente (
    ID_Cliente INT PRIMARY KEY,
    Nombre VARCHAR(100),
    Telefono VARCHAR(15),
    Direccion VARCHAR(255)
);

-- Tabla Vehiculo
CREATE TABLE Vehiculo (
    ID_Vehiculo INT PRIMARY KEY,
    Marca VARCHAR(50),
    Modelo VARCHAR(50),
    Año INT,
    Precio FLOAT,
    Combustible VARCHAR(20)
);

-- Tabla Venta
CREATE TABLE Venta (
    ID_Venta INT PRIMARY KEY,
    ID_Cliente INT,
    Fecha_Venta DATE,
    Total FLOAT,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

-- Tabla Compra
CREATE TABLE Compra (
    ID_Compra INT PRIMARY KEY,
    ID_Cliente INT,
    Fecha_Compra DATE,
    Precio_Compra FLOAT,
    FOREIGN KEY (ID_Cliente) REFERENCES Cliente(ID_Cliente)
);

-- Tabla para relacionar Venta y Vehiculo 
CREATE TABLE Venta_Vehiculo (
    ID_Venta INT,
    ID_Vehiculo INT,
    PRIMARY KEY (ID_Venta, ID_Vehiculo),
    FOREIGN KEY (ID_Venta) REFERENCES Venta(ID_Venta),
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- Tabla para relacionar Compra y Vehiculo 
CREATE TABLE Compra_Vehiculo (
    ID_Compra INT,
    ID_Vehiculo INT,
    PRIMARY KEY (ID_Compra, ID_Vehiculo),
    FOREIGN KEY (ID_Compra) REFERENCES Compra(ID_Compra),
    FOREIGN KEY (ID_Vehiculo) REFERENCES Vehiculo(ID_Vehiculo)
);

-- para que los acentos salgan bien
SET NAMES utf8mb4;

-- Añade datos a la tabla cliente
INSERT INTO Cliente (ID_Cliente, Nombre, Telefono, Direccion) VALUES
(1, 'Ana', '555-8386', 'Calle 49 #963'),
(2, 'John', '555-9349', 'Calle 31 #503'),
(3, 'Carlos', '555-5291', 'Calle 45 #880'),
(4, 'John', '555-2304', 'Calle 10 #987'),
(5, 'Ana', '555-9803', 'Calle 34 #741'),
(6, 'María', '555-2693', 'Calle 22 #162'),
(7, 'Carlos', '555-7015', 'Calle 36 #114'),
(8, 'John', '555-5441', 'Calle 12 #212'),
(9, 'Luis', '555-7016', 'Calle 27 #841'),
(10, 'José', '555-6500', 'Calle 8 #757');


-- Añade datos a la tabla vehiculo
INSERT INTO Vehiculo (ID_Vehiculo, Marca, Modelo, Año, Precio, Combustible) VALUES
(1, 'Chevrolet', 'Sedan', 2004, 40679.89, 'Gasolina'),
(2, 'Toyota', 'Hatchback', 2005, 30269.74, 'Eléctrico'),
(3, 'Chevrolet', 'Coupe', 2023, 18915.95, 'Diesel'),
(4, 'Toyota', 'Coupe', 2000, 12770.17, 'Híbrido'),
(5, 'Toyota', 'Coupe', 2003, 15343.84, 'Diesel'),
(6, 'BMW', 'Sedan', 2017, 49996.86, 'Eléctrico'),
(7, 'Chevrolet', 'SUV', 2003, 21170.79, 'Híbrido'),
(8, 'Chevrolet', 'SUV', 2022, 21421.32, 'Híbrido'),
(9, 'Toyota', 'Coupe', 2001, 36687.32, 'Híbrido'),
(10, 'Toyota', 'Coupe', 2015, 45768.36, 'Diesel'),
(11, 'Toyota', 'SUV', 2011, 8726.65, 'Híbrido'),
(12, 'Ford', 'Truck', 2023, 17419.34, 'Gasolina'),
(13, 'Toyota', 'Hatchback', 2001, 12121.02, 'Gasolina'),
(14, 'Ford', 'Truck', 2006, 12688.86, 'Diesel'),
(15, 'BMW', 'Hatchback', 2008, 6853.59, 'Diesel');

-- Añade datos a la tabla venta
INSERT INTO Venta (ID_Venta, Fecha_Venta, Total) VALUES
(1, '2011-03-16', 19958.86),
(2, '2012-02-04', 15532.75),
(3, '2008-09-22', 9883.78),
(4, '2003-05-31', 10695.88),
(5, '2017-01-29', 9786.14),
(6, '2013-08-06', 20369.70),
(7, '1990-10-01', 23385.75),
(8, '2016-01-10', 11231.90),
(9, '2019-09-17', 17253.66),
(10, '2016-09-03', 6873.00);

-- Añade datos a la tabla compra
INSERT INTO Compra (ID_Compra, Fecha_Compra, Precio_Compra) VALUES
(1, '2006-03-22', 10379.51),
(2, '2012-11-15', 24973.73),
(3, '2018-10-09', 18383.90),
(4, '2010-10-11', 14616.17),
(5, '2016-07-04', 3799.42),
(6, '2012-11-24', 21712.08),
(7, '2005-03-14', 3506.20),
(8, '1997-03-24', 21111.77),
(9, '2007-08-22', 21415.04),
(10, '2019-02-19', 17169.74);
