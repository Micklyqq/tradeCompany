'use strict';

const sequelize = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   // await queryInterface.removeConstraint('user_roles','user_roles_userId_foreign_idx');
   // await queryInterface.removeConstraint('user_roles','user_roles_roleId_foreign_idx');
   await queryInterface.dropTable('user_roles');

   await queryInterface.addColumn('users','roleId',{
       type:Sequelize.INTEGER,
       references:{
           model:'roles',
           key:'id',
       },
       onUpdate:'CASCADE',
       onDelete:'CASCADE',
   })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.createTable('user_roles',{
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        userId:{
            type:Sequelize.INTEGER,
            references:{
                model:'users',
                key:'id'
            },
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
        },
        roleId:{
            type:Sequelize.INTEGER,
            references:{
                model:'roles',
                key:'id'
            },
            onUpdate:'CASCADE',
            onDelete:'CASCADE'
        },
        createdAt:{
            allowNull:false,
            type:sequelize.DATE,
        },
        updatedAt:{
            allowNull:false,
            type:sequelize.DATE,
        }
    });

    await queryInterface.removeColumn('users','roleId');
  }
};
