CREATE TABLE `visits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`occurred_at` integer NOT NULL,
	`visitor_id` text NOT NULL,
	`path` text NOT NULL,
	`country` text,
	`region` text,
	`city` text,
	`device` text NOT NULL,
	`browser` text NOT NULL,
	`referrer_domain` text
);
--> statement-breakpoint
CREATE INDEX `visits_occurred_at_idx` ON `visits` (`occurred_at`);--> statement-breakpoint
CREATE INDEX `visits_visitor_id_idx` ON `visits` (`visitor_id`);