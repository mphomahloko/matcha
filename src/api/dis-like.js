import express from 'express';
import db from "../../config/database/database";

const router = express.Router();

router.route('/')
    .post((req, res) => {
        db.query('INSERT INTO matcha.likes (participant, liked_participant) VALUES (?, ?)',
            [req.body.participant, req.body.liked_participant],
            (err, results, field) => {
            if (results) {
                // check to see if users liked each other
                db.query(`INSERT INTO matcha.rooms (participant_1, participant_2)
                                SELECT participant, liked_participant
                                FROM likes
                                WHERE liked_participant LIKE ?
                                AND participant LIKE ?;`,
                    [req.body.participant, req.body.liked_participant],
                    (err, results, field) => {
                    res.status(200).json({
                      success: true,
                      message: "like successful..."
                    });
                });
            }
            else {
                res.status(400).json({
                  success: false,
                  message: "failed to like..."
                });
                console.log(err);
            }
        });
    });

module.exports = router;
