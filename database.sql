CREATE DATABASE  IF NOT EXISTS `Un_Brin_De_Folie` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `Un_Brin_De_Folie`;

CREATE TABLE `Un_Brin_De_Folie`.`client` (
  `id_client` INT NOT NULL AUTO_INCREMENT,
  `name_client` VARCHAR(200) NOT NULL,
  `firstname_client` VARCHAR(200) NOT NULL,
  `birthdate_client` VARCHAR(200) NULL,
  `address_client` VARCHAR(200) NULL,
  `city_client` VARCHAR(200) NOT NULL,
  `email_client` VARCHAR(200) NOT NULL,
  `phone_client` VARCHAR(200) NULL,
  `comment_client` VARCHAR(2000) NULL,
  PRIMARY KEY (`id_client`));

CREATE TABLE `Un_Brin_De_Folier`.`achats` (
  `id_achat` INT NOT NULL AUTO_INCREMENT,
  `type_achat` VARCHAR(200) NOT NULL,
  `date_achat` VARCHAR(200) NOT NULL,
  `quantity_achat` INT(11) NOT NULL,
  `comment_achat` VARCHAR(2000) NULL,
  `achatscol` VARCHAR(45) NULL,
  `client_id_client` INT(11) NOT NULL,
  PRIMARY KEY (`id_achat`));
