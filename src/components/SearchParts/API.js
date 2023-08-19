import axios from "axios";

export const findQuery = async (newQuery, page) => {
  const BASE_URL = `https://pixabay.com/api/`;
  const params = new URLSearchParams({
    key: "37953562-c7c28b8f0c02ebea23bfb706a",
    q: newQuery, 
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: '12',
  });

  const response = await axios.get(`${BASE_URL}?${params.toString()}`);
  return response;
};