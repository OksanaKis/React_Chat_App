import axios from "axios";

export const getRandomJokes = async () => {
  // let api = "https://api.chucknorris.io/jokes/random";
  // const response = await axios.get(`${api}`);
  const response = await axios.get("https://api.chucknorris.io/jokes/random");
  return response;
};
