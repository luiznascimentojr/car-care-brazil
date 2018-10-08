var keystone = require('keystone');
var Types = keystone.Field.Types;

var Servicos = new keystone.List('Servicos', {
	nocreate: true,
});

Servicos.add({
	name: { type: Types.Name, required: true },
	description: { type: Types.Textarea, required: true },
});

Servicos.track = true;
Servicos.defaultSort = '-createdAt';
Servicos.defaultColumns = 'name, servicosType, createdAt';
Servicos.register();