import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const newUser = new User();

    Object.assign(newUser, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(newUser);

    return newUser;

  }

  findById(id: string): User | undefined {
    const user = this.users.find(el => el.id == id);
    
    if(user){
      return user;
    }

    return;

  }

  findByEmail(email: string): User | undefined {

    const user = this.users.find(el => el.email == email);

    if(user){
      return user;
    }

    return;

  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.findIndex(el => el == receivedUser);

      this.users[index].admin = !receivedUser.admin
      this.users[index].updated_at = new Date();


      return this.users[index];

  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
