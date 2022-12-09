import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '30847367-b1dc05b2e3ce029cb21abd284';

export const getImages = async (request, page) => {
  const response = await axios.get(`?key=${API_KEY}`, {
    params: {
      q: request,
      page,
      image_type: 'photo',
      orientation: 'horizontal', 
      per_page: 12,
    }
  }
  );
  return response.data;
};
