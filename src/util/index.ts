import crypto from "crypto";

export const randomHash = (maxLength = 8) => {
  const maxLengthHandled = Math.floor(maxLength / 2);
  const random = crypto.randomBytes(maxLengthHandled).toString("hex");

  return random;
};

export const removeSpecialCharacters = (word: string) => {
  let wordHandled = word.replace(/[^\w\s]/gi, "");
  wordHandled = wordHandled.replace(/_/g, "");

  return wordHandled;
};

export const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const maskValue = (value: number) => {
  return Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
};

export const maskDate = (date: Date) => {
  return new Intl.DateTimeFormat("pt-BR").format(date);
};

export const removeHtmlFromText = (text: string) => {
  return text.replace(/<\/?[^>]+(>|$)/g, "");
};

export const randomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * max) + min;
};

export const randomProfileImage = () => {
  const images = [
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/andalusian-hound.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/beaver.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/cat.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/dog_1.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/dog_2.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/dog.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/elephant.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/fox+(1).png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/lion.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/octopus.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/owl.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/panda.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/parrot.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/penguin.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/rabbit.png",
    "https://conversa-aqui.s3.sa-east-1.amazonaws.com/user-images/whale.png",
  ];

  const index = randomNumber(0, images.length);

  return images[index];
};
