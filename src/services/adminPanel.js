const { User, DeleteUser, BannedUsers } = require('../models');

const deleteUserByName = async ({ userNameToBeDeleted, motivo, userId }) => {
  try {
      // Validações iniciais
      if (!userNameToBeDeleted || !userNameToBeDeleted.trim()) {
          throw new Error('Nome do usuário a ser deletado é obrigatório');
      }

      if (!motivo || !motivo.trim()) {
          throw new Error('Motivo da exclusão é obrigatório');
      }

      // Busca o usuário pelo nome
      const userFound = await User.findOne({
        where: { nome: userNameToBeDeleted }
      });

      if (!userFound) {
          throw new Error('Usuário não encontrado');
      }

      const userToBeDeleted = await User.findByPk(userFound.id);

      // Registra o motivo da exclusão
      await DeleteUser.create({
          userId: userId,
          userNameToBeDeleted: userFound.nome,
          motivo: motivo
      });
      // Deleta o usuário
      await userToBeDeleted.destroy();

      return {
          success: true,
          message: `Usuário ${userNameToBeDeleted} deletado com sucesso`,
          deletedUser: {
              nome: userNameToBeDeleted,
              motivo
          }
      };

  } catch (error) {

      if (error.name === 'SequelizeForeignKeyConstraintError') {
          throw new Error('Erro de integridade referencial: O nome do usuário informado não existe');
      }

      throw error;
  }
};

const bannedUsers = async ({ UserNameBanned, reason, userId, reporteId }) => {
    try {
        if (!UserNameBanned || !UserNameBanned.trim()) {
            throw new Error('Nome de usuário a ser banido é obrigatório');
        }

        if (!reason || !reason.trim()) {
            throw new Error('Motivo da exclusão é obrigatório');
        }

        const validReason = ['post', 'comentario', 'outros']
        if (!validReason.includes(reason)){
            throw new Error(`Role inválida. Use: ${validReason.join(', ')}`);
        }

        if ((reason === 'post' || reason === 'comentario' ) && (reporteId === undefined || reporteId === null || (typeof reporteId === 'string' && !reporteId.trim()))){
            throw new Error('O parâmetro reportId é obrigatório para os motivos "post" ou "comentario"');
        }

        const banExpiryDate = new Date();
        banExpiryDate.setDate(banExpiryDate.getDate() + 7);

        const blockCount = 1;

        const newBan = await BannedUsers.create({
            userId,
            UserNameBanned,
            banExpiryDate,
            reason,
            reporteId,
            blockCount
        });

        return newBan;
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            throw new Error('Erro de integridade referencial: O nome do usuário informado não existe');
        }
  
        throw error;
    }
} 

module.exports = {
  deleteUserByName,
  bannedUsers
};