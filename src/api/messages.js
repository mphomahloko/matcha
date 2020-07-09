import express from 'express';
import db from "../../config/database/database";

const router = express.Router();

router.route('/')
    .post((req, res) => {
        db.query('SELECT * FROM matcha.messages WHERE messages.room_id = ?',
        [req.query.id],
        (err, results, field) => {
            if (results) {
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
