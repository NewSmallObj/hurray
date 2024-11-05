/*
 Navicat Premium Dump SQL

 Source Server         : nest
 Source Server Type    : MySQL
 Source Server Version : 80033 (8.0.33)
 Source Host           : localhost:3306
 Source Schema         : t-star

 Target Server Type    : MySQL
 Target Server Version : 80033 (8.0.33)
 File Encoding         : 65001

 Date: 05/11/2024 10:45:25
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for articles
-- ----------------------------
DROP TABLE IF EXISTS `articles`;
CREATE TABLE `articles`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `column_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `outline` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `content` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `published` tinyint(1) NULL DEFAULT 0,
  `publish_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `articles_column_id_fkey`(`column_id` ASC) USING BTREE,
  CONSTRAINT `articles_column_id_fkey` FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of articles
-- ----------------------------

-- ----------------------------
-- Table structure for columns
-- ----------------------------
DROP TABLE IF EXISTS `columns`;
CREATE TABLE `columns`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pid` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `show_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `url` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `url_open_with` tinyint(1) NULL DEFAULT 0,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort` int NOT NULL DEFAULT 0,
  `show_nav` tinyint(1) NULL DEFAULT 0,
  `disabled` tinyint(1) NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of columns
-- ----------------------------
INSERT INTO `columns` VALUES ('cm2uaeoso0002wo9e3f44kghm', '0', '首页', NULL, '/home', 0, NULL, 1, 1, 0, NULL, '2024-10-29 10:10:41.544', '2024-10-29 10:23:36.750');

-- ----------------------------
-- Table structure for depts
-- ----------------------------
DROP TABLE IF EXISTS `depts`;
CREATE TABLE `depts`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NULL DEFAULT 0,
  `sort` int NOT NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `simple_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `leader_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_Id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `deleted` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `depts_leader_id_fkey`(`leader_id` ASC) USING BTREE,
  CONSTRAINT `depts_leader_id_fkey` FOREIGN KEY (`leader_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of depts
-- ----------------------------
INSERT INTO `depts` VALUES ('cm2m47n8b00056fe5p5hqme82', '0', '研发部门', 0, 1, NULL, '2024-10-23 16:55:05.819', '2024-10-28 02:41:09.894', '1', '研发部', NULL, 'YFB', NULL, 0);

-- ----------------------------
-- Table structure for dict_datas
-- ----------------------------
DROP TABLE IF EXISTS `dict_datas`;
CREATE TABLE `dict_datas`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `label` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dict_code` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int NOT NULL DEFAULT 0,
  `readonly` tinyint(1) NULL DEFAULT 0,
  `disabled` tinyint(1) NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  `dict_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_Id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `dict_datas_dict_id_fkey`(`dict_id` ASC) USING BTREE,
  CONSTRAINT `dict_datas_dict_id_fkey` FOREIGN KEY (`dict_id`) REFERENCES `dicts` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dict_datas
-- ----------------------------
INSERT INTO `dict_datas` VALUES ('cm2juijtt0000k9j2j8bttw6m', '普通用户', 'USER_TYPE', '1', 1, 1, 0, '1普通用户', '2024-10-22 02:48:06.113', '2024-10-26 15:41:37.794', 'cm2j5jmyb0002119ac6e64ps8', NULL);
INSERT INTO `dict_datas` VALUES ('cm2jwm5hf0001nuhptpwiq3qq', '普通部门', 'DEPT_TYPE', '1', 1, 1, 0, '1普通部门', '2024-10-22 03:46:53.379', '2024-10-22 03:46:53.379', 'cm2jwlhaf0000nuhpl27td9xg', NULL);

-- ----------------------------
-- Table structure for dicts
-- ----------------------------
DROP TABLE IF EXISTS `dicts`;
CREATE TABLE `dicts`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `sort` int NOT NULL DEFAULT 0,
  `readonly` tinyint(1) NULL DEFAULT 0,
  `disabled` tinyint(1) NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  `login_return` tinyint(1) NULL DEFAULT 1,
  `created_Id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `dicts_code_key`(`code` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of dicts
-- ----------------------------
INSERT INTO `dicts` VALUES ('cm2j5jmyb0002119ac6e64ps8', '用户类型', 'USER_TYPE', 1, 1, 0, '1 普通用户', '2024-10-21 15:09:06.419', '2024-10-26 15:44:42.052', 1, NULL);
INSERT INTO `dicts` VALUES ('cm2jwlhaf0000nuhpl27td9xg', '部门类型', 'DEPT_TYPE', 2, 1, 0, '1 平台部门', '2024-10-22 03:46:22.023', '2024-10-22 03:46:22.023', 1, NULL);

-- ----------------------------
-- Table structure for menu_role
-- ----------------------------
DROP TABLE IF EXISTS `menu_role`;
CREATE TABLE `menu_role`  (
  `menu_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE INDEX `menu_role`(`menu_id` ASC, `role_id` ASC) USING BTREE,
  INDEX `menu_role_role_id_fkey`(`role_id` ASC) USING BTREE,
  CONSTRAINT `menu_role_menu_id_fkey` FOREIGN KEY (`menu_id`) REFERENCES `menus` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `menu_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menu_role
-- ----------------------------
INSERT INTO `menu_role` VALUES ('cm2km7cq80004bv7jis0s2wgl', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2kn6cs10005bv7jyxte25kp', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2knuf6s0006bv7jwao1a2vw', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2kny8370008bv7jyt7i698f', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2l80ih10000xz7r270a6emw', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2qau7lh000010fj9385bfe8', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm2u8q4aq00006bduexlqa004', 'cm2n3sh5e0001926urdwh0szs');
INSERT INTO `menu_role` VALUES ('cm32vibs20000vpo2xhoolvd2', 'cm2n3sh5e0001926urdwh0szs');

-- ----------------------------
-- Table structure for menus
-- ----------------------------
DROP TABLE IF EXISTS `menus`;
CREATE TABLE `menus`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `pid` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `type` int NOT NULL DEFAULT 1,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `icon` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `route_path` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT 0,
  `perms` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `addit_perms` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  `created_Id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `deleted` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of menus
-- ----------------------------
INSERT INTO `menus` VALUES ('cm2km7cq80004bv7jis0s2wgl', '0', 1, '系统管理', 'SettingOutlined', '/admin/adm/sys', 2, 'admin:adm:sys', NULL, NULL, '2024-10-22 15:43:12.944', '2024-10-29 09:23:41.122', NULL, 0);
INSERT INTO `menus` VALUES ('cm2kn6cs10005bv7jyxte25kp', 'cm2km7cq80004bv7jis0s2wgl', 2, '菜单管理', 'BarsOutlined', '/admin/adm/sys/menu', 1, 'admin:adm:sys:menu', NULL, NULL, '2024-10-22 16:10:25.932', '2024-10-28 03:02:39.215', NULL, 0);
INSERT INTO `menus` VALUES ('cm2knuf6s0006bv7jwao1a2vw', 'cm2km7cq80004bv7jis0s2wgl', 2, '字典管理', 'BookOutlined', '/admin/adm/sys/dict', 2, 'admin:adm:sys:dict', NULL, NULL, '2024-10-22 16:29:08.833', '2024-10-28 03:02:39.215', NULL, 0);
INSERT INTO `menus` VALUES ('cm2kny8370008bv7jyt7i698f', 'cm2km7cq80004bv7jis0s2wgl', 2, '用户管理', 'UserOutlined', '/admin/adm/sys/user', 3, 'admin:adm:sys:user', NULL, NULL, '2024-10-22 16:32:06.259', '2024-10-28 03:02:39.215', NULL, 0);
INSERT INTO `menus` VALUES ('cm2l80ih10000xz7r270a6emw', 'cm2km7cq80004bv7jis0s2wgl', 2, '部门管理', 'ApartmentOutlined', '/admin/adm/sys/dept', 4, 'admin:adm:sys:dept', NULL, NULL, '2024-10-23 01:53:45.346', '2024-10-28 03:02:39.215', NULL, 0);
INSERT INTO `menus` VALUES ('cm2qau7lh000010fj9385bfe8', 'cm2km7cq80004bv7jis0s2wgl', 2, '角色管理', 'DeploymentUnitOutlined', '/admin/adm/sys/role', 5, 'admin:adm:sys:role', NULL, NULL, '2024-10-26 15:11:41.045', '2024-10-28 03:02:39.215', NULL, 0);
INSERT INTO `menus` VALUES ('cm2u8q4aq00006bduexlqa004', '0', 1, '栏目管理', 'AppstoreOutlined', '/admin/adm/column', 1, 'admin:adm:column', NULL, NULL, '2024-10-29 09:23:35.618', '2024-10-29 09:23:35.618', NULL, 0);
INSERT INTO `menus` VALUES ('cm32vibs20000vpo2xhoolvd2', '0', 1, '表单设计器', 'HighlightOutlined', '/admin/adm/design', 3, 'admin:adm:design', NULL, NULL, '2024-11-04 10:23:32.583', '2024-11-04 10:23:32.583', NULL, 0);

-- ----------------------------
-- Table structure for roles
-- ----------------------------
DROP TABLE IF EXISTS `roles`;
CREATE TABLE `roles`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` tinyint(1) NULL DEFAULT 0,
  `sort` int NULL DEFAULT 0,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `update_time` datetime(3) NOT NULL,
  `created_Id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `deleted` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of roles
-- ----------------------------
INSERT INTO `roles` VALUES ('cm2n3sh5e0001926urdwh0szs', '超级管理员', 'SUPER_ADMIN', 0, 1, NULL, '2024-10-24 09:31:04.275', '2024-11-04 10:24:47.554', NULL, 0);

-- ----------------------------
-- Table structure for user_dept
-- ----------------------------
DROP TABLE IF EXISTS `user_dept`;
CREATE TABLE `user_dept`  (
  `dept_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE INDEX `user_dept`(`dept_id` ASC, `user_id` ASC) USING BTREE,
  INDEX `user_dept_user_id_fkey`(`user_id` ASC) USING BTREE,
  CONSTRAINT `user_dept_dept_id_fkey` FOREIGN KEY (`dept_id`) REFERENCES `depts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_dept_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_dept
-- ----------------------------
INSERT INTO `user_dept` VALUES ('cm2m47n8b00056fe5p5hqme82', 'cm2k27xh7000hhobzlgie5m5j');

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `user_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  UNIQUE INDEX `user_role`(`user_id` ASC, `role_id` ASC) USING BTREE,
  INDEX `user_role_role_id_fkey`(`role_id` ASC) USING BTREE,
  CONSTRAINT `user_role_role_id_fkey` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `user_role_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('cm2k27xh7000hhobzlgie5m5j', 'cm2n3sh5e0001926urdwh0szs');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `create_time` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `mobile` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `remark` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `sort` int NULL DEFAULT 0,
  `update_time` datetime(3) NOT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `disabled` tinyint(1) NULL DEFAULT 0,
  `type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `deleted` tinyint(1) NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('cm2k27xh7000hhobzlgie5m5j', 'superadmin', NULL, '2024-10-22 06:23:47.515', NULL, '$2b$10$kbAdlPhZz4UrDk49lNElD.qrAYnJA4eFPtvkBf8dnYfa0NzE7JDmO', NULL, 0, '2024-10-28 03:05:10.057', 'superadmin', 0, '1', 0);

SET FOREIGN_KEY_CHECKS = 1;
