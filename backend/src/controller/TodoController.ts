
//
import { Request, Response } from "express";
import { createPostSchema } from "../validation/zod";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import { prisma } from "../utils/prisma";

export class TodoController {

   public static createTodo = async (req: Request, res: Response) => {
    const {userId} = getAuth(req)

    if(!userId) {
      res.status(401).json({error: 'Unauthorized'})
      return;
    }
    
    req.body.title = req.body.title.trim()
    const validationResult = createPostSchema.safeParse(req.body);

    if (!validationResult.success) {

      const errors = validationResult.error.flatten().fieldErrors;
      res.status(400).json({ errors });
      return 
    } 
      
    const { title } = validationResult.data;
    
    try{
      const todo = await prisma.todo.create({
        data: {
          title,
          userId
        }
      });
      res.send(todo);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
    
    return
  };

  public static getTodos = async (req: Request, res: Response) => {
    const {userId} = getAuth(req)

    if(!userId) {
      res.status(401).json({error: 'Unauthorized'})
      return;
    }

    try {
      const todos = await prisma.todo.findMany({
        where: {
          userId
        }
      });
      res.send(todos);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  }

  public static deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {userId} = getAuth(req)

    if(!id){
      res.status(400).json({error: 'Bad request'})
      return;
    }

    if(!userId) {
      res.status(401).json({error: 'Unauthorized'})
      return;
    }

    try {
      const todo = await prisma.todo.delete({
        where: {
          id: parseInt(id),
        },
      });
      console.log(todo);
      
      res.send(todo);
    } catch (error) {
      res.status(500).json({ error: "Something went wrong" });
    }
  };
  
}

export default new TodoController();