create table  if not exists SCHEDULE   (
    ID serial primary key,
    user_id BIGINT,
    schedule_id BIGINT,
);
