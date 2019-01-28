<?php include_once('../public/header.php'); ?>
        <div class="container">
            <h2 class="text-center">Register</h2>
            <form action="" method="post">
                <div class="form-group">
                    <input type="email" name="email" class="form-control" placeholder="Email" required>
                </div>
                <div class="form-group">
                    <input type="text" name="username" class="form-control" placeholder="Username" pattern="\w+" title=" Only Letters And/Or Numbers are allowed" required>
                </div>
                <div class="form-group">
                    <input type="text" name="fname" class="form-control" placeholder="First name" pattern='[a-zA-Z\-]+' required>
                </div>
                <div class="form-group">
                    <input type="text" name="lname" class="form-control" placeholder="Last name" pattern='[a-zA-Z\-]+' required>
                </div>
                <div class="form-group">
                    <input type="password" name="pwd" class="form-control" placeholder="Password" minlenght="6" pattern="(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*" required>
                </div>
                <div class="form-group">
                    <input type="password" name="re_pwd" class="form-control" placeholder="Confirm Password" minlenght="6" pattern="(?=\S*\d)(?=\S*[a-z])(?=\S*[A-Z])\S*" required>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
<?php include_once('../public/footer.php'); ?>