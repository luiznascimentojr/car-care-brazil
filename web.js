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
  'ga property': process.env.GA_PROPERTY || 'alldone_site',
  'ga domain': process.env.GA_DOMAIN || 'www.alldonecar.com.br'
});
 
require('./models');
 
keystone.set('routes', require('./routes'));

keystone.set('process.env.GA_PROPERTY', 'alldone_site');
keystone.set('process.env.GA_DOMAIN', 'www.alldonecar.com.br');
keystone.set('ga property', 'alldone_site');
keystone.set('ga domain', 'www.alldonecar.com.br');
 
keystone.start();