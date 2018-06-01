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
  cidade Varchar(60),
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
  cidade Varchar(60) Not Null,
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

/*Funcoes para Calcular a media*/

delimiter $$
create function media_agilidade (identificador INT) returns INT
begin
  return (select avg(A.nota) from tb_av_agilidade as A where A.id_estabelecimentos = identificador);
end;
$$

delimiter $$
create function media_custo (identificador INT) returns INT
begin
  return (select avg(C.nota) from tb_av_custobeneficio as C where C.id_estabelecimentos = identificador);
end;
$$

delimiter $$
create function media_servico (identificador INT) returns INT
begin
  return (select avg(S.nota) from tb_av_servico as S where S.id_estabelecimentos = identificador);
end;
$$


/*Ranking de agilidade*/
delimiter $$
CREATE  TRIGGER  Media_Av_Agilidade_Ins AFTER insert ON TB_Av_Agilidade FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingAgilidade = (select media_agilidade(E.id));
end$$ /* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_Agilidade_Up AFTER update ON TB_Av_Agilidade FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingAgilidade = (select media_agilidade(E.id));
end$$ /* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_Agilidade_Del AFTER Delete ON TB_Av_Agilidade FOR each ROW
begin
    update tb_estabelecimentos as E
    set E.rankingAgilidade = (select media_agilidade(E.id)); 
end$$ /* testado ok*/


/*Ranking de Custoxbeneficio*/
delimiter $$
CREATE  TRIGGER  Media_Av_custobeneficio_Ins AFTER insert ON tb_av_custobeneficio FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingCustoBeneficio = (select media_custo(E.id));   
end$$ /* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_custobeneficio_Up AFTER update ON tb_av_custobeneficio FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingCustoBeneficio = (select media_custo(E.id));
end$$ /* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_custobeneficio_Del AFTER Delete ON tb_av_custobeneficio FOR each ROW
begin 
    update tb_estabelecimentos as E
    set E.rankingCustoBeneficio = (select media_custo(E.id));    
end$$ /* testado ok*/


/*Ranking de servico*/
delimiter $$
CREATE  TRIGGER  Media_Av_servico_Ins AFTER insert ON tb_av_servico FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingServico = (select media_servico(E.id));   
end$$ /* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_servico_Up AFTER update ON tb_av_servico FOR each ROW
begin
  update tb_estabelecimentos as E
    set E.rankingServico = (select media_servico(E.id));
end$$/* testado ok*/

delimiter $$
CREATE  TRIGGER  Media_Av_servico_Del AFTER Delete ON tb_av_servico FOR each ROW
begin
    update tb_estabelecimentos as E
    set E.rankingServico = (select media_servico(E.id));  
end$$/* testado ok*/

