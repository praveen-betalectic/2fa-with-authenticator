
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

// Generate secret key and QR code URL
const secret = speakeasy.generateSecret({ length: 20 });
const qrCodeUrl = speakeasy.otpauthURL({ secret: secret.ascii, label: 'My App' });

// Generate QR code image
QRCode.toDataURL(qrCodeUrl, (error, imageUrl) => {
  if (error) {
    console.error(error);
    return;
  }
  
  // Display QR code image to the user
  const img = document.createElement('img');
  img.src = imageUrl;
  document.body.appendChild(img);
});

// Validate one-time code entered by user
const verifyCode = (code) => {
  const isValid = speakeasy.totp.verify({
    secret: secret.ascii,
    encoding: 'ascii',
    token: code,
    window: 2 // Allow a time window of 2 intervals before/after the current time
  });

  if (isValid) {
    console.log('Authentication successful!');
  } else {
    console.log('Authentication failed!');
  }
};

// Prompt user to enter one-time code and validate it
const codeInput = document.createElement('input');
codeInput.type = 'text';
document.body.appendChild(codeInput);

const verifyButton = document.createElement('button');
verifyButton.textContent = 'Verify';
verifyButton.addEventListener('click', () => {
  verifyCode(codeInput.value);
});
document.body.appendChild(verifyButton);
