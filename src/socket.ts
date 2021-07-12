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

      const message = {
        room_id: companyId,
        room_name: "geral",
        userId,
        total_online_users: companyRooms[companyId].totalOnlineUsers,
      };
      io.to(companyId).emit("online_user", message);     

    } catch (error) {
      console.log("\n\n error", error);

      socket.disconnect();
    }

    socket.on("disconnect", () => {
      console.log("disconnect", userId);

      socket.leave(companyId);
      io.to(companyId).emit("offline_user", {
        room_id: companyId,
        room_name: "geral",
        userId,
        total_online_users: companyRooms[companyId].totalOnlineUsers,
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
