# exp-tech-blog

## Description 

This CMS-style blog site is a full-stack application that allows developers to publish their blog posts and comment on other developers’ posts as well. Inspired by the functionality of WordPress, it follows the MVC paradigm, leveraging Handlebars.js for templating, Sequelize as the ORM, and express-session for authentication. Deployed on Heroku, it's designed to offer an intuitive and interactive platform for sharing and discussing technology-related content.

## Table of Content

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Author](#author)
- [Contacts](#contacts)
- [Credits](#credits)
- [License](#license)

## Features
- **User Authentication**: Secure login and registration system to manage user sessions.
- **Blog Posting**: Authenticated users can create, edit, and delete their blog posts.
- **Comment System**: Users can add comments to posts, fostering a community discussion.
- **Responsive Design**: Utilizes Bootstrap for a responsive layout, ensuring compatibility across various devices and screen sizes.
- **MVC Architecture**: Follows the Model-View-Controller (MVC) architectural pattern for efficient code organization and scalability.


## Technologies Used
- Node.js
- Express.js
- Sequelize (ORM)
- MySQL
- dotenv for environment variable management
- Handlebars.js
- express-session and bcrypt for authentication

## Setup and Installation
1. Clone the repo: `git clone git@github.com:Stas-Cell-Max/tech-blog.git`
2. Navigate to the project directory: `cd your-repo-name`
3. Install dependencies: `npm install`
4. Create a `.env` file and add your MySQL user, password, and database name.
5. Run schema and seed commands to set up the database.
6. Start the server: `npm start`


## Future Enhancements


## Contributing
- Contributions to tech-blog are welcome! If you have suggestions for improvement or bug fixes, please open an issue or submit a pull request. Ensure your code adheres to the existing style for consistency. Thank you for your interest in enhancing this employee management tool.


## Deployment
This application is deployed on Heroku. You can follow Heroku's documentation for deploying a Node.js app, ensuring you set up your environment variables in Heroku as per your .env file.

## Author
- Developed by Stanislav Morozan, a passionate developer committed to creating efficient and user-friendly software solutions.

## Contacts
- Email: stasma.sm17@gmail.com 
- LinkedIn: https://www.linkedin.com/in/stanislavmorozan/
- GitHub: git@github.com:Stas-Cell-Max/tech-blog.git

## Credits
Developing the Employee Tracker application was made possible with the help of various resources and communities. Gratefully for the knowledge shared by the following:
- https://sequelize.org/docs/v6/core-concepts/assocs/
- https://www.npmjs.com/package/express-handlebars
- https://expressjs.com/en/guide/using-middleware.html
- https://coding-boot-camp.github.io/full-stack/heroku/deploy-with-heroku-and-mysql
- https://www.npmjs.com/package/bcrypt
- https://expressjs.com/en/guide/routing.html#route-paths
- https://expressjs.com/en/guide/routing.html#express-router

## License
This project is licensed under the [MIT License](LICENSE).

