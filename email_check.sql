/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50709
Source Host           : localhost:3306
Source Database       : emai_check

Target Server Type    : MYSQL
Target Server Version : 50709
File Encoding         : 65001

Date: 2017-08-17 10:31:06
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `email_table`
-- ----------------------------
DROP TABLE IF EXISTS `email_table`;
CREATE TABLE `email_table` (
  `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(12) NOT NULL,
  `email` varchar(20) NOT NULL,
  `password` varchar(20) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '字段是否激活 0为否',
  `ActiveCode` varchar(8) DEFAULT NULL COMMENT '激活码，随机8位',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of email_table
-- ----------------------------
INSERT INTO `email_table` VALUES ('1', 'burt', '1105332245@qq.com', '123456', '0', 'LiXGccFf');
INSERT INTO `email_table` VALUES ('2', 'bury', '1105332245@qq.com', '111111', '0', 'rMQMj5FH');
INSERT INTO `email_table` VALUES ('3', 'zhangjing', '1105332245@qq.com', '1111111', '0', 'l37wv5r0');
INSERT INTO `email_table` VALUES ('4', 'zhangjing', '1105332245@qq.com', '123456', '0', 'IqujOnAD');
