import express from 'express';
import mongoose from 'mongoose';
import { is_production } from './utils/is_production';
// router
import { productRouter } from './products/products.module';

// read dev env files
if(!is_production()) {
  const dotenv = require("dotenv");
  dotenv.config({
    path: 'dev.env'
  });
}

const app = express();

// handle express staff
app.use(express.json());

app.use('/products', productRouter);


(async function () {
  
  try {

    const mongo_url = process.env['MONGO_URL'];

    if(!mongo_url) {
      throw new Error('Mongodb url is not found');
    }

    await mongoose.connect(mongo_url);

    app.listen(process.env['PORT'] || 8000, () => {
      console.log('server started');
    });


  }
  catch(e) {

    console.log('failed to start server');

  }
  


})()


