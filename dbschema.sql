CREATE TABLE item(
  id SERIAL PRIMARY KEY,
  task VARCHAR( 3000 ),
  is_complete BOOLEAN DEFAULT false,
  list_order SERIAL
);

INSERT INTO item( task )
VALUES ( 'sleep' )
