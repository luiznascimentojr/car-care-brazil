var keystone = require('keystone');
var Types = keystone.Field.Types;

var Estados = new keystone.List('Estados', {
	label: 'Estados'
});

Estados.add({
	name: { type: String, required: true, initial: true, label: 'Nome Estado' },
	cidades: { type: Types.Relationship, ref: 'Cidades', many: true, initial: true, required: true, label: 'Cidades' }
});

Estados.track = true;
Estados.defaultSort = '-createdAt';
Estados.defaultColumns = 'name, EstadosType, createdAt';
Estados.register();