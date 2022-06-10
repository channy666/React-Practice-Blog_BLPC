import { getAuthToken } from "./utils/authorization";

const BASE_URL = "https://react-blog-json-server.herokuapp.com";

export const getLatestPosts = () =>
  fetch(`${BASE_URL}/posts?_sort=createdAt&_order=DESC&_limit=5`).then((res) =>
    res.json()
  );

export const getPosts = (page, category, filter) => {
  let url = `${BASE_URL}/posts?category=${category}&_page=${page}&_sort=createdAt&_order=DESC&_limit=10`;

  if (filter) {
    url = `${BASE_URL}/posts?category=${category}&classification=${filter}&_page=${page}&_sort=createdAt&_order=DESC&_limit=10`;
  }

  return fetch(url);
};

export const getForums = (page, filter) => {
  let url = `${BASE_URL}/posts?category=Forum&_page=${page}&_sort=createdAt&_order=DESC&_limit=5&_expand=user`;

  if (filter) {
    url = `${BASE_URL}/posts?category=Forum&classification=${filter}&_page=${page}&_sort=createdAt&_order=DESC&_limit=5&_expand=user`;
  }

  return fetch(url);
};

export const getPost = (id) =>
  fetch(`${BASE_URL}/posts/${id}?_expand=user`).then((res) => res.json());

export const registerOrLogin = (username, password, nickname) => {
  let requestBody = {
    username,
    password,
  };

  let url = `${BASE_URL}/login`;

  if (nickname) {
    requestBody = {
      ...requestBody,
      nickname,
    };
    url = `${BASE_URL}/register`;
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(requestBody),
  }).then((res) => res.json());
};

export const getMe = () =>
  fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: getAuthToken(),
    },
  }).then((res) => res.json());

export const createPost = (title, body, sort) =>
  fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: getAuthToken(),
    },
    body: JSON.stringify({
      title,
      body,
      catagory: sort[0],
      classification: sort[1],
    }),
  }).then((res) => res.json());

export const getSearchPost = (value, page) => {
  return fetch(
    `${BASE_URL}/posts?q=${value}&_expand=user&_page=${page}&_limit=10`
  );
};
