const correios = require('correios.js');

const { Pacote } = require('../models');

class PacoteService {
  async verificar(scope) {
    try {
      const parametro = scope.message.text.replace('/verificar', '').trim();

      if (!parametro) {
        scope.sendMessage('Código de rastreamento não pode ser vazio');
      } else {
        const rastreio = await correios.rastrear(parametro);

        if (!rastreio || rastreio.eventos.length <= 0) {
          scope.sendMessage('Pacote sem movimentação');
        } else {
          let mensagem = '';

          rastreio.eventos.forEach((e) => {
            mensagem += `${e.data} - ${e.hora}\n`;
            mensagem += `${e.local}\n`;
            mensagem += `${e.evento}\n`;
            mensagem += `${e.mensagem}\n\n`;
          });

          scope.sendMessage(mensagem);
        }
      }
    } catch (ex) {
      console.log(ex);

      scope.sendMessage('Erro, tente novamente mais tarde');
    }
  }

  async adicionar(scope) {
    try {
      const parametros = scope.message.text.replace('/adicionar', '').trim().split(' ');

      if (!parametros || parametros.length <= 0 || !parametros[0] || !parametros[0].trim()) {
        scope.sendMessage('Código de rastreamento não pode ser vazio');
      } else {
        const codigo = parametros[0].trim();
        const nome = parametros[1] || null;
        const usuario = scope.message.from.id;

        Pacote.findOne({ where: { codigo, usuario } }).then((obj) => {
          if (obj) {
            obj.update(obj);
            scope.sendMessage('Pacote já existia e foi somente atualizado');
          } else {
            Pacote.create({ nome, usuario, codigo }).then(() => {
              scope.sendMessage('Pacote adicionado com sucesso');
            });
          }
        });
      }
    } catch (ex) {
      console.log(ex);

      scope.sendMessage('Erro, tente novamente mais tarde');
    }
  }

  async atualizar(pacote, eventos) {
    pacote.update({ eventos });
  }

  async remover(scope) {
    try {
      const usuario = scope.message.from.id;
      const pacote = scope.message.text.replace('/remover', '').trim();

      if (!pacote) {
        scope.sendMessage('Código de rastreamento não pode ser vazio');
      } else {
        Pacote.findOne({ usuario, pacote }).then((e) => e.destroy());

        scope.sendMessage('Pacote removido com sucesso');
      }
    } catch (ex) {
      console.log(ex);

      scope.sendMessage('Erro, tente novamente mais tarde');
    }
  }

  async listar(scope) {
    try {
      const pacotes = await Pacote.findAll({ where: { usuario: scope.message.from.id } });

      if (!pacotes || pacotes.length <= 0) {
        scope.sendMessage('Sem pacotes para listar');
      } else {
        let mensagem = '';

        pacotes.forEach((e) => {
          mensagem += `${e.dataValues.codigo}${e.dataValues.nome != null ? (` - ${e.dataValues.nome}`) : ''}\n`;
        });

        scope.sendMessage(mensagem);
      }
    } catch (ex) {
      console.log(ex);

      scope.sendMessage('Erro, tente novamente mais tarde');
    }
  }

  async pacotes() {
    return Pacote.findAll({
      where: {
        rastrear: 1,
        visivel: 1,
      },
    });
  }
}

module.exports = PacoteService;
