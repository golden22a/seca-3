CREATE TABLE if not exists todos  (
  ID serial primary key ,
  title varchar(120) NOT NULL,
  done boolean default FALSE
);
