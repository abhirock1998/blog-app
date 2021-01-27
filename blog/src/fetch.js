import Axios from "axios";
const BlogServerURL = "http://localhost:3030";
const BlogBaseURL = Axios.create({
  baseURL: BlogServerURL,
});

export const ClientToServerBridge = ({ endpoint = "/", body = {} }) => {
  return BlogBaseURL.post(`${endpoint}`, body)
    .then((res) => res.data)
    .catch((e) => null);
};

export const ClientToServerGetRequest = ({ endpoint = "/posts" }) => {
  return BlogBaseURL.get(`${endpoint}`)
    .then((post) => post.data)
    .catch((e) => null);
};

export const GenerateLinkForPost = ({ id }) => {
  return `${BlogServerURL}/post/${id}`;
};
