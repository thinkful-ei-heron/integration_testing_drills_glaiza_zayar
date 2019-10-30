const app = require('./app.js')

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
});

// HTTP GET /movie 1.1
// Headers: {Authorization: Bearer 1234567}
// Body: