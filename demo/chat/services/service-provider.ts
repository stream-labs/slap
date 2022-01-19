import { registerServices } from '../../../lib/serviceProvider';
import { ChatService } from './chat';
import { AppService } from './app';

export const Services = registerServices({ AppService, ChatService });
