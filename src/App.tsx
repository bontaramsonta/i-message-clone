import React from "react";
import type { Message as MessageType, User as UserType } from "./types/types";
import MessageBox from "@/components/MessageBox";
import Message from "@/components/Message";
import { debounce } from "lodash";
//! ---
import { generateMessageResponse } from "@/.data/generate";

const TIMEOUT_TYPING = 4000;

function App() {
  const [info, _setInfo] = React.useState<string | null>(null);
  const [user, _setUser] = React.useState<UserType>({
    id: 1,
    name: "John Doe",
    lastSeen: new Date(),
    isOnline: true,
    isTyping: false,
  });
  const [otherUser, _setOtherUser] = React.useState({
    id: 2,
    name: "Jane Watson",
    lastSeen: new Date(),
    isOnline: true,
    isTyping: false,
  });
  const [messages, _setMessages] = React.useState<MessageType[]>([]);

  const timeoutOtherUserTyping = debounce(() => {
    _setOtherUser((other) => ({ ...other, isTyping: false }));
  }, TIMEOUT_TYPING);

  const setUserTyping = (typing: boolean) => {
    _setUser((user) => ({ ...user, isTyping: typing }));
  };

  const pushMessage = React.useCallback((message: string) => {
    //! -- generate message if empty
    if (!message.trim()) {
      console.log(messages.length);
      const messageObj = generateMessageResponse(user.id, user.name);
      _setMessages((messages) => [...messages, messageObj]);
    } else {
      //! --
      const date = new Date();
      const messageObj: MessageType = {
        id: parseInt(Math.random().toString().slice(2, 9)),
        authorId: user.id,
        author: user.name,
        content: message,
        date,
        isDM: false,
        isDeleted: false,
      };
      _setMessages((messages) => [...messages, messageObj]);
    }
    //! -- add reponse message from other user
    const randomInMs = Math.floor(Math.random() * 8000) + 2000; // between 2s and 10s
    const typingInMs = randomInMs - 2000;
    console.log("[typing in]", typingInMs, "ms");
    console.log("[responding in]", randomInMs, "ms");
    setTimeout(() => {
      _setOtherUser((other) => ({ ...other, isTyping: true }));
      timeoutOtherUserTyping();
    }, typingInMs);
    setTimeout(() => {
      const responseObj = generateMessageResponse(otherUser.id, otherUser.name);
      console.log("[response]", responseObj);
      _setMessages((messages) => [...messages, responseObj]);
      _setOtherUser((other) => ({ ...other, isTyping: false }));
    }, randomInMs);
  }, []);

  return (
    <main className="m-auto flex h-screen max-h-[900px] min-h-[500px] w-full min-w-[300px] max-w-md flex-col items-center justify-end px-2">
      <ul className="flex w-full flex-1 flex-col items-center justify-end overflow-scroll">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            own={message.authorId === user.id}
            author={message.author}
            content={message.content}
            date={message.date}
            isDM={message.isDM}
            isDeleted={message.isDeleted}
          />
        ))}
      </ul>
      <div className="self-center p-2 text-slate-400">
        {info
          ? info
          : otherUser.isTyping
          ? `${otherUser.name} is typing...`
          : null}
      </div>
      <MessageBox pushMessage={pushMessage} setUserTyping={setUserTyping} />
    </main>
  );
}

export default App;
