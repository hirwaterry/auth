const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  amountPaid: {
    type: Number,
    required: [true, 'Amount paid is required'],
    min: [0, 'Amount cannot be negative']
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ['Cash', 'Card', 'Mobile Money'],
    default: 'Cash'
  }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);