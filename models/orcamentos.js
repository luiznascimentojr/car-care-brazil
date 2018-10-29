var keystone = require('keystone');
var Types = keystone.Field.Types;

var Orcamento = new keystone.List('Orcamento', {
	autokey: { from: 'telefone', path: 'key', unique: true },
	label: 'Orçamentos',
});

Orcamento.add({
    name: {type: String, required: false, initial: true, label: 'Nome Cliente' },
    telefone: { type: Number, required: false, initial: true, label: 'Telefone Cliente' },
    atendimento: { type: String, required: false, initial: true, label: 'Preferência Atendimento' },
    email: { type: Types.Email, initial: true, displayGravatar: true, label: 'Email Cliente'},
    estado: { type: String, required: false, initial: true, label: 'Estado' },
    cidade: { type: String, required: false, initial: true, label: 'Cidade' },
    tipoCarro: { type: String, required: false, initial: true, label: 'Tipo Carro'  },
    marcaCarro: { type: String, required: false, initial: true, label: 'Marca Carro'  },
    modeloCarro: { type: String, required: false, initial: true, label: 'Modelo Carro'  },
    anoCarro: { type: String, required: false, initial: true, label: 'Ano Carro'  },
    versaoCarro: { type: String, required: false, initial: true, label: 'Versão Carro' },
    servicos: { type: Types.Relationship, ref: 'Servicos', many: true, initial: true, required: false, label: 'Serviços necessários' },
    busca: { type: String, required: false, initial: true, label: 'Atendimento via'  },
    data: { type: Date, required: false, initial: true, label: 'Data agendada'  },
    mensagem: { type: String, required: false, initial: true, label: 'Mensagem'  }
});

Orcamento.track = true;
Orcamento.defaultSort = '-createdAt';
Orcamento.defaultColumns = 'name, OrcamentoType, createdAt';
Orcamento.register();