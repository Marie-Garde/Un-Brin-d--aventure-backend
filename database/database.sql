CREATE DATABASE  IF NOT EXISTS `Un_Brin_De_Folie` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Un_Brin_De_Folie`;

CREATE TABLE `Un_Brin_De_Folie`.`customers` (
  `id_customer` INT NOT NULL AUTO_INCREMENT,
  `name_customer` VARCHAR(200) NOT NULL,
  `firstname_customer` VARCHAR(200) NOT NULL,
  `birthdate_customer` VARCHAR(200) NULL,
  `address_customer` VARCHAR(200) NULL,
  `city_customer` VARCHAR(200) NOT NULL,
  `email_customer` VARCHAR(200) NOT NULL,
  `phone_customer` VARCHAR(200) NULL,
  `comment_customer` VARCHAR(2000) NULL,
  PRIMARY KEY (`id_customer`));

CREATE TABLE `Un_Brin_De_Folie`.`purchase` (
  `id_purchase` INT NOT NULL AUTO_INCREMENT,
  `type_purchase` VARCHAR(200) NOT NULL,
  `date_purchase` VARCHAR(200) NOT NULL,
  `quantity_purchase` INT(11) NOT NULL,
  `comment_purchase` VARCHAR(2000) NULL,
  `purchasecol` VARCHAR(45) NULL,
  `customer_id_customer` INT(11) NOT NULL,
  PRIMARY KEY (`id_purchase`),
  FOREIGN KEY (`customer_id_customer`) REFERENCES `Un_Brin_De_Folie`.`customer`(`id_customer`));
