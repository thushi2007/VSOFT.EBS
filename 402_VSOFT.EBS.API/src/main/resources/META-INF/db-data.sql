insert into ebs.VS_E_LANGUAGE(Name, Value, CreatedOn, ModifiedOn) values ('deutsch', 'Deutsch', now(), now());
insert into ebs.VS_E_LANGUAGE(Name, Value, CreatedOn, ModifiedOn) values ('englisch', 'English', now(), now());
insert into ebs.VS_E_LANGUAGE(Name, Value, CreatedOn, ModifiedOn) values ('franzoesisch', 'Französisch', now(), now());

insert into ebs.VS_E_SALUTATION(Name, Value, CreatedOn, ModifiedOn) values ('frau', 'Frau', now(), now());
insert into ebs.VS_E_SALUTATION(Name, Value, CreatedOn, ModifiedOn) values ('herr', 'Herr', now(), now());
insert into ebs.VS_E_SALUTATION(Name, Value, CreatedOn, ModifiedOn) values ('familie', 'Familie', now(), now());
insert into ebs.VS_E_SALUTATION(Name, Value, CreatedOn, ModifiedOn) values ('firma', 'Firma', now(), now());

insert into ebs.VS_T_PUBLISHER(Name, CreatedOn, ModifiedOn) values ('Droemer Knaur Verlag', now(), now());
insert into ebs.VS_T_PUBLISHER(Name, CreatedOn, ModifiedOn) values ('Random House ebook', now(), now());
insert into ebs.VS_T_PUBLISHER(Name, CreatedOn, ModifiedOn) values ('Suhrkamp Verlag AG', now(), now());

insert into ebs.VS_T_AUTHOR(Name, CreatedOn, ModifiedOn) values ('Sebastian Fitzek', now(), now());
insert into ebs.VS_T_AUTHOR(Name, CreatedOn, ModifiedOn) values ('Charlotte Link', now(), now());
insert into ebs.VS_T_AUTHOR(Name, CreatedOn, ModifiedOn) values ('Evan Osnos', now(), now());

insert into ebs.VS_T_CATEGORY(Category, CreatedOn, ModifiedOn) values ('Romane & Erzählungen', now(), now());
insert into ebs.VS_T_CATEGORY(Category, CreatedOn, ModifiedOn) values ('Krimis & Thriller', now(), now());
insert into ebs.VS_T_CATEGORY(Category, CreatedOn, ModifiedOn) values ('Fantasy & Science Fiction', now(), now());
insert into ebs.VS_T_CATEGORY(Category, CreatedOn, ModifiedOn) values ('Reise & Abenteuer', now(), now());
insert into ebs.VS_T_CATEGORY(Category, CreatedOn, ModifiedOn) values ('Sachbücher', now(), now());

insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Liebesromane', 1, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Historische Romane', 1, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Historische Krimis', 2, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Krimis', 2, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Thriller', 2, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Fantasy', 3, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Science Fiction', 3, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Reise', 4, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Abenteuer', 4, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Politik, Wirtschaft & Gesellschaft', 5, now(), now());
insert into ebs.VS_T_SUBCATEGORY(Name, MainCategoryId, CreatedOn, ModifiedOn) values ('Geschichte', 5, now(), now());

insert into ebs.VS_T_ARTICLE(LanguageId, PublisherId, AuthorId, SubCategoryId, Title, Description, Price, EAN, ReleaseYear, Sites, Stock, CreatedOn, ModifiedOn) values (1, 1, 1, 4, 'Der Heimweg', 'Wer das Datum seines Todes kennt, hat mit dem Sterben schon begonnen - der neue Bestseller von Sebastian Fitzek!', 16, '9783426439838', 2020, 400, 50, now(), now());
insert into ebs.VS_T_ARTICLE(LanguageId, PublisherId, AuthorId, SubCategoryId, Title, Description, Price, EAN, ReleaseYear, Sites, Stock, CreatedOn, ModifiedOn) values (1, 2, 2, 2, 'Ohne Schuld', 'Wenn dich die Angst dein Leben lang verfolgt, weil du zu viel weisst ...', 29.90, '9783641263140', 2020, 544, 30, now(), now());
insert into ebs.VS_T_ARTICLE(LanguageId, PublisherId, AuthorId, SubCategoryId, Title, Description, Price, EAN, ReleaseYear, Sites, Stock, CreatedOn, ModifiedOn) values (1, 3, 3, 10, 'Joe Biden', 'Das erste deutschsprachige Buch über den Präsidentschaftskandidaten Joe Biden', 18, '9783518769188', 2020, 263, 10, now(), now());


insert into ebs.VS_T_CUSTOMER(SalutationId, Firstname, Lastname, Organisation, Street, No, ZIP, Place, Username, CreatedOn, ModifiedOn) VALUES (1, 'Thamilini', 'Vickneswaranathan', 'Immosketch GmbH', 'Chrummatt', '16', 3175, 'Flamatt', 'thushi2007@hotmail.com', now(), now());

  
  
  