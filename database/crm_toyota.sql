-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2025 at 08:45 PM
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
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` int(9) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`) VALUES
(1, 'Laura Admin', 'ladmin@admin.toyota.com', 896547531, '$2a$10$UVFlG.fdutBQ6iOaz/KjQOk1RJD37aVriCT6Fy.Q0qIS5DA6RGbWq', 'ADMIN'),
(2, 'Eladio Admin', 'eladmin@admin.toyota.com', 159753486, '$2a$10$XALeErXdo/OEx0eFBkXxF.7oirf/g8D6GVoUBLg5tWxXG8ujke2xa', 'ADMIN');

-- --------------------------------------------------------

--
-- Table structure for table `choferes`
--

DROP TABLE IF EXISTS `choferes`;
CREATE TABLE `choferes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` int(9) NOT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `choferes`
--

INSERT INTO `choferes` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`) VALUES
(1, 'Elcho Ferr', 'elchoferr@toyota.com', 787845457, '$2a$10$nac1q7I8lO.WmWtxcaMmU.BPzn1GtFe/cjSWY/7GnEJBnF7Jvbj8O', 'CHOFER'),
(2, 'Lakon Duk Tora', 'ldtora@toyota.com', 123654789, '$2a$10$uyTQAUknAnBmH40YYV01veWB2spXikkg..YKn6oKNVJGSWiEfTy2S', 'CHOFER');

-- --------------------------------------------------------

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
CREATE TABLE `clientes` (
  `id` int(10) UNSIGNED NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telefono` int(9) NOT NULL,
  `id_chofer` int(5) UNSIGNED DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `rol` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`, `id_chofer`, `password`, `rol`) VALUES
(1, 'Toyota España', 'contacto@toyota.es', 900324578, 1, '$2a$10$8ls4dvKdjoWUJ2e5b00ls.l5u.6WkZ/x509ugRPsptYMsHk0dyaKu', 'CLIENTE'),
(2, 'Cliente Particular', 'cliente@example.com', 600123456, 2, '$2a$10$GL9fFtam149DIcoHNWAziOwFvRtJqDTNpiZ15Iivzd/Ilnj0Xl49C', 'CLIENTE');

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
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_chofer`) REFERENCES `choferes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
