CREATE TABLE `passwordResetToken` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`email`, `token`)
);
