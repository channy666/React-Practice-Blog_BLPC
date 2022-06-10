const TOKEN_NAME = "blog_token";

export const setAuthToken = (token) => {
  localStorage.setItem(TOKEN_NAME, token);
};

export const getAuthToken = () => localStorage.getItem(TOKEN_NAME);
