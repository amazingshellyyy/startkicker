require('dotenv').config();

module.exports = {
  'aws': {
      'key': `${process.env.AWS_ACCESS_KEY}`,
      'secret': `${process.env.AWS_ACCESS_SECRET}`,
      'ses': {
          'from': {
              'default': '"amazingshellyyy.com" <amazingshellyyy@gmail.com>', 
          },
          'region': `${process.env.AWS_ACCESS_REGION}` 
      }
  }
};