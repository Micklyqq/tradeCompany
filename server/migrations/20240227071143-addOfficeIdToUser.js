'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('users', 'officeId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'offices', // Имя таблицы, к которой ссылается внешний ключ
        key: 'id',        // Колонка, к которой будет привязан внешний ключ
      },
      onUpdate: 'CASCADE', // Опционально: обновить все связанные записи при обновлении значения officeId
      onDelete: 'CASCADE', // Опционально: удалить все связанные записи при удалении записи с officeId
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('users', 'officeId');
  }
};