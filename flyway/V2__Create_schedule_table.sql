create table  if not exists SCHEDULE   (
    ID serial primary key,
    user_id int,
    schedule_id bigint,
);
