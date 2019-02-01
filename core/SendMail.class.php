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

    private static function send( $receiver, $subject, $message )
    {
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
        $headers .= 'From:nonreply@localhost:8080/matcha/' . "\r\n";
        mail( $receiver, $subject, $message, $headers );
    }
}