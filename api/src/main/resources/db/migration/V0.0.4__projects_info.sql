-- Проекты
create table project
(
    id    integer primary key,
    title text not null,
    username varchar(32) not null references users (username)
);

create sequence project_seq start with 1 increment by 1;

comment on table project is 'Проекты';
comment on column project.id is 'Идентификатор';
comment on column project.title is 'Название';
comment on column project.username is 'Пользователь';


-- Задачи
alter table note
    rename to task;
alter table task
    add project_id integer references project (id);
alter table task
    add username varchar(32) references users (username);

comment on column task.username is 'Пользователь';

update task set username = 'leshiffre';

alter table task alter column username set not null;

create sequence task_seq start with 1 increment by 1;
select setval('task_seq', nextval('note_seq'));


-- Заметки
create table note
(
    id         integer primary key,
    text       text    not null,
    username   varchar(32) not null references users (username),
    task_id    integer references task (id),
    project_id integer references project (id)
);

comment on table note is 'Заметки';
comment on column note.id is 'Идентификатор';
comment on column note.text is 'Текст заметки';
comment on column note.username is 'Пользователь';
comment on column note.task_id is 'Задача';
comment on column note.project_id is 'Проект';

select setval('note_seq', 1);
