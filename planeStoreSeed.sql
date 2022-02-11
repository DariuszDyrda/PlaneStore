-- -------------------------------------------------------------
-- TablePlus 4.5.2(402)
--
-- https://tableplus.com/
--
-- Database: plane_store
-- Generation Time: 2022-02-11 19:36:33.5630
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_e032310bcef831fb83101899b1` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientName` varchar(255) NOT NULL,
  `clientAddress` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'Pending',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `planeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_1031171c13130102495201e3e2` (`id`),
  KEY `FK_0a00ef3358d22cd5cc38f7bfad3` (`planeId`),
  CONSTRAINT `FK_0a00ef3358d22cd5cc38f7bfad3` FOREIGN KEY (`planeId`) REFERENCES `plane` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `plane` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `photoUrl` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `createdById` int DEFAULT NULL,
  `price` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_c7a759d7e8723c8c1a79d52a63` (`id`),
  KEY `FK_587cdb85dda0f646df55b8d1715` (`createdById`),
  CONSTRAINT `FK_587cdb85dda0f646df55b8d1715` FOREIGN KEY (`createdById`) REFERENCES `admin` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin1@admin.com', '$2a$10$OGbkF0lHdb8f2mclcrz31ewfN8VZRK9B3JGHRqboYBVqjxzzp8YO.'),
(2, 'admin2@admin.com', '$2a$10$OGbkF0lHdb8f2mclcrz31ewfN8VZRK9B3JGHRqboYBVqjxzzp8YO.');

INSERT INTO `order` (`id`, `clientName`, `clientAddress`, `status`, `createdAt`, `updatedAt`, `planeId`) VALUES
(4, 'Dariusz Dyrda', 'sdsdsdsd', 'Pending', '2022-02-06 13:51:37', '2022-02-06 13:51:37', 26),
(5, '', '', 'Pending', '2022-02-06 14:00:14', '2022-02-06 14:00:14', NULL),
(6, 'Dariusz Dyrda', 'Rzeszow', 'Pending', '2022-02-06 14:05:45', '2022-02-06 14:05:45', 8),
(7, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:12:33', '2022-02-06 14:12:33', 9),
(8, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:15:35', '2022-02-06 14:15:35', 9),
(9, '', '', 'Pending', '2022-02-06 14:15:51', '2022-02-06 14:15:51', 9),
(10, '', '', 'Pending', '2022-02-06 14:27:24', '2022-02-06 14:27:24', 9),
(11, '', '', 'Pending', '2022-02-06 14:28:03', '2022-02-06 14:28:03', 9),
(12, '', '', 'Pending', '2022-02-06 14:28:52', '2022-02-06 14:28:52', 9),
(13, '', '', 'Pending', '2022-02-06 14:29:34', '2022-02-06 14:29:34', 9),
(14, '', '', 'Pending', '2022-02-06 14:30:16', '2022-02-06 14:30:16', 9),
(15, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:30:20', '2022-02-06 14:30:20', 9),
(16, 'dsd', 'sdsdsd', 'Pending', '2022-02-06 14:39:53', '2022-02-06 14:39:53', 9),
(17, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:40:50', '2022-02-06 14:40:50', 9),
(18, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:43:15', '2022-02-06 14:43:15', 9),
(19, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:45:05', '2022-02-06 14:45:05', 8),
(20, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:46:40', '2022-02-06 14:46:40', 9),
(21, 'sd', 'sdsd', 'Pending', '2022-02-06 14:48:17', '2022-02-06 14:48:17', 8),
(22, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:49:45', '2022-02-06 14:49:45', 8),
(23, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 14:51:22', '2022-02-06 14:51:22', 9),
(24, 'sdsdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:53:42', '2022-02-06 14:53:42', NULL),
(25, 'sdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:54:33', '2022-02-06 14:54:33', NULL),
(26, 'sdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:54:38', '2022-02-06 14:54:38', NULL),
(27, 'sdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:54:39', '2022-02-06 14:54:39', NULL),
(28, 'sdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:54:39', '2022-02-06 14:54:39', NULL),
(29, 'sdsd', 'sdsdsdsd', 'Pending', '2022-02-06 14:54:39', '2022-02-06 14:54:39', NULL),
(30, 'ssdsd', 'sddsdssd', 'Pending', '2022-02-06 15:41:57', '2022-02-06 15:41:57', NULL),
(31, 'Dariusz Dyrda', 'sjkdksdsd', 'Pending', '2022-02-06 16:03:57', '2022-02-06 16:03:57', NULL),
(32, 'sdsd', 'sd', 'Pending', '2022-02-06 16:04:54', '2022-02-06 16:04:54', 11),
(33, 'sdsdsd', 'sdsdsd', 'Pending', '2022-02-06 16:05:57', '2022-02-06 16:05:57', 11),
(34, 'dfdfdf', 'dfdffdfd', 'Pending', '2022-02-06 16:09:12', '2022-02-06 16:09:12', NULL),
(35, 'dsdsd', 'sdsdsd', 'Pending', '2022-02-06 16:10:48', '2022-02-06 16:10:48', NULL),
(36, 'sddsds', 'sddssdsd', 'Pending', '2022-02-06 16:15:16', '2022-02-06 16:15:16', NULL),
(37, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:21:42', '2022-02-06 16:21:42', NULL),
(38, 'dfdfdf', 'dfdfdfdf', 'Pending', '2022-02-06 16:21:46', '2022-02-06 16:21:46', NULL),
(39, 'dfdf', 'dfdfdf', 'Pending', '2022-02-06 16:25:18', '2022-02-06 16:25:18', NULL),
(40, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:25:26', '2022-02-06 16:25:26', NULL),
(41, 'df', 'df', 'Pending', '2022-02-06 16:26:08', '2022-02-06 16:26:08', NULL),
(42, 'dfdf', 'dfdf', 'Pending', '2022-02-06 16:27:10', '2022-02-06 16:27:10', NULL),
(43, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:50', '2022-02-06 16:27:50', NULL),
(44, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:51', '2022-02-06 16:27:51', NULL),
(45, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:52', '2022-02-06 16:27:52', NULL),
(46, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:52', '2022-02-06 16:27:52', NULL),
(47, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:52', '2022-02-06 16:27:52', NULL),
(48, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:52', '2022-02-06 16:27:52', NULL),
(49, 'fddf', 'dfdfdf', 'Pending', '2022-02-06 16:27:53', '2022-02-06 16:27:53', NULL),
(50, 'sd', 'sd', 'Pending', '2022-02-06 16:28:12', '2022-02-06 16:28:12', NULL),
(51, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 16:49:41', '2022-02-06 16:49:41', NULL),
(52, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 16:49:48', '2022-02-06 16:49:48', NULL),
(53, 'dfdf', 'dfdfdf', 'Pending', '2022-02-06 16:50:26', '2022-02-06 16:50:26', NULL),
(54, 'fgfg', 'fgfgfg', 'Pending', '2022-02-06 16:50:45', '2022-02-06 16:50:45', NULL),
(55, 'sdsd', 'sdsd', 'Pending', '2022-02-06 16:51:44', '2022-02-06 16:51:44', NULL),
(56, 'sdsdsd', 'sdsdsdsdsdsd', 'Pending', '2022-02-06 16:51:52', '2022-02-06 16:51:52', NULL),
(57, 'sdsd', 'sdsdssd', 'Pending', '2022-02-06 16:54:19', '2022-02-06 16:54:19', 8),
(58, 'dfdfdf', 'dffdfdfd', 'Pending', '2022-02-06 16:59:39', '2022-02-06 16:59:39', NULL),
(59, 'sdsd', 'sdsdsdsdsdsd', 'Pending', '2022-02-06 17:00:38', '2022-02-06 17:00:38', 8),
(60, 'retvertc', 'etrre', 'Pending', '2022-02-06 17:00:46', '2022-02-06 17:00:46', 8),
(61, 'ssd', 'sdsd', 'Pending', '2022-02-06 17:02:20', '2022-02-06 17:02:20', 14),
(62, 'sdsd', 'sdsdsd', 'Pending', '2022-02-06 17:15:57', '2022-02-06 17:15:57', NULL),
(63, 'snkdhkdskjsd', 'sdfsdfsdfsdfsdf', 'Pending', '2022-02-06 17:35:23', '2022-02-06 17:35:23', 8),
(64, 'Dariusz Dyrda', 'sdsdsdsdsd', 'Pending', '2022-02-10 10:48:36', '2022-02-10 10:48:36', 19);

INSERT INTO `plane` (`id`, `name`, `description`, `photoUrl`, `createdAt`, `updatedAt`, `createdById`, `price`) VALUES
(8, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-3-900x600.jpg', '2022-02-06 01:59:41', '2022-02-10 10:46:32', 1, 34000000),
(9, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:42', '2022-02-06 01:59:42', 1, 34000000),
(10, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://uploimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:43', '2022-02-10 10:48:58', 1, 34000000),
(11, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:43', '2022-02-06 01:59:43', 1, 34000000),
(12, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:44', '2022-02-06 01:59:44', 1, 34000000),
(13, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:44', '2022-02-06 01:59:44', 1, 34000000),
(14, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:44', '2022-02-06 01:59:44', 1, 34000000),
(17, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:45', '2022-02-06 01:59:45', 1, 34000000),
(19, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:46', '2022-02-06 01:59:46', 1, 34000000),
(20, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:47', '2022-02-06 01:59:47', 1, 34000000),
(21, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:47', '2022-02-06 01:59:47', 1, 34000000),
(22, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:48', '2022-02-06 01:59:48', 1, 34000000),
(23, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:48', '2022-02-06 01:59:48', 1, 34000000),
(24, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:48', '2022-02-06 01:59:48', 1, 34000000),
(25, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:49', '2022-02-06 01:59:49', 1, 34000000),
(26, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:49', '2022-02-06 01:59:49', 1, 34000000),
(27, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:51', '2022-02-06 01:59:51', 1, 34000000),
(28, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:51', '2022-02-06 01:59:51', 1, 34000000),
(29, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:51', '2022-02-06 01:59:51', 1, 34000000),
(30, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:52', '2022-02-06 01:59:52', 1, 34000000),
(31, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:53', '2022-02-06 01:59:53', 1, 34000000),
(32, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:53', '2022-02-06 01:59:53', 1, 34000000),
(33, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:53', '2022-02-06 01:59:53', 1, 34000000),
(34, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:54', '2022-02-06 01:59:54', 1, 34000000),
(35, 'Boeing 777X', 'That\'s a very awesome plane. It\'s quite big and loud. It can flyyy in the air', 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg/1200px-Cathay_Pacific_Boeing_777-200%3B_B-HNL%40HKG.jpg', '2022-02-06 01:59:54', '2022-02-06 01:59:54', 1, 34000000),
(39, 'Embrarer 232', 'sdsdsd sfdsd', 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-900x1350.jpg', '2022-02-10 09:58:50', '2022-02-10 09:58:50', 1, 33534545),
(40, 'sdsdsd', 'sdsdsd', 'https://www.cameraegg.org/wp-content/uploads/2015/06/canon-powershot-g3-x-sample-images-900x1350.jpg', '2022-02-10 09:59:12', '2022-02-10 09:59:12', 1, 3434),
(41, 'New plane', 'sdsdsd', 'https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_auto/https://cdn-upmostly.pressidium.com/wp-content/uploads/react-refresh-page.jpg', '2022-02-10 10:04:59', '2022-02-10 10:04:59', 1, 23),
(42, 'fddf', 'dfdf', 'https://cdn.shortpixel.ai/spai/q_lossy+ret_img+to_auto/https://cdn-upmostly.pressidium.com/wp-content/uploads/react-refresh-page.jpg', '2022-02-10 10:05:26', '2022-02-10 10:05:26', 1, 34444),
(43, 'dssd', 'sdsd', 'sdsd', '2022-02-10 10:32:22', '2022-02-10 10:32:22', 1, 34),
(44, 'Airbus A320', 'Hey!', 'color=\"inherit\"', '2022-02-10 10:52:08', '2022-02-10 10:52:08', 1, 23);



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;