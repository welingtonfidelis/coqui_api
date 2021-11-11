"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: "companies" }, [
      {
        name: "Master",
        email: "master@email.com",
        cnpj: "000000000000001",
        active: true,
        logo: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: "companies" });
  },
};
