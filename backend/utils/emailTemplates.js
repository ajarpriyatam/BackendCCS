// Email templates for user and company confirmations

const generateUserOrderConfirmationEmail = (userName, orderDetails) => {
  const { orderID, orderItems, total, destionationAddress, paidAt } = orderDetails;
  
  return {
    subject: `🎉 Order Confirmed! - ${orderID} | CareerCodeSolution`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Order Confirmation</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 300;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
            background-color: white; 
          }
          .success-banner {
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            border: 1px solid #c3e6cb;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
            text-align: center;
          }
          .success-banner h2 {
            color: #155724;
            margin: 0 0 10px 0;
            font-size: 24px;
          }
          .success-banner p {
            color: #155724;
            margin: 0;
            font-size: 16px;
          }
          .order-info { 
            background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%); 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(33, 150, 243, 0.2);
          }
          .order-info h3 {
            margin-top: 0;
            color: #1976d2;
            font-size: 20px;
            text-align: center;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid rgba(25, 118, 210, 0.2);
          }
          .info-row:last-child {
            border-bottom: none;
          }
          .info-label {
            font-weight: bold;
            color: #1976d2;
          }
          .info-value {
            font-weight: 500;
            color: #424242;
          }
          .total-amount {
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 15px 0;
          }
          .items-section {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
          }
          .items-section h3 {
            margin-top: 0;
            color: #f57c00;
            font-size: 20px;
            text-align: center;
          }
          .item { 
            background: white;
            padding: 15px; 
            margin: 10px 0; 
            border-radius: 8px;
            border-left: 4px solid #ff9800;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          .item-name {
            font-weight: bold;
            font-size: 16px;
            color: #333;
            margin-bottom: 5px;
          }
          .item-details {
            color: #666;
            font-size: 14px;
          }
          .item-details span {
            display: inline-block;
            margin-right: 15px;
          }
          .address-section {
            background: linear-gradient(135deg, #f3e5f5 0%, #e1bee7 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(156, 39, 176, 0.2);
          }
          .address-section h3 {
            margin-top: 0;
            color: #7b1fa2;
            font-size: 20px;
            text-align: center;
          }
          .address-text {
            background: white;
            padding: 15px;
            border-radius: 8px;
            color: #333;
            line-height: 1.8;
          }
          .next-steps {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 5px solid #4CAF50;
          }
          .next-steps h3 {
            color: #2e7d32;
            margin-top: 0;
            font-size: 18px;
          }
          .step-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            color: #2e7d32;
          }
          .step-icon {
            background: #4CAF50;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 12px;
          }
          .footer { 
            text-align: center; 
            padding: 25px; 
            background-color: #f8f9fa;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
          }
          .support-info {
            background: linear-gradient(135deg, #fff8e1 0%, #ffecb3 100%);
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            border: 1px solid #ffc107;
          }
          .support-info h4 {
            color: #f57f17;
            margin: 0 0 10px 0;
          }
          .support-info p {
            color: #f57f17;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Order Confirmed!</h1>
            <p>Thank you for choosing CareerCodeSolution</p>
          </div>
          <div class="content">
            <div class="success-banner">
              <h2>✅ Order Successfully Placed</h2>
              <p>Dear ${userName}, your order has been confirmed and is being processed!</p>
            </div>
            
            <div class="order-info">
              <h3>📋 Order Information</h3>
              <div class="info-row">
                <span class="info-label">🆔 Order ID:</span>
                <span class="info-value">${orderID}</span>
              </div>
              <div class="info-row">
                <span class="info-label">📅 Order Date:</span>
                <span class="info-value">${new Date(paidAt).toLocaleDateString('en-IN', { 
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZone: 'Asia/Kolkata'
                })}</span>
              </div>
              <div class="total-amount">
                💰 Total Amount: ₹${total}
              </div>
            </div>

            <div class="items-section">
              <h3>🛍️ Your Order Items</h3>
              ${orderItems.map(item => `
                <div class="item">
                  <div class="item-name">${item.name}</div>
                  <div class="item-details">
                    <span><strong>Category:</strong> ${item.category}</span>
                    <span><strong>Quantity:</strong> ${item.quantity}</span>
                    <span><strong>Price:</strong> ₹${item.price}</span>
                  </div>
                </div>
              `).join('')}
            </div>

            <div class="address-section">
              <h3>📍 Delivery Address</h3>
              <div class="address-text">
                ${destionationAddress.addreslin1}<br>
                ${destionationAddress.city}, ${destionationAddress.district}<br>
                ${destionationAddress.state} - ${destionationAddress.pincode}
              </div>
            </div>

            <div class="next-steps">
              <h3>🚀 What Happens Next?</h3>
              <div class="step-item">
                <div class="step-icon">1</div>
                <span>We'll process your order within 24 hours</span>
              </div>
              <div class="step-item">
                <div class="step-icon">2</div>
                <span>You'll receive tracking information via email</span>
              </div>
              <div class="step-item">
                <div class="step-icon">3</div>
                <span>Your order will be shipped within 2-3 business days</span>
              </div>
              <div class="step-item">
                <div class="step-icon">4</div>
                <span>Delivery typically takes 3-7 business days</span>
              </div>
            </div>

            <div class="support-info">
              <h4>💬 Need Help?</h4>
              <p>If you have any questions about your order, please contact our customer support team. We're here to help!</p>
            </div>
          </div>
          <div class="footer">
            <p><strong>Thank you for choosing CareerCodeSolution!</strong></p>
            <p>We appreciate your business and look forward to serving you again.</p>
            <p>Best regards,<br>CareerCodeSolution Team</p>
            <p style="font-size: 12px; margin-top: 15px;">
              This is an automated confirmation email. Please keep this for your records.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Order Confirmation - ${orderID}
      
      Dear ${userName},
      
      Your order has been successfully placed and confirmed.
      
      Order Details:
      - Order ID: ${orderID}
      - Order Date: ${new Date(paidAt).toLocaleDateString()}
      - Total Amount: ₹${total}
      
      Order Items:
      ${orderItems.map(item => `
        - ${item.name} (${item.category})
          Quantity: ${item.quantity}
          Price: ₹${item.price}
      `).join('')}
      
      Delivery Address:
      ${destionationAddress.addreslin1}
      ${destionationAddress.city}, ${destionationAddress.district}
      ${destionationAddress.state} - ${destionationAddress.pincode}
      
      We will process your order and send you tracking information once it's shipped.
      
      Thank you for choosing us!
      CareerCodeSolution Team
    `
  };
};

const generateCompanyOrderNotificationEmail = (orderDetails, userDetails) => {
  const { orderID, orderItems, total, destionationAddress, paidAt } = orderDetails;
  const { name, email, phoneno } = userDetails;
  
  return {
    subject: `New Order Received - ${orderID}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Order Notification</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .order-details { background-color: white; padding: 15px; margin: 10px 0; border-radius: 5px; }
          .item { border-bottom: 1px solid #eee; padding: 10px 0; }
          .total { font-weight: bold; font-size: 18px; color: #2196F3; }
          .footer { text-align: center; padding: 20px; color: #666; }
          .urgent { background-color: #ffeb3b; padding: 10px; border-radius: 5px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Order Received</h1>
            <p>Action Required</p>
          </div>
          <div class="content">
            <div class="urgent">
              <h3>🚨 New Order Alert</h3>
              <p>A new order has been placed and requires processing.</p>
            </div>
            
            <div class="order-details">
              <h3>Order Information</h3>
              <p><strong>Order ID:</strong> ${orderID}</p>
              <p><strong>Order Date:</strong> ${new Date(paidAt).toLocaleDateString()}</p>
              <p><strong>Total Amount:</strong> <span class="total">₹${total}</span></p>
            </div>

            <div class="order-details">
              <h3>Customer Information</h3>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phoneno}</p>
            </div>

            <div class="order-details">
              <h3>Order Items</h3>
              ${orderItems.map(item => `
                <div class="item">
                  <p><strong>${item.name}</strong></p>
                  <p>Category: ${item.category}</p>
                  <p>Quantity: ${item.quantity}</p>
                  <p>Price: ₹${item.price}</p>
                </div>
              `).join('')}
            </div>

            <div class="order-details">
              <h3>Delivery Address</h3>
              <p>${destionationAddress.addreslin1}</p>
              <p>${destionationAddress.city}, ${destionationAddress.district}</p>
              <p>${destionationAddress.state} - ${destionationAddress.pincode}</p>
            </div>

            <p><strong>Next Steps:</strong></p>
            <ul>
              <li>Review the order details</li>
              <li>Prepare the items for shipment</li>
              <li>Update order status in the system</li>
              <li>Send tracking information to the customer</li>
            </ul>
          </div>
          <div class="footer">
            <p>Please process this order promptly.</p>
            <p>CareerCodeSolution Management System</p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      New Order Received - ${orderID}
      
      A new order has been placed and requires processing.
      
      Order Details:
      - Order ID: ${orderID}
      - Order Date: ${new Date(paidAt).toLocaleDateString()}
      - Total Amount: ₹${total}
      
      Customer Information:
      - Name: ${name}
      - Email: ${email}
      - Phone: ${phoneno}
      
      Order Items:
      ${orderItems.map(item => `
        - ${item.name} (${item.category})
          Quantity: ${item.quantity}
          Price: ₹${item.price}
      `).join('')}
      
      Delivery Address:
      ${destionationAddress.addreslin1}
      ${destionationAddress.city}, ${destionationAddress.district}
      ${destionationAddress.state} - ${destionationAddress.pincode}
      
      Next Steps:
      - Review the order details
      - Prepare the items for shipment
      - Update order status in the system
      - Send tracking information to the customer
      
      Please process this order promptly.
      CareerCodeSolution Management System
    `
  };
};

// College Ambassador Email Templates
const generateAmbassadorWelcomeEmail = (ambassadorDetails) => {
  const { name, emailId, phoneNumber, collegeName, collegeCity, courseYear, ambassadorId } = ambassadorDetails;
  
  return {
    subject: "🎉 Welcome to CareerCodeSolution Ambassador Program!",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Welcome to Ambassador Program</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 300;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
            background-color: white; 
          }
          .welcome-section {
            text-align: center;
            margin-bottom: 30px;
          }
          .welcome-section h2 {
            color: #667eea;
            margin-bottom: 10px;
            font-size: 24px;
          }
          .ambassador-details { 
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); 
            color: white; 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(240, 147, 251, 0.3);
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 8px 0; 
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .detail-row:last-child { 
            border-bottom: none; 
          }
          .detail-label { 
            font-weight: bold; 
            opacity: 0.9;
          }
          .detail-value { 
            font-weight: 500;
          }
          .benefits-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
          }
          .benefits-section h3 {
            color: #495057;
            margin-bottom: 15px;
            font-size: 20px;
          }
          .benefit-item {
            display: flex;
            align-items: center;
            margin: 12px 0;
            color: #495057;
          }
          .benefit-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 15px;
            font-size: 14px;
          }
          .footer { 
            text-align: center; 
            padding: 25px; 
            background-color: #f8f9fa;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 25px;
            font-weight: bold;
            margin: 20px 0;
            transition: transform 0.2s;
          }
          .cta-button:hover {
            transform: translateY(-2px);
          }
          .highlight {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            text-align: center;
            font-weight: bold;
            color: #8b4513;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Welcome Aboard!</h1>
            <p>CareerCodeSolution Ambassador Program</p>
          </div>
          <div class="content">
            <div class="welcome-section">
              <h2>Dear ${name},</h2>
              <p>Congratulations! You have been successfully registered as a College Ambassador for CareerCodeSolution.</p>
            </div>
            
            <div class="ambassador-details">
              <h3 style="margin-top: 0; text-align: center; font-size: 20px;">Your Ambassador Details</h3>
              <div class="detail-row">
                <span class="detail-label">👤 Name:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📧 Email:</span>
                <span class="detail-value">${emailId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📱 Phone:</span>
                <span class="detail-value">${phoneNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🏫 College:</span>
                <span class="detail-value">${collegeName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🏙️ City:</span>
                <span class="detail-value">${collegeCity}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📚 Course Year:</span>
                <span class="detail-value">${courseYear}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🆔 Ambassador ID:</span>
                <span class="detail-value">${ambassadorId}</span>
              </div>
            </div>

            <div class="benefits-section">
              <h3>🌟 What You Can Do as an Ambassador:</h3>
              <div class="benefit-item">
                <div class="benefit-icon">🎯</div>
                <span>Access exclusive ambassador resources and materials</span>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🎪</div>
                <span>Participate in ambassador events and workshops</span>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">🤝</div>
                <span>Network with other ambassadors across India</span>
              </div>
              <div class="benefit-item">
                <div class="benefit-icon">📈</div>
                <span>Grow your professional network and skills</span>
              </div>
            </div>

            <div class="highlight">
              🎊 You're now part of an elite community of student ambassadors!
            </div>

            <p style="text-align: center;">
              <a href="#" class="cta-button">Get Started as Ambassador</a>
            </p>

            <p>We're excited to have you on our team! If you have any questions or need assistance, don't hesitate to reach out to us.</p>
          </div>
          <div class="footer">
            <p><strong>Welcome to the CareerCodeSolution family!</strong></p>
            <p>Best regards,<br>CareerCodeSolution Team</p>
            <p style="font-size: 12px; margin-top: 15px;">
              This is an automated message. Please do not reply to this email.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      🎉 Welcome to CareerCodeSolution Ambassador Program!
      
      Dear ${name},
      
      Congratulations! You have been successfully registered as a College Ambassador for CareerCodeSolution.
      
      Your Ambassador Details:
      - Name: ${name}
      - Email: ${emailId}
      - Phone: ${phoneNumber}
      - College: ${collegeName}
      - City: ${collegeCity}
      - Course Year: ${courseYear}
      - Ambassador ID: ${ambassadorId}
      
      As an ambassador, you can:
      - Access exclusive ambassador resources and materials
      - Participate in ambassador events and workshops
      - Network with other ambassadors across India
      - Grow your professional network and skills
      
      We're excited to have you on our team! If you have any questions or need assistance, don't hesitate to reach out to us.
      
      Welcome to the CareerCodeSolution family!
      
      Best regards,
      CareerCodeSolution Team
    `
  };
};

const generateCompanyAmbassadorNotificationEmail = (ambassadorDetails) => {
  const { name, emailId, phoneNumber, collegeName, collegeCity, collegeCityPincode, courseYear, ambassadorId, createdAt } = ambassadorDetails;
  
  return {
    subject: `🔔 New Ambassador Registration - ${name} from ${collegeName}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Ambassador Registration</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 300;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
            background-color: white; 
          }
          .alert-section {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            text-align: center;
            border-left: 5px solid #ff6b6b;
          }
          .alert-section h3 {
            margin: 0 0 10px 0;
            color: #8b4513;
            font-size: 20px;
          }
          .ambassador-details { 
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(168, 237, 234, 0.3);
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 10px 0; 
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          .detail-row:last-child { 
            border-bottom: none; 
          }
          .detail-label { 
            font-weight: bold; 
            color: #495057;
            flex: 1;
          }
          .detail-value { 
            font-weight: 500;
            color: #212529;
            flex: 2;
            text-align: right;
          }
          .action-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 5px solid #28a745;
          }
          .action-section h3 {
            color: #155724;
            margin-bottom: 15px;
            font-size: 18px;
          }
          .action-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            color: #495057;
          }
          .action-icon {
            background: #28a745;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 12px;
          }
          .footer { 
            text-align: center; 
            padding: 25px; 
            background-color: #343a40;
            color: white;
          }
          .stats-highlight {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px;
            border-radius: 8px;
            text-align: center;
            margin: 15px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Ambassador Registration</h1>
            <p>Action Required - Review & Approval</p>
          </div>
          <div class="content">
            <div class="alert-section">
              <h3>🚨 New Ambassador Alert</h3>
              <p>A new student has registered for the College Ambassador Program and requires your review and approval.</p>
            </div>
            
            <div class="ambassador-details">
              <h3 style="margin-top: 0; text-align: center; font-size: 20px; color: #495057;">📋 Ambassador Details</h3>
              <div class="detail-row">
                <span class="detail-label">👤 Full Name:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📧 Email Address:</span>
                <span class="detail-value">${emailId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📱 Phone Number:</span>
                <span class="detail-value">${phoneNumber}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🏫 College Name:</span>
                <span class="detail-value">${collegeName}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🏙️ City:</span>
                <span class="detail-value">${collegeCity}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📮 Pincode:</span>
                <span class="detail-value">${collegeCityPincode}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📚 Course Year:</span>
                <span class="detail-value">${courseYear}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">🆔 Ambassador ID:</span>
                <span class="detail-value">${ambassadorId}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📅 Registration Date:</span>
                <span class="detail-value">${new Date(createdAt).toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
              </div>
            </div>

            <div class="action-section">
              <h3>📝 Required Actions:</h3>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Review ambassador profile and credentials</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Verify college and course information</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Check for any red flags or concerns</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Approve or reject the application</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Update ambassador status in the system</span>
              </div>
            </div>

            <div class="stats-highlight">
              <p style="margin: 0; font-weight: bold;">
                📊 This registration brings us closer to our goal of having ambassadors in every major college across India!
              </p>
            </div>

            <p style="text-align: center; margin-top: 25px;">
              <strong>Please review this application promptly to ensure a smooth onboarding experience for our new ambassador.</strong>
            </p>
          </div>
          <div class="footer">
            <p><strong>CareerCodeSolution Management System</strong></p>
            <p>This is an automated notification. Please review and take appropriate action.</p>
            <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
              System generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      🔔 New College Ambassador Registration
      
      A new ambassador has been registered and requires your review and approval.
      
      Ambassador Details:
      - Name: ${name}
      - Email: ${emailId}
      - Phone: ${phoneNumber}
      - College: ${collegeName}
      - City: ${collegeCity}
      - Pincode: ${collegeCityPincode}
      - Course Year: ${courseYear}
      - Ambassador ID: ${ambassadorId}
      - Registration Date: ${new Date(createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      
      Required Actions:
      - Review ambassador profile and credentials
      - Verify college and course information
      - Check for any red flags or concerns
      - Approve or reject the application
      - Update ambassador status in the system
      
      Please review this application promptly to ensure a smooth onboarding experience for our new ambassador.
      
      CareerCodeSolution Management System
    `
  };
};

// Contact Message Email Templates
const generateContactMessageEmail = (contactDetails) => {
  const { name, email, phone, message } = contactDetails;
  
  return {
    subject: `📧 New Contact Message from ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>New Contact Message</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 300;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
            background-color: white; 
          }
          .alert-section {
            background: linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%);
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 25px;
            text-align: center;
            border-left: 5px solid #ff6b6b;
          }
          .alert-section h3 {
            margin: 0 0 10px 0;
            color: #8b4513;
            font-size: 20px;
          }
          .contact-details { 
            background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); 
            padding: 25px; 
            margin: 20px 0; 
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(168, 237, 234, 0.3);
          }
          .detail-row { 
            display: flex; 
            justify-content: space-between; 
            padding: 10px 0; 
            border-bottom: 1px solid rgba(0,0,0,0.1);
          }
          .detail-row:last-child { 
            border-bottom: none; 
          }
          .detail-label { 
            font-weight: bold; 
            color: #495057;
            flex: 1;
          }
          .detail-value { 
            font-weight: 500;
            color: #212529;
            flex: 2;
            text-align: right;
          }
          .message-section {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(255, 152, 0, 0.2);
          }
          .message-section h3 {
            margin-top: 0;
            color: #f57c00;
            font-size: 20px;
            text-align: center;
          }
          .message-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            color: #333;
            line-height: 1.8;
            white-space: pre-wrap;
          }
          .action-section {
            background-color: #f8f9fa;
            padding: 25px;
            border-radius: 10px;
            margin: 20px 0;
            border-left: 5px solid #28a745;
          }
          .action-section h3 {
            color: #155724;
            margin-bottom: 15px;
            font-size: 18px;
          }
          .action-item {
            display: flex;
            align-items: center;
            margin: 10px 0;
            color: #495057;
          }
          .action-icon {
            background: #28a745;
            color: white;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
            font-size: 12px;
          }
          .footer { 
            text-align: center; 
            padding: 25px; 
            background-color: #343a40;
            color: white;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 New Contact Message</h1>
            <p>Someone has sent you a message through your website</p>
          </div>
          <div class="content">
            <div class="alert-section">
              <h3>📬 New Message Received</h3>
              <p>A visitor has contacted you through your website contact form.</p>
            </div>
            
            <div class="contact-details">
              <h3 style="margin-top: 0; text-align: center; font-size: 20px; color: #495057;">👤 Contact Information</h3>
              <div class="detail-row">
                <span class="detail-label">👤 Full Name:</span>
                <span class="detail-value">${name}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📧 Email Address:</span>
                <span class="detail-value">${email}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">📱 Phone Number:</span>
                <span class="detail-value">${phone}</span>
              </div>
            </div>

            <div class="message-section">
              <h3>💬 Message Content</h3>
              <div class="message-content">${message}</div>
            </div>

            <div class="action-section">
              <h3>📝 Recommended Actions:</h3>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Review the message and contact information</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Reply to the sender via email or phone</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Update message status in the admin panel</span>
              </div>
              <div class="action-item">
                <div class="action-icon">✓</div>
                <span>Follow up if additional information is needed</span>
              </div>
            </div>


            <p style="text-align: center; margin-top: 25px;">
              <strong>Please respond to this message promptly to maintain good customer service.</strong>
            </p>
          </div>
          <div class="footer">
            <p><strong>CareerCodeSolution Contact System</strong></p>
            <p>This is an automated notification. Please review and respond to the message.</p>
            <p style="font-size: 12px; margin-top: 15px; opacity: 0.8;">
              System generated on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      📧 New Contact Message
      
      A visitor has contacted you through your website contact form.
      
      Contact Information:
      - Name: ${name}
      - Email: ${email}
      - Phone: ${phone}
      
      Message Content:
      ${message}
      
      Recommended Actions:
      - Review the message and contact information
      - Reply to the sender via email or phone
      - Update message status in the admin panel
      - Follow up if additional information is needed
      
      Please respond to this message promptly to maintain good customer service.
      
      CareerCodeSolution Contact System
    `
  };
};

const generateContactReplyEmail = (replyDetails) => {
  const { name, email, originalMessage, replyMessage } = replyDetails;
  
  return {
    subject: "📧 Re: Your Message - CareerCodeSolution",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Reply to Your Message</title>
        <style>
          body { 
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            margin: 0; 
            padding: 0; 
            background-color: #f4f4f4;
          }
          .container { 
            max-width: 600px; 
            margin: 20px auto; 
            background-color: white; 
            border-radius: 10px; 
            overflow: hidden;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header { 
            background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%); 
            color: white; 
            padding: 30px 20px; 
            text-align: center; 
          }
          .header h1 { 
            margin: 0; 
            font-size: 28px; 
            font-weight: 300;
          }
          .header p { 
            margin: 10px 0 0 0; 
            font-size: 16px; 
            opacity: 0.9;
          }
          .content { 
            padding: 30px 20px; 
            background-color: white; 
          }
          .reply-section {
            background: linear-gradient(135deg, #e8f5e8 0%, #c8e6c9 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 10px;
            border-left: 5px solid #4CAF50;
          }
          .reply-section h3 {
            color: #2e7d32;
            margin-top: 0;
            font-size: 20px;
            text-align: center;
          }
          .reply-content {
            background: white;
            padding: 20px;
            border-radius: 8px;
            color: #333;
            line-height: 1.8;
            white-space: pre-wrap;
          }
          .original-section {
            background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%);
            padding: 25px;
            margin: 20px 0;
            border-radius: 10px;
          }
          .original-section h3 {
            margin-top: 0;
            color: #f57c00;
            font-size: 18px;
          }
          .original-content {
            background: white;
            padding: 15px;
            border-radius: 8px;
            color: #666;
            line-height: 1.6;
            white-space: pre-wrap;
            font-style: italic;
          }
          .footer { 
            text-align: center; 
            padding: 25px; 
            background-color: #f8f9fa;
            color: #6c757d;
            border-top: 1px solid #dee2e6;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>📧 Reply to Your Message</h1>
            <p>Thank you for contacting CareerCodeSolution</p>
          </div>
          <div class="content">
            <div class="reply-section">
              <h3>💬 Our Response</h3>
              <div class="reply-content">${replyMessage}</div>
            </div>

            <div class="original-section">
              <h3>📝 Your Original Message</h3>
              <div class="original-content">${originalMessage}</div>
            </div>

            <p>If you have any further questions or need additional assistance, please don't hesitate to contact us again.</p>
          </div>
          <div class="footer">
            <p><strong>Thank you for choosing CareerCodeSolution!</strong></p>
            <p>Best regards,<br>CareerCodeSolution Team</p>
            <p style="font-size: 12px; margin-top: 15px;">
              This is an automated reply. If you need immediate assistance, please call us directly.
            </p>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      📧 Reply to Your Message - CareerCodeSolution
      
      Dear ${name},
      
      Thank you for contacting CareerCodeSolution. Here is our response to your message:
      
      Our Response:
      ${replyMessage}
      
      Your Original Message:
      ${originalMessage}
      
      If you have any further questions or need additional assistance, please don't hesitate to contact us again.
      
      Thank you for choosing CareerCodeSolution!
      
      Best regards,
      CareerCodeSolution Team
    `
  };
};

module.exports = {
  generateUserOrderConfirmationEmail,
  generateCompanyOrderNotificationEmail,
  generateAmbassadorWelcomeEmail,
  generateCompanyAmbassadorNotificationEmail,
  generateContactMessageEmail,
  generateContactReplyEmail
};


