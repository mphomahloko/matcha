import express from 'express';
import db from "../../config/database/connection";

const router = express.Router();

router.route('/')
    .get((req, res) => {
        db.query('SELECT * FROM matcha.likes WHERE participant=? AND liked_participant=?',
        [req.query.participant, req.query.liked_participant],
            (err, results) => {
                if (results[0]) {
                    res.status(200).json({
                        success: true,
                        message: "dislike"
                    });
                } else {
                    res.status(200).json({
                        success: true,
                        message: "like"
                    });
                }
            })
    })

    
router.route('/like')
.post((req, res) => {
    db.query('INSERT INTO matcha.likes (participant, liked_participant) VALUES (?, ?)',
        [req.body.participant, req.body.liked_participant],
        (err, results) => {
        if (results) {
            // check to see if users liked each other
            db.query(`INSERT INTO matcha.rooms (participant_1, participant_2)
                            SELECT participant, liked_participant
                            FROM likes
                            WHERE liked_participant LIKE ?
                            AND participant LIKE ?;`,
                [req.body.participant, req.body.liked_participant],
                (err, results) => {
                res.status(200).json({
                  success: true,
                  message: "like successful ..."
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
})

router.route('/dislike')
    .post((req, res) => {
        db.query('DELETE FROM matcha.likes WHERE participant=? AND liked_participant=?',
        [req.body.participant, req.body.liked_participant],
        (error, results) => {
            if (error) {
                res.status(200).json({
                    success: false,
                    message: "Failed to dislike user, please try again later..."
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "disliked user successfully ..."
                });
            }
        })
    })

module.exports = router;
