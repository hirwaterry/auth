const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const Package = require('../models/Package');
const Payment = require('../models/Payment');
const ServicePackage = require('../models/ServicePackage');


const handleErrors = (res, err) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
};




router.post('/cars', async (req, res) => {
  try {
    const newCar = new Car(req.body);
    const savedCar = await newCar.save();
    res.status(201).json(savedCar);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'License plate already exists' });
    }
    handleErrors(res, err);
  }
});


router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find().sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.get('/cars/:plateNumber', async (req, res) => {
  try {
    const car = await Car.findOne({ plateNumber: req.params.plateNumber.toUpperCase() });
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.json(car);
  } catch (err) {
    handleErrors(res, err);
  }
});




router.get('/packages', async (req, res) => {
  try {
    const packages = await Package.find().sort({ price: 1 });
    res.json(packages);
  } catch (err) {
    handleErrors(res, err);
  }
});

router.post('/packages', async (req, res) => {
  try {
    const pkg = req.body;
    
    if (!pkg.name || !pkg.description || typeof pkg.price !== 'number') {
      return res.status(400).json({ error: 'Missing required fields: name, description, price' });
    }
    const createdPackage = await Package.create(pkg);
    res.status(201).json(createdPackage);
  } catch (err) {
    handleErrors(res, err);
  }
});

router.get('/packages/:id', async (req, res) => {
  try {
    const package = await Package.findById(req.params.id);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }
    res.json(package);
  } catch (err) {
    handleErrors(res, err);
  }
});



router.post('/payments', async (req, res) => {
  try {
    const newPayment = new Payment(req.body);
    const savedPayment = await newPayment.save();
    res.status(201).json(savedPayment);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.get('/payments/:id', async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ error: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    handleErrors(res, err);
  }
});




router.post('/services', async (req, res) => {
  try {
    
    const car = await Car.findById(req.body.carId);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }

    
    const package = await Package.findById(req.body.packageId);
    if (!package) {
      return res.status(404).json({ error: 'Package not found' });
    }

    
    const newPayment = new Payment({
      amountPaid: package.price,
      paymentMethod: req.body.paymentMethod || 'Cash'
    });
    const savedPayment = await newPayment.save();

    
    const newService = new ServicePackage({
      car: car._id,
      package: package._id,
      payment: savedPayment._id,
      status: 'Completed'
    });
    const savedService = await newService.save();

    
    const result = await ServicePackage.findById(savedService._id)
      .populate('car')
      .populate('package')
      .populate('payment');

    res.status(201).json(result);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.get('/services', async (req, res) => {
  try {
    const services = await ServicePackage.find()
      .populate('car')
      .populate('package')
      .populate('payment')
      .sort({ serviceDate: -1 });
    res.json(services);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.get('/services/:id', async (req, res) => {
  try {
    const service = await ServicePackage.findById(req.params.id)
      .populate('car')
      .populate('package')
      .populate('payment');
      
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.put('/services/:id', async (req, res) => {
  try {
    const updatedService = await ServicePackage.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    ).populate('car').populate('package').populate('payment');
    
    if (!updatedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    res.json(updatedService);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.delete('/services/:id', async (req, res) => {
  try {
    const deletedService = await ServicePackage.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ error: 'Service not found' });
    }
    
    
    await Payment.findByIdAndDelete(deletedService.payment);
    
    res.json({ message: 'Service and associated payment deleted' });
  } catch (err) {
    handleErrors(res, err);
  }
});



router.get('/reports/daily', async (req, res) => {
  try {
    const { date } = req.query;
    const queryDate = date ? new Date(date) : new Date();
    
    const startOfDay = new Date(queryDate.setHours(0, 0, 0, 0));
    const endOfDay = new Date(queryDate.setHours(23, 59, 59, 999));

    const report = await ServicePackage.find({
      serviceDate: { $gte: startOfDay, $lte: endOfDay }
    })
    .populate({
      path: 'car',
      select: 'plateNumber'
    })
    .populate({
      path: 'package',
      select: 'name description price'
    })
    .populate({
      path: 'payment',
      select: 'amountPaid paymentDate'
    })
    .sort({ serviceDate: -1 });

    res.json(report);
  } catch (err) {
    handleErrors(res, err);
  }
});


router.get('/services/:id/invoice', async (req, res) => {
  try {
    const service = await ServicePackage.findById(req.params.id)
      .populate('car')
      .populate('package')
      .populate('payment');
      
    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    const invoice = {
      invoiceNumber: service.invoiceNumber,
      date: service.serviceDate,
      carDetails: {
        plateNumber: service.car.plateNumber,
        type: service.car.type,
        driver: service.car.driverName
      },
      packageDetails: {
        name: service.package.name,
        description: service.package.description,
        price: service.package.price
      },
      paymentDetails: {
        amount: service.payment.amountPaid,
        method: service.payment.paymentMethod,
        date: service.payment.paymentDate
      },
      status: service.status
    };

    res.json(invoice);
  } catch (err) {
    handleErrors(res, err);
  }
});




module.exports = router;