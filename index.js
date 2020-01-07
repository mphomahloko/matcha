import app from './app';

const port = 3000;

const server = app.listen(port, (err)=>{
    if (err){
        console.log(err);
    } else {
        console.log(`Express is running on port ${server.address().port}`);
    }
});
