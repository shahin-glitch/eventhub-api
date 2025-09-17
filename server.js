const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventsRoutes = require('./routes/events');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', eventsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
