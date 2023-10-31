// api.js
import { useQuery } from 'react-query';

const API_URL = 'https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete';

const fetchAutocompleteSuggestions = async (input) => {
  const response = await fetch(`${API_URL}?input=${input}`);
  return response.json();
};

export const useAutocompleteQuery = (input) => {
  return useQuery(['autocomplete', input], () => fetchAutocompleteSuggestions(input));
};
