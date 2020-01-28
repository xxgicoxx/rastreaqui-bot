const cluster = require('cluster');
const correios = require('correios.js');
const telegram = require('telegram-node-bot');
const cron = require('node-cron');

const UsuarioService = require('../services/UsuarioService');
const PacoteService = require('../services/PacoteService');
const HistoricoService = require('../services/HistoricoService');
const MensagemService = require('../services/MensagemService');

const telegramConfig = require('../configs/telegram');

const { TelegramBaseController } = telegram;
const { TextCommand } = telegram;
const bot = new telegram.Telegram(telegramConfig.token, {
  webAdmin: {
    port: 7772,
    host: 'localhost',
  },
  workers: 1,
});

const usuarioService = new UsuarioService();
const pacoteService = new PacoteService();
const historicoService = new HistoricoService();
const mensagemService = new MensagemService();

if (cluster.isMaster) {
  cron.schedule('*/1 * * * *', () => {
    pacoteService.pacotes().then((pacotes) => {
      pacotes.forEach((e) => {
        correios.rastrear(e.codigo).then((rastreio) => {
          const evento = rastreio.eventos[0];

          historicoService.historico(evento).then((historico) => {
            if (!historico) {
              historicoService.inserir(e.id, evento).then(() => {
                bot.api.sendMessage(e.usuario, `Encomenda ${rastreio.codigo}${e.nome != null ? (` - ${e.nome}`) : ''} teve o status alterado\n\n${evento.data} ${evento.hora}\n${evento.local}\n${evento.evento}\n${evento.mensagem}\n`);
              });
            }
          });
        });
      });
    });
  });
}

class BotController extends TelegramBaseController {
  async handle(scope) {
    mensagemService.comando(scope);
  }

  async start(scope) {
    usuarioService.inserir(scope);
  }

  async ajuda(scope) {
    mensagemService.ajuda(scope);
  }

  async verificar(scope) {
    pacoteService.verificar(scope);
  }

  async remover(scope) {
    pacoteService.remover(scope);
  }

  async adicionar(scope) {
    pacoteService.adicionar(scope);
  }

  async listar(scope) {
    pacoteService.listar(scope);
  }

  get routes() {
    return {
      start: 'start',
      ajuda: 'ajuda',
      verificar: 'verificar',
      adicionar: 'adicionar',
      remover: 'remover',
      listar: 'listar',
    };
  }
}

bot.router
  .when(new TextCommand('/start', 'start'), new BotController())
  .when(new TextCommand('/ajuda', 'ajuda'), new BotController())
  .when(new TextCommand('/verificar', 'verificar'), new BotController())
  .when(new TextCommand('/adicionar', 'adicionar'), new BotController())
  .when(new TextCommand('/remover', 'remover'), new BotController())
  .when(new TextCommand('/listar', 'listar'), new BotController())
  .otherwise(new BotController());
