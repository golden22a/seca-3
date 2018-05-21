 ALTER TABLE todos
 ADD COLUMN user_id integer;

 ALTER TABLE todos
   ADD CONSTRAINT fk_todos
   FOREIGN KEY (user_id)
   REFERENCES users(ID) ON DELETE CASCADE;
