create table  if not exists SCHEDULE   (
    ID serial primary key,
    user_id BIGINT REFERENCES USERS (id),
    record_id BIGINT,
    note VARCHAR(300),
    UNIQUE (user_id, record_id) on DELETE CASCADE
);
