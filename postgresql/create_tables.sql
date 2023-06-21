CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE posts (
	id UUID DEFAULT uuid_generate_v4() NOT NULL,
	content_md TEXT NOT NULL,
	author_id UUID NOT NULL,
	title TEXT NOT NULL,
	image_url TEXT NOT NULL,
	type TEXT NOT NULL,
	PRIMARY KEY (id)
);
