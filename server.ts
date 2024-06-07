import express from 'express';
import path from 'path';

const app = express();
const PORT = parseInt(process.env['PORT'] || '8080', 10);

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist/proyecto-graduacion-frontend')));

// Send all requests to index.html
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/proyecto-graduacion-frontend/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
