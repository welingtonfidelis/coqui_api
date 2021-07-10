"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert({ tableName: "companies" }, [
      {
        name: "Master",
        email: "master@email.com",
        cnpj: "000.000.000/0000-01",
        active: true,
        logo: "",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete({ tableName: "companies" });
  },
};
