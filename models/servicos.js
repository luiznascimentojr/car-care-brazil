var keystone = require('keystone');
var Types = keystone.Field.Types;

var Servicos = new keystone.List('Servicos', {
	label: 'Serviços'
});

Servicos.add({
	name: { type: String, required: true, initial: true, label: 'Nome Serviço' },
	iconCSS: { type: String, required: false, initial: true, label: 'Ícone CSS' },
	description: { type: Types.Textarea, required: true, initial: true, label: 'Descrição Serviço' },
});

//Servicos.relationship({ path: 'orcamentos', ref: 'Orcamentos', refPath: 'servicos' });

Servicos.track = true;
Servicos.defaultSort = '-createdAt';
Servicos.defaultColumns = 'name, servicosType, createdAt';
Servicos.register();