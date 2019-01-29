<?php require_once($_SERVER['DOCUMENT_ROOT'].'/matcha/public/header.php');?>
<?php
$username = '';
if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $data['username'] = $username = Input::get('username');
    $data['password'] = Input::get('pwd');
    dnd($data);
    // $user->login();
}
?>
        <div class="container">
            <h2 class="text-center">Login</h2>
            <form action="<?php echo htmlentities($_SERVER['PHP_SELF'])?>" method="post">
                <?=alert('success', 'This is an error');?>
                <div class="form-group">
                    <input type="text" name="username" value="<?=$username?>" class="form-control" placeholder="Username" pattern="\w+" title=" Only Letters And/Or Numbers are allowed" required>
                </div>
                <div class="form-group">
                    <input type="password" name="pwd" id="inputError" class="form-control" placeholder="Password" minlenght="6" pattern="(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*" required>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
<?php require_once(ROOT . DS . 'public/footer.php'); ?>
