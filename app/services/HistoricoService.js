const { Historico } = require('../models');

class HistoricoService {
  inserir(pacote, evento) {
    const historico = {
      pacote,
      data: evento.data,
      hora: evento.hora,
      local: evento.local,
      evento: evento.evento,
      mensagem: evento.mensagem,
    };

    return Historico.create(historico);
  }

  historico(evento) {
    return Historico.findOne({
      where: evento,
    });
  }
}

module.exports = HistoricoService;
