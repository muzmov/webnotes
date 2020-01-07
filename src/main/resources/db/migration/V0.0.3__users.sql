create table users
(
    username varchar(32)      primary key,
    password text              not null,
    enabled  boolean default true not null
);

comment on table users is 'Пользователи';
comment on column users.username is 'Логин';
comment on column users.password is 'Пароль';
comment on column users.enabled is 'Учетная запись включена';


insert into users (username, password) values ('leshiffre', '$2a$10$YWBXs1Hze1Rvh.p/dIYM8uOCdAK71H8YXBGKt8nBzVQeWqFhCdKmK');
insert into users (username, password) values ('leshiffre1', '$2a$10$YWBXs1Hze1Rvh.p/dIYM8uOCdAK71H8YXBGKt8nBzVQeWqFhCdKmK');


