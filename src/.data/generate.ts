import type { Message } from "../types/types.js";

const textMessages = [
  "Hey, how's it going?",
  "I just finished a big project at work!",
  "Do you know any good restaurants in our area?",
  "What's your favorite programming language?",
  "I'm thinking of learning a new framework, any recommendations?",
  "Had a great weekend! Went hiking with friends.",
  "Got any exciting plans for the weekend?",
  "I love coding late at night when it's quiet.",
  "Just binge-watched a new series on Netflix. It was awesome!",
  "I can't believe how fast time flies by.",
  "How's the weather over there?",
  "I'm working on a cool new project. Can't wait to show it off!",
  "What's your go-to snack when you're coding?",
  "Have you ever been to a tech conference? They're so much fun!",
  "I'm really into AI and machine learning these days.",
  "I'm stuck on a bug. Debugging can be so frustrating sometimes!",
  "Just got a new keyboard, and it feels amazing to type on.",
  "I'm a fan of open-source software. It's great for collaboration.",
  "Coding playlists are my jam while working. What about you?",
  "I'm thinking of starting a blog about web development. Any tips?",
  "Sup! What's up on your end?",
  "Yo, just wanted to say hi!",
  "Coding away like a champ! 💻🚀",
  "Got any cool coding hacks to share?",
  "Pizza or burgers for dinner tonight? 🍕🍔",
  "Chillin' and codin', the usual.",
  "Know any good memes for a quick laugh?",
  "Weekend vibes kicking in yet? 😎",
  "Code, coffee, repeat. ☕💻🔁",
  "Hey, have you tried that new game app?",
];

export const generateMessageResponse = (
  count: number,
  userId: number,
  userName: string,
): Message => {
  const randomTextMessage =
    textMessages[Math.floor(Math.random() * textMessages.length)];
  const randomDate = new Date(
    Date.now() - Math.floor(Math.random() * 10000000000),
  );
  return {
    id: count,
    authorId: userId,
    author: userName,
    content: randomTextMessage,
    date: randomDate,
    isDM: false,
  };
};
