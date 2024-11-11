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
