import { config } from "../configs/config";

const { domain, clientId, appUri, useRefreshTokens, cacheLocation } =
  config as {
    domain: string;
    clientId: string;
    appUri: string;
    useRefreshTokens: boolean;
    cacheLocation: any;
  };

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      redirect_uri: appUri,
    },
    useRefreshTokens,
    cacheLocation,
  },
};
