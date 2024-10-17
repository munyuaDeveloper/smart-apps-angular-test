import { config } from "../configs/config";

const { domain, clientId, appUri, useRefreshTokens, cacheLocation } =
  config as {
    domain: string;
    clientId: string;
    apiUri: string;
    useRefreshTokens: boolean;
    cacheLocation: any;
    appUri: string;
  };

export const environment = {
  production: true,
  auth: {
    domain,
    clientId,
    redirect_uri: appUri,
    useRefreshTokens,
    cacheLocation,
  },
};
