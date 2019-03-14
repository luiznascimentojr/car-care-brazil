var keystone = require('keystone');
var Types = keystone.Field.Types;

var Servicos = new keystone.List('Servicos', {
	label: 'Serviços'
});

Servicos.add({
	name: { type: String, required: true, initial: true, label: 'Nome Serviço' },
	order: {type: Number, required: false, initial: true, label: 'Ordem' },
	iconCSS: { type: String, required: false, initial: true, label: 'Ícone CSS' },
	description: { type: Types.Textarea, required: true, initial: true, label: 'Descrição Serviço' },
	destaque: { type: Types.Boolean, initial: true, label: 'Serviço de Destaque?' }
});

//Servicos.relationship({ path: 'orcamentos', ref: 'Orcamentos', refPath: 'servicos' });

Servicos.track = true;
Servicos.defaultSort = 'order';
Servicos.defaultColumns = 'name, order';
Servicos.register();