// import open from 'open';
import app from './app';

const port = 4000;

const server = app.listen(port, (err)=>{
    if (err){
        console.log(err);
    } else {
        // open('http://localhost:' + port);
        console.log(`Express is running on port ${server.address().port}`);
    }
});
