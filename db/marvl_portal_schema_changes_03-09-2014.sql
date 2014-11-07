USE marvl_portal;

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