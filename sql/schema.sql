CREATE TABLE bins (
  id serial PRIMARY KEY,
  path varchar(255) NOT NULL,
  created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE TABLE requests (
  id serial PRIMARY KEY,
  bin_id integer REFERENCES bins(id) ON DELETE CASCADE,
  http_method varchar(8),
  content_type_header varchar(255),
  content_length_header varchar(255),
  headers json,
  payload json,
  created_at timestamp NOT NULL DEFAULT NOW()
);
