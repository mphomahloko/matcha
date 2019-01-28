<?php
require('database.php');

try {
    $dbh = new PDO("mysql:host=" . $host, $username, $password, $options);
    $dbh->exec("CREATE DATABASE IF NOT EXISTS db_matcha");
    $dbh->exec( "CREATE TABLE IF NOT EXISTS `db_matcha`.`users` ( 
        `id` INT(255) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
        `username` VARCHAR(30) NOT NULL ,
        `fname` VARCHAR(20) NOT NULL ,
        `lname` VARCHAR(20) NOT NULL ,
        `email` VARCHAR(40) NOT NULL ,
        `password` VARCHAR(1000) NOT NULL ,
        `token` VARCHAR(255) NOT NULL ,
        `verified` INT(2) NOT NULL DEFAULT 0,
        `notifications` TINYINT(2) NOT NULL DEFAULT 1,
        `status` TINYINT(2) NOT NULL DEFAULT 0
        );" );
    // $dbh->exec( "CREATE TABLE IF NOT EXISTS `camagru`.`gallery` ( 
    //     `img_Id` INT(255) NOT NULL AUTO_INCREMENT  PRIMARY KEY,
    //     `username` VARCHAR(30) NOT NULL ,
    //     `path` VARCHAR(255) NOT NULL,
    //     `date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    //     );" );
    // $dbh->exec( "CREATE TABLE IF NOT EXISTS`camagru`.`comments` (
    //     `comment_Id` INT NOT NULL AUTO_INCREMENT ,
    //     `img_Id` INT NOT NULL ,
    //     `username` VARCHAR(30) NOT NULL ,
    //     `comment` TEXT NOT NULL ,
    //     PRIMARY KEY (`comment_id`));" );
    // $dbh->exec( "CREATE TABLE IF NOT EXISTS `camagru`.`like_pic` (
    //     `like_Id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    //     `img_Id` INT NOT NULL,
    //     `username` VARCHAR(30)
    //     );" );
    
} catch( PDOException $e ) {
    echo "Connection failed: " . $e->getMessage();
}
$dbh = null;
header('location: ../index.php');
?>