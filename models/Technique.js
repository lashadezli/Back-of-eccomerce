import mongoose from 'mongoose';

const techniqueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  rating: { type: Number },
  imageData: { type: Buffer }, 
  imageContentType: { type: String }, 
});

const Technique = mongoose.model('Technique', techniqueSchema);

export default Technique;
