var keystone = require('keystone');
var Orcamento = keystone.list('Orcamento');
const nodemailer = require("nodemailer");
 
exports = module.exports = function(req, res) {
    
	var view = new keystone.View(req, res);
	
	var locals = res.locals;

	var servicos = keystone.list('Servicos');
	
	servicos.model.find()
    .sort('-publishedAt')
    .exec(function(err, servicos) {
		transformServices(servicos);
        locals.servicos = servicos;
	});

	var depoimentos = keystone.list('Depoimentos');

	depoimentos.model.find()
    .sort('-publishedAt')
    .exec(function(err, depoimentos) {
        locals.depoimentos = depoimentos;
	});
	
	// var estados = keystone.list('Estados');

	// estados.model.find()
    // .sort('-publishedAt')
    // .exec(function(err, estados) {
	// 	locals.estados = estados;
	// });

	// var cidades = keystone.list('Cidades');

	// cidades.model.find()
    // .sort('-publishedAt')
    // .exec(function(err, estados) {
    //     locals.cidades = cidades;
	// });

    

	locals.section = 'send';
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	setTimeout(function() {
		view.render('index');
	}, 1200)

	var transformServices = function(services) {
		locals.servs = {};
		for (var i = 0; i < services.length; i++) {
			locals.servs[services[i]._id] = services[i];
		}
	};

	// var loadCities = function(estado) {
	// 	var citiesId = estado.cidades;
	// 	var cids = [];

	// 	for (var i = 0; i < citiesId.length; i++) {
	// 		cidades.model.findOne(citiesId[i])
	// 		.exec(function(err, cidade) {
	// 			cids.push(cidade);
	// 			console.log(cids);
	// 		});
	// 	}
	// };

	view.on('post', { action: 'contact' }, function (next) {

		var application = new Orcamento.model();
		var updater = application.getUpdateHandler(req);
		var d = req.body.disponibilidade;
		var p = req.body.periodo;
		
		req.body.ordemServico = Math.floor(new Date().valueOf()).toString();

		if (d && d.length > 1) {
			var dString = '';
			for (var i = 0; i < d.length; i++) {
				dString = dString + d[i] + ' ';
			}
			req.body.disponibilidade = dString;
		}

		if (p && p.length > 1) {
			var pString = '';
			for (var i = 0; i < p.length; i++) {
				pString = pString + p[i] + ' ';
			}
			req.body.periodo = pString;
		}

		updater.process(req.body, {
			flashErrors: true
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
				console.log(err);
			} else {
				locals.enquirySubmitted = true;
				locals.ordemServico = req.body.ordemServico;
				locals.formData = {};
				main(req.body).catch(console.error); 
			}
			next();
		});

	});

	// async..await is not allowed in global scope, must use a wrapper
	async function main(body){

		// Generate test SMTP service account from ethereal.email
		// Only needed if you don't have a real mail account for testing
		let account = await nodemailer.createTestAccount();
	
		// create reusable transporter object using the default SMTP transport
		let transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: "carcarebrazil@gmail.com", // generated ethereal user
			pass: "ccbr2018" // generated ethereal password
		}
		});

		var servs = [];

		if (body.servicos.length) {
			for (var i = 0; i < body.servicos.length; i++) {
				servs.push(locals.servs[body.servicos[i]].name);
			}
		}
	
		// setup email data with unicode symbols
		let mailOptions = {
		from: '"All Done Car Service" <carcarebrazil@gmail.com>', // sender address
		to: "carcarebrazil@gmail.com", // list of receivers
		subject: "Solicitação de serviço nº: " + body.ordemServico + " ✔", // Subject line
		text: "Hello world?", // plain text body
		html: "<b>Cliente: </b>" + body.name + "<br>" +
			  "<b>Telefone: </b>" + body.telefone + "<br>" +
			  "<b>Atendimento via: </b>" + body.atendimento + "<br>" +
			  "<b>Marca do carro: </b>" + body.marcaCarro + "<br>" +
			  "<b>Modelo do carro: </b>" + body.modeloCarro + "<br>" +
			  "<b>Ano do carro: </b>" + body.anoCarro + "<br>" +
			  "<b>Servicos: </b>" + servs + "<br>" +
			  "<b>Mensagem: </b>" + body.mensagem + "<br>" +
			  "<b>Disponibilidade: </b>" + body.disponibilidade.toString() + "<br>" +
			  "<b>Período do dia: </b>" + body.periodo.toString() + "<br>"
		};
	
		// send mail with defined transport object
		let info = await transporter.sendMail(mailOptions)
	
		console.log("Message sent: %s", info.messageId);
	} 
    
};