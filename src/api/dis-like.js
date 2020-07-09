import express from 'express';
import query from '../utils/dbqueries'

const router = express.Router();

router.route('/')
  .get(async (req, res) => {
    try {
      const isLiked = await query.isUserLiked(req.query.participant, req.query.liked_participant)
      if (isLiked) {
        res.status(200).json({
          success: true,
          message: "dislike"
        });
      } else {
        res.status(200).json({
          success: true,
          message: "like"
        })
      }
    } catch (ex) {
      console.log("an error occured: ", ex.message);
    }
  });

router.route('/like')
  .post(async (req, res) => {
    try {
      await query.likeUser(req.body.participant, req.body.liked_participant);
      await query.userLikedBack(req.body.participant, req.body.liked_participant);
      res.status(200).json({
        success: true,
        message: "like successful ..."
      });
    } catch (ex) {
      console.log(ex.message);
      res.status(200).json({
        success: false,
        message: "failed to like..."
      });
    }
  })

router.route('/dislike')
  .post(async (req, res) => {
    try {
      await query.disLike(req.body.participant, req.body.liked_participant)
      res.status(200).json({
        success: true,
        message: "disliked user successfully ..."
      });
    } catch (error) {
      res.status(200).json({
        success: false,
        message: "Failed to dislike user, please try again later..."
      });
    }
  })

module.exports = router;
