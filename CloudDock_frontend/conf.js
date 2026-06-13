require('dotenv').config();
module.exports={
    env:{
        REACT_APP_BUCKET_NAME:process.env.REACT_APP_BUCKET_NAME,
        REACT_APP_REGION:process.env.REACT_APP_REGION ,
        REACT_APP_ACCESS : process.env.REACT_APP_ACCESS ,
        REACT_APP_SECRET: process.env.REACT_APP_SECRET

    }
};