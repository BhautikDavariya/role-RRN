const express = require('express');
const connectDB = require('./connection/db');
const userRoutes = require('./routers/userRouters');
const dotenv = require('dotenv')
const cors = require('cors');
const path = require('path');
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRoutes);

app.get('/upload/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, 'upload', filename);
    return res.sendFile(filePath)
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// // Single file
// app.post("/upload/single", uploadStorage.single("file"), (req, res) => {

//     console.log(req.file)
//     return res.send("Single file")
// })

// // get file to showing clint side 
// app.get('/file/:filename', (req, res) => {
//     const filename = req.params.filename;
//     const filePath = path.join(__dirname, 'upload', filename);
//     return res.send(filePath)
// });
