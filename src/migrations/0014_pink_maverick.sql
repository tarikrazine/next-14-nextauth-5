CREATE TABLE `two_factor_auth` (
	`id` text NOT NULL,
	`user_id` text PRIMARY KEY NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `two_factor_token` (
	`id` text NOT NULL,
	`email` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL,
	PRIMARY KEY(`email`, `token`)
);
--> statement-breakpoint
ALTER TABLE user ADD `is_two_factor_enabled` integer DEFAULT false NOT NULL;