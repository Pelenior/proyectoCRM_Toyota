-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 25, 2025 at 07:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm_toyota`
--

-- --------------------------------------------------------

--
-- Table structure for table `administradores`
--

DROP TABLE IF EXISTS `administradores`;
CREATE TABLE `administradores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL DEFAULT '',
  `email` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `telefono`) VALUES
(1, 'Laura Admin', 'ladmin@admin.toyota.com', 896547531),
(2, 'Eladio Admin', 'eladmin@admin.toyota.com', 159753486);

-- --------------------------------------------------------

--
-- Table structure for table `choferes`
--

DROP TABLE IF EXISTS `choferes`;
CREATE TABLE `choferes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL DEFAULT '',
  `email` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `choferes`
--

INSERT INTO `choferes` (`id`, `nombre`, `email`, `telefono`) VALUES
(1, 'Elcho Ferr', 'elchoferr@toyota.com', 787845457),
(2, 'Lakon Duc Tora', 'ldtora@toyota.com', 123654789);

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(20) NOT NULL DEFAULT '',
  `email` varchar(40) NOT NULL,
  `telefono` int(9) NOT NULL,
  `id_chofer` int(5) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`, `id_chofer`) VALUES
(1, 'Toyota España', 'contacto@toyota.es', 900324578, 1),
(2, 'Cliente Particular', 'cliente@example.com', 600123456, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `choferes`
--
ALTER TABLE `choferes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_chofer` (`id_chofer`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `choferes`
--
ALTER TABLE `choferes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_chofer`) REFERENCES `choferes` (`id`) ON DELETE SET NULL;
COMMIT;

ALTER TABLE administradores ADD COLUMN password VARCHAR(255) NOT NULL, ADD COLUMN rol VARCHAR(20) DEFAULT 'ADMIN';
ALTER TABLE choferes ADD COLUMN password VARCHAR(255) NOT NULL, ADD COLUMN rol VARCHAR(20) DEFAULT 'CHOFER';
ALTER TABLE clientes ADD COLUMN password VARCHAR(255) NOT NULL, ADD COLUMN rol VARCHAR(20) DEFAULT 'CLIENTE';

-- Actualiza los usuarios con una contraseña temporal (ej: "12345" encriptada con BCrypt)
UPDATE administradores SET password = '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3';
UPDATE choferes SET password = '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3';
UPDATE clientes SET password = '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3';

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
