import express from 'express';
import query from '../utils/dbqueries';

const router = express.Router();

router.route('/')
  .post(async (req, res) => {
    try {
      const messages = await query.getUserMessages(req.query.id);
      res.status(200).json({
        success: true,
        data: messages
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "an error occurred getting your messages"
      });
      console.log(error.message);
    }
  });

module.exports = router;
