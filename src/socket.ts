import { Server, Socket } from "socket.io";
import { AuthService } from "./services/Auth";
import { ConversationService } from "./services/Conversation";
import { MessageService } from "./services/Message";

const authService = new AuthService();
const JWTSECRET: string = process.env.SECRET!;

const companyRooms: any = {};
const messageService = new MessageService();
const conversationService = new ConversationService();

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
        socket_id: socket.id,
      });

      socket.emit("online_user_list", {
        list: companyRooms[companyId].onlineUsers,
      });
    } catch (error) {
      console.log("\n\n error", error);

      socket.disconnect();
    }

    socket.on("send_mesage_to_user", async (data) => {
      const { conversation_id, to_user_id, text, sent_time } = data;
      const receiver = companyRooms[companyId].onlineUsers[to_user_id];

      if (receiver) {
        socket
          .to(receiver)
          .emit("receive_message_from_user", { ...data, from_user_id: userId });
      }

      socket.emit("receive_message_from_user", {
        ...data,
        from_user_id: userId,
      });

      try {
        let conversationId = conversation_id;
        if (!conversationId) {
          const { id } = await conversationService.findByUserIdAUserIdBOrSave({
            company_id: companyId,
            user_id_a: userId,
            user_id_b: to_user_id,
          });

          conversationId = id;
        }

        await messageService.save({
          conversation_id: conversationId,
          company_id: companyId,
          to_user_id,
          from_user_id: userId,
          text,
          sent_time,
        });
      } catch (error) {
        console.log("ERROR SAVING MESSAGE", error);
      }
    });

    socket.on("new_user", (data) => {
      io.to(companyId).emit("new_user", data);
    });

    socket.on("deleted_user", (data) => {
      const { id } = data;

      io.to(companyId).emit("deleted_user", {
        id,
      });
    });

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
