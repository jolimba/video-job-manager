import 'dotenv/config';
import { app } from './app';

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`initial page: http://localhost:${PORT}`);
  console.log(`ping: http://localhost:${PORT}/status`);
});