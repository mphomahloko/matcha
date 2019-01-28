<?php

class Session
{//still nedd some work
    private static $_sessionStarted = false;

    public static function start()
    {
        if (self::$_sessionStarted)
            return ;
        session_start();
        self::$_sessionStarted = true;
    }

    public static function set($key, $value)
    {
        $_SESSION[$key] = Input::sanitize($value);
    }

    public static function get($key)
    {
        if (isset($_SESSION[$key]))
            return $_SESSION[$key];
        return false;
    }

    public static function isLoggedIn()
    {
        if (isset($_SESSION['username']))
            return true;
        return false;
    }

    public static function destroy()
    {
        if (self::$_sessionStarted)
        {
            session_unset();
            session_destroy();
        }
        Router::redirect('index.php');
    }
}