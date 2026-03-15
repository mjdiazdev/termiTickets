-- 1. CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE IF NOT EXISTS termiticket;
USE termiticket;

-- 2. TABLAS INDEPENDIENTES (Sin llaves foráneas)

-- Usuarios del sistema (Taquilleros, Administradores)
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    rol ENUM('ADMIN', 'TAQUILLA') DEFAULT 'TAQUILLA',
    activo BOOLEAN DEFAULT TRUE,
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Personal operativo (Choferes y Colectores)
CREATE TABLE personal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    rol ENUM('CHOFER', 'COLECTOR') NOT NULL,
    telefono VARCHAR(20),
    activo BOOLEAN DEFAULT TRUE
);

-- Vehículos de la flota
CREATE TABLE vehiculos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) UNIQUE NOT NULL,
    capacidad_maxima INT NOT NULL,
    marca VARCHAR(50),
    activo BOOLEAN DEFAULT TRUE
);

-- Pasajeros (Clientes que viajan)
CREATE TABLE pasajeros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20)
);

-- 3. TABLAS DEPENDIENTES (Con llaves foráneas)

-- El viaje físico programado
CREATE TABLE viajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    vehiculo_id INT NOT NULL,
    chofer_id INT NOT NULL,
    colector_id INT NOT NULL,
    ciudad_origen VARCHAR(100) NOT NULL DEFAULT 'Barquisimeto',
    fecha_salida DATETIME NOT NULL,
    estado ENUM('PROGRAMADO', 'EN_RUTA', 'FINALIZADO', 'CANCELADO') DEFAULT 'PROGRAMADO',
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id),
    FOREIGN KEY (chofer_id) REFERENCES personal(id),
    FOREIGN KEY (colector_id) REFERENCES personal(id)
);

-- Las paradas/destinos de ese viaje específico (Ruta compuesta)
CREATE TABLE viaje_paradas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    viaje_id INT NOT NULL,
    ciudad_destino VARCHAR(100) NOT NULL,
    orden INT NOT NULL, -- Ej: 1 para Coro, 2 para Punto Fijo
    precio DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (viaje_id) REFERENCES viajes(id) ON DELETE CASCADE
);

-- Factura global de la compra (Puede incluir varios boletos)
CREATE TABLE facturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_vendedor_id INT NOT NULL,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total DECIMAL(10, 2) NOT NULL,
    metodo_pago ENUM('EFECTIVO', 'PAGO_MOVIL', 'PUNTO_VENTA', 'DOLARES') NOT NULL,
    FOREIGN KEY (usuario_vendedor_id) REFERENCES usuarios(id)
);

-- Boletos individuales ligados a una factura y a un pasajero
CREATE TABLE boletos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    factura_id INT NOT NULL,
    viaje_parada_id INT NOT NULL,
    pasajero_id INT NOT NULL,
    precio_pagado DECIMAL(10, 2) NOT NULL, -- Se guarda el precio histórico por si cambia luego
    estado ENUM('VALIDO', 'USADO', 'ANULADO') DEFAULT 'VALIDO',
    FOREIGN KEY (factura_id) REFERENCES facturas(id) ON DELETE CASCADE,
    FOREIGN KEY (viaje_parada_id) REFERENCES viaje_paradas(id),
    FOREIGN KEY (pasajero_id) REFERENCES pasajeros(id)
);

ALTER TABLE usuarios ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE personal ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE vehiculos ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
ALTER TABLE pasajeros ADD COLUMN createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP, ADD COLUMN updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
