var keystone = require('keystone'),
    Servicos = keystone.list('Servicos');
 
exports = module.exports = function(done) {

    var servicosArray = [{
        name: "Lava Jato",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    },
    {
        name: "Troca de óleo",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    },
    {
        name: "Retífica Motor",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    },
    {
        name: "Troca de velas",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    },
    {
        name: "Lanternagem",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sapien erat, commodo sit amet justo et, hendrerit posuere ipsum. Cras commodo cursus tincidunt."
    }];

    for (var i = 0; i < servicosArray.length; i++) {
        new Servicos.model(servicosArray[i]).save(done);
    }
};