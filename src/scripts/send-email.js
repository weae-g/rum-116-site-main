import express from "express";
import bodyParser from "body-parser";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import TelegramBot from "node-telegram-bot-api"; // Импортируем библиотеку для работы с Telegram

dotenv.config();

const app = express();

bodyParser.json();

app.use(
  cors({
    origin: "http://localhost:4321",
  }),
  express.json(),
);

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

const CHAT_ID = process.env.CHAT_ID;

app.post("/send-email", async (req, res) => {
  const { name, phone, message } = req.body;
  console.log(req.body);

  try {
    bot.sendMessage(
      CHAT_ID,
      `Новая заявка!\nИмя: ${name}\nEmail: ${phone}\nСообщение: ${message}`,
    );

    res.status(200).json({ message: "Сообщение успешно отправлено!" });
  } catch (error) {
    res.status(500).json({ message: error.toString() });
  }
});

app.listen(3000, () => {
  console.log("Сервер запущен на порту 3000");
});
