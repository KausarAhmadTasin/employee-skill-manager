import app from './index';

const port = process.env.PORT || 3000;
// Start server
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
