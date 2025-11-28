-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-11-2025 a las 12:12:27
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crm_toyota`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administradores`
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
-- Volcado de datos para la tabla `administradores`
--

INSERT INTO `administradores` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`) VALUES
(1, 'Laura Admin', 'ladmin@admin.toyota.com', 896547531, '$2a$10$UVFlG.fdutBQ6iOaz/KjQOk1RJD37aVriCT6Fy.Q0qIS5DA6RGbWq', 'ADMIN'),
(2, 'Eladio Admin', 'eladmin@admin.toyota.com', 159753486, '$2a$10$JgV6BcuL7HLosbWTaqZBAuhtvCVyoPMUj1uwSQU62WRAwqa3eAvqS', 'ADMIN');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `choferes`
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
-- Volcado de datos para la tabla `choferes`
--

INSERT INTO `choferes` (`id`, `nombre`, `email`, `telefono`, `password`, `rol`) VALUES
(1, 'Elcho Ferr', 'elchoferr@toyota.com', 787845457, '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3', 'CHOFER'),
(2, 'Lakon Duc Tora', 'ldtora@toyota.com', 123654789, '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3', 'CHOFER');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
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
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`id`, `nombre`, `email`, `telefono`, `id_chofer`, `password`, `rol`) VALUES
(1, 'Toyota España', 'contacto@toyota.es', 900324578, 1, '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3', 'CLIENTE'),
(2, 'Cliente Particular', 'cliente@example.com', 600123456, 2, '$2a$10$D8S.1.a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3', 'CLIENTE');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administradores`
--
ALTER TABLE `administradores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `choferes`
--
ALTER TABLE `choferes`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_chofer` (`id_chofer`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administradores`
--
ALTER TABLE `administradores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `choferes`
--
ALTER TABLE `choferes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`id_chofer`) REFERENCES `choferes` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
