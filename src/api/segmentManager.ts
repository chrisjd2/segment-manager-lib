import axios, { type InternalAxiosRequestConfig } from 'axios'
import { useSegmentManagerStore } from '@/store/segmentManagerStore'
import { useCustomSegmentStore } from '@/store/customSegments/customSegmentStore'

const baseURL = ''

const segmentManagerApi = axios.create()

const customSegmentManagerApi = axios.create()

const insightsSegmentManagerApi = axios.create()


segmentManagerApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const segmentManagerStore = useSegmentManagerStore()

    config.baseURL = segmentManagerStore.baseUrl
    config.headers.Authorization = `Bearer ${segmentManagerStore.token}`
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    config.headers['x-tenant'] = segmentManagerStore.tenantId
    config.headers['brand-id'] = segmentManagerStore.brandId;
    config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
    config.headers['Pragma'] = 'no-cache';
    config.headers['Expires'] = '0';
    setConfigContentType(config)
    return config
  },
  (err) => Promise.reject(err)
)

customSegmentManagerApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const segmentManagerStore = useSegmentManagerStore()
    const customSegmentManagerStore = useCustomSegmentStore()

    config.baseURL = customSegmentManagerStore.customSegmentUrl
    config.headers.Authorization = `Bearer ${segmentManagerStore.token}`
    config.headers.Accept = 'application/json'
    config.headers['Content-Type'] = 'application/json'
    config.headers['x-tenant'] = segmentManagerStore.tenantId;
    config.headers['brand-id'] = segmentManagerStore.brandId;
    setConfigContentType(config)
    return config
  },
  (err) => Promise.reject(err)
)



export const fetchAppConfig = () =>
  axios
    .get('/appConfig.json')
    .then((response) => response.data)
    .catch((error) => {
      throw error
    })

const setConfigContentType = (config: InternalAxiosRequestConfig) => {
  if ((config.method === 'put' || config.method === 'post') && config.data === undefined) {
    config.data = {}
  }
}

export const fetchProfiles = () => {
  return segmentManagerApi.get(`${baseURL}/api/v1/profiles`)
      .then((response) => response.data)
      .catch((error) => { throw (error); });
}

export const  fetchSegments = (queryParams, platform) => {
    return segmentManagerApi.get(`${baseURL}/api/v1/segments/${platform ?? 1}`, { params: queryParams })
        .then((response) => response.data)
        .catch((error) => { throw (error); });
}

export const fetchInsights = (segmentId) => {
  return segmentManagerApi.get(`${baseURL}/api/v1/insights/${segmentId}`, { params: queryParams })
      .then((response) => response.data)
      .catch((error) => { throw (error); });
}

export const fetchSegmentSettings = () => {
    return segmentManagerApi.get(`${baseURL}/api/v1/settings`)
        .then((response) => response.data)
        .catch((error) => { throw (error); });
}

export const fetchDataBaseModel = (platform, location) => {
  return customSegmentManagerApi.get(`${baseURL}/api/v1/settings/platform/${platform}`)
    .then((response) => response.data)
    .catch((error) => { throw (error); });

}

export const fetchCustomSegmentSettings = () => {
  return customSegmentManagerApi.get(`${baseURL}/api/v1/settings/`)
    .then((response) => response.data)
    .catch((error) => { throw (error); });

}

export const runQuery = (query, platform) => {
  return customSegmentManagerApi.post(`${baseURL}/api/v1/query/${platform}`, query)
    .then((response) => response.data)
    .catch((error) => { throw (error); });

}

export const generateAiQuery = (query, platform) => {
  return customSegmentManagerApi.post(`${baseURL}/api/v1/query/gen/${platform}`, query)
    .then((response) => response.data)
    .catch((error) => { throw (error); });

}

export default {
  fetchAppConfig,
  fetchProfiles,
  fetchSegments,
  fetchSegmentSettings,
  fetchDataBaseModel,
  fetchCustomSegmentSettings,
  generateAiQuery,
  runQuery,
}
