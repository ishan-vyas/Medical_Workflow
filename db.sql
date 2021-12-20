-- MySQL dump 10.13  Distrib 8.0.19, for macos10.15 (x86_64)
--
-- Host: localhost    Database: medical_workflow
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `conditions`
--

DROP TABLE IF EXISTS `conditions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conditions` (
  `patient_id` int NOT NULL,
  `cluster_id` int DEFAULT NULL,
  `last_visit` int NOT NULL,
  `diseases` int NOT NULL,
  `health_issues` int NOT NULL,
  `medication_prescribed` int NOT NULL,
  `labtest_results` int NOT NULL,
  `mr_ct_indication` int NOT NULL,
  `followup_visit` int NOT NULL,
  PRIMARY KEY (`patient_id`),
  CONSTRAINT `patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conditions`
--

LOCK TABLES `conditions` WRITE;
/*!40000 ALTER TABLE `conditions` DISABLE KEYS */;
INSERT INTO `conditions` VALUES (1,NULL,20211111,1,1,1,2,1,20211117),(3,NULL,20211113,2,2,2,2,2,20211118),(4,NULL,20211115,3,3,1,3,3,20211119),(5,NULL,20211111,4,4,2,4,1,20211118),(6,NULL,20211113,5,1,1,1,2,20211119),(7,NULL,20211115,6,2,2,2,3,20211117),(8,NULL,20211201,1,3,1,3,1,20211205),(9,NULL,20211212,2,4,2,4,2,20211217),(11,NULL,20211115,4,2,2,2,1,20211120);
/*!40000 ALTER TABLE `conditions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `disease`
--

DROP TABLE IF EXISTS `disease`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `disease` (
  `dsid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`dsid`),
  UNIQUE KEY `dsid_UNIQUE` (`dsid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `disease`
--

LOCK TABLES `disease` WRITE;
/*!40000 ALTER TABLE `disease` DISABLE KEYS */;
/*!40000 ALTER TABLE `disease` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `eid` int NOT NULL AUTO_INCREMENT,
  `sin` int NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`eid`),
  UNIQUE KEY `eid_UNIQUE` (`eid`),
  UNIQUE KEY `sin_UNIQUE` (`sin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `sin` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone` int NOT NULL,
  PRIMARY KEY (`pid`),
  UNIQUE KEY `pid_UNIQUE` (`pid`),
  UNIQUE KEY `sin_UNIQUE` (`sin`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,123456,'Kevin',21,NULL,1231231234),(3,123457,'Nicole',22,NULL,1231231235),(4,123458,'Cathy',21,NULL,1231231236),(5,123459,'Ishan',20,NULL,1231231266),(6,123483,'Alice',21,NULL,1231231446),(7,123493,'Jaahnvi',21,NULL,1231251446),(8,123214,'Konstantin',21,'',66764450),(9,678857,'Diwij',23,'4844 49 Ave NW',84565424),(11,145145,'Ricky',21,NULL,7675643);
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_clusters`
--

DROP TABLE IF EXISTS `patient_clusters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_clusters` (
  `cluster_id` int NOT NULL AUTO_INCREMENT,
  `last_visit` int DEFAULT NULL,
  `diseases` int DEFAULT NULL,
  `health_issues` int DEFAULT NULL,
  `medication_prescribed` int DEFAULT NULL,
  `labtest_results` int DEFAULT NULL,
  `mr_ct_indication` int DEFAULT NULL,
  `followup_visit` int DEFAULT NULL,
  PRIMARY KEY (`cluster_id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_clusters`
--

LOCK TABLES `patient_clusters` WRITE;
/*!40000 ALTER TABLE `patient_clusters` DISABLE KEYS */;
INSERT INTO `patient_clusters` VALUES (1,20211111,1,1,1,2,1,20211117),(2,20211113,2,2,2,2,2,20211118),(3,20211115,3,3,1,3,3,20211119),(4,20211111,4,4,2,4,1,20211118),(5,20211113,5,1,1,1,2,20211119);
/*!40000 ALTER TABLE `patient_clusters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problem_treatments`
--

DROP TABLE IF EXISTS `problem_treatments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problem_treatments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `problem_type` varchar(50) NOT NULL,
  `problem_detail_id` int NOT NULL,
  `treatment_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problem_treatments`
--

LOCK TABLES `problem_treatments` WRITE;
/*!40000 ALTER TABLE `problem_treatments` DISABLE KEYS */;
INSERT INTO `problem_treatments` VALUES (1,'Diseases',1,'Insulin'),(2,'Diseases',2,'Chemotherapy'),(3,'Diseases',3,'Liquids, Rest, Painkillers'),(4,'Diseases',4,'ART Medicine'),(5,'Diseases',5,'ART Medicine'),(6,'Diseases',6,'Rest'),(7,'Health Issues',1,'Inhaler'),(8,'Health Issues',2,'Inhaler'),(9,'Health Issues',3,'Statins'),(10,'Health Issues',4,'Rest'),(11,'Medication Prescribed',2,'Prescribe appropriate Medicine'),(12,'Lab Test Results',1,'Appeal expert attention'),(13,'Lab Test Results',2,'Schedule appointment with family doctor'),(14,'Lab Test Results',3,'Consult pharmacist or doctor'),(15,'Lab Test Results',4,'Rest'),(16,'MR/CT Images Indications',1,'Appeal expert attention'),(17,'MR/CT Images Indications',2,'Speak with family doctor'),(18,'MR/CT Images Indications',3,'Rest');
/*!40000 ALTER TABLE `problem_treatments` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-19 21:41:10
