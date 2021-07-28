import { json, Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: Request, response: Response): Response {
    let { user_id }  = request.headers

     user_id = String(user_id);

    if(!user_id){
      return response.status(401).json({
        error: 'usuario administrador não informado'
      })
    } 

    const users = this.listAllUsersUseCase.execute({user_id});
    
    return response.json({users})

  }
}

export { ListAllUsersController };
