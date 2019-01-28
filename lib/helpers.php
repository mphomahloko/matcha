<?php

function dnd($data)
{
    echo '<pre>';
    var_dump($data);
    echo '</pre>';
    die();
}

function alert($status, $msg)
{
    //status can be success, info, warning and danger
    $alertMsg = '<div class="alert alert-'.$status.' fade in alert-dismissible" style="margin-top:18px;">
    <a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>
    '.$msg.'
    </div>';
    return $alertMsg;
}