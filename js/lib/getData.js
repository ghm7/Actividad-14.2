export const API = 'https://japceibal.github.io/japflix_api/movies-data.json';

export const getData = async (url) => {
  const result = {};

  try {
    const response = await fetch(url);
    const json = await response.json();

    result.status = response.status;
    result.body = json;
  } catch (err) {
    result.status = err;
    result.errorMessage = err.message;
    result.body = {};
    throw new Error(err);
  }

  return result;
};
