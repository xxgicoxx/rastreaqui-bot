class MensagemService {
  comando(scope) {
    scope.sendMessage('Comando não encontrado');
  }

  ajuda(scope) {
    scope.sendMessage('Eu posso ajudar você a rastrear suas encomendas dos Correios.\n\nVocê pode me controlar com os seguintes comandos:\n\n/adicionar - adicionar pacote para rastreamento\n/remover - remover pacote do rastreamento\n/verificar - verificar eventos de um pacote\n/listar - listar pacotes adicionados');
  }
}

module.exports = MensagemService;
