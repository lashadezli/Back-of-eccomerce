import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectDB } from './services/database.js'; 
import Car from './models/Cars.js'; 

const app = express();
const PORT = 3002;

app.use(bodyParser.json());
app.use(cors());

connectDB();



app.get('/Api/cars', (req, res) => {
  Car.find()
    .then(cars => res.json(cars))
    .catch(err => res.status(500).json({ message: err.message }));
});


app.get('/Api/cars/:id', (req, res) => {
  const { id } = req.params;
  Car.findById(id)
    .then(car => {
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    })
    .catch(err => res.status(500).json({ message: err.message }));
});



app.post('/Api/cars', (req, res) => {
  const carData = req.body;
  Car.create(carData)
    .then(car => res.status(201).json(car))
    .catch(err => res.status(400).json({ message: err.message }));
});



app.put('/Api/cars/:id', (req, res) => {
  const { id } = req.params;
  const carData = req.body;
  Car.findByIdAndUpdate(id, carData, { new: true })
    .then(car => {
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json(car);
    })
    .catch(err => res.status(400).json({ message: err.message }));
});




app.delete('/Api/cars/:id', (req, res) => {
  const { id } = req.params;
  Car.findByIdAndDelete(id)
    .then(car => {
      if (!car) {
        return res.status(404).json({ message: 'Car not found' });
      }
      res.json({ message: 'Car deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: err.message }));
});




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
