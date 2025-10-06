const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Admin = require('../models/Admin');

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const admin = await Admin.create({
      name: 'Admin StormLab',
      email: 'admin@stormlab.com',
      password: 'admin123456',
      role: 'superadmin'
    });

    console.log('Admin created successfully:');
    console.log('Email:', admin.email);
    console.log('Password: admin123456');
    console.log('\nPlease change this password after first login!');

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();