CREATE TABLE TB_Usuarios (
  id int Unsigned Auto_Increment Primary Key,
  nome Varchar(255) Not Null,
  cpf Varchar(60) Not Null Unique,
  email Varchar(60) Not Null Unique,
  login Varchar(60) Not Null Unique,
  senha Varchar(60) Not Null,
  localizacao_atual Varchar(255),
  rua Varchar(60),
  numero Varchar(60),
  bairro Varchar(60),
  cep Varchar(60),
  estado Varchar(60),
  pais Varchar(60),
  complemento Varchar(255),
  foto_perfil Varchar(60)
 );

CREATE TABLE TB_Estabelecimentos (
  id int Unsigned Auto_Increment Primary Key,
  nome Varchar(255) Not Null,
  cnpj Varchar(60) Not Null Unique,
  email Varchar(60) Not Null Unique,
  login Varchar(60) Not Null Unique,
  senha Varchar(60) Not Null,
  rua Varchar(60) Not Null,
  numero Varchar(60) Not Null,
  bairro Varchar(60) Not Null,
  cep Varchar(60) Not Null,
  estado Varchar(60) Not Null,
  pais Varchar(60) Not Null,
  complemento Varchar(255),
  rankingAgilidade double,
  rankingCustoBeneficio double,
  rankingServico double
);

CREATE TABLE TB_Categorias (
  id int Unsigned Auto_Increment Primary Key,
  categoria Varchar (60) not null
);

CREATE TABLE TB_Fotos_Estabelecimentos (
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  foto Varchar(60) not null,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade
);

CREATE TABLE TB_Telefones_Usuarios (
  id int Unsigned Auto_Increment Primary Key,
  id_usuarios int Unsigned not null,
  telefone Varchar(60) not null,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);

CREATE TABLE TB_Telefones_Estabelecimentos (
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  telefone Varchar(60) not null,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade
);

CREATE TABLE TB_Estabelecimentos_Categorias (
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_categorias int Unsigned not null,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade, 
  Foreign Key (id_categorias) References TB_Categorias(id) on update cascade on delete cascade
);

CREATE TABLE TB_Comentarios (
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_usuarios int Unsigned not null,
  comentario Varchar(510),
  data_hora Datetime,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);


CREATE TABLE TB_Servicos (
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_usuarios int Unsigned not null,
  descricao Varchar(510),
  valor double not null,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);

CREATE TABLE TB_Av_Agilidade(
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_usuarios int Unsigned not null,
  nota int,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);

CREATE TABLE TB_Av_CustoBeneficio(
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_usuarios int Unsigned not null,
  nota int,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);

CREATE TABLE TB_Av_Servico(
  id int Unsigned Auto_Increment Primary Key,
  id_estabelecimentos int Unsigned not null,
  id_usuarios int Unsigned not null,
  nota int,
  Foreign Key (id_estabelecimentos) References TB_Estabelecimentos(id) on update cascade on delete cascade,
  Foreign Key (id_usuarios) References TB_Usuarios(id) on update cascade on delete cascade
);
