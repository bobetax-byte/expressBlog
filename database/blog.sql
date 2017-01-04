/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2017-01-04 20:29:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for superuser
-- ----------------------------
DROP TABLE IF EXISTS `superuser`;
CREATE TABLE `superuser` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of superuser
-- ----------------------------
INSERT INTO `superuser` VALUES ('0', 'zhoubo', '123456');
INSERT INTO `superuser` VALUES ('1', 'admin', 'admin');
