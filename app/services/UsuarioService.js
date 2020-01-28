const { Usuario } = require('../models');

class UsuarioService {
  inserir(scope) {
    const usuario = {
      id: scope.message.from.id,
      chatid: scope.message.chat.id,
      nome: scope.message.from.firstName,
      sobrenome: scope.message.from.lastName,
      usuario: scope.message.from.username,
    };

    Usuario.findOne({ where: { id: usuario.id } }).then((obj) => {
      if (obj) {
        obj.update(usuario);
      } else {
        Usuario.create(usuario);
      }
    });

    scope.sendMessage(`Olá, ${usuario.nome}`);
  }

  usuarios() {
    return Usuario.findAll();
  }
}

module.exports = UsuarioService;
