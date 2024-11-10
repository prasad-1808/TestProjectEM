const express = require('express');
const cors = require('cors');
const googleRoutes = require('./routes/googleRoutes');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api', googleRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
