Use sys;
create database if not exists ebs;

create table if not exists `ebs`.`VS_E_LANGUAGE` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `Value` VARCHAR(100) NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_E_LANGUAGE`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('deutsch', 'Deutsch', now(), now());

insert into `ebs`.`VS_E_LANGUAGE`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('englisch', 'English', now(), now());

insert into `ebs`.`VS_E_LANGUAGE`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('franzoesisch', 'Französisch', now(), now());

create table if not exists `ebs`.`VS_E_SALUTATION` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `Value` VARCHAR(100) NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_E_SALUTATION`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('frau', 'Frau', now(), now());

insert into `ebs`.`VS_E_SALUTATION`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('herr', 'Herr', now(), now());

insert into `ebs`.`VS_E_SALUTATION`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('familie', 'Familie', now(), now());

insert into `ebs`.`VS_E_SALUTATION`(`Name`, `Value`, `CreatedOn`,`ModifiedOn`)
values ('firma', 'Firma', now(), now());

create table if not exists `ebs`.`VS_T_PUBLISHER` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));

insert into `ebs`.`VS_T_PUBLISHER`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Droemer Knaur Verlag', now(), now());  

insert into `ebs`.`VS_T_PUBLISHER`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Random House ebook', now(), now());   

insert into `ebs`.`VS_T_PUBLISHER`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Suhrkamp Verlag AG', now(), now());   

create table if not exists `ebs`.`VS_T_AUTHOR` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Name` VARCHAR(100) NULL,
  `Createdon` DATETIME NULL,
  `Modifiedon` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_T_AUTHOR`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Sebastian Fitzek', now(), now()); 

insert into `ebs`.`VS_T_AUTHOR`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Charlotte Link', now(), now());

insert into `ebs`.`VS_T_AUTHOR`(`Name`, `CreatedOn`,`ModifiedOn`)
values ('Evan Osnos', now(), now());
  
create table if not exists `ebs`.`VS_T_CATEGORY` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Icon` VARCHAR(100) NULL,
  `Category` VARCHAR(100) NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_T_CATEGORY`(`Category`, `CreatedOn`,`ModifiedOn`)
values ('Romane & Erzählungen', now(), now());

insert into `ebs`.`VS_T_CATEGORY`(`Category`, `CreatedOn`,`ModifiedOn`)
values ('Krimis & Thriller', now(), now());

insert into `ebs`.`VS_T_CATEGORY`(`Category`, `CreatedOn`,`ModifiedOn`)
values ('Fantasy & Science Fiction', now(), now());

insert into `ebs`.`VS_T_CATEGORY`(`Category`, `CreatedOn`,`ModifiedOn`)
values ('Reise & Abenteuer', now(), now());

insert into `ebs`.`VS_T_CATEGORY`(`Category`, `CreatedOn`,`ModifiedOn`)
values ('Sachbücher', now(), now());
  
create table if not exists `ebs`.`VS_T_SUBCATEGORY` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `Icon` VARCHAR(100) NULL, 
  `Name` VARCHAR(100) NULL,
  `MainCategoryId` INT NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  FOREIGN KEY (MainCategoryId) REFERENCES VS_T_CATEGORY(Id),
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Liebesromane', 1, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Historische Romane', 1, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Historische Krimis', 2, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Krimis', 2, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Thriller', 2, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Fantasy', 3, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Science Fiction', 3, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Reise', 4, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Abenteuer', 4, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Politik, Wirtschaft & Gesellschaft', 5, now(), now());

insert into `ebs`.`VS_T_SUBCATEGORY`(`Name`, `MainCategoryId`, `CreatedOn`,`ModifiedOn`)
values ('Geschichte', 5, now(), now());

