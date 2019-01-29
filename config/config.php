<?php
        // report erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

define('DS', DIRECTORY_SEPARATOR);
define('PROOT', DS . 'matcha' . DS);
define('ROOT', $_SERVER['DOCUMENT_ROOT'] . PROOT);

//loading helper functions
require_once(ROOT . DS . 'lib' . DS. 'functions.php');

//auto loading classes
function autoload( $className ) {
    if (file_exists(ROOT . DS . 'core' . DS . $className . '.class.php')) 
        require_once(ROOT . DS . 'core' . DS . $className . '.class.php');
}
spl_autoload_register('autoload');

//initializing the database
DB::getInstance();
// $test = DB::getInstance();
// $test->save('users', 'id', 
// [
//         'id' => 1,
//         'username'=>'tumelo',
//         'fname'=>'monopoly',
//         'lname'=>'mmmmmmm',
//         'email'=>'me@gmail.com',
//         'password'=>'12345',
//         'token'=>'sfsfdsafads'
//         ]
// );