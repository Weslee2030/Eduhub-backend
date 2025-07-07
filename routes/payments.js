const express = require('express');
const router = express.Router();

// Payment instructions (static for now)
router.get('/instructions', (req, res) => {
  res.json({
    message: "Follow these instructions to complete your payment:",
    mpesa: {
      number: "0701948450",
      till: "8628626"
    },
    bank: {
      name: "I&M Bank",
      accNo: "00100012341201",
      accName: "Wesley Nyakundi Orina"
    },
    paypal: {
      email: "wesleyorina97@gmail.com"
    }
  });
});

module.exports = router;
