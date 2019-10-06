create table note (
    id integer primary key,
    text text,
    priority integer
);

create sequence note_seq start with 1 increment by 1;