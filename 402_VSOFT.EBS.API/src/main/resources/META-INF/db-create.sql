Use sys;
create database if not exists ebs;

create table if not exists ebs.VS_E_LANGUAGE (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name`       VARCHAR(100) NULL,
    `Value`      VARCHAR(100) NULL,
    `CreatedOn`  DATETIME     NULL,
    `ModifiedOn` DATETIME     NULL
);

create table if not exists ebs.VS_E_SALUTATION (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name`       VARCHAR(100) NULL,
    `Value`      VARCHAR(100) NULL,
    `CreatedOn`  DATETIME     NULL,
    `ModifiedOn` DATETIME     NULL
);

create table if not exists ebs.VS_T_PUBLISHER (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name`       VARCHAR(100) NULL,
    `CreatedOn`  DATETIME     NULL,
    `ModifiedOn` DATETIME     NULL
);

create table if not exists ebs.VS_T_AUTHOR (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Name`       VARCHAR(100) NULL,
    `Createdon`  DATETIME     NULL,
    `Modifiedon` DATETIME     NULL
);

create table if not exists ebs.VS_T_CATEGORY (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Icon`       VARCHAR(100) NULL,
    `Category`   VARCHAR(100) NULL,
    `CreatedOn`  DATETIME     NULL,
    `ModifiedOn` DATETIME     NULL
);

create table if not exists ebs.VS_T_SUBCATEGORY (
    `Id`             Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `Icon`           VARCHAR(100) NULL,
    `Name`           VARCHAR(100) NULL,
    `MainCategoryId` Integer          NULL,
    `CreatedOn`      DATETIME     NULL,
    `ModifiedOn`     DATETIME     NULL,
    FOREIGN KEY (MainCategoryId) REFERENCES VS_T_CATEGORY (Id)
);

create table if not exists ebs.VS_T_ARTICLE (
    `Id`            Integer           NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `LanguageId`    Integer           NULL,
    `PublisherId`   Integer           NULL,
    `AuthorId`      Integer           NULL,
    `SubCategoryId` Integer           NULL,
    `Title`         VARCHAR(100)  NULL,
    `Description`   VARCHAR(1000) NULL,
    `Price`         DOUBLE        NULL,
    `EAN`           VARCHAR(1000) NULL,
    `ReleaseYear`   Integer           NULL,
    `Sites`         Integer           NULL,
    `Stock`         Integer           NOT NULL,
    `CreatedOn`     DATETIME      NULL,
    `ModifiedOn`    DATETIME      NULL,
    FOREIGN KEY (LanguageId) REFERENCES VS_E_LANGUAGE (id),
    FOREIGN KEY (AuthorId) REFERENCES VS_T_AUTHOR (id),
    FOREIGN KEY (SubCategoryId) REFERENCES VS_T_SUBCATEGORY (id),
    FOREIGN KEY (PublisherId) REFERENCES VS_T_PUBLISHER (id)
);

create table if not exists ebs.VS_T_ARTICLE_IMAGES (
    `Id`         Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ArticleId`  Integer          NULL,
    `Image`      BLOB         NULL,
    `Name`       VARCHAR(200) NULL,
    `Type`       VARCHAR(100) NULL,
    `CreatedOn`  DATETIME     NULL,
    `ModifiedOn` DATETIME     NULL,
    FOREIGN KEY (articleid) REFERENCES VS_T_ARTICLE (id)
);

create table if not exists ebs.VS_T_CUSTOMER (
    `Id`           Integer          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `SalutationId` Integer          NULL,
    `Firstname`    VARCHAR(200) NULL,
    `Lastname`     VARCHAR(200) NULL,
    `Organisation` VARCHAR(200) NULL,
    `Street`       VARCHAR(200) NULL,
    `No`           VARCHAR(200) NULL,
    `ZIP`          Integer          NULL,
    `Place`        VARCHAR(200) NULL,
    `Username`     VARCHAR(300) NOT NULL,
    `CreatedOn`    DATETIME     NULL,
    `ModifiedOn`   DATETIME     NULL,
    FOREIGN KEY (SalutationId) REFERENCES VS_E_SALUTATION (id)
);

create table if not exists ebs.VS_T_BUY (
    `Id`         Integer      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `CustomerId` Integer      NULL,
    `BuyDate`    DATETIME NULL,
    `TotalPrice` double   NULL,
    `CreatedOn`  DATETIME NULL,
    `ModifiedOn` DATETIME NULL,
    FOREIGN KEY (CustomerId) REFERENCES VS_T_CUSTOMER (id)
);

create table if not exists ebs.VS_T_BUY_ARTICLE (
    `Id`         Integer      NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `ArticleId`  Integer      NULL,
    `BuyId`      Integer      NULL,
    `CreatedOn`  DATETIME NULL,
    `ModifiedOn` DATETIME NULL,
    FOREIGN KEY (ArticleId) REFERENCES VS_T_ARTICLE (id),
    FOREIGN KEY (BuyId) REFERENCES VS_T_BUY (id)
);

CREATE USER if not exists `ebsuser`@`%` IDENTIFIED BY 'Arun0706!';
GRANT ALL PRIVILEGES ON ebs.* TO 'ebsuser'@'%';
  
  
  