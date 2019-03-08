var keystone = require('keystone');
var Enquiry = keystone.list('Enquiry');
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
 
exports = module.exports = function(req, res) {
    
    var view = new keystone.View(req, res);

    var locals = res.locals;

	locals.section = 'contact';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;
	locals.enquiryTypes = Enquiry.fields.enquiryType.ops;

	view.on('post', { action: 'contact' }, function (next) {

		var application = new Enquiry.model();
		var updater = application.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
				main(req.body).catch(console.error); 
			}
			next();
		});

	});

	async function main(body){

		const oauth2Client = new OAuth2(
			"430361646430-9qrgnb7jusbpi5q3hs5p8apc7809s77g.apps.googleusercontent.com", // ClientID
			"-kvISwDvyNkkPXQuZOMsprkm", // Client Secret
			"https://developers.google.com/oauthplayground" // Redirect URL
		);
	
		oauth2Client.setCredentials({
			refresh_token: "1/j8u16wCz6oJBZ_j4XHksHvMWwkeHYoTQbc73ldTAcnk1SCgLUVU7F5WAEZsmLcZx"
		});
	   	const tokens = await oauth2Client.refreshAccessToken()
		const accessToken = tokens.credentials.access_token		   
	
		const smtpTransport = nodemailer.createTransport({
			service: "gmail",
			auth: {
				type: "OAuth2",
				user: "carcarebrazil@gmail.com", 
				clientId: "430361646430-9qrgnb7jusbpi5q3hs5p8apc7809s77g.apps.googleusercontent.com",
				clientSecret: "-kvISwDvyNkkPXQuZOMsprkm",
				refreshToken: "1/j8u16wCz6oJBZ_j4XHksHvMWwkeHYoTQbc73ldTAcnk1SCgLUVU7F5WAEZsmLcZx",
				accessToken: accessToken
			},
			tls: {
				rejectUnauthorized: false
			}
		});

		// setup email data with unicode symbols
		let mailOptions = {
		from: '"All Done Car Service" <carcarebrazil@gmail.com>', // sender address
		to: "carcarebrazil@gmail.com", // list of receivers
		subject: "Contato para: " + body.enquiryType + " ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Cliente: </b>" + body.name + "<br>" +
			  "<b>Telefone: </b>" + body.phone + "<br>" +
			  "<b>Email: </b>" + body.email + "<br>" +
			  "<b>Mensagem: </b>" + body.message + "<br>"
		};

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, (error, response) => {
			error ? console.log(error) : console.log(response);
			smtpTransport.close();
	   });
	} 
    
	view.render('contact');
    
};