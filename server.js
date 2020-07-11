
import { http } from './index';


const port = process.env.PORT || 3000;

const server = http.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Express is running on port ${server.address().port}`);
  }
});
