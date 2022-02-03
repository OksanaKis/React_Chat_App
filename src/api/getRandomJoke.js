import axios from "axios";

export const getRandomJokes = async () => {
  let api = "https://api.chucknorris.io/jokes/random";
  const response = await axios.get(`${api}`);
  console.log(response);
  return response;
};
