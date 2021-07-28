import { Response, Request } from "express";

import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  handle(request: Request, response: Response): Response {
    const {name, email} = request.body;

    if(!name || !email) return response.status(401).json({
      "Error": "Nome ou Email não adicionado"
    })

    const user = this.createUserUseCase.execute({name, email}); 

    return response.status(201).json(user);
  }
}

export { CreateUserController };
