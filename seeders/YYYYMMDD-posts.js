

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Posts', [
      {
        title: 'Starting Your Web Development Journey',
        content: 'Web development begins with HTML, CSS, and JavaScript—the core building blocks of the web. HTML structures your content, CSS styles it, and JavaScript adds interactivity. Mastering these technologies is the first step towards becoming a proficient web developer, paving the way for more complex projects and frameworks.',
        userId: 1, // Assuming the first user has ID 1
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Exploring JavaScript Frameworks',
        content: 'JavaScript frameworks like React, Angular, and Vue have revolutionized web development, offering powerful tools for building dynamic applications. This post delves into how these frameworks compare and their impact on the development process, highlighting their role in advancing client-side web development.',
        userId: 2, // Assuming the second user has ID 2
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Demystifying RESTful APIs',
        content: 'RESTful APIs facilitate communication between different systems on the web, allowing developers to integrate third-party services into their applications. This brief overview introduces the fundamentals of RESTful APIs, emphasizing their role in modern web development and how they enhance application functionality.',
        userId: 3, // Assuming the third user has ID 3
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
