require('dotenv').config();
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.static('.'));

app.get('/weather', async (req, res) => {
    const { city, lat, lon } = req.query;
    const apiKey = process.env.API_KEY;
    let url = "";

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else if (lat && lon) {
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    }
    console.log("Requesting URL:", url);

    try {
        const response = await fetch(url); // Use built-in fetch
        const data = await response.json();
        
        if (response.ok) {
            res.json(data);
        } else {
            res.status(response.status).json(data);
        }
    } catch (error) {
        console.error("Server Crash Error:", error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));