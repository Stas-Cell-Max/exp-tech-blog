const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const path = require('path');
const sequelize = require('./config/connection'); // Import Sequelize connection
const { Post } = require('./models'); 
const apiRoutes = require('./controllers/');
const customHelpers = require('./helpers/handlebars-helpers'); 

const app = express();
const PORT = process.env.PORT || 3001;


// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

app.use(session({
  secret: 'super secret', // You should move this to an environment variable
  resave: false,
  saveUninitialized: true,
}));




// Handlebars setup
const hbs = exphbs.create({ 
  extname: '.handlebars',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts'),
  partialsDir: path.join(__dirname, 'views/partials'),
  helpers: customHelpers,
 
});

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the aggregated API routes under '/api'
app.use('/api', apiRoutes);

// Sequelize model synchronization
sequelize.sync({ force: false }).then(() => {
  console.log('Database synced');
}).catch(error => {
  console.error('Unable to sync database:', error);
});

/// Homepage route
app.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll(); // Fetch all posts
    res.render('pages/home', { 
      posts,
      loggedIn: req.session.userId != null // Pass the loggedIn status to the template
    });
  } catch (error) {
    console.error('Error loading homepage:', error);
    res.status(500).send('Error loading the homepage');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});