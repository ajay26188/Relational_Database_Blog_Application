blog_database=# CREATE TABLE blogs (id SERIAL PRIMARY KEY, author text, url text NOT NULL, title text NOT NULL, likes integer DEFAULT 0);


insert into blogs (author, url, title) values ('Dan Abramov', 'letvsconst.com', 'On let vs const');

insert into blogs (author, url, title) values ('Laurenz Albe', 'postgreSQL.com', 'Gaps in sequences in PostgreSQL');