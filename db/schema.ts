import { sqliteTable, text, integer, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
export const inquiries=sqliteTable('inquiries',{
 id:text('id').primaryKey(),requestId:text('request_id').notNull(),name:text('name').notNull(),email:text('email').notNull(),phone:text('phone'),service:text('service').notNull(),message:text('message').notNull(),ipHash:text('ip_hash').notNull(),createdAt:integer('created_at').notNull(),
},table=>[uniqueIndex('inquiries_request_id_unique').on(table.requestId),index('inquiries_ip_created_idx').on(table.ipHash,table.createdAt)]);
