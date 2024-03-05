const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Import Sequelize connection
const apiRoutes = require('./controllers/');
const userPageRoutes = require('./controllers/api/usersPageRoutes');
const homeRoutes = require('./controllers/homeRoutes'); // Adjust the path as needed
const customHelpers = require('./helpers/handlebars-helpers'); 
const SequelizeStore = require('connect-session-sequelize')(session.Store);



const app = express();
const PORT = process.env.PORT || 3002;

// Handlebars setup
const hbs = exphbs.create({ 
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: customHelpers,
});

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Session middleware
app.use(session({
  secret: 'Super secret secret', // This should be a random, unique string used to sign the session ID cookie
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // Enable secure cookies in production environment
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  },
  resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: true, // Forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({
    db: sequelize
  })
}));


app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/api', apiRoutes);
app.use('/', homeRoutes);
app.use('/users', userPageRoutes); 

// Sequelize model synchronization
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Unable to sync database:', error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});