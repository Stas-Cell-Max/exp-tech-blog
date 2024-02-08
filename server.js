const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const { Post } = require('./models'); // Adjust this path as necessary

// Import routes
const userRoutes = require('./controllers/api/users');
const postRoutes = require('./controllers/api/posts');
const commentRoutes = require('./controllers/api/comments');
const apiRoutes = require('./controllers/api');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
}));

const hbs = exphbs.create();
// Handlebars setup
app.engine('handlebars', hbs.engine );
app.set('view engine', 'handlebars');

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

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
