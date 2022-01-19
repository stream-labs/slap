import { mutation } from '../../../lib';

type TMessage = { id: number, author: string, text: string, isSent: boolean };
let idCounter = 1;

export class ChatService {
  state = {
    inputValue: '',
    isLoading: true,
    messages: [] as TMessage[],
  };

  async init() {
    await sleep(3000);
    this.setLoaded();
  }

  @mutation()
  setInputValue(text: string) {
    this.state.inputValue = text;
  }

  async sendMessage() {
    const id = idCounter++;
    const message = {
      id,
      text: this.state.inputValue,
      author: 'Me',
      isSent: false,
    };
    this.addMessage(message);
    this.setInputValue('');
    await sleep(2000);
    this.markMessageAsSent(id);
  }

  @mutation()
  private setLoaded() {
    this.state.isLoading = false;
  }

  @mutation()
  private addMessage(message: TMessage) {
    this.state.messages.push(message);
  }

  @mutation()
  private markMessageAsSent(messageId: number) {
    const message = this.state.messages.find(message => message.id === messageId)!;
    message.isSent = true;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
