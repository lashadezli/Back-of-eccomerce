import mongoose from 'mongoose';

const timerSchema = new mongoose.Schema({
  targetTime: { type: Date, required: true }
});

const Timer = mongoose.model('Timer', timerSchema);

export default Timer;
