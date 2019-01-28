<?php
        // report erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('ROOT', dirname(__FILE__) . DS .'..');
define('PROOT', DS . 'matcha' . DS);

//loading helper functions
require_once(ROOT . DS . 'lib' . DS. 'functions.php');

//auto loading classes
function autoload( $className ) {
    if (file_exists(ROOT . DS . 'core' . DS . $className . '.class.php')) 
        require_once(ROOT . DS . 'core' . DS . $className . '.class.php');
}
spl_autoload_register('autoload');