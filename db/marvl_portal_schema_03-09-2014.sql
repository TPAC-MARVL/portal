BEGIN;
CREATE TABLE `user_group` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `user_id` integer NOT NULL,
    `group_id` integer NOT NULL,
    `is_admin` bool NOT NULL
)
;
CREATE TABLE `group` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `name` varchar(100) NOT NULL,
    `description` varchar(500) NOT NULL,
    `default` bool NOT NULL,
    `creator_id` integer NOT NULL
)
;
ALTER TABLE `user_group` ADD CONSTRAINT `group_id_refs_id_23e35689` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
CREATE TABLE `user` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `username` varchar(100) NOT NULL,
    `password` varchar(100) NOT NULL,
    `aafuser` varchar(1) NOT NULL,
    `logout` varchar(1) NOT NULL,
    `token` varchar(270) NOT NULL,
    `email` varchar(50) NOT NULL,
    `name` varchar(20) NOT NULL,
    `organization` varchar(200) NOT NULL,
    `is_greeting_sent` bool NOT NULL,
    `is_admin` bool NOT NULL,
    `is_system_user` bool NOT NULL
)
;
ALTER TABLE `user_group` ADD CONSTRAINT `user_id_refs_id_85ac0354` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `group` ADD CONSTRAINT `creator_id_refs_id_dda15c9f` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
CREATE TABLE `instance` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `name` varchar(100) NOT NULL,
    `instance_id` varchar(200) NOT NULL,
    `user_id` integer NOT NULL,
    `type` varchar(20) NOT NULL,
    `state` varchar(20) NOT NULL,
    `ip` varchar(15) NOT NULL,
    `group_id` integer,
    `url` varchar(100) NOT NULL
)
;
ALTER TABLE `instance` ADD CONSTRAINT `user_id_refs_id_d9bebe10` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `instance` ADD CONSTRAINT `group_id_refs_id_3e3aaf3d` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
CREATE TABLE `process` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `status` varchar(10) NOT NULL,
    `type` varchar(10) NOT NULL,
    `instance_id` integer NOT NULL,
    `active` varchar(1) NOT NULL
)
;
ALTER TABLE `process` ADD CONSTRAINT `instance_id_refs_id_2c8f8a94` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`id`);
CREATE TABLE `user_group_request` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `email` varchar(50) NOT NULL,
    `proved` bool NOT NULL,
    `group_id` integer NOT NULL,
    `is_admin` bool NOT NULL,
    `user_id` integer NOT NULL
)
;
ALTER TABLE `user_group_request` ADD CONSTRAINT `user_id_refs_id_b78dc6b6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
ALTER TABLE `user_group_request` ADD CONSTRAINT `group_id_refs_id_269f90ae` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
CREATE TABLE `message` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `user_from_id` integer NOT NULL,
    `user_to_id` integer NOT NULL,
    `content` varchar(500) NOT NULL,
    `title` varchar(50) NOT NULL,
    `active` bool NOT NULL,
    `is_group` bool NOT NULL
)
;
ALTER TABLE `message` ADD CONSTRAINT `user_from_id_refs_id_33b67d43` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`);
ALTER TABLE `message` ADD CONSTRAINT `user_to_id_refs_id_33b67d43` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`);
CREATE TABLE `notification` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `user_from_id` integer NOT NULL,
    `user_to_id` integer NOT NULL,
    `content` varchar(500) NOT NULL,
    `title` varchar(50) NOT NULL,
    `active` bool NOT NULL
)
;
ALTER TABLE `notification` ADD CONSTRAINT `user_from_id_refs_id_1c4afeb8` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`);
ALTER TABLE `notification` ADD CONSTRAINT `user_to_id_refs_id_1c4afeb8` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`);
CREATE TABLE `model_request` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `type` varchar(30) NOT NULL,
    `description` varchar(300),
    `creator_id` integer NOT NULL,
    `status` smallint NOT NULL,
    `shared_by` varchar(20),
    `notes` varchar(500),
    `changed_by_id` integer,
    `request_id` varchar(50) NOT NULL
)
;
ALTER TABLE `model_request` ADD CONSTRAINT `creator_id_refs_id_a9ac85af` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
ALTER TABLE `model_request` ADD CONSTRAINT `changed_by_id_refs_id_a9ac85af` FOREIGN KEY (`changed_by_id`) REFERENCES `user` (`id`);
CREATE TABLE `non_system_user_group_map` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `email` varchar(50) NOT NULL,
    `proved` bool NOT NULL,
    `group_id` integer NOT NULL,
    `is_admin` bool NOT NULL,
    `creator_id` integer NOT NULL,
    `status` smallint NOT NULL
)
;
ALTER TABLE `non_system_user_group_map` ADD CONSTRAINT `creator_id_refs_id_3d790477` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
ALTER TABLE `non_system_user_group_map` ADD CONSTRAINT `group_id_refs_id_5cf7ab12` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
CREATE TABLE `instance_group` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `instance_id` integer NOT NULL,
    `group_id` integer NOT NULL,
    `creator_id` integer NOT NULL
)
;
ALTER TABLE `instance_group` ADD CONSTRAINT `creator_id_refs_id_075f3fd9` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`);
ALTER TABLE `instance_group` ADD CONSTRAINT `group_id_refs_id_42d5bad8` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);
ALTER TABLE `instance_group` ADD CONSTRAINT `instance_id_refs_id_6b4c04ea` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`id`);

COMMIT;