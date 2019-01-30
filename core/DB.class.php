<?php

class DB
{
    private static          $_instance = NULL;
    private                 $_pdo;

    private function    __construct()
    {
        try
        {
            require_once (ROOT."/config/database.php");
            $this->_pdo = new PDO($dsn, $username, $password, $options);
        }
        catch (PDOException $e)
        {
            require_once(ROOT.'config/setup.php');
            Router::redirect('index.php');
        }
    }

    public static function  getInstance()
    {
        if (!isset(self::$_instance))
            self::$_instance = new DB();
        return self::$_instance;
    }

    private function    _query($sql, $params=[])
    {
        try
        {
            $query = $this->_pdo->prepare($sql);
            $query->execute($params);   
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }
        return $query;
    }

    private function _insert($table, $fields)
    {//INSERT INTO `users` (`username`, ...) VALUES (?, ...)
        $query = 'INSERT INTO `' . $table . '` (';
        foreach ($fields as $key => $value)
            $query .= '`'.$key.'`,';
        $query = rtrim($query, ',').') VALUES (';
        foreach ($fields as $key => $value)
            $query .= ':'.$key.',';
        $query = rtrim($query, ',').')';
        $query = $this->_query($query, $fields);;
    }

    public function findAll($table)
    {
        $result = _query('SELECT * FROM `'.$table.'`');
        return $result->fetchAll();
    }

    public function findByKey($table, $key, $value)
    {
        $sql = 'SELECT * FROM `'.$table.'` WHERE `'.$key.'` =:val';
        $param = ['val'=>$value];
        $query = $this->_query($sql, $param);
        return $query->fetch();
    }

    private function _update($table, $primaryKey, $fields)
    {
        $sql = 'UPDATE `'.$table.'` SET ';
        foreach ($fields as $key => $value)
            $sql .= '`'.$key.'`=:'.$key.',';
        $sql = rtrim($sql, ','). ' WHERE `'.$primaryKey.'`=:primaryKey';
        $fields['primaryKey'] = $fields['id'];
        $this->_query($sql, $fields);
    }

    public function delete($table, $id, $primaryKey)
    {
        $params = ['id' => $id];
        $this->_query('DELETE FROM `'.$table.'` WHERE `'.$primaryKey.'` = :id', $params);
    }

    public function save($table, $primaryKey, $data)
    {
        try
        {
            if (!isset($data[$primaryKey]))
            {
                $data[$primaryKey] = null;
                $this->_insert($table, $data);
                return ;
            }
            $this->_update($table, $primaryKey, $data);
        }
        catch (PDOException $e)
        {
            die($e->getMessage());
        }
    }
}