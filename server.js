const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// const { Post } = require('./models'); // Adjust this path as necessary

// Import routes
const userRoutes = require('./controllers/api/users');
const postRoutes = require('./controllers/apiposts');
const commentRoutes = require('./controllers/apicomments');

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
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

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
