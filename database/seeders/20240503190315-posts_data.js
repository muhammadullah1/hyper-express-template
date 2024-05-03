module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert(
      "posts",
      [
        {
          userId: 1,
          title: "post title",
          body: "post description",
          archive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "post title",
          body: "post description",
          archive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "post title",
          body: "post description",
          archive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "post title",
          body: "post description",
          archive: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: 1,
          title: "post title",
          body: "post description",
          archive: false,
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
