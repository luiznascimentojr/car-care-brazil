var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);

    var locals = res.locals;

	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;

	view.on('post', { action: 'contact' }, function (next) {

		console.log('post');

		var application = new Enquiry.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err);
			} else {
				locals.enquirySubmitted = true;
				console.log('sucesso');
			}
			next();
		});

	});
    
	view.render('contact');
    
};