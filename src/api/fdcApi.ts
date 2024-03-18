import axios from 'axios';

const API_KEY = '8NFhURuwTDo6xZPNjV8eQnZa0ulrSS59prrmiTU6';

const api = axios.create({
  baseURL: 'https://api.nal.usda.gov/fdc/v1/',
  params: {
    api_key: API_KEY
  }
});

export const getFoodByFdcId = async (fdcId: string) => {
  try {
    return await api.get(`food/${fdcId}?nutrients=203&nutrients=204&nutrients=205`);
  } catch (error) {
    console.error(error);
  }
};

export const getFoodList = async () => {
  try {
    return await api.get('foods/list?dataType=Branded,SR%20Legacy&pageSize=25&pageNumber=2');
  } catch (error) {
    console.error(error);
  }
};

export const getFdcFoodsBySearchName = async (query: string) => {
  try {
    const response = await api.get(
      `foods/search?query=${query}&dataType=Branded&pageSize=50&pageNumber=0&sortOrder=asc`
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
  }
};
