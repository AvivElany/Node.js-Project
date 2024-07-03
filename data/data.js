const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const users = [
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    name: {
      first: "Uri",
      middle: "the",
      last: "User",
    },
    phone: "050-1234567",
    email: "user@gmail.com",
    password: bcrypt.hashSync('User123!', 10),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/user.svg",
      alt: "User Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Haifa",
      street: "Lotus",
      houseNumber: 15,
      zip: 111111,
    },
    isAdmin: false,
    isBusiness: false,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    name: {
      first: "Benny",
      middle: "the",
      last: "Business",
    },
    phone: "052-1234567",
    email: "biz@gmail.com",
    password: bcrypt.hashSync('Biz123!', 10),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/business.svg",
      alt: "Business Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Tel Aviv",
      street: "Sderot Begin",
      houseNumber: 62,
      zip: 222222,
    },
    isAdmin: false,
    isBusiness: true,
  },
  {
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Arik",
      middle: "the",
      last: "Admin",
    },
    phone: "054-1234567",
    email: "admin@gmail.com",
    password: bcrypt.hashSync('Admin123!', 10),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/admin.svg",
      alt: "Admin Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 120,
      zip: 333333,
    },
    isAdmin: true,
    isBusiness: false,
  },
]

const cards = [
  { 
    title: "First card",
    subtitle: "Our first card",
    description: "This is the first card in our card collection",
    phone: "050-1000000",
    email: "first@gmail.com",
    web: "http://www.first.com",
    image: {
      url: "http://127.0.0.1:3000/images/cards/001.jpg",
      alt: "business card image",
    },
    address: {
      state: "israel",
      country: "israel",
      city: "haifa",
      street: "derech hayam",
      houseNumber: 6,
      zip: 100000,
    },
    bizNumber: 1000000,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    likes: [
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    ]
  },
  { 
    title: "Second card",
    subtitle: "Our second card",
    description: "This is the second card in our card collection",
    phone: "050-2000000",
    email: "second@gmail.com",
    web: "http://www.second.com",
    image: {
      url: "http://127.0.0.1:3000/images/cards/002.jpg",
      alt: "business card image",
    },
    address: {
      state: "israel",
      country: "israel",
      city: "tel aviv",
      street: "rothschild",
      houseNumber: 10,
      zip: 200000,
    },
    bizNumber: 1000001,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    likes: [],
  },
  { 
    title: "Third card",
    subtitle: "Our third card",
    description: "This is the third card in our card collection",
    phone: "050-3000000",
    email: "third@gmail.com",
    web: "http://www.third.com",
    image: {
      url: "http://127.0.0.1:3000/images/cards/003.jpg",
      alt: "business card image",
    },
    address: {
      state: "israel",
      country: "israel",
      city: "jerusalem",
      street: "yafo",
      houseNumber: 15,
      zip: 300000,
    },
    bizNumber: 1000002,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562'),
    likes: [],
  },
  { 
    title: "Fourth card",
    subtitle: "Our fourth card",
    description: "This is the fourth card in our card collection",
    phone: "050-4000000",
    email: "fourth@gmail.com",
    web: "http://www.fourth.com",
    image: {
      url: "http://127.0.0.1:3000/images/cards/004.jpg",
      alt: "business card image",
    },
    address: {
      state: "israel",
      country: "israel",
      city: "beer sheva",
      street: "hagefen",
      houseNumber: 20,
      zip: 400000,
    },
    bizNumber: 1000003,
    user_id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
    likes: [
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234561'),
      new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234562')
    ],
  }
];

module.exports = { users, cards };





/*
דוגמא למשתמש במסד נתונים
==========================
{
    _id: new mongoose.Types.ObjectId('60d5ec49f1b2f9a7d1234563'),
    name: {
      first: "Arik",
      middle: "the",
      last: "Admin",
    },
    phone: "054-1234567",
    email: "admin@gmail.com",
    password: bcrypt.hashSync('Admin123!', 10),
    image: {
      url: "http://127.0.0.1:3000/images/profiles/admin.svg",
      alt: "Admin Profile",
    },
    address: {
      state: "Israel",
      country: "Israel",
      city: "Jerusalem",
      street: "King George",
      houseNumber: 120,
      zip: 333333,
    },
    class: h3               // ח3
    isStaff: false,
    isLecturer: false,
    isStudent: true,
  },



*/