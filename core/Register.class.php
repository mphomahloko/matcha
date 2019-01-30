<?php

class Register
{
    public function loginAction()
    {
        $validation = new Validate();
        if ($_SERVER['REQUEST_METHOD'] == 'POST')
        {
            $validation->check();
        }
    }

    public function registerAction()
    {
        $validation = new Validate();
    }
}