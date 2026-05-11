const nodemailer = require('nodemailer');

const sendOrderEmail = async (userEmail, order) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const orderItemsHtml = order.orderItems
    .map(
      (item) => `
    <li>
      ${item.name} - ${item.qty} x $${item.price} = $${item.qty * item.price}
    </li>
  `
    )
    .join('');

  const mailOptions = {
    from: `"Food Delivery" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: 'Order Confirmation - Food Delivery App',
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order ID is <strong>${order._id}</strong></p>
      <h2>Order Summary:</h2>
      <ul>
        ${orderItemsHtml}
      </ul>
      <p><strong>Total Price: $${order.totalPrice}</strong></p>
      <p>Shipping Address: ${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country}</p>
      <p>We are preparing your food and will notify you when it's out for delivery.</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Order confirmation email sent to:', userEmail);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

module.exports = { sendOrderEmail };
