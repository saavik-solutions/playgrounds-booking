import express from "express";
import userRoutes from "./routes/userRoutes";
// Import other route modules here

const app = express();
app.use(express.json());

app.use("/api/users", userRoutes);
// Add other routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
