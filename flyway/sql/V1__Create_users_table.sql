create table  if not exists USERS   (
    ID serial primary key,
    username varchar(50) NOT NULL UNIQUE,
    password varchar(150) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    role varchar(10)  DEFAULT 'USER'
);
