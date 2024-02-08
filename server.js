const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const { Post } = require('./models'); // Adjust this path as necessary

// Import aggregated API routes
const apiRoutes = require('./controllers/');

const app = express();
const PORT = process.env.PORT || 3000;

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
const hbs = exphbs.create({ /* config if needed */ });
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Use the aggregated API routes under '/api'
app.use('/api', apiRoutes);

//Homepage route
// app.get('/', async (req, res) => {
//   try {
//     const posts = await Post.findAll();
//     res.render('pages/home', { posts });
//   } catch (error) {
//     res.status(500).send('Error loading homepage');
//   }
// });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
