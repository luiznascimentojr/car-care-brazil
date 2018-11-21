var keystone = require('keystone');
var Types = keystone.Field.Types;

var Paginas = new keystone.List('Page', {
	map: { name: 'title' },
  	autokey: { path: 'slug', from: 'title', unique: true },
});

Paginas.add({
	title: { type: String, required: true, initial: true, label: 'Nome Página' },
	state: { type: Types.Select, options: 'rascunho, publicada', default: 'rascunho', index: true, label: 'Estado' },
	conteudo: { type: Types.Html, wysiwyg: true, required: true, initial: true, label: 'Conteúdo Página' }
});

Paginas.track = true;
Paginas.defaultSort = '-createdAt';
Paginas.defaultColumns = 'title, state|20%, slug|20%';
Paginas.register();