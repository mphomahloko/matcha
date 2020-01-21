import express from 'express';

const router = express.Router();

// { name: 'username', value: 'test' } expected json
router.post('/', (req, res)=>{
    if (req.session.loggedin) {
        if (req.body.name == 'username') {
            let validUserPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
            let user = req.body.value;

            let validate_user = user.match(validUserPattern);
            if (!validate_user) {
                res.send({fieldStatus: false});
            } else {
                res.send({fieldStatus: true});
            }
        } else if (req.body.name == 'firstname') {
            let validFirstNPattern = /(?=^.{2,50}$)(?=.*[a-z]).*$/;
            let firstname = req.body.value;

            let validate_first_name = firstname.match(validFirstNPattern);
            if (!validate_first_name) {
                res.send({fieldStatus: false});
            } else {
                res.send({fieldStatus: true});
            }
        } else if (req.body.name == 'email') {
            let validEmailPattern = /[\w-]+@([\w-]+\.)+[\w-]+/;
            let email = req.body.value;
            
            let validate_email = email.match(validEmailPattern);
            if (!validate_email) {
                res.send({fieldStatus: false});
            } else {
                res.send({fieldStatus: true});
            }
        } else if (req.body.name == 'password') {
            let validPassPattern = /(?=^.{6,10}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/;
            let password = req.body.value;

            let validate_pass = password.match(validPassPattern);
            if (!validate_pass) {
                res.send({fieldStatus: false});
            } else {
                res.send({fieldStatus: true});
            }
        } else {
            res.send({fieldStatus: "not implemented yet"});
        }
    }
    res.end();
});

module.exports = router;
