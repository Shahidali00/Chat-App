// import express from "express";
// import { protectRoute } from '../Middlewares/auth.middleware.js';
// import { getMessages, getUsersForSidebar, sendMessage } from "../Controllers/message.controllers.js";

// const router = express.Router();

// router.get("/users", protectRoute, getUsersForSidebar);
// router.get("/:id", protectRoute, getMessages);

// router.post('/send/:id', async (req, res) => {
//   try {
//     // ...existing code for sending message...
//   } catch (error) {
//     console.error("Send message error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// export default router;



import express from "express";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controllers.js";
import { protectRoute } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/users", protectRoute, getUsersForSidebar);
router.get("/:id", protectRoute, getMessages);

router.post('/send/:id', protectRoute, sendMessage);

export default router;