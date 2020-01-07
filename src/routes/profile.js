import express from 'express';
import db from '../../config/database/database';

const router = express.Router();

// /profile routes

router.get('/', (req, res)=>{
    res.render('pages/profile', {
        username : 'mpho',
        email: 'email@email.com',
        password: 'word'
    });
});

module.exports = router;
