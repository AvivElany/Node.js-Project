/*
============================================
============================================
            **** WARNING ****
  RUNNING THIS SCRIPT WILL DELETE AND\OR
  OVERWRITE YOUR BCARDS DATABASE !!!!!!!
============================================
============================================
*/
const connectDB = require('./config/db')
const { cards, users } = require('./data/data')
const Card = require('./models/Card')
const User = require('./models/User')

const seedAll = async() => {
  console.log('\nDatabase seeding started...');

  try {
    
    // Seed cards
      // delete all existing cards
      await Card.deleteMany();
      // insert seed cards
      const insertedCards = await Card.insertMany(cards);
      console.log(`  [i] Inserted ${insertedCards.length} cards`);

    // Seed users
      // delete all existing users
      await User.deleteMany();
      // insert seed users
      const insertedUsers = await User.insertMany(users);
      console.log(`  [i] Inserted ${insertedUsers.length} users`);

    // Success
      console.log('[v] Completed successfully');
      process.exit(0);
  } catch(e) {
    // Error
    console.log(error('[x] Seeding error'));
    console.log(error(e.message));
      process.exit(1);
  }
}

// Connect to database
connectDB().then(()=>{
  // Seed all collections
  seedAll()
});