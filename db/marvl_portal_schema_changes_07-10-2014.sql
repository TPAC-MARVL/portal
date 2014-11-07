use marvl_portal;
CREATE TABLE `security_token` (
    `id` integer AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `created` datetime NOT NULL,
    `modified` datetime NOT NULL,
    `token` varchar(36),
    `instance_id` integer NOT NULL,
    `client_id` integer NOT NULL
)
;
ALTER TABLE `security_token` ADD CONSTRAINT `instance_id_refs_id_7a7896b9` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`id`);
ALTER TABLE `security_token` ADD CONSTRAINT `client_id_refs_id_cbe00292` FOREIGN KEY (`client_id`) REFERENCES `user` (`id`);
CREATE INDEX `security_token_19349866` ON `security_token` (`instance_id`);
CREATE INDEX `security_token_4fea5d6a` ON `security_token` (`client_id`);
