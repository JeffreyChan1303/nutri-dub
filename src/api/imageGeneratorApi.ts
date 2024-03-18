import axios from 'axios';

export const getImageByName = async (foodName: string) => {
  const options = {
    method: 'GET',
    url: `https://free-images-api.p.rapidapi.com/images/${foodName}`,
    headers: {
      'X-RapidAPI-Key': '5ed5684096mshff740e117825ab0p19a55bjsn743db96a21be',
      'X-RapidAPI-Host': 'free-images-api.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
