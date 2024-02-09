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

// Homepage route
app.get('/', async (req, res) => {
  // Assuming you have a function or method to fetch posts, adjust as necessary
  try {
      // Example: const posts = await Post.findAll();
      // For demonstration, we'll simulate an array of posts
      const posts = [{ title: "Post 1", content: "Lorem ipsum", id: 1 }]; // Simulate fetching posts

      res.render('pages/home', { 
          posts: posts, // Pass the posts to the template
          helpers: {
              // Define any helpers you might need for formatting
          }
      });
  } catch (error) {
      console.error('Error loading homepage:', error);
      res.status(500).send('Error loading the homepage');
  }
});

app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
});
