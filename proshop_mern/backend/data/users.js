import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Suryansh',
    email: 'suryansh@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Aayush',
    email: 'aayush@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Rohit',
    email: 'rohit@example.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users
