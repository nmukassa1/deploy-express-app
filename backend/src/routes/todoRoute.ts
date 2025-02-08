import { Router, Request, Response } from 'express';
import { TodoController } from '../controller/TodoController';
import { requireAuth } from '@clerk/express';

const router = Router();

router.route("/todos")
  .post(requireAuth(), (req: Request, res: Response) => {
    TodoController.createTodo(req, res);
  })
  .get(requireAuth(), (req: Request, res: Response) => {
    TodoController.getTodos(req, res);
  });


router.delete('/delete/:id', requireAuth(), (req: Request, res: Response) => {
  TodoController.deleteTodo(req, res);
})

export default router;