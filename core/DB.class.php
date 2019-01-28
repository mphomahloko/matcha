<?php

class DB
{
    private static  $_instance = NULL;
    public          $pdo;

    private function __construct()
    {
        try
        {
            require_once ("../config/database.php");
            $this->pdo = new PDO($dsn, $username, $password, $options);
        }
        catch (PDOException $e)
        {
            require_once('../config/setup.php');
            exit($e->getMessage());
        }
    }

    public static function getInstance()
    {
        if (!isset(self::$_instance))
            self::$_instance = new DB();
        return self::$_instance;
    }
}