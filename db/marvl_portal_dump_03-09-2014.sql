-- MySQL dump 10.13  Distrib 5.6.17, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: marvl_portal
-- ------------------------------------------------------
-- Server version	5.6.17-0ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime NOT NULL,
  PRIMARY KEY (`session_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group`
--

DROP TABLE IF EXISTS `group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` varchar(500) NOT NULL,
  `default` tinyint(1) NOT NULL DEFAULT '0',
  `creator_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id_refs_id_ad627896` (`creator_id`),
  CONSTRAINT `creator_id_refs_id_ad627896` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group`
--

LOCK TABLES `group` WRITE;
/*!40000 ALTER TABLE `group` DISABLE KEYS */;
INSERT INTO `group` VALUES (1,'2013-11-05 05:49:15','2014-03-13 04:32:12','Development','Default Group',1,1007),(11,'2014-02-19 00:00:00','2014-02-19 00:00:00','CMAR','The SHOC user group',0,1007),(12,'2014-02-19 00:00:00','2014-02-19 00:00:00','WAVE','The SWAN and WW3 user group',0,1007),(13,'2014-02-19 00:00:00','2014-02-19 00:00:00','MOM','The MOM user group',0,1007),(14,'2014-02-19 00:00:00','2014-02-19 00:00:00','ROMS','The ROMS user group',0,1007),(15,'2014-08-18 02:37:47','2014-08-18 02:37:47','Benedicte Pasquer','user default group',1,1004),(16,'2014-08-22 00:04:04','2014-08-22 00:04:04','Ming\'s Group','Ming\'s test group',0,1007),(17,'2014-08-25 01:08:17','2014-08-25 01:08:17','Matthew Armsby','user default group',1,1004),(18,'2014-08-25 01:13:32','2014-08-25 01:13:32','Nathan Bindoff','user default group',1,1004);
/*!40000 ALTER TABLE `group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `instance`
--

DROP TABLE IF EXISTS `instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `name` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL,
  `ip` varchar(15) NOT NULL,
  `instance_id` varchar(200) NOT NULL,
  `group_id` int(11) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Instance_403f60f` (`user_id`),
  CONSTRAINT `user_id_refs_id_07665be2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_id_refs_id_443f5a2f` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `instance`
--

LOCK TABLES `instance` WRITE;
/*!40000 ALTER TABLE `instance` DISABLE KEYS */;
INSERT INTO `instance` VALUES (23,'2013-12-11 03:46:47','2013-12-11 03:46:47','Development',1004,'m1.small','running','144.6.252.70','',1,'https://trike-ui-dev.marvl.org.au'),(26,'2014-02-21 00:00:00','2014-02-21 00:00:00','CMAR 1',1004,'m1.small','running','144.6.252.78','',11,'https://trike-ui01.marvl.org.au'),(27,'2014-02-21 00:00:00','2014-02-21 00:00:00','CMAR 2',1004,'m1.small','running','144.6.252.79','',11,'https://trike-ui02.marvl.org.au'),(28,'2014-02-21 00:00:00','2014-02-21 00:00:00','WAVE 1',1004,'m1.small','running','144.6.252.80','',12,'https://trike-ui03.marvl.org.au'),(29,'2014-02-21 00:00:00','2014-02-21 00:00:00','WAVE 2',1004,'m1.small','running','144.6.252.81','',12,'https://trike-ui04.marvl.org.au'),(30,'2014-02-21 00:00:00','2014-02-21 00:00:00','MOM 1',1004,'m1.small','running','144.6.252.82','',13,'https://trike-ui05.marvl.org.au'),(31,'2014-02-21 00:00:00','2014-02-21 00:00:00','ROMS 1',1004,'m1.small','running','144.6.252.83','',14,'https://trike-ui06.marvl.org.au'),(36,'2014-03-14 05:10:38','2014-08-18 05:24:35','dev2',1008,'m1.small','running','144.6.224.94','',1,'https://144.6.224.94');
/*!40000 ALTER TABLE `instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `message` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `user_from_id` int(11) NOT NULL,
  `user_to_id` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `title` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `is_group` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_from_id_refs_id_98ce1832` (`user_from_id`),
  KEY `user_to_id_refs_id_98ce1832` (`user_to_id`),
  CONSTRAINT `user_from_id_refs_id_98ce1832` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_to_id_refs_id_98ce1832` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES (23,'2014-08-25 01:24:52','2014-08-25 01:24:52',1041,1041,'It\'s a test, isn\'t it.','It\'s a test',1,0),(24,'2014-08-25 01:52:41','2014-08-25 01:52:41',1041,1041,'Magritte said \"This isn\'t a test\". He was wrong.','\"This isn\'t a test\"',1,0),(25,'2014-08-25 01:53:31','2014-08-25 01:53:31',1041,1041,'<h2>Not a test</h2>','<h1>Not a test</h1>',1,0);
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `model_request`
--

DROP TABLE IF EXISTS `model_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `model_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `type` varchar(30) NOT NULL,
  `description` varchar(500) DEFAULT NULL,
  `creator_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  `notes` varchar(500) DEFAULT NULL,
  `changed_by_id` int(11) DEFAULT NULL,
  `shared_by` varchar(20) DEFAULT NULL,
  `request_id` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `creator_id_refs_id_a9ac85af` (`creator_id`),
  KEY `changed_by_id_refs_id_a9ac85af` (`changed_by_id`),
  CONSTRAINT `changed_by_id_refs_id_a9ac85af` FOREIGN KEY (`changed_by_id`) REFERENCES `user` (`id`),
  CONSTRAINT `creator_id_refs_id_a9ac85af` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `model_request`
--

LOCK TABLES `model_request` WRITE;
/*!40000 ALTER TABLE `model_request` DISABLE KEYS */;
INSERT INTO `model_request` VALUES (5,'2014-08-22 02:06:54','2014-08-22 02:06:54','Small (WW3 SHOC SWAN','Hi, this is a test request from Ming.',1007,3,'This is approved.',1007,'1','d8a1328c-bd99-433b-ab35-ee790cc351cc'),(6,'2014-08-25 01:59:16','2014-08-25 01:59:16','Small (WW3 SHOC SWAN','Test',1041,1,NULL,NULL,'17','9422014b-e7f3-4398-876f-7ecdae7896bc');
/*!40000 ALTER TABLE `model_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `non_system_user_group_map`
--

DROP TABLE IF EXISTS `non_system_user_group_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `non_system_user_group_map` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `email` varchar(50) NOT NULL,
  `proved` tinyint(1) NOT NULL,
  `group_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `creator_id` int(11) NOT NULL,
  `status` smallint(6) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_refs_id_5cf7ab12` (`group_id`),
  KEY `creator_id_refs_id_3d790477` (`creator_id`),
  CONSTRAINT `creator_id_refs_id_3d790477` FOREIGN KEY (`creator_id`) REFERENCES `user` (`id`),
  CONSTRAINT `group_id_refs_id_5cf7ab12` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `non_system_user_group_map`
--

LOCK TABLES `non_system_user_group_map` WRITE;
/*!40000 ALTER TABLE `non_system_user_group_map` DISABLE KEYS */;
/*!40000 ALTER TABLE `non_system_user_group_map` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification`
--

DROP TABLE IF EXISTS `notification`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notification` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `user_from_id` int(11) NOT NULL,
  `user_to_id` int(11) NOT NULL,
  `content` varchar(500) NOT NULL,
  `title` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_from_id_refs_id_0596771e` (`user_from_id`),
  KEY `user_to_id_refs_id_0596771e` (`user_to_id`),
  CONSTRAINT `user_from_id_refs_id_0596771e` FOREIGN KEY (`user_from_id`) REFERENCES `user` (`id`),
  CONSTRAINT `user_to_id_refs_id_0596771e` FOREIGN KEY (`user_to_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification`
--

LOCK TABLES `notification` WRITE;
/*!40000 ALTER TABLE `notification` DISABLE KEYS */;
INSERT INTO `notification` VALUES (21,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1040,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(22,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1006,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(23,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1007,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(24,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1008,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(25,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1009,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(26,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1022,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(27,'2014-08-18 05:43:01','2014-08-18 05:43:01',1007,1023,'New Member (Benedicte Pasquer) has been successfully added to group Development.','New member added to group Development',1),(28,'2014-08-22 00:04:55','2014-08-22 00:04:55',1007,1007,'You have been added to group Ming\'s Group.','New member added to group Ming\'s Group',1),(29,'2014-08-22 00:23:31','2014-08-22 00:23:31',1007,1007,'You have been removed from group Ming\'s Group.','Removed from group Ming\'s Group',1),(30,'2014-08-22 00:24:03','2014-08-22 00:24:03',1007,1007,'You have been added to group Ming\'s Group.','New member added to group Ming\'s Group',1),(31,'2014-08-22 02:07:15','2014-08-22 02:07:15',1007,1007,'Your request (d8a1328c-bd99-433b-ab35-ee790cc351cc) has been approved.','Model Request Approved',1),(32,'2014-08-25 02:34:01','2014-08-25 02:34:01',1041,1041,'New Member (Ming Fu) has been successfully added to group Matthew Armsby.','New member added to group Matthew Armsby',1),(33,'2014-08-25 02:34:01','2014-08-25 02:34:01',1041,1007,'You have been added to group Matthew Armsby.','New member added to group Matthew Armsby',1),(34,'2014-08-25 02:45:37','2014-08-25 02:45:37',1041,1041,'New Member (Just Berkhout) has been successfully added to group Matthew Armsby.','New member added to group Matthew Armsby',1),(35,'2014-08-25 02:45:37','2014-08-25 02:45:37',1041,1007,'New Member (Just Berkhout) has been successfully added to group Matthew Armsby.','New member added to group Matthew Armsby',1),(36,'2014-08-25 02:45:37','2014-08-25 02:45:37',1041,1010,'You have been added to group Matthew Armsby.','New member added to group Matthew Armsby',1);
/*!40000 ALTER TABLE `notification` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `process`
--

DROP TABLE IF EXISTS `process`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `process` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `status` varchar(10) NOT NULL,
  `type` varchar(10) NOT NULL,
  `instance_id` int(11) NOT NULL,
  `active` varchar(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `instance_id_refs_id_0c16f7f6` (`instance_id`),
  CONSTRAINT `instance_id_refs_id_0c16f7f6` FOREIGN KEY (`instance_id`) REFERENCES `instance` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `process`
--

LOCK TABLES `process` WRITE;
/*!40000 ALTER TABLE `process` DISABLE KEYS */;
/*!40000 ALTER TABLE `process` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `aafuser` varchar(1) NOT NULL,
  `token` varchar(270) NOT NULL,
  `email` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `organization` varchar(200) NOT NULL,
  `logout` varchar(1) NOT NULL,
  `is_greeting_sent` tinyint(1) NOT NULL DEFAULT '0',
  `is_admin` tinyint(1) NOT NULL DEFAULT '0',
  `is_system_user` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1043 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1004,'2014-02-11 00:00:00','2014-02-11 00:00:00','system_user','0','0','0','fxmzb123@gmail.com','system user','university of tasmania','1',0,1,1),(1006,'2014-02-13 00:51:58','2014-08-08 00:25:31','Brendan.Davey@utas.edu.au','','1','','Brendan.Davey@utas.edu.au','Brendan Davey','University of Tasmania','0',0,1,0),(1007,'2014-02-13 02:04:52','2014-08-22 02:45:39','Xiao.Fu@utas.edu.au','','1','kCQHnV39wvPgfAH8rHtzO7S9zMQ=!!https://aaf1-idp.its.utas.edu.au/idp/shibboleth!!https://portalprod.marvl.org.au/shibboleth','Xiao.Fu@utas.edu.au','Ming Fu','University of Tasmania','0',0,1,0),(1008,'2014-02-13 03:19:09','2014-07-23 03:01:26','Uwe.Rosebrock@csiro.au','','1','','Uwe.Rosebrock@csiro.au','Uwe Rosebrock','Commonwealth Scientific and Industrial Research Organisation','0',0,1,0),(1009,'2014-02-13 05:17:45','2014-06-16 23:50:21','Roger.Proctor@utas.edu.au','','1','','Roger.Proctor@utas.edu.au','Roger Proctor','University of Tasmania','0',0,0,0),(1010,'2014-02-20 22:41:02','2014-03-12 02:23:05','Just.Berkhout@utas.edu.au','','1','','Just.Berkhout@utas.edu.au','Just Berkhout','University of Tasmania','0',0,0,0),(1011,'2013-12-19 01:08:15','2014-03-10 22:37:45','Philip.Gillibrand@csiro.au','','1','','Philip.Gillibrand@csiro.au','Philip Gillibrand','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1012,'2013-03-25 22:50:04','2013-03-25 23:28:31','Mark.Baird@csiro.au','','1','','Mark.Baird@csiro.au','Mark Baird','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1013,'2013-11-20 03:27:57','2014-07-10 02:13:44','Madeleine.Cahill@csiro.au','','1','','Madeleine.Cahill@csiro.au','Madeleine Cahill','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1014,'2013-12-03 23:13:42','2014-02-28 01:19:39','Justin.Freeman@csiro.au','','1','','Justin.Freeman@csiro.au','Justin Freeman','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1015,'2013-12-17 05:30:41','2014-04-09 01:34:52','Paul.Sandery@csiro.au','','1','','Paul.Sandery@csiro.au','Paul Sandery','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1016,'2013-12-19 22:29:41','2014-07-20 23:07:21','John.Luick@utas.edu.au','','1','','John.Luick@utas.edu.au','John Luick','University of Tasmania','0',0,0,0),(1022,'2014-02-21 04:48:43','2014-07-10 23:25:22','Gary.Carroll@csiro.au','','1','','Gary.Carroll@csiro.au','Gary Carroll','Commonwealth Scientific and Industrial Research Organisation','0',0,1,0),(1023,'2014-02-21 06:18:54','2014-05-27 06:35:17','Simon.Pigot@csiro.au','','1','','Simon.Pigot@csiro.au','Simon Pigot','Commonwealth Scientific and Industrial Research Organisation','0',0,1,0),(1024,'2014-02-24 14:06:26','2014-03-19 01:03:38','Peter.Oke@csiro.au','','1','','Peter.Oke@csiro.au','Peter Oke','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1025,'2014-02-25 00:35:42','2014-02-25 10:38:44','r.morison@unsw.edu.au','','1','','r.morison@unsw.edu.au','Russel Morison','The University of New South Wales','1',0,0,0),(1026,'2014-02-25 05:19:49','2014-04-17 05:40:48','i.coghlan@unsw.edu.au','','1','','i.coghlan@unsw.edu.au','Ian Coghlan','The University of New South Wales','1',0,0,0),(1027,'2014-03-04 06:08:22','2014-06-24 03:53:33','chari.pattiaratchi@uwa.edu.au','','1','','chari.pattiaratchi@uwa.edu.au','Charitha Bandula Pattiaratchi','The University of Western Australia','0',0,0,0),(1028,'2014-03-13 00:00:50','2014-03-13 00:00:50','Ken.Ridgway@csiro.au','','1','','Ken.Ridgway@csiro.au','Ken Ridgway','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1029,'2014-03-18 05:34:03','2014-08-08 01:43:55','a.schaeffer@unsw.edu.au','','1','','a.schaeffer@unsw.edu.au','Amandine Schaeffer','The University of New South Wales','0',0,0,0),(1030,'2014-03-18 23:09:41','2014-04-02 04:57:10','mroughan@unsw.edu.au','','1','','mroughan@unsw.edu.au','Moninya Roughan','The University of New South Wales','0',0,0,0),(1031,'2014-03-20 06:06:12','2014-06-12 01:56:25','dean.nottingham@aaf.edu.au','','1','','dean.nottingham@aaf.edu.au','Dean Nottingham','Australian Access Federation','0',0,0,0),(1032,'2014-03-31 04:33:08','2014-03-31 04:38:01','Brian.Hatfield@csiro.au','','1','','Brian.Hatfield@csiro.au','Brian Hatfield','Commonwealth Scientific and Industrial Research Organisation','0',0,0,0),(1033,'2014-04-08 03:35:48','2014-04-08 03:35:48','t.smith@aaf.edu.au','','1','','t.smith@aaf.edu.au','Terry Smith','Australian Access Federation','0',0,0,0),(1034,'2014-05-23 06:10:58','2014-06-10 01:28:09','R.Brinkman@aims.gov.au','','1','','R.Brinkman@aims.gov.au','Richard Brinkman','AIMS','0',0,0,0),(1035,'2014-05-23 07:59:00','2014-05-29 08:59:53','dk.williams@aims.gov.au','','1','','dk.williams@aims.gov.au','David K Williams','AIMS','1',0,0,0),(1036,'2014-05-26 00:15:17','2014-06-24 03:46:32','S.Spagnol@aims.gov.au','','1','','S.Spagnol@aims.gov.au','Simon Spagnol','AIMS','0',0,0,0),(1037,'2014-06-04 00:58:26','2014-07-14 02:16:45','i.coghlan@wrl.unsw.edu.au','','1','','i.coghlan@wrl.unsw.edu.au','Ian Coghlan','The University of New South Wales','0',0,0,0),(1038,'2014-06-19 09:57:16','2014-07-18 04:26:41','sarath.wijeratne@uwa.edu.au','','1','','sarath.wijeratne@uwa.edu.au','Sarath Wijeratne','The University of Western Australia','0',0,0,0),(1039,'2014-06-27 08:17:57','2014-06-27 10:05:42','Philip.Gillibrand@utas.edu.au','','1','','Philip.Gillibrand@utas.edu.au','Philip Gillibrand','University of Tasmania','1',0,0,0),(1040,'2014-08-18 02:37:47','2014-08-25 01:59:45','Benedicte.Pasquer@utas.edu.au','','1','RF+aUShHNCvZlBPTO6cW8DY4v34=!!https://aaf1-idp.its.utas.edu.au/idp/shibboleth!!https://portalprod.marvl.org.au/shibboleth','Benedicte.Pasquer@utas.edu.au','Benedicte Pasquer','University of Tasmania','0',0,0,0),(1041,'2014-08-25 01:08:17','2014-08-25 02:58:39','Matthew.Armsby@utas.edu.au','','1','6rJjnXIau/HgmELsWDEUHp/T35A=!!https://aaf1-idp.its.utas.edu.au/idp/shibboleth!!https://portalprod.marvl.org.au/shibboleth','Matthew.Armsby@utas.edu.au','Matthew Armsby','University of Tasmania','0',0,0,0),(1042,'2014-08-25 01:13:32','2014-08-25 01:13:32','N.Bindoff@utas.edu.au','','1','7dCr1iTaDbnE2KbHkIuguW31oQg=!!https://aaf1-idp.its.utas.edu.au/idp/shibboleth!!https://portalprod.marvl.org.au/shibboleth','N.Bindoff@utas.edu.au','Nathan Bindoff','University of Tasmania','0',0,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group`
--

DROP TABLE IF EXISTS `user_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_refs_id_4ffa521f` (`group_id`),
  KEY `user_id_refs_id_a78a736b` (`user_id`),
  CONSTRAINT `group_id_refs_id_4ffa521f` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `user_id_refs_id_a78a736b` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group`
--

LOCK TABLES `user_group` WRITE;
/*!40000 ALTER TABLE `user_group` DISABLE KEYS */;
INSERT INTO `user_group` VALUES (17,'2014-02-13 00:00:00','2014-02-13 00:00:00',1006,1,0),(18,'2014-02-13 00:00:00','2014-02-13 00:00:00',1008,1,1),(19,'2014-02-13 00:00:00','2014-02-13 00:00:00',1009,1,0),(22,'2014-02-21 13:27:00','2014-02-21 13:27:00',1012,11,0),(23,'2014-02-21 13:27:00','2014-02-21 13:27:00',1013,11,0),(24,'2014-02-21 13:35:00','2014-02-21 13:35:00',1014,13,0),(25,'2014-02-21 13:35:00','2014-02-21 13:35:00',1015,13,0),(26,'2014-02-21 13:36:00','2014-02-21 13:36:00',1016,14,0),(27,'2014-02-21 15:54:00','2014-02-21 15:54:00',1022,1,0),(28,'2014-02-25 09:58:00','2014-02-25 09:58:00',1024,11,0),(30,'2014-02-25 16:31:00','2014-02-25 16:31:00',1025,12,0),(31,'2014-03-04 17:15:00','2014-03-04 17:16:00',1027,14,0),(33,'2014-03-12 03:19:25','2014-03-12 03:19:25',1023,1,0),(34,'2014-03-12 23:49:29','2014-03-12 23:49:29',1022,11,1),(35,'2014-03-13 04:32:31','2014-03-13 04:32:31',1007,1,0),(36,'2014-03-19 00:02:29','2014-03-19 00:02:29',1029,14,0),(37,'2014-03-19 00:02:29','2014-03-19 00:02:29',1030,14,0),(39,'2014-03-31 04:34:21','2014-03-31 04:34:21',1032,12,0),(40,'2014-05-23 07:44:35','2014-05-23 07:44:35',1034,14,0),(41,'2014-05-25 21:57:10','2014-05-25 21:57:10',1035,14,0),(42,'2014-05-25 21:57:30','2014-05-25 21:57:30',1035,12,0),(43,'2014-05-27 23:38:13','2014-05-27 23:38:13',1036,14,0),(44,'2014-06-04 02:15:17','2014-06-04 02:15:17',1026,12,0),(45,'2014-06-04 06:11:49','2014-06-04 06:11:49',1037,12,0),(46,'2014-06-23 23:41:31','2014-06-23 23:41:31',1038,14,0),(47,'2014-06-28 01:37:59','2014-06-28 01:37:59',1039,11,0),(48,'2014-08-18 02:37:47','2014-08-18 02:37:47',1040,15,1),(49,'2014-08-18 05:43:01','2014-08-18 05:43:01',1040,1,0),(51,'2014-08-22 00:24:03','2014-08-22 00:24:03',1007,16,1),(52,'2014-08-25 01:08:17','2014-08-25 01:08:17',1041,17,0),(53,'2014-08-25 01:13:32','2014-08-25 01:13:32',1042,18,1),(54,'2014-08-25 02:34:01','2014-08-25 02:34:01',1007,17,1),(55,'2014-08-25 02:45:37','2014-08-25 02:45:37',1010,17,0);
/*!40000 ALTER TABLE `user_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_group_request`
--

DROP TABLE IF EXISTS `user_group_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_group_request` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `email` varchar(50) NOT NULL,
  `proved` tinyint(1) NOT NULL,
  `group_id` int(11) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `group_id_refs_id_269f90ae` (`group_id`),
  KEY `user_id_refs_id_b78dc6b6` (`user_id`),
  CONSTRAINT `group_id_refs_id_269f90ae` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`),
  CONSTRAINT `user_id_refs_id_b78dc6b6` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_group_request`
--

LOCK TABLES `user_group_request` WRITE;
/*!40000 ALTER TABLE `user_group_request` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_group_request` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2014-09-03  1:06:13
