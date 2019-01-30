<?php
class Register
{
    private $_db = null;

    public function __construct()
    {
        $this->_db = DB::getInstance();
    }

    public function loginAction()
    {
        $validation = new Validate();
        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $validation->check($_POST, [
                'username' => [
                    'display' => 'Username',
                    'required' => true,
                    'unique' => true,
                    'regex' => "/\w+/"
                ],
                'pwd' => [
                    'display' => 'Password',
                    'required' => true,
                    'regex' => "/(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*/"
                ]
            ]);
        }
    }

    public function registerAction()
    {
        $validation = new Validate();
        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $validation->check($_POST, [
                'fname' => [
                    'display' => 'First Name',
                    'required' => true,
                    'regex' => "/[a-zA-Z\-]+/"
                ],
                'lname' => [
                    'display' => 'Last Name',
                    'required' => true,
                    'regex' => "/[a-zA-Z\-]+/"
                ],
                'username' => [
                    'display' => 'Username',
                    'required' => true,
                    'unique' => true,
                    'regex' => "/\w+/"
                ],
                'email' => [
                    'display' => 'Email',
                    'required' => true,
                    'valid_email' => true
                ],
                'pwd' => [
                    'display' => 'Password',
                    'required' => true,
                    'regex' => "/(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*/"
                ],
                're_pwd' => [
                    'display' => 'Confirm Password',
                    'required' => true,
                    'matches' => 'pwd'
                ]
            ]);
            if ($validation->passed())
            {
                //needs modification add helper a helper function
                $this->_db->save('users', 'id', [
                    'username' => Input::get('username'),
                    'fname' => Input::get('fname'),
                    'lname' => Input::get('lname'),
                    'email' => Input::get('email'),
                    'password' => Input::get('pwd'),
                    'token' => 'khjagdhfgadgdsfjdgfdafg df'
                ]);
            }
            if (!$validation->passed())
                echo $validation->displayErrors();
        }
    }
}