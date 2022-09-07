const Cookie = process.client ? require("js-cookie") : undefined;

export default function setAuthHeader({ $axios, store }) {
  $axios.onRequest(config => {
    // TODO: don't set header when authToken is null
    if (config.headers["No-Token"]) {
      delete config.headers["No-Token"];
      return config;
    }
    if (Cookie.get("authToken")) {
      config.headers.Authorization = `Bearer ${Cookie.get("authToken")}`;
      console.log(`Making request to ${config.url}`);
    }
    return config;
  });
}
