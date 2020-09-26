Use sys;
create database if not exists ebs;

create table if not exists `ebs`.`VS_E_SPRACHE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `sprache` VARCHAR(100) NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  PRIMARY KEY (`id`));
  
insert into `ebs`.`VS_E_SPRACHE`(`sprache`,`erstelltam`,`geaendertam`)
values ('deutsch', now(), now());

insert into `ebs`.`VS_E_SPRACHE`(`sprache`,`erstelltam`,`geaendertam`)
values ('english', now(), now());

create table if not exists `ebs`.`VS_T_HERSTELLER` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `verlag` VARCHAR(100) NULL,
  `name` VARCHAR(100) NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  PRIMARY KEY (`id`));
  
create table if not exists `ebs`.`VS_T_KATEGORIE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `icon` VARCHAR(100) NULL,
  `stext` VARCHAR(100) NULL,
  `kategorie` VARCHAR(100) NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  PRIMARY KEY (`id`));
  
create table if not exists `ebs`.`VS_T_SUBKATEGORIE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `icon` VARCHAR(100) NULL,
  `stext` VARCHAR(100) NULL,
  `SubKategorie` VARCHAR(100) NULL,
  `mainkategorieid` INT NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  FOREIGN KEY (mainkategorieid) REFERENCES VS_T_KATEGORIE(id),
  PRIMARY KEY (`id`));

create table if not exists `ebs`.`VS_T_ARTIKEL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `spracheid` INT NULL,
  `herstellerid` INT NULL,
  `title` VARCHAR(100) NULL,
  `foto` BLOB NULL,
  `beschreibung` VARCHAR(1000) NULL,
  `preis` DOUBLE NULL,
  `isbn` VARCHAR(1000) NULL,
  `erscheinungsjahr` INT NULL,
  `seitenanzahl` INT NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  FOREIGN KEY (spracheid) REFERENCES VS_E_SPRACHE(id),
  FOREIGN KEY (herstellerid) REFERENCES VS_T_HERSTELLER(id),
  PRIMARY KEY (`id`));
  
  create table if not exists `ebs`.`VS_T_ARTIKEL_SUBKATEGORIE` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artikelid` INT NULL,
  `subkategorieid` INT NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
   FOREIGN KEY (artikelid) REFERENCES VS_T_ARTIKEL(id),
   FOREIGN KEY (subkategorieid) REFERENCES VS_T_SUBKATEGORIE(id),
  PRIMARY KEY (`id`));
  
  create table if not exists `ebs`.`VS_T_PERSON` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vorname` VARCHAR(200) NULL,
  `nachname` VARCHAR(200) NULL,
  `organisation` VARCHAR(200) NULL,
  `strasse` VARCHAR(200) NULL,
  `hausnr` VARCHAR(200) NULL,
  `plz` int NULL,
  `ort` VARCHAR(200) NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  PRIMARY KEY (`id`));
  
  create table if not exists `ebs`.`VS_T_VERKAUF` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `kaeuferid` INT NULL,
  `kaufdatum` DATETIME NULL,
  `totalchf` double NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
  FOREIGN KEY (kaeuferid) REFERENCES VS_T_PERSON(id),
  PRIMARY KEY (`id`));
  
create table if not exists `ebs`.`VS_T_VERKAUF_ARTIKEL` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `artikelid` INT NULL,
  `verkaufid` INT NULL,
  `erstelltam` DATETIME NULL,
  `geaendertam` DATETIME NULL,
   FOREIGN KEY (artikelid) REFERENCES VS_T_ARTIKEL(id),
   FOREIGN KEY (verkaufid) REFERENCES VS_T_VERKAUF(id),
  PRIMARY KEY (`id`));
  