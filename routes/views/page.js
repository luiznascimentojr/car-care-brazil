var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.data = {
        pagina: {}
    };

    var q = keystone.list('Page').model.findOne({
        slug: req.params.page
    }).exec(function (err, result) {
        console.log( req.params.page, result);
        if(!result) {
            res.status(404).render('errors/404.html');
        } else {
            locals.data.pagina = result;
            next(err);
        }
    });

     // Render the view
     setTimeout(function() {
		view.render('page');
	}, 1000)
   
};