export default function setAuthHeader({ $axios, store }) {
  $axios.onRequest(config => {
    // TODO: don't set header when authToken is null
    if (config.headers["No-Token"]) {
      delete config.headers["No-Token"];
      return config;
    }
    if (store.state.auth.authToken) {
      config.headers.Authorization = `Bearer ${store.state.auth.authToken}`;
      console.log(`Making request to ${config.url}`);
    }
    return config;
  });
}
