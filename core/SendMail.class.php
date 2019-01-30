<?php

class   SendMail
{
    private static function uniqueLink($page, $receiver, $token)
    {
        return 'http://localhost:8080'.PROOT.$page.'?email='.$receiver.'&token='.$token;
    }

    public static function verify($receiver, $token)
    {
        $link = self::uniqueLink('verify.php', $receiver, $token);
        $sub = 'Confirm Registration';
        $msg = 'To confirm your registration<br><a href="'.$link.'">click here!</a><br/>';
        self::send($receiver, $sub, $msh);
    }
}