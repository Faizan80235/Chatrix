
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Routes
const userRoutes = require('./Routes/userRoutes');
const messageRoutes = require('./Routes/messageRoutes');

// App Init
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/messages', messageRoutes);

// Home Test
app.get("/", (req, res) => {
    res.send("Chat App API Running");
});

// // MongoDB Connect
mongoose.connect('mongodb://127.0.0.1:27017/chat-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

// Server Run
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
