<?php
$host = "localhost";
$username = "root";
$password = "123456";
$charset = 'utf8mb4';
$db = "db_matcha";
$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

?>