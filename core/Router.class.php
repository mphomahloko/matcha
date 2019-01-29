<?php
//this is crap it needs alotta work
class Router
{
    public static function redirect($location)
    {
        if (!headers_sent())
        {
            header('Location: ' . PROOT . $location);
            exit();
        }
        else
        {
            echo '<script type="text/javascript">';
            echo 'window.location.href="' . PROOT . $location . '";';
            echo '</script>';
            echo '<noscript>';
            echo '<meta http-eqiv="refresh" content="0;url=' . $location . '" />';
            echo '</noscript>';
            exit();
        }
    }
}