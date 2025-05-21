const mongoose = require('mongoose');

const servicePackageSchema = new mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Car reference is required']
  },
  package: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Package',
    required: [true, 'Package reference is required']
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: [true, 'Payment reference is required']
  },
  serviceDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true });

// Add virtuals or methods if needed
servicePackageSchema.virtual('invoiceNumber').get(function() {
  return `INV-${this._id.toString().substring(18, 24)}`;
});

// Ensure virtuals are included when converting to JSON
servicePackageSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ServicePackage', servicePackageSchema);