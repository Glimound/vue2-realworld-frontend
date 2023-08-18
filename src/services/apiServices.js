import axios from "axios";
import { getJwtToken } from "./jwtServices";
import store from "@/store";

const axiosClient = axios.create({
  baseURL: 'https://api.realworld.io/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

axiosClient.interceptors.request.use((config) => {
  if (store.state.isAuthenticated)
    config.headers.Authorization = getJwtToken()
  return config
}, (error) => {
  return Promise.reject(error)
})

export const ApiService = {
  get(resource) {
    return axiosClient.get(resource)
  },
  query(resource, params) {
    return axiosClient.get(resource, {
      params: params
    })
  },
  post(resource, data) {
    return axiosClient.post(resource, data)
  },
  put(resource) {
    return axiosClient.put(resource)
  },
  delete(resource, data) {
    return axiosClient.delete(resource, data)
  }
}

export const ArticlesService = {
  getArticles(offset) {
    return ApiService.query('/articles', {
      limit: 10,
      offset: offset
    })
  },
  getTaggedArticles(offset, tag) {
    return ApiService.query('/articles', {
      limit: 10,
      offset: offset,
      tag: tag
    })
  },
  getArticle(slug) {
    return ApiService.get(`/articles/${slug}`)
  }
}

export const CommentsService = {
  getComments(slug) {
    return ApiService.get(`/articles/${slug}/comments`)
  }
}

export const TagsService = {
  getPopularTags() {
    return ApiService.get('/tags')
  }
}