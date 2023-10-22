import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with the origin of your frontend application
  methods: '*', // You can specify the HTTP methods allowed
};

app.use(express.json());
app.use(cors()); // enable CORS for all routes

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/search', async (req, res) => {
    const address = req.query.q;
    const nominatimEndpoint = 'https://nominatim.openstreetmap.org/search';
    const params = new URLSearchParams({
        q: address,
        format: 'json',
        limit: 1,
    });
    const requestUrl = `${nominatimEndpoint}?${params.toString()}`;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();
        //console.log('Request URL:', requestUrl);
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Proxy server is running on port ${port}`);
});