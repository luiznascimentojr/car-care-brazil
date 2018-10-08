var keystone = require('keystone');
var Types = keystone.Field.Types;

var Depoimentos = new keystone.List('Depoimentos', {
	nocreate: true,
});

Depoimentos.add({
	name: { type: Types.Name, required: true },
	description: { type: Types.Textarea, required: true },
});

Depoimentos.track = true;
Depoimentos.defaultSort = '-createdAt';
Depoimentos.defaultColumns = 'name, depoimentosType, createdAt';
Depoimentos.register();