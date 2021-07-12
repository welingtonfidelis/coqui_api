import { Server, Socket } from "socket.io";
import { AuthService } from "./services/Auth";

const authService = new AuthService();
const JWTSECRET: string = process.env.SECRET!;

const companyRooms: any = {};

const socketServer = (httpServer: any) => {
  const io = new Server(httpServer, {
    cors: { origin: "*" },
  });

  io.on("connection", (socket: Socket) => {
    const { auth } = socket.handshake;
    let userId = "0";
    let companyId = "0";

    if (!auth.token) {
      socket.disconnect();
      return;
    }

    try {
      const token = auth.token as string;
      const tokenData = authService.verifyToken(token, JWTSECRET);
      userId = tokenData.userId;
      companyId = tokenData.companyId;

      if (!companyRooms[companyId]) {
        companyRooms[companyId] = {
          onlineUsers: {},
          totalOnlineUsers: 0,
        };
      }

      companyRooms[companyId].totalOnlineUsers += 1;
      companyRooms[companyId].onlineUsers[userId] = socket.id;

      socket.join(companyId);

      io.to(companyId).emit("online_user", {
        user_id: userId,
        socket_id: socket.id
      });

      socket.emit("online_user_list", {
        list: companyRooms[companyId].onlineUsers
      });

    } catch (error) {
      console.log("\n\n error", error);

      socket.disconnect();
    }

    socket.on("disconnect", () => {
      socket.leave(companyId);
      io.to(companyId).emit("offline_user", {
        user_id: userId,
      });

      delete companyRooms[companyId].onlineUsers[userId];
      companyRooms[companyId].totalOnlineUsers =
        companyRooms[companyId].totalOnlineUsers > 0
          ? (companyRooms[companyId].totalOnlineUsers -= 1)
          : 0;
    });
  });
};

export { socketServer };
