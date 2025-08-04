// createAdmin.js
const bcrypt = require('bcrypt');
const { User } = require('./models');
const sequelize = require('./config/db');

async function createAdmin() {
  await sequelize.sync();

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await User.create({
  name: 'Admin User', // <-- updated name
  email: 'admin@example.com',
  password: hashedPassword,
  role: 'admin',
});

  console.log('✅ Admin user created successfully');
  process.exit(); // Exit script
}

createAdmin().catch(err => {
  console.error('❌ Error creating admin user:', err);
  process.exit(1);
});
