create table noticias(
  id_noticia integer auto_increment,
  subTitulo varchar(255),
  linkNoticia varchar(255) not null,
  linkImagem varchar(255),
  titulo varchar(255) not null,
  primary key (id_noticia)
);

create table noticias_relacionadas(
  id_noticias_relacionadas integer auto_increment not null,
  id_noticia integer not null,
  link_noticia varchar(255),
  titulo varchar(255) not null,
  primary key (id_noticias_relacionadas),
  foreign key (id_noticia) references noticias (id_noticia)
);