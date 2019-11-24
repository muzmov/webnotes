alter table note add context text;
alter table note add time_estimation integer;

comment on table note is 'Заметки';
comment on column note.id is 'Идентификатор';
comment on column note.text is 'Текст';
comment on column note.priority is 'Приоритет';
comment on column note.context is 'Контекст';
comment on column note.time_estimation is 'Оценка времени';