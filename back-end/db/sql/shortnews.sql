-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Jul-2021 às 06:27
-- Versão do servidor: 10.4.19-MariaDB
-- versão do PHP: 7.4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `shortnews`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `category_news`
--

CREATE TABLE `category_news` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `category_news`
--

INSERT INTO `category_news` (`id`, `name`, `description`) VALUES
(1, 'sports', 'news about sport');

-- --------------------------------------------------------

--
-- Estrutura da tabela `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `text` int(11) NOT NULL,
  `reactions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`reactions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `news`
--

CREATE TABLE `news` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` text NOT NULL,
  `subtitle` text NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `category` int(11) NOT NULL,
  `reactions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT '"{"likes":0,"dislikes":0}"',
  `post_date` datetime NOT NULL DEFAULT current_timestamp(),
  `views` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `permissions`
--

CREATE TABLE `permissions` (
  `id` int(11) NOT NULL,
  `name` tinytext NOT NULL,
  `description` text NOT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`permissions`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `permissions`
--

INSERT INTO `permissions` (`id`, `name`, `description`, `permissions`) VALUES
(1, 'user', 'Default user', '{\"access\":{\"reportedContent\":false},\"grantPermissions\":{\"mod\":false,\"admin\":false}}'),
(2, 'reporter', 'User that can post news', '{\"access\":{\"reportedContent\":false},\"grantPermissions\":{\"mod\":false,\"admin\":false}}'),
(3, 'moderator', 'System moderator, can delete/edit someone else news and have access to reported comments and news', '{\"access\":{\"reportedContent\":true},\"grantPermissions\":{\"mod\":true,\"admin\":false}}'),
(4, 'admin', 'System admin, have all permissions possible', '{\"access\":{\"reportedContent\":true},\"grantPermissions\":{\"mod\":true,\"admin\":true}}');

-- --------------------------------------------------------

--
-- Estrutura da tabela `reported_comments`
--

CREATE TABLE `reported_comments` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `complaint` text NOT NULL,
  `reported_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `reported_news`
--

CREATE TABLE `reported_news` (
  `id` int(11) NOT NULL,
  `news_id` int(11) NOT NULL,
  `complaint` text NOT NULL,
  `reported_by` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `pass` text NOT NULL,
  `permission` int(4) NOT NULL DEFAULT 1,
  `can_post_news` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `pass`, `permission`, `can_post_news`) VALUES
(10, 'Admin', '64e1b8d34f425d19e1ee2ea7236d3028', '$2y$10$JGdS7yVsJexf2EVlFvafKOQtkS.uIOkhNSB916Y6CnwSH.eVaSxmy', 1, 0),
(11, 'Reporter', '9226df98db5a8ae30a6c30c9c092a0c5', '$2y$10$8hQOnR5hd7g.ylse6UxKae5XdQBggNlzvII2euyHoOh0k254p946K', 1, 1),
(12, 'Moderator', 'e3c5f586d1ee978ef40059cfed95b1ee', '$2y$10$I9aeCS4TIPy.1EsWMKHBAO9WkeRdTOr0Ui6a6bGlnRAjm.S2dGv8u', 1, 0),
(13, 'Reader', '88b87698be0bc461f3cacf1f080929d5', '$2y$10$mVgZvaUNRQgc.eqO9yeM2OACzRr62LN5drPlH5B/wmEeGmQjhfWgu', 1, 0);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `category_news`
--
ALTER TABLE `category_news`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_comment_id` (`news_id`);

--
-- Índices para tabela `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `news_user_id` (`user_id`) USING BTREE,
  ADD KEY `news_category` (`category`);

--
-- Índices para tabela `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `reported_comments`
--
ALTER TABLE `reported_comments`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `reported_news`
--
ALTER TABLE `reported_news`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reported_news_id` (`news_id`);

--
-- Índices para tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `permission_id` (`permission`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `category_news`
--
ALTER TABLE `category_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de tabela `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `news`
--
ALTER TABLE `news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de tabela `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `reported_comments`
--
ALTER TABLE `reported_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `reported_news`
--
ALTER TABLE `reported_news`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `news_comment_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`);

--
-- Limitadores para a tabela `news`
--
ALTER TABLE `news`
  ADD CONSTRAINT `id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `news_category` FOREIGN KEY (`category`) REFERENCES `category_news` (`id`);

--
-- Limitadores para a tabela `reported_news`
--
ALTER TABLE `reported_news`
  ADD CONSTRAINT `reported_news_id` FOREIGN KEY (`news_id`) REFERENCES `news` (`id`);

--
-- Limitadores para a tabela `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `permission_id` FOREIGN KEY (`permission`) REFERENCES `permissions` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
