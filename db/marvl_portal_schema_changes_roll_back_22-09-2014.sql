BEGIN;
USE `marvl_portal`;
DROP INDEX `user_group_06e01e5f` ON `user_group`;
DROP INDEX `user_4da47e07` ON `user`;
DROP INDEX `group_4da47e07` ON `group`;
DROP INDEX `instance_4da47e07` ON `instance`;
COMMIT;