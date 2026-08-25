import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const visits = sqliteTable(
  "visits",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    occurredAt: integer("occurred_at", { mode: "timestamp_ms" }).notNull(),
    visitorId: text("visitor_id").notNull(),
    path: text("path").notNull(),
    country: text("country"),
    region: text("region"),
    city: text("city"),
    device: text("device").notNull(),
    browser: text("browser").notNull(),
    referrerDomain: text("referrer_domain"),
  },
  (table) => [
    index("visits_occurred_at_idx").on(table.occurredAt),
    index("visits_visitor_id_idx").on(table.visitorId),
  ],
);
