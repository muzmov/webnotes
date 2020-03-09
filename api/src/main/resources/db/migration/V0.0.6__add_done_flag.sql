alter table task add is_done boolean not null default false;

comment on column task.is_done is 'Задача сделана';