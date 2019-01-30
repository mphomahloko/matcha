<?php

class Validate
{
    private $_errors = [];
    private $_passed = false;
    private $_db = null;

    public function __construct()
    {
        $this->_db = DB::getInstance();
    }
    
    public function check($source, $item = [])
    {
        $this->_errors = [];
        foreach ($item as $item => $rules)
        {
            $item = Input::sanitize($item);
            $display = $rules['display'];
            foreach ($rules as $rule => $rule_value)
            {
               $value = Input::sanitize($source[$item]);
               if ($rule == 'required' && empty($value))
                    $this->addError(["{$display} is required", $item]);
               else if (!empty($value))
               {
                   switch ($rule)
                   {
                       case 'verified':
                            $check = $this->_db->findByKey('users', $item, $value);
                            if ($check)
                                if (!$check['verified'])
                                    $this->addError(["{$display} has not yet been verified", $item]);
                            break ;
                       case 'min':
                            if (strlen($value) < $rule_value)
                                $this->addError(["{$display} is not long enough", $item]);
                            break ;
                        case 'max':
                            if (strlen($value) > $rule_value)
                                $this->addError(["{$display} is too long", $item]);
                            break ;
                        case 'matches':
                            if ($value != $source[$rule_value])
                                $this->addError(["{$display} does not match", $item]);
                            break ;
                        case 'valid_email':
                            if (!filter_var($value, FILTER_VALIDATE_EMAIL))
                                $this->addError(["{$display} is invalid", $item]);
                            break ;
                        case 'unique':
                            $check = $this->_db->findByKey('users', $item, $value);
                            if ($check)
                                $this->addError(["{$display} already exists", $item]);
                            break ;
                        case 'regex':
                            if (!preg_match($rule_value, $value))
                                $this->addError(["{$display} does not match requirements", $item]);
                            break ;
                   }
               }
            }
            
        }
        if (empty($this->_errors))
            $this->_passed = true;
        return $this;
    }

    public function addError($error)
    {
        $this->_errors[] = $error;
        if (empty($this->_errors))
            $this->_passed = true;
        else
            $this->_passed = false;
    }

    public function errors()
    {
        return $this->_errors;
    }

    public function passed()
    {
        return $this->_passed;
    }

    //modify function
    public function displayErrors()
    {
        $html = '<ul class="bg-danger">';
        foreach( $this->_errors as $error )
        {
            if (is_array($error))
            {
                $html .= '<li class"text-danger">'.$error[0].'</li>';
            }
            else
            {
                $html .= '<li class="text-danger">'.$error.'</li>';
            }
        }
        $html .= '</ul>';
        return $html;
    }
}