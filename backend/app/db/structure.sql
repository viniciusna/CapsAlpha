-- Database: caps_alpha

-- DROP DATABASE IF EXISTS caps_alpha;

CREATE TABLE users (
	id INTEGER PRIMARY KEY,
	email VARCHAR(30),
	name VARCHAR(80),
	password VARCHAR(30)
);

CREATE TABLE documents (
	id CHAR(36) PRIMARY KEY,
	owner INTEGER REFERENCES users (id),
	content TEXT,
	private BOOLEAN
);

CREATE TABLE users_documents (
	document_id CHAR(36) REFERENCES documents (id),
	user_id INTEGER REFERENCES users (id)
);
