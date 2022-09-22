CREATE TABLE users(
	id serial not null,
	name varchar(60) not null,
	email varchar(60) not null,
	password varchar(100) not null,
	created_at TIMESTAMP  not null default now(),
	updated_at TIMESTAMP  not null default now(),
	PRIMARY KEY (id)
);
  
CREATE TABLE documents(
	id varchar(60),
	PRIMARY KEY (id),
	title varchar(60) not null default 'title',
	owner integer not null,
	content text not null default ' ',
	private boolean,
	created_at TIMESTAMP  not null default now(),
	updated_at TIMESTAMP  not null default now(),
	FOREIGN KEY (owner) REFERENCES users (id)
);

CREATE TABLE users_documents(
	document_id varchar(60),
	user_id integer,
	FOREIGN KEY (user_id) REFERENCES users (id),
	FOREIGN KEY (document_id) REFERENCES documents (id)
);
