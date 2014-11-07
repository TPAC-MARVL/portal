BEGIN;
USE `marvl_portal`;
CREATE INDEX `user_group_06e01e5f` ON `user_group` (`group_id`, `is_admin`);
CREATE INDEX `user_4da47e07` ON `user` (`name`);
CREATE INDEX `group_4da47e07` ON `group` (`name`);
CREATE INDEX `instance_4da47e07` ON `instance` (`name`);
COMMIT;