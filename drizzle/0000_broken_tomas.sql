CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`request_id` text NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text,
	`service` text NOT NULL,
	`message` text NOT NULL,
	`ip_hash` text NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `inquiries_request_id_unique` ON `inquiries` (`request_id`);--> statement-breakpoint
CREATE INDEX `inquiries_ip_created_idx` ON `inquiries` (`ip_hash`,`created_at`);