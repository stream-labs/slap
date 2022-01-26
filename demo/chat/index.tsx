import React from 'react';
import { useService } from '../../lib';
import { ChatService } from './services/chat';

// ReactDOM.render(<App />, document.getElementById('app'));
//
// function App() {
//   return (
//     <RedumbxApp>
//       <Chat />
//     </RedumbxApp>
//   );
// }

export function ChatPage() {
  const {
    isLoading, messages, inputValue, setInputValue, sendMessage,
  } = useService(ChatService);
  return (
    <div>
      {isLoading && 'Loading chat...'}

      {!isLoading && (
        <div>
          {messages.map(message => (
            <div key={message.id} style={{ opacity: message.isSent ? 1 : 0.3 }}>
              {message.author}
              {' > '}
              {message.text}
            </div>
          ))}
          <div>
            <input type="text" value={inputValue} onChange={ev => setInputValue(ev.target.value)} />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}

    </div>
  );
}

// export function HomePage() {
//   const chatService = getModule(ChatService);
//   console.log('chatService', chatService);
//   return (
//     <div>
//       Home Page
//     </div>
//   );
// }
