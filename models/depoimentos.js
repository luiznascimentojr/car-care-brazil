var keystone = require('keystone');
var Types = keystone.Field.Types;

var Depoimentos = new keystone.List('Depoimentos', {});

Depoimentos.add({
	name: { type: String, required: true, initial: true },
	description: { type: Types.Textarea, required: true, initial: true },
	servicos: { type: Types.Relationship, ref: 'Servicos', many: true, initial: true, required: true, label: 'Serviços contratados' },
	cidade: { type: String, required: false, initial: true }
});

Depoimentos.track = true;
Depoimentos.defaultSort = '-createdAt';
Depoimentos.defaultColumns = 'name, depoimentosType, createdAt';
Depoimentos.register();