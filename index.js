import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import { connectDB } from './services/database.js'; 
import Technique from './models/Technique.js';
import Timer from './models/Timer.js';


const app = express();
const PORT = 3000;

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });


app.use(bodyParser.json());
app.use(cors());

connectDB();

//Techniques requests
app.get('/Shop/techniques', (req, res) => {
  Technique.find()
    .then(techniques => res.status(200).json(techniques))
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.get('/Shop/techniques/:id', (req, res) => {
  const { id } = req.params;
  Technique.findById(id)
    .then(technique => {
      if (!technique) {
        return res.status(404).json({ message: 'Technique not found' });
      }
      res.status(200).json(technique);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.post('/Shop/techniques', upload.single('image'), (req, res) => {
  const { name, price, oldPrice, rating } = req.body;
  const imageData = req.file.buffer;
  const imageContentType = req.file.mimetype;
  const newTechnique = new Technique({
    name,
    price,
    oldPrice,
    rating,
    imageData: Buffer.from(imageData, 'base64'),
    imageContentType,
  });

  newTechnique
    .save()
    .then(tech => res.status(201).json(tech))
    .catch(err => res.status(400).json({ message: err.message }));
});


app.put('/Shop/techniques/:id', upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, price, oldPrice, rating } = req.body;
  
  if (req.file) {
    const imageData = req.file.buffer;
    const imageContentType = req.file.mimetype;
    Technique.findByIdAndUpdate(
      id,
      {
        name,
        price,
        oldPrice,
        rating,
        imageData: Buffer.from(imageData, 'base64'),
        imageContentType,
      },
      { new: true }
    )
      .then(updatedTechnique => {
        if (!updatedTechnique) {
          return res.status(404).json({ message: 'Technique not found' });
        }
        res.status(200).json(updatedTechnique);
      })
      .catch(err => res.status(500).json({ message: 'Internal server error' }));
  } else {
    Technique.findByIdAndUpdate(
      id,
      {
        name,
        price,
        oldPrice,
        rating,
      },
      { new: true }
    )
      .then(updatedTechnique => {
        if (!updatedTechnique) {
          return res.status(404).json({ message: 'Technique not found' });
        }
        res.status(200).json(updatedTechnique);
      })
      .catch(err => res.status(500).json({ message: 'Internal server error' }));
  }
});


app.delete('/Shop/techniques/:id', (req, res) => {
  const { id } = req.params;
  Technique.findByIdAndDelete(id)
    .then(deletedTechnique => {
      if (!deletedTechnique) {
        return res.status(404).json({ message: 'Technique not found' });
      }
      res.status(200).json({ message: 'Technique deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});
// end of techniques requests




//Shop Timers

 app.get('/Shop/timers', (req, res) => {
   Timer.findOne().sort({ _id: -1 })
     .then(timer => res.status(200).json(timer))
     .catch(err => res.status(500).json({ message: 'Internal server error' }));
 });

 

 app.get('/Shop/timers/:id', (req, res) => {
  const { id } = req.params;
  Timer.findById(id)
    .then(timer => {
      if (!timer) {
        return res.status(404).json({ message: 'Timer not found' });
      }
      res.status(200).json(timer);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.post('/Shop/timers', (req, res) => {
   const { targetTime } = req.body;
   const newTimer = new Timer({ targetTime });

   newTimer
     .save()
     .then(timer => res.status(201).json(timer))
     .catch(err => res.status(400).json({ message: err.message }));
 });


app.put('/Shop/timers/:id', (req, res) => {
  const { id } = req.params;
  const { targetTime } = req.body;
  Timer.findByIdAndUpdate(
    id,
    { targetTime },
    { new: true }
  )
    .then(updatedTimer => {
      if (!updatedTimer) {
        return res.status(404).json({ message: 'Timer not found' });
      }
      res.status(200).json(updatedTimer);
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

app.delete('/Shop/timers/:id', (req, res) => {
  const { id } = req.params;
  Timer.findByIdAndDelete(id)
    .then(deletedTimer => {
      if (!deletedTimer) {
        return res.status(404).json({ message: 'Timer not found' });
      }
      res.status(200).json({ message: 'Timer deleted successfully' });
    })
    .catch(err => res.status(500).json({ message: 'Internal server error' }));
});

//End of timer requests

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 