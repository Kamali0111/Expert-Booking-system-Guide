export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join expert detail room
    socket.on('join:expertDetail', (expertId) => {
      socket.join(`expert:${expertId}`);
      console.log(`User joined expert:${expertId}`);
    });

    // Leave expert detail room
    socket.on('leave:expertDetail', (expertId) => {
      socket.leave(`expert:${expertId}`);
      console.log(`User left expert:${expertId}`);
    });

    // Broadcast slot booked event
    socket.on('slot:booked', (data) => {
      const { expertId, date, timeSlot } = data;
      // Broadcast to all users viewing this expert's details
      io.to(`expert:${expertId}`).emit('slot:updated', {
        expertId,
        date,
        timeSlot,
        isBooked: true,
      });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
};
