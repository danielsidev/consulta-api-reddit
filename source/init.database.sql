
-- Start - Database and User Database with Password and Privileges 
CREATE DATABASE reddit;
CREATE USER 'admReddit'@'localhost' IDENTIFIED BY 'admReddit'; 
GRANT ALL PRIVILEGES ON reddit.* TO 'admReddit'@'localhost';
FLUSH PRIVILEGES;
use reddit;
-- End - Database and User Database with Password and Privileges 

-- Start - Table Post from Reddit
CREATE TABLE `posts` (
  `idposts` int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `author` varchar(75) NOT NULL,
  `ups` int(11) NOT NULL,
  `comments` int(11) NOT NULL,
  `created` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- End - Table Post from Reddit



