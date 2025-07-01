### WebUser
    - ID
    - Email
    - UserPassword
    - Name
    - LastName
    - Address
    - Phone
    - remember_token
    - created_at
    - updated_at
    - deleted_at

CREATE TABLE webuser (
 	ID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Email varchar(255) NOT NULL,
    UserPassword varchar(1024) NOT NULL,
    Name varchar(255) NOT NULL,
    LastName varchar(255),
    Address varchar(255),
    Phone varchar(24),
    ID_ProfileType int DEFAULT 2,
    remember_token varchar(255),
    created_at datetime,
    updated_at datetime,
    deleted_at datetime,

    CONSTRAINT ID_ProfileType FOREIGN KEY (ID_ProfileType) REFERENCES profiletype(ID)
);


### Profile Avatar
    - ID
    - FileName
    - HomePath
    - PublicPath
    - FileSizeKB
    - ID_WebUser

CREATE TABLE profileavatar (
 	ID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    FileName varchar(255) NOT NULL,
    HomePath varchar(255) NOT NULL,
    PublicPath varchar(255) NOT NULL,
    FileSizeKB int DEFAULT 0, 
    ID_WebUser int NOT NULL,
    
    CONSTRAINT ID_WebUser FOREIGN KEY (ID_WebUser) REFERENCES WebUser(ID)
)


### Profile Type
    - ID
    - Name
    - Description

CREATE TABLE profiletype (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Name varchar(64) NOT NULL,
    Description varchar(256)
);


### Product Category
    - ID
    - Name
    - Description

CREATE TABLE productcategory (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Name varchar(64) NOT NULL,
    Description varchar(256)
)


### Brand
    - ID
    - Name
    - Description

CREATE TABLE brand (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Name varchar(64) NOT NULL,
    Description varchar(256)
)

### BrandLogo
    - ID
    - Name

CREATE TABLE brandlogo (
 	ID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    FileName varchar(255) NOT NULL,
    HomePath varchar(255) NOT NULL,
    PublicPath varchar(255) NOT NULL,
    FileSizeKB int DEFAULT 0, 
    ID_Brand int NOT NULL,
    
    CONSTRAINT ID_Brand FOREIGN KEY (ID_Brand) REFERENCES brand(ID)
)


### Product
    - ID
    - Name
    - Description
    - Price
    - ID_ProductCategory
    - ID_Brand
    - URI
    - created_at
    - updated_at
    - deleted_at

CREATE TABLE product (
 	ID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Description varchar(1024),
    Price decimal(10,2) default 0,
    ID_Brand int NOT NULL,
    ID_ProductCategory int NOT NULL,
    URI varchar(2048) NOT NULL,
    
    CONSTRAINT ID_ProductCategory FOREIGN KEY (ID_ProductCategory) REFERENCES productcategory(ID),
    CONSTRAINT ID_Brand FOREIGN KEY (ID_Brand) REFERENCES brand(ID)
)
    

### Product Media
    - ID
    - FileName
    - HomePath
    - PublicPath
    - FileSize
    - MediaExtension

CREATE TABLE productmedia (
 	ID int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    FileName varchar(255) NOT NULL,
    HomePath varchar(255) NOT NULL,
    PublicPath varchar(255) NOT NULL,
    FileSizeKB int DEFAULT 0, 
    ID_Product int NOT NULL,
    MediaExtension varchar(64) NOT NULL
    
    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID)
)


### Product Stock
    - ID
    - Stock
    - ID_Product

CREATE TABLE productstock (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Stock int DEFAULT 0,
    ID_Product int NOT NULL,
    
    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID)
)
    

### Product in Cart
    - ID
    - ID_Product
    - ID_WebUser
    - Quantity

CREATE TABLE productincart (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Quantity int DEFAULT 0 NOT NULL,
    ID_Product int NOT NULL,
    ID_WebUser int NOT NULL;

    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID),
    CONSTRAINT ID_WebUser FOREIGN key (ID_WebUser) REFERENCES webuser(ID)
)


### Product Purchase Detail
    - ID
    - Date_Purchase
    - Quantity
    - PriceUnitProduct
    - ID_Product
    - ID_WebUser

CREATE TABLE productpurchasedetail (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    DatePurchase datetime NOT NULL,
    Quantity int DEFAULT 0 NOT NULL,
    PriceUnitProduct decimal(10,2) DEFAULT 0 NOT NULL,
    ID_ProductinCart int NOT NULL,
    
    CONSTRAINT ID_ProductinCart FOREIGN KEY (ID_ProductinCart) REFERENCES productincart(ID)
)


### Product Comment
    - ID
    - Message
    - ID_Product
    - ID_WebUser

CREATE TABLE productcomment (
	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
	Message varchar(1024) NOT NULL,
    ID_Product int NOT NULL,
    ID_WebUser int NOT NULL,
    created_at datetime,
    updated_at datetime,
    deleted_at datetime,
    
    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID),
    CONSTRAINT ID_WebUser FOREIGN KEY (ID_WebUser) REFERENCES webuser(ID)
)


### Product Rating
    - ID
    - ID_Product
    - ID_WebUser
    - Rating

CREATE TABLE productrating (
	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    Rating int DEFAULT 0,
    ID_Product int NOT NULL,
    ID_WebUser int NOT NULL,
    
    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID),
    CONSTRAINT ID_WebUser FOREIGN KEY (ID_WebUser) REFERENCES webuser(ID)
)

### Tag
    - ID
    - Name

CREATE TABLE tag (
 	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Name varchar(64) NOT NULL
);


### Product Tag 
    - ID
    - ID_Tag
    - ID_Product

CREATE TABLE producttag (
	ID int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    ID_Tag int NOT NULL,
    ID_Product int NOT NULL,
    
    CONSTRAINT ID_Tag FOREIGN KEY (ID_Tag) REFERENCES tag(ID),
    CONSTRAINT ID_Product FOREIGN KEY (ID_Product) REFERENCES product(ID)
)


### Discount
    - ID
    - ID_Product
    - Discount Percent

CREATE TABLE discount (
 	ID int PRIMARY KEY AUTO_INCREMENT NOT NULL,
    ID_Product int NOT NULL,
    Discount int DEFAULT 0 NOT NULL,
    
    CONSTRAINT ID_Product FOREIGN KEY(ID_Product) REFERENCES product(ID)
)