create table  if not exists USERS   (
    ID serial primary key,
    first_name varchar(150) NOT NULL,
    last_name varchar(150) NOT NULL
);
