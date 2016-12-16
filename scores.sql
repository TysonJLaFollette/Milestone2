DROP DATABASE IF EXISTS scores;
CREATE DATABASE scores;

\c scores;

CREATE TABLE hiscores (
  ID SERIAL PRIMARY KEY,
  name VARCHAR,
  score INTEGER
);

INSERT INTO hiscores (name, score)
  VALUES ('Tyler', 4), ('Susan', 4), ('Kyle', 3), ('Anna', 2), ('Batman13', 1);