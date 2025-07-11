const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

app.set('view engine', 'ejs');
app.use(express.static('public'));

let images = [];

app.get('/', (req, res) => {
  res.render('index', { images });
});

app.post('/upload', upload.single('image'), (req, res) => {
  images.push(req.file.filename);
  res.redirect('/');
});

app.listen(80, () => console.log('Server running on port 80'));
