const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');
require('dotenv').config();

const User = require('../models/user');
const Book = require('/models/book');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapi';

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    console.log('Cleared existing collections');

    // Create users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      const user = new User({
        name: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: hashedPassword
      });
      await user.save();
      users.push(user);
    }
    console.log('Seeded users');

    // Create books
    for (let i = 0; i < 10; i++) {
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const book = new Book({
        title: faker.lorem.words(3),
        author: faker.person.fullName(),
        publishedYear: faker.date.past().getFullYear(),
      });
      await book.save();
    }
    console.log('Seeded books');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seedDatabase();

