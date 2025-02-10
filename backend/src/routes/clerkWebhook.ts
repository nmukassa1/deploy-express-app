import { requireAuth, getAuth, clerkClient } from '@clerk/express';
import { Router,  Request, Response  } from 'express';
import { prisma } from '../utils/prisma';


const router = Router();

router.post("/store-user", requireAuth(), async (req: Request, res: Response) => {
    const { userId } = getAuth(req);
    if (!userId) {
        console.log('User not found');
        return
    } 

    try{
        const user = await clerkClient.users.getUser(userId);
        const { id, firstName, lastName } = user;
        
        //check if user already exists in database
        const userExists = await prisma.user.findUnique({
            where: {
              id: id,  
            },
          });

        if(!userExists){
            await prisma.user.create({
                data: {
                    id: id,
                    firstName: firstName ?? '',
                    lastName: lastName ?? '',
                },
            });

            res.status(200).json({message: 'User stored successfully'});
            return
        }

        res.status(200).json({message: 'User already exists in database'});
        return
    } catch(error){
        console.log(error);
        return
    }
    
  });

  export default router