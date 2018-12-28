var keystone = require('keystone');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.data = {
        pagina: {}
    };

    // Load the current page
    view.on('init', function (next) {

        var q = keystone.list('Page').model.findOne({
            state: 'publicada',
            slug: 'page/' + req.params.page,
        }).exec(function (err, result) {
            console.log(result, err);
            if(!result) {
                res.status(404).render('errors/404.html');
            } else {
                locals.data.pagina = result;
                next(err);
            }
        });

    });

    // Render the view
    view.render('page');
};