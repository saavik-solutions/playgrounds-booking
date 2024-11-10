import { Router } from "express";
import { createUserHandler} from "../controllers/userController";
import { validateBody } from "../middlewares/validate";
import { createUserSchema } from "../schemas/userSchema";

const router = Router();

router.post("/", validateBody(createUserSchema), createUserHandler);


export default router;
