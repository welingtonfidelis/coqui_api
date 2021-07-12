import { createServer } from "http";
import { app } from "./app";
import { socketServer } from './socket';

const httpServer = createServer(app);
socketServer(httpServer);

const port = process.env.PORT || 3001;

httpServer.listen(port, () => {
  console.log(`🚀 Running in ${port}`);
});
