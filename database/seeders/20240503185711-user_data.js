const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          firstName: "John Doe",
          lastName: "johndoe",
          email: "johndoe@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: true,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Ali",
          lastName: "khan",
          email: "alikhan@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: false,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "kamran",
          lastName: "khan",
          email: "kamrankhan@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: false,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "zain",
          lastName: "khan",
          email: "zainkhan@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: false,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "Bilal",
          lastName: "Ahmad",
          email: "bilal@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: false,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          firstName: "dinal",
          lastName: "khan",
          email: "dinal@example.com",
          emailVerified: true,
          avatar: null,
          password: bcrypt.hashSync("12345678", 8),
          authSource: "Normal",
          isSuperAdmin: false,
          archive: false,
          termsAccepted: true,
          lastActive: new Date(),
          createdAt: new Date(),
          updatedAt: new Date(),
        }, 
      ],
      {}
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("users", null, {});
  },
};