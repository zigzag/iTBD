CREATE TABLE "schema_migrations" ("version" varchar(255) NOT NULL);
CREATE TABLE "tasks" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar(255), "done" boolean, "created_at" datetime, "updated_at" datetime, "active" boolean, "priority" integer);
CREATE TABLE "timelogs" ("id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, "start_at" datetime, "date" date, "task_id" integer, "created_at" datetime, "updated_at" datetime, "task_name" varchar(255));
CREATE UNIQUE INDEX "unique_schema_migrations" ON "schema_migrations" ("version");
INSERT INTO schema_migrations (version) VALUES ('20100214122720');

INSERT INTO schema_migrations (version) VALUES ('20100117085530');

INSERT INTO schema_migrations (version) VALUES ('20100116115652');

INSERT INTO schema_migrations (version) VALUES ('20100117085306');

INSERT INTO schema_migrations (version) VALUES ('20100117091901');

INSERT INTO schema_migrations (version) VALUES ('20100116115454');