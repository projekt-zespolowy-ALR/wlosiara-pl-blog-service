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

CREATE TABLE comments (
	id UUID DEFAULT uuid_generate_v4() NOT NULL,
	author_id UUID NOT NULL,
	post_id UUID NOT NULL,
	text TEXT NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (post_id) REFERENCES posts(id)
);
