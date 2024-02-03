## Documentation for Models

1. User Model

- Purpose: Manages user information and authentication.
- Attributes:
     - id: Primary key, auto-incremented (Integer).
     - username: User's chosen username (String, Unique, Required).
     - email: User's email address (String, Unique, Required).
     - password: Hashed password for authentication (String, Required).

2. Post Model

- Purpose: Handles blog posts creation, storage, and management.
- Attributes:
     - id: Primary key, auto-incremented (Integer).
     - title: Title of the blog post (String, Required).
     - content: Content of the blog post (Text, Required).
     - createdAt: Timestamp when the post was created (DateTime, Auto-generated).
     - userId: Foreign key linking to the User model (Integer, Required).

3. Comment Model

- Purpose: Manages comments on blog posts.
- Attributes:
     - id: Primary key, auto-incremented (Integer).
     - text: Text content of the comment (Text, Required).
     - createdAt: Timestamp when the comment was made (DateTime, Auto-generated).
     - postId: Foreign key linking to the Post model (Integer, Required).
     - userId: Foreign key linking to the User model (Integer, Required).

## Relationships

- User to Post: One-to-Many.
      - Each User can create multiple Posts.
      - Each Post is associated with one User.
- Post to Comment: One-to-Many.
      - Each Post can have multiple Comments.
      - Each Comment is associated with one Post.
- User to Comment: One-to-Many.
      - Each User can make multiple Comments.
      - Each Comment is made by one User.

## Additional Notes

- Indexes: Consider adding indexes on foreign keys (userId in both Posts and Comments, postId in Comments) for performance optimization.
- Security: Ensure the password attribute in the User model is securely hashed using libraries like bcrypt before storing in the database.
- Timestamps: Both Post and Comment models include createdAt fields. Depending on your ORM/database setup, these might be automatically managed or require explicit handling.