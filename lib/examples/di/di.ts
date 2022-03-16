import { Scope } from '../scope';


// Mastering DI

// users.service.ts
class DataBaseService {

  connect() {
    ...
  }

}

// main.ts

// create a new DI container "app"
const app = new Scope();

// register a service
app.register(DataBaseService);


// return an instance of DataBaseService
const dataBase = app.resolve(DataBaseService);

// no global variables

// const userController = app.createScope().start(UserController, 11);
//
//
// editor.addScene('Scene1');
// editor.addScene('Scene2');


