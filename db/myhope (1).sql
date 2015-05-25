-- phpMyAdmin SQL Dump
-- version 4.0.6
-- http://www.phpmyadmin.net
--
-- Хост: localhost
-- Время создания: Май 22 2015 г., 10:25
-- Версия сервера: 5.6.24-log
-- Версия PHP: 5.5.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- База данных: `myhope`
--

-- --------------------------------------------------------

--
-- Структура таблицы `access_roles`
--

CREATE TABLE IF NOT EXISTS `access_roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `description` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `access_roles`
--

INSERT INTO `access_roles` (`id`, `name`, `description`) VALUES
(1, 'user', 'Обычный пользователь фирмы'),
(2, 'manager', 'Ответственное лицо компании'),
(3, 'admin', 'Администратор системы');

-- --------------------------------------------------------

--
-- Структура таблицы `company`
--

CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `encoded_id` varchar(20) DEFAULT NULL,
  `name` varchar(20) NOT NULL,
  `description` text NOT NULL,
  `reg_key` varchar(20) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(12) DEFAULT NULL,
  `sale_closed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=2 ;

--
-- Дамп данных таблицы `company`
--

INSERT INTO `company` (`id`, `encoded_id`, `name`, `description`, `reg_key`, `created_on`, `phone`, `sale_closed`) VALUES
(1, 'MQ==', 'test', 'test', 'ODY4OTA1NjM=', '2015-05-08 15:21:13', '123', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `company_discount`
--

CREATE TABLE IF NOT EXISTS `company_discount` (
  `company_id` int(11) NOT NULL,
  `discount` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `company_users`
--

CREATE TABLE IF NOT EXISTS `company_users` (
  `user_id` int(11) NOT NULL,
  `company_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1',
  `confirmed` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `company_users`
--

INSERT INTO `company_users` (`user_id`, `company_id`, `role_id`, `active`, `confirmed`) VALUES
(1, 1, 3, 1, 0),
(68, 1, 1, 1, 0),
(69, 1, 2, 1, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE IF NOT EXISTS `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  `price` int(11) NOT NULL,
  `description` text,
  `img` text,
  `category_id` int(11) DEFAULT '1',
  `unit_id` int(11) DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=7 ;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `name`, `price`, `description`, `img`, `category_id`, `unit_id`) VALUES
(1, 'test', 20, 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).', NULL, 2, 2),
(5, 'test 2', 25, 'Есть много вариантов Lorem Ipsum, но большинство из них имеет не всегда приемлемые модификации, например, юмористические вставки или слова, которые даже отдалённо не напоминают латынь. Если вам нужен Lorem Ipsum для серьёзного проекта, вы наверняка не хотите какой-нибудь шутки, скрытой в середине абзаца. Также все другие известные генераторы Lorem Ipsum используют один и тот же текст, который они просто повторяют, пока не достигнут нужный объём. Это делает предлагаемый здесь генератор единственным настоящим Lorem Ipsum генератором. Он использует словарь из более чем 200 латинских слов, а также набор моделей предложений. В результате сгенерированный Lorem Ipsum выглядит правдоподобно, не имеет повторяющихся абзацей или "невозможных" слов.', NULL, 1, 2),
(6, 'Новый товар', 100, 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum.', '/img/cat.png', 1, 1);

-- --------------------------------------------------------

--
-- Структура таблицы `items_categories`
--

CREATE TABLE IF NOT EXISTS `items_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(86) NOT NULL,
  `img` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=4 ;

--
-- Дамп данных таблицы `items_categories`
--

INSERT INTO `items_categories` (`id`, `name`, `img`) VALUES
(1, 'Мясо', ''),
(2, 'Рыба', NULL),
(3, 'Птица', '/img/cat.png');

-- --------------------------------------------------------

--
-- Структура таблицы `role_permissions`
--

CREATE TABLE IF NOT EXISTS `role_permissions` (
  `company_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`company_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Структура таблицы `role_permissions_status`
--

CREATE TABLE IF NOT EXISTS `role_permissions_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `role_permissions_status`
--

INSERT INTO `role_permissions_status` (`id`, `name`) VALUES
(1, 'Может просматрировать'),
(2, 'Может просматривать и покупать');

-- --------------------------------------------------------

--
-- Структура таблицы `shop_cart`
--

CREATE TABLE IF NOT EXISTS `shop_cart` (
  `company_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `archive` tinyint(1) DEFAULT NULL,
  `archived_date` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`company_id`,`user_id`,`item_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `shop_cart`
--

INSERT INTO `shop_cart` (`company_id`, `user_id`, `item_id`, `value`, `created_on`, `archive`, `archived_date`) VALUES
(1, 1, 1, 6, '2015-05-17 17:47:09', NULL, NULL),
(1, 1, 5, 1, '2015-05-17 19:57:43', NULL, NULL),
(1, 1, 6, 7, '2015-05-17 17:47:30', NULL, NULL),
(1, 69, 6, 25, '2015-05-22 10:00:35', NULL, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `units`
--

CREATE TABLE IF NOT EXISTS `units` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `short_name` varchar(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=3 ;

--
-- Дамп данных таблицы `units`
--

INSERT INTO `units` (`id`, `name`, `short_name`) VALUES
(1, 'Килограмм', 'кг'),
(2, 'Единица', 'шт');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `encoded_id` text NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=70 ;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`user_id`, `encoded_id`) VALUES
(1, 'MQ=='),
(67, 'Njc='),
(68, 'Njg='),
(69, 'Njk=');

-- --------------------------------------------------------

--
-- Структура таблицы `user_info`
--

CREATE TABLE IF NOT EXISTS `user_info` (
  `user_id` int(11) NOT NULL,
  `first_name` text NOT NULL,
  `last_name` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `phone` varchar(12) DEFAULT NULL,
  UNIQUE KEY `user_id` (`user_id`),
  KEY `user_id_2` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_info`
--

INSERT INTO `user_info` (`user_id`, `first_name`, `last_name`, `email`, `password`, `created_on`, `phone`) VALUES
(1, 'Владимир', 'Фролов', 'frolad@gmail.com', '$2a$10$W43ltXnQf.dtywJhASZiLOjvIPZIYXXj4vI6WD8QEevfSsCecKksi', '2015-05-06 10:06:55', NULL),
(67, 'anonymous', 'anonymous', 'frolad@gmail.coma', '$2a$10$CNO5WkBCnI9kwUuBIKvrHeC00iD1oCmeN7jcREuI60N5VN8keFlKm', '2015-05-06 10:06:55', NULL),
(68, 'anonymous', 'anonymous', 'asd@asd.com', '$2a$10$DLWS2V6C8KoO0JNEXS/35uVkvv6LYTyWa1Z0HZ2oKeT6MUjsZuLz2', '2015-05-08 17:39:30', NULL),
(69, 'Владимир', 'Фролов', 'frolad2@gmail.com', '$2a$10$AIvfvXB/QUIDwsJyGr4DEeTI.Z8wMGupPjvv4DqXh7GP9sKOUrj22', '2015-05-08 18:27:29', '123123');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE IF NOT EXISTS `user_roles` (
  `user_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`,`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`user_id`, `role_id`, `active`) VALUES
(1, 3, 1),
(68, 1, 1),
(69, 2, 1);

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `user_info`
--
ALTER TABLE `user_info`
  ADD CONSTRAINT `user_info_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
