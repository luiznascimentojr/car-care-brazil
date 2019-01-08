var keystone = require('keystone');
var Orcamento = keystone.list('Orcamento');
 
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
	
	var estados = keystone.list('Estados');

	estados.model.find()
    .sort('-publishedAt')
    .exec(function(err, estados) {
		locals.estados = estados;
	});

	var cidades = keystone.list('Cidades');

	cidades.model.find()
    .sort('-publishedAt')
    .exec(function(err, estados) {
        locals.cidades = cidades;
	});

    

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

	var loadCities = function(estado) {
		var citiesId = estado.cidades;
		var cids = [];

		for (var i = 0; i < citiesId.length; i++) {
			cidades.model.findOne(citiesId[i])
			.exec(function(err, cidade) {
				cids.push(cidade);
				console.log(cids);
			});
		}
	};

	view.on('post', { action: 'contact' }, function (next) {

		console.log(req.body);

		var application = new Orcamento.model();
		var updater = application.getUpdateHandler(req);
		var d = req.body.disponibilidade;
		var p = req.body.periodo;

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
			}
			next();
		});

	});
    
};