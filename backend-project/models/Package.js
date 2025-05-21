const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Package name is required'],
    trim: true,
    enum: ['Basic wash', 'Classic wash', 'Premium wash']
  },
  description: {
    type: String,
    required: [true, 'Package description is required'],
    trim: true
  },
  price: {
    type: Number,
    required: [true, 'Package price is required'],
    min: [0, 'Price cannot be negative']
  }
}, { timestamps: true });

// Predefined packages data
packageSchema.statics.initializePackages = async function() {
  const count = await this.countDocuments();
  if (count === 0) {
    await this.insertMany([
      { name: 'Basic wash', description: 'Exterior hand wash', price: 5000 },
      { name: 'Classic wash', description: 'Interior hand wash', price: 10000 },
      { name: 'Premium wash', description: 'Exterior and Interior hand wash', price: 20000 }
    ]);
    console.log('Default packages initialized');
  }
};

module.exports = mongoose.model('Package', packageSchema);