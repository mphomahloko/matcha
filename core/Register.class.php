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
                    'regex' => "/\w+/",
                    'verified' => true
                ],
                'pwd' => [
                    'display' => 'Password',
                    'required' => true,
                    'regex' => "/(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*/"
                ]
            ]);
            if (!$validation->passed())
                echo $validation->displayErrors();
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
                //token needs modification
                $token = password_hash( Input::get('email'), PASSWORD_DEFAULT ) . bin2hex(random_bytes(6));
                //needs modification add helper a helper function
                $this->_db->save('users', 'id', [
                    'username' => Input::get('username'),
                    'fname' => Input::get('fname'),
                    'lname' => Input::get('lname'),
                    'email' => Input::get('email'),
                    'password' => Input::get('pwd'),
                    'token' => $token
                ]);
                SendMail::verify(Input::get('email'));
            }
            if (!$validation->passed())
                echo $validation->displayErrors();
        }
    }
}