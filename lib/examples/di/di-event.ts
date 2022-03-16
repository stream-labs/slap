import { Scope } from '../../scope';

const container = new Scope();

container.events.on('onModuleRegister', provider => { ... });

container.events.on('onModuleInit', provider => { ... });

container.events.on('onModuleLoad', provider => { ... });

// logging
// plugins
// testing
// special decorators like initAfter()
