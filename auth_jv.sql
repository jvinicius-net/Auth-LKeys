
CREATE TABLE `licencas` (
  `id` int(64) NOT NULL,
  `end_time` varchar(32) NOT NULL,
  `domain` varchar(32) NOT NULL,
  `licenca` varchar(64) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `hostname` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `licencas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `licencas`
  MODIFY `id` int(64) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=0;
COMMIT;