require('dotenv').config();

module.exports = {
  'aws': {
      'key': `${process.env.AWS_ACCESS_KEY}`,
      'secret': `${process.env.AWS_ACCESS_SECRET}`,
      'ses': {
          'from': {
              // replace with actual email address
              'default': '"amazingshellyyy.com" <amazingshellyyy@gmail.com>', 
          },
          // e.g. us-west-2
          'region': `${process.env.AWS_ACCESS_REGION}` 
      }
  }
};