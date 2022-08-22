-- --------------------------------------------------------
-- 호스트:                          127.0.0.1
-- 서버 버전:                        10.8.3-MariaDB - mariadb.org binary distribution
-- 서버 OS:                        Win64
-- HeidiSQL 버전:                  11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- dev_74 데이터베이스 구조 내보내기
CREATE DATABASE IF NOT EXISTS `dev_74` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `dev_74`;

-- 테이블 dev_74.accesslog 구조 내보내기
CREATE TABLE IF NOT EXISTS `accesslog` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `accessDate` date DEFAULT NULL,
  `accessTime` time DEFAULT NULL,
  `sessionId` varchar(1000) DEFAULT NULL,
  `accessType` varchar(50) DEFAULT NULL,
  `adminId` varchar(50) DEFAULT NULL,
  `userId` varchar(50) DEFAULT NULL,
  `endDate` varchar(50) DEFAULT NULL,
  `userIP` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 dev_74.accesslog:~65 rows (대략적) 내보내기
/*!40000 ALTER TABLE `accesslog` DISABLE KEYS */;
INSERT IGNORE INTO `accesslog` (`_id`, `accessDate`, `accessTime`, `sessionId`, `accessType`, `adminId`, `userId`, `endDate`, `userIP`) VALUES
	(19, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(20, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(21, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(22, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(23, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(24, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(25, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(26, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(27, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(28, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(29, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(30, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(31, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(32, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(33, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(34, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(35, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::1'),
	(36, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::1'),
	(37, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::1'),
	(38, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::1'),
	(39, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::1'),
	(40, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(41, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(42, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(43, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(44, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(45, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(46, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(47, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(48, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(49, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(50, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(51, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(52, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(53, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(54, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(55, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(56, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(57, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(58, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(59, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(60, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(61, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(62, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(63, '2022-08-11', NULL, 'guestAccess', 'access', NULL, 'guestAccess', NULL, '::ffff:127.0.0.1'),
	(64, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(65, '2022-08-12', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::1'),
	(66, '2022-08-16', NULL, '010-1234-5678', 'login', NULL, '8888', NULL, '::ffff:127.0.0.1'),
	(67, '2022-08-17', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IlprWVd1aE5hZjVNUGN3aFYiLCJjaXBoZXJ0ZXh0IjoiWVJxVXRUcG56WW9fX0NHcW94dUczWmxzVUpiQlU5ejIzZFp3MGJReElLNG9RQUpFMGhpXy1naUdBd3lMRVdPa0hBeFgxbDQiLCJ0YWciOiJnLWhLWjlrWHlfaGtmb1Q2RzNxcjR3IiwiaWF0IjoxNjYwNzI3NzQ5LCJleHAiOjE2NjA3NTI5NDl9.Ep-UG9dRrIPx8Ah3lLmmlrO65TIyi3QODiIJAzWrU18', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(68, '2022-08-17', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6ImFib3ZBU3E4WFgwSXRNM0EiLCJjaXBoZXJ0ZXh0IjoiZmtCSFpPdXo4OUJONTlaYTFNc3MwcHRRZUk0aG1lbm96eHJJN1doTGNnUy0zRThwU2xfY3VpNUQ4TGhLRnNQV0h5T3NIZ2MiLCJ0YWciOiJqdFJ0dlYwUlBzY2VaVk5vdGU0d1J3IiwiaWF0IjoxNjYwNzI4MDEyLCJleHAiOjE2NjA3NTMyMTJ9.sPn2YqKF3X6UZTxdP5sx2dL6CI145hbiL5vYX4S--78', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(69, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjBQZE0wSlphRFFtXzFnWTIiLCJjaXBoZXJ0ZXh0IjoicTg4TmhtOHJOZ2pVZ2h4TDhLbVNpRjdXWVA0SzMzd1NFSWl0UlZhTVVqd3FqZEhKa09IYjRVSm4yd3NNQVhqWW9aU2pERkEiLCJ0YWciOiIzSW00NHdPOF9RN0J4Y0NRS2JSNWdBIiwiaWF0IjoxNjYwODgxNzY5LCJleHAiOjE2NjA5MDY5Njl9.HNxNb_VsDaNryevXLn3d747yg9HwpxoR0PbVpTU_7FI', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(70, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6Im8xbWZzWmJlQlpnWG81VlMiLCJjaXBoZXJ0ZXh0IjoiTnNfSFp1cHhuaE1FUm5yYlo5Q3ciLCJ0YWciOiI4MXRXSzVUcnZWZU5PYThvS1ZLSlBnIiwiaWF0IjoxNjYwODgzOTU0LCJleHAiOjE2NjA5MDkxNTR9.wVLJRQ8o9XsNPGW3BJFQR5ZEFqA0-d_Sk8EgaGM9cY0', 'userLogin', NULL, 'hi', NULL, '::ffff:127.0.0.1'),
	(71, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjNwWW5vWlhtam9wcW82MjgiLCJjaXBoZXJ0ZXh0IjoiVDBTbWNkQ2JKd3RlOTFfQmxrai1Ramc3cDFkWmo5aW1Bczg5dVF6T0tLdElwOUQ0QzJua1R0ZDZpVWRUQkNVdVJJN2dzdmciLCJ0YWciOiJrYjA4ZFBqaFhDdGtIUDV4TUh1WkZnIiwiaWF0IjoxNjYwODg0MTAyLCJleHAiOjE2NjA5MDkzMDJ9.GjkHOyJWvFVqSQeV2EmhMpOeAK1ECevKuddEJ0LL40M', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(72, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IktNenNWWFhvZTBOdU1CcXEiLCJjaXBoZXJ0ZXh0IjoiejVHLUViaTh1anlQNWtPTFZSa1dfSEhSd2tVTXgtS0JVYzJvdkhwZDA2bXJiNVo0SmUzUFUzY19tY2lwZXFRQWtpa1djU28iLCJ0YWciOiJGVnA0ZWZxWUpvSlVmNzhhM2pfM1pRIiwiaWF0IjoxNjYwODg0NDE5LCJleHAiOjE2NjA5MDk2MTl9.xwyoA1DSRI_NinRtiJhmthWfTk2ixznHOv_oQO-QD6s', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(73, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6InlMZVhFY29ya1MwY2RXTHYiLCJjaXBoZXJ0ZXh0IjoicjlVbUJFbEZ2Q0dScTlyY0J2N21aZDcyY01ZRkZEMkpnQWV3NHVLcU0ybUZSWTJRRDhyZDRRb240Q3Vkc3RIdXEyenczS1UiLCJ0YWciOiJ6TThhc1NhYTRhYzZRUzBqRVkycG5RIiwiaWF0IjoxNjYwODg0NTA2LCJleHAiOjE2NjA5MDk3MDZ9.Q0J9WNKkyDRiIce4XB2fHN7bUcaHv9Xng5BnIQNbHF0', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(74, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IkxLWHFQVFdMMFRfc2pveEUiLCJjaXBoZXJ0ZXh0IjoiVGFZQmJUZjVLcW1TeGJ5RmpGRVVtSzgtZjY4VzIxS2M0dVIwR0E5OUFFQl9lZXdtM1JkS0VsQ2RVUmZfazQ2M0tMa0NsZmMiLCJ0YWciOiJEQzNXTkJQV2RmektEZXUtYVg1OVFnIiwiaWF0IjoxNjYwODg0NjU4LCJleHAiOjE2NjA5MDk4NTh9._0bLk_oObMElBb9144SU_H4VmCzRCZu_0yfR8r7Nof0', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(75, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6ImVvVXEtbmVWUFJ0MjNSMEUiLCJjaXBoZXJ0ZXh0IjoiX0VKU1hJOGpzb19GTFlFOER6M3lFdXFJRGZmenBwV1hNaFBaV052LWNnRVhUV0M0cFczb1Q2Nkkxc0ROa256dFVOOU8yOVkiLCJ0YWciOiJZcG9NeC1TR242QWlqTjJTUFlFcE1BIiwiaWF0IjoxNjYwODg0Nzk1LCJleHAiOjE2NjA5MDk5OTV9.rVIFEagkA6b7YXXDMX6VzDpW8nAP28Z4CoczhRjsvYk', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(76, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjlrLWVkMEc2YkNZNXJlOVIiLCJjaXBoZXJ0ZXh0IjoicTVGbEZ1bXZCNUhlRXBkLVJGa21pZXRQUmxvcmV0dkw5YmZlUGFKcDBpSGZMcnk2QTZ4eU5IZFV0TERQQm54QWQ2M2lTWGsiLCJ0YWciOiJoMlp6RVQ2XzZuOENmdmFwSGkweTdBIiwiaWF0IjoxNjYwODg0ODc0LCJleHAiOjE2NjA5MTAwNzR9.urRzVRYU4jM5q-auLSZ6PH6v9c4zuOuTzXOtXN7HsfQ', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(77, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjA3R2NtZzNPamltdnQ3ZEoiLCJjaXBoZXJ0ZXh0IjoiTWplSlBwTVBndmdDMjhQV2FKZFA1aVktREJCRktoXy1OODJHb204T2p2ZWl1RDA0R2NscWM2dEM3YXN2S29IVE4yb2JrcEEiLCJ0YWciOiJOOUY0NVB3WTJ2cVlJbGo1LUxwanFnIiwiaWF0IjoxNjYwODg1NTA3LCJleHAiOjE2NjA5MTA3MDd9.v_q0YoQw0KBicMRyq6CI6v_W6j_GL29C-blPP7HDC8U', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(78, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IlJBdDVXckdGaXdnYzZldmIiLCJjaXBoZXJ0ZXh0IjoiX3VNRjQ4SmdRWkhlSWR5dFlGbG16WFJ2QlBza3dqTDQ3b0Roa1ZEbVhhQ3V5SXlEVklOaTYxY2t3bnVLNS1fY0tVa3V6TW8iLCJ0YWciOiJSWHdqVU9yeTRWU2pkdHFJX3oxT093IiwiaWF0IjoxNjYwODg1NTQ1LCJleHAiOjE2NjA5MTA3NDV9.D5Jy5JkPccO4IFdalsMRdlaPL0FZXsM6xBaQRvUwIi8', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(79, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjUxamlXTmc1ZkZpa2p6VFQiLCJjaXBoZXJ0ZXh0IjoiZmdEczQ3aWZ3enBZOE5OeDNoeVA0SjA4cUdKR0w0NGFob1NHQmtCb3VwVkFOdDdOaC1FV3IzVUd4YlF0LVQ4R3p6SWFlbWsiLCJ0YWciOiJQRVdMbkRfOFhJLXFHdkM0bXFzTGV3IiwiaWF0IjoxNjYwODg1NTg2LCJleHAiOjE2NjA5MTA3ODZ9.MaLxZNm2Vj7TJGDljzmk3mCslxRfRIJhJUMLeKyQxUc', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(80, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IkU4d01JQVdPWm9ENUo5bEsiLCJjaXBoZXJ0ZXh0IjoicEZLdExNS1UtOGFrWG44QVQwWHpjMWFhbTlOb3JMY01BdG9GTDdwbDZHd1VCeGVIaVlFRkY4Z2gwNHlFTlZzaFlSdzIyOEEiLCJ0YWciOiJYM2NFeTM3UldjaExvZFQ5VlFidGp3IiwiaWF0IjoxNjYwODg2MDAyLCJleHAiOjE2NjA5MTEyMDJ9.Jj0eG_DH9QKipmW1mTd66ZkbvC9UUJjcNivqxl_KJhQ', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(81, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6InJKVXNVTmV2N1RmVGMzSU0iLCJjaXBoZXJ0ZXh0IjoiS2hzQlpDMG9zTU4yOWpsMHVSdUg5VWFkQU1hOWtTSUdLcUl0WEhWRWFVZW1rdGU4Q3VYc3dFTGZhMGppUThLS3dQekJhSmciLCJ0YWciOiItRGgtUDBEM19qV3JkNExxWW40elV3IiwiaWF0IjoxNjYwODg2MDUyLCJleHAiOjE2NjA5MTEyNTJ9.RZ8AO3thZNhWAYsQWKB9_Yv2rzTpz1OEOKIlGSBYni0', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(82, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IkRQQmlJQjRJMXZTa1JGV1AiLCJjaXBoZXJ0ZXh0IjoieldFWmtIUkNHTmFkRmxBTE85R1RNUldGSkxQNWhWTkpVNjY5eGJlLXlZYWVqLXlzNUY3dkNVNU9FRWx6RGc5MnhLRWQzRnMiLCJ0YWciOiI1dmpBMF9RamhZblpxeXhhZER6STZ3IiwiaWF0IjoxNjYwODg2MDc5LCJleHAiOjE2NjA5MTEyNzl9.h7VmZRgNhdHoi1yRiSHTwtjBeGptb_KTjcWVoiOPGxI', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(83, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IllrRllEYmFUdThoVUphZXciLCJjaXBoZXJ0ZXh0IjoiQ2dUVTNIY2p4WFpTa1JOMUJtdk1CR2FlbGNZY3hsTTIzWGotR1hEc283Q1BXVHg5YjhZSlByR3AweHNpOENVZlFqNnRlemMiLCJ0YWciOiJ5MV9JLXBNX0RuRzZRbEVaa1RaY3dBIiwiaWF0IjoxNjYwODg2MTY5LCJleHAiOjE2NjA5MTEzNjl9.PFypdRpXSYnHCqthn9SMi7FFG7RqsfZ4jGZLXc7oynI', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(84, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6ImZnelhEWlBpb1hDZlRNZXgiLCJjaXBoZXJ0ZXh0IjoiamhiYXdNZEZFbzBwN2RDTTl0TlBaYWwxbkE5bS1oMTUwWEJ3czJ0WTZ1a0c3QmN3cHpVajZEbTVLRmJjTEZycEF2QzdaTjgiLCJ0YWciOiJEMHJrSXo0d0V6U2QzejZMeXBVbldRIiwiaWF0IjoxNjYwODg2MTk1LCJleHAiOjE2NjA5MTEzOTV9.PxkzQAaWR5cCUt7XfHH10DR9ZgBBeYJyd7G2cX5EzUw', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(85, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6InJlWGU1OGRsSWFxTkJKdFoiLCJjaXBoZXJ0ZXh0Ijoib19TUHpCMnEyOHE5dVh2NjZGbXhGbnB5Y2ltMHFvYWdTUVk3cWxoLXhXVWltT0pNTFNTLVdpTFlUVVJzZGtBQ0E4X2FMczgiLCJ0YWciOiJSN0ZxSXM5U0RQN1Z2RkpEZi1rbURRIiwiaWF0IjoxNjYwODg2MjIyLCJleHAiOjE2NjA5MTE0MjJ9.pKgo4bZ2Tr__1uOSkGajouVqo2Tbs3GX8YtnXOwQIgI', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(86, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6IjZFMGtFaEg1Nm10aWVTOXgiLCJjaXBoZXJ0ZXh0IjoiX1lUTnl1WWYyZENrVjBJVzVLOVp3VS1rYmRpaHhPaFFGamxFeHZ0NE5SbkpSYUJfRE1tb2ZweGVJeHl4c3lCZUhjZDlaVGMiLCJ0YWciOiJ0UHE3cFN3SnNmb29sVGFvdWF1bmxRIiwiaWF0IjoxNjYwODg2MjM2LCJleHAiOjE2NjA5MTE0MzZ9.HlzHvy2ubFQsfII5Dg1nsfoaO_f_R1FtxTi9Ic5QNKA', 'adminLogin', 'citylabs1', NULL, NULL, NULL),
	(87, '2022-08-19', NULL, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwcm90ZWN0ZWQiOiJleUpsYm1NaU9pSkJNalUyUjBOTklpd2lZV3huSWpvaVpHbHlJaXdpYTJsa0lqb2lObUpFVWxaZlNrZE5jVVpJZFhwUVZrWTVUM1p2YjNKWlRVcG9kMEZIVG5Oa1kwbzBNRzVPVEZwaWR5SjkiLCJpdiI6ImRkbUJ6WllwSnV1QWlyYXQiLCJjaXBoZXJ0ZXh0IjoiWjRwS2V3a09SNlBtYVdOcEFYMTl4UF9xeXpwWGZ4NHQ4VEFFUS10Q3FKMjNVRmRHREFfU2pCOWZyOW16ZDJ0TmpLSXl2NnciLCJ0YWciOiJVNzJldHlPTXYwWVlHSkx1YWl5R2JRIiwiaWF0IjoxNjYwODg2MjU0LCJleHAiOjE2NjA5MTE0NTR9.qg9G8E3_W3awRQ9-NItnafThL7Q6-13AVR7qwXMNXi8', 'adminLogin', 'citylabs1', NULL, NULL, NULL);
/*!40000 ALTER TABLE `accesslog` ENABLE KEYS */;

-- 테이블 dev_74.admin 구조 내보내기
CREATE TABLE IF NOT EXISTS `admin` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `adminId` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `phoneNumber` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `counter` int(11) DEFAULT 0,
  `registration` int(11) DEFAULT NULL,
  `lastConnection` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 dev_74.admin:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT IGNORE INTO `admin` (`_id`, `adminId`, `password`, `phoneNumber`, `name`, `counter`, `registration`, `lastConnection`) VALUES
	(1, 'citylabs1', '1234', '010-1234-5678', 'david', 0, NULL, '2022-08-19 05:17:34');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;

-- 테이블 dev_74.report 구조 내보내기
CREATE TABLE IF NOT EXISTS `report` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `reportNumber` varchar(100) DEFAULT NULL,
  `reporterName` varchar(50) DEFAULT NULL,
  `carNumber` varchar(100) DEFAULT NULL,
  `detectionDate` datetime DEFAULT NULL,
  `processingStatus` tinyint(4) DEFAULT 0,
  `obuId` varchar(100) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `long` varchar(100) DEFAULT NULL,
  `transactionId` varchar(100) DEFAULT NULL,
  `imageMetadata` varchar(100) DEFAULT NULL,
  `registrationDate` datetime DEFAULT NULL,
  `counter` int(11) DEFAULT NULL,
  `registration` int(11) DEFAULT NULL,
  `lastConnection` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`) USING BTREE,
  UNIQUE KEY `reportNumber` (`reportNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COMMENT='리포트';

-- 테이블 데이터 dev_74.report:~3 rows (대략적) 내보내기
/*!40000 ALTER TABLE `report` DISABLE KEYS */;
INSERT IGNORE INTO `report` (`_id`, `reportNumber`, `reporterName`, `carNumber`, `detectionDate`, `processingStatus`, `obuId`, `location`, `lat`, `long`, `transactionId`, `imageMetadata`, `registrationDate`, `counter`, `registration`, `lastConnection`) VALUES
	(1, '1', 'David', '1가1234', '2021-10-01 01:03:00', 0, 'OBU-46101960', '경기도 고양시', '33.489', '126.386', '추후 수정', '추후 수정', '2022-08-15 00:00:00', 0, 0, '2022-08-16 00:00:00'),
	(2, '2', 'Kyle', '2나5678', '2021-10-01 07:36:30', 0, 'OBU-46101954', '서울시 마포구', '33.326', '126.833', '추후 수정', '추후 수정', '2022-08-16 00:00:00', 0, 0, '2022-08-16 00:00:00'),
	(3, '3', 'Alex', '3다2345', '2021-10-01 03:30:08', 0, 'OBU-46101929', '서울시 강남구', '33.436', '126.918', '추후 수정', '추후 수정', '2022-08-14 00:00:00', 0, 0, '2022-08-16 00:00:00');
/*!40000 ALTER TABLE `report` ENABLE KEYS */;

-- 테이블 dev_74.reportaddress 구조 내보내기
CREATE TABLE IF NOT EXISTS `reportaddress` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `reportNumber` varchar(100) DEFAULT NULL,
  `s3address` varchar(100) DEFAULT NULL,
  `IPFSaddress` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `FK_reportaddress_report` (`reportNumber`),
  CONSTRAINT `FK_reportaddress_report` FOREIGN KEY (`reportNumber`) REFERENCES `report` (`reportNumber`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 dev_74.reportaddress:~9 rows (대략적) 내보내기
/*!40000 ALTER TABLE `reportaddress` DISABLE KEYS */;
INSERT IGNORE INTO `reportaddress` (`_id`, `reportNumber`, `s3address`, `IPFSaddress`) VALUES
	(1, '1', 'a', ''),
	(2, '1', 'b', NULL),
	(3, '1', 'c', NULL),
	(4, '2', 'a', NULL),
	(5, '2', 'b', NULL),
	(6, '2', 'c', NULL),
	(7, '3', 'a', NULL),
	(8, '3', 'b', NULL),
	(9, '3', 'c', NULL);
/*!40000 ALTER TABLE `reportaddress` ENABLE KEYS */;

-- 테이블 dev_74.user 구조 내보내기
CREATE TABLE IF NOT EXISTS `user` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL DEFAULT '8888',
  `phoneNumber` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `address` varchar(50) DEFAULT NULL,
  `gender` varchar(50) DEFAULT NULL,
  `importedService` varchar(50) DEFAULT NULL,
  `servicePlatform` varchar(50) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `dob` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `registration` int(11) DEFAULT 2,
  `counter` int(11) DEFAULT NULL,
  `lastConnection` datetime DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- 테이블 데이터 dev_74.user:~1 rows (대략적) 내보내기
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT IGNORE INTO `user` (`_id`, `userId`, `phoneNumber`, `email`, `address`, `gender`, `importedService`, `servicePlatform`, `age`, `dob`, `password`, `name`, `registration`, `counter`, `lastConnection`) VALUES
	(1, '8888', '010-1234-5678', 'q1qq11@naver.com', '시티', '남', NULL, NULL, NULL, NULL, '1234', 'david', 2, 5, '2022-08-16 00:00:00'),
	(2, 'hi', '010-1234-1111', 'aaaaa@naver.com', '시티', '여', NULL, NULL, NULL, NULL, '11', NULL, 2, NULL, NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
