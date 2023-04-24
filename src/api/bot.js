import axios from "axios";

// Telegram Bot
const chatIds = [904054855, 1133429141]; // Kirill: 688334536
export const sendMessageToBot = (sendText) =>
  chatIds.forEach((chatId) => {
    axios.post(
      "https://api.telegram.org/bot5603004166:AAFen05We0DnU5I5p5xcdENooDn-MRBYlxQ/sendMessage",
      {
        chat_id: chatId,
        text: sendText,
      }
    );
  });
