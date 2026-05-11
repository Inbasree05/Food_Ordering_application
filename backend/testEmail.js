const dotenv = require('dotenv');
const { sendOrderEmail } = require('./utils/emailService');

dotenv.config();

const testOrder = {
  _id: 'TEST_ORDER_123',
  orderItems: [
    { name: 'Test Burger', qty: 2, price: 10 },
    { name: 'Test Pizza', qty: 1, price: 15 }
  ],
  totalPrice: 35,
  shippingAddress: {
    address: '123 Test St',
    city: 'Test City',
    postalCode: '12345',
    country: 'Test Country'
  }
};

const recipient = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

console.log('Attempting to send test email to:', recipient);
console.log('Using EMAIL_SERVICE:', process.env.EMAIL_SERVICE);
console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

sendOrderEmail(recipient, testOrder)
  .then(() => console.log('Test execution finished.'))
  .catch(err => console.error('Test execution failed:', err));
