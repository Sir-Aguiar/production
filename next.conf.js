require('dotenv').config()

module.exports = {
  env: {
    REACT_APP_NOT_SECRET_CODE: process.env.REACT_APP_NOT_SECRET_CODE,
  },
};