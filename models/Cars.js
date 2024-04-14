import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
  make: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String },
  price: { type: Number },
  mileage: { type: Number },
});

const Car = mongoose.model('Car', carSchema);

export default Car;
