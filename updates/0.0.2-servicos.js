var keystone = require('keystone'),
    Categories = keystone.list('PostCategory');
 
exports = module.exports = function(done) {
    
    new Categories.model({
        name: "Lava Jato",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    }).save(done);
};