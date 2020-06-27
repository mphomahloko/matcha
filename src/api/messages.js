import express from 'express';
import db from "../../config/database/database";

const router = express.Router();

router.route('/')
    .post((req, res) => {
        // console.log(req.body.from); use to protect route
        db.query('SELECT  * FROM matcha.messages WHERE messages.room_id = ?',
        [req.query.id],
        (err, results, field) => {
            if (results) {
                // check to see if users liked each other
                res.status(200).json({
                    success: true,
                    data: results
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "an error occurred getting your messages"
                });
                console.log(err);
            }
        });
    });

module.exports = router;
