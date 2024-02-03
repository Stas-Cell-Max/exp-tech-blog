const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');

// Import routes
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const commentRoutes = require('./routes/comments');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'super secret',
  resave: false,
  saveUninitialized: true,
}));

// Handlebars setup
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

// Use routes
app.use('/users', userRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
