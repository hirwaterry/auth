const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  plateNumber: {
    type: String,
    required: [true, 'License plate number is required'],
    unique: true,
    trim: true,
    uppercase: true
  },
  type: {
    type: String,
    required: [true, 'Car type is required'],
    trim: true
  },
  size: {
    type: String,
    required: [true, 'Car size is required'],
    enum: ['Small', 'Medium', 'Large', 'SUV', 'Truck'],
    trim: true
  },
  driverName: {
    type: String,
    required: [true, 'Driver name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[0-9]{10}$/.test(v); // Simple validation for 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);