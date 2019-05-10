var keystone = require('keystone');
keystone.init({
  
  'name': 'All Done Car Service',
  
  'favicon': 'public/favicon.ico',
  'sass': 'public',
  'static': ['public'],
  
  'views': 'templates/views',
  'view engine': 'jade',
  
  'auto update': true,
  'mongo': process.env.MONGODB_URI || 'mongodb://localhost/test',
  
  'session': true,
  'auth': true,
  'user model': 'User',
  'cookie secret': '(your secret here)',
  'ga property': 'process.env.GA_PROPERTY',
  'ga domain': 'process.env.GA_DOMAIN'
});
 
require('./models');
 
keystone.set('routes', require('./routes'));

keystone.set('ga property', 'process.env.GA_PROPERTY');
keystone.set('ga domain', 'process.env.GA_DOMAIN');
 
keystone.start();