create table if not exists `ebs`.`VS_T_ARTICLE` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `LanguageId` INT NULL,
  `PublisherId` INT NULL,
  `AuthorId` INT NULL,
  `SubCategoryId` INT NULL,
  `Title` VARCHAR(100) NULL,
  `Description` VARCHAR(1000) NULL,
  `Price` DOUBLE NULL,
  `EAN` VARCHAR(1000) NULL,
  `ReleaseYear` INT NULL,
  `Sites` INT NULL,
  `Stock` INT NOT NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  FOREIGN KEY (LanguageId) REFERENCES VS_E_LANGUAGE(id),
  FOREIGN KEY (AuthorId) REFERENCES VS_T_AUTHOR(id),
  FOREIGN KEY (SubCategoryId) REFERENCES VS_T_SUBCATEGORY(id),
  FOREIGN KEY (PublisherId) REFERENCES VS_T_PUBLISHER(id),
  PRIMARY KEY (`Id`));
  
insert into `ebs`.`VS_T_ARTICLE`(`LanguageId`, `PublisherId`, `AuthorId`, `SubCategoryId`, `Title`, `Description`, `Price`, `EAN`, `ReleaseYear`, `Sites`, `Stock`, `CreatedOn`, `ModifiedOn`)
values (1, 1, 1, 4, 'Der Heimweg', 'Wer das Datum seines Todes kennt, hat mit dem Sterben schon begonnen - der neue Bestseller von Sebastian Fitzek!', 16, '9783426439838', 2020, 400, 50, now(), now());

insert into `ebs`.`VS_T_ARTICLE`(`LanguageId`, `PublisherId`, `AuthorId`, `SubCategoryId`, `Title`, `Description`, `Price`, `EAN`, `ReleaseYear`, `Sites`, `Stock`, `CreatedOn`, `ModifiedOn`)
values (1, 2, 2, 2, 'Ohne Schuld', 'Wenn dich die Angst dein Leben lang verfolgt, weil du zu viel weisst ...', 29.90, '9783641263140', 2020, 544, 30, now(), now());  

insert into `ebs`.`VS_T_ARTICLE`(`LanguageId`, `PublisherId`, `AuthorId`, `SubCategoryId`, `Title`, `Description`, `Price`, `EAN`, `ReleaseYear`, `Sites`, `Stock`, `CreatedOn`, `ModifiedOn`)
values (1, 3, 3, 10, 'Joe Biden', 'Das erste deutschsprachige Buch über den Präsidentschaftskandidaten Joe Biden', 18, '9783518769188', 2020, 263, 10, now(), now());  
  
  create table if not exists `ebs`.`VS_T_ARTICLE_IMAGES` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ArticleId` INT NULL,
  `Image` BLOB NULL,
  `Name` VARCHAR(200) NULL,
  `Type` VARCHAR(100) NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  FOREIGN KEY (articleid) REFERENCES VS_T_ARTICLE(id),
  PRIMARY KEY (`Id`));
  
  create table if not exists `ebs`.`VS_T_CUSTOMER` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `SalutationId` int NULL,
  `Firstname` VARCHAR(200) NULL,
  `Lastname` VARCHAR(200) NULL,
  `Organisation` VARCHAR(200) NULL,
  `Street` VARCHAR(200) NULL,
  `No` VARCHAR(200) NULL,
  `ZIP` int NULL,
  `Place` VARCHAR(200) NULL,
  `Username` VARCHAR(300) NOT NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
   FOREIGN KEY (SalutationId) REFERENCES VS_E_SALUTATION(id),
  PRIMARY KEY (`Id`));
  
  create table if not exists `ebs`.`VS_T_BUY` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `CustomerId` INT NULL,
  `BuyDate` DATETIME NULL,
  `TotalPrice` double NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
  FOREIGN KEY (CustomerId) REFERENCES VS_T_CUSTOMER(id),
  PRIMARY KEY (`Id`));
  
create table if not exists `ebs`.`VS_T_BUY_ARTICLE` (
  `Id` INT NOT NULL AUTO_INCREMENT,
  `ArticleId` INT NULL,
  `BuyId` INT NULL,
  `CreatedOn` DATETIME NULL,
  `ModifiedOn` DATETIME NULL,
   FOREIGN KEY (ArticleId) REFERENCES VS_T_ARTICLE(id),
   FOREIGN KEY (BuyId) REFERENCES VS_T_BUY(id),
  PRIMARY KEY (`Id`));
  