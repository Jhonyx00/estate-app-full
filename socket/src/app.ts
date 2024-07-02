import { Server } from "socket.io";

const io = new Server({
  cors: {
    origin: "http://localhost:5173",
  },
});

interface WebSocketData {
  userId: string;
  socketId: string;
}

let onlineUser: WebSocketData[] = [];

const addUser = (userId: string, socketId: string) => {
  const userExists = onlineUser.find((user) => user.userId === userId);
  if (!userExists) {
    onlineUser.push({ userId, socketId });
  }
};

const removeUser = (socketId: string) => {
  onlineUser = onlineUser.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return onlineUser.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  socket.on("newUser", (userId: string) => {
    addUser(userId, socket.id);
    // console.log("online users", onlineUser);
  });

  socket.on("sendMessage", ({ receiverId, data }) => {
    //get user to send message
    const receiver = getUser(receiverId);
    io.to(receiver?.socketId!).emit("getMessage", data);
  });

  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

io.listen(4000);
