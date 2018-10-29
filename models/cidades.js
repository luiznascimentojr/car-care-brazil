var keystone = require('keystone');
var Types = keystone.Field.Types;

var Cidades = new keystone.List('Cidades', {
	label: 'Cidades'
});

Cidades.add({
	name: { type: String, required: true, initial: true, label: 'Nome Cidade' }
});

Cidades.track = true;
Cidades.defaultSort = '-createdAt';
Cidades.defaultColumns = 'name, CidadesType, createdAt';
Cidades.register();