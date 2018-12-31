var keystone = require('keystone');
var Types = keystone.Field.Types;

var Enquiry = new keystone.List('Enquiry', {
	nocreate: false,
});

Enquiry.add({
	name: { type: Types.Name, required: true, initial: true },
	email: { type: Types.Email, required: true, initial: true },
	phone: { type: String },
	enquiryType: { type: Types.Select, options: [
		{ value: 'mensagem', label: "Dúvida geral" },
		{ value: 'trabalhe', label: "Trabalhe conosco" },
		{ value: 'orcamento', label: "Agendar serviço" },
		{ value: 'depoimento', label: "Enviar depoimento" }
	], required: true, initial: true },
	message: { type: Types.Textarea, required: true, initial: true },
});

Enquiry.track = true;
Enquiry.defaultSort = '-createdAt';
Enquiry.defaultColumns = 'name, email, enquiryType, createdAt';
Enquiry.register();