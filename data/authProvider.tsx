import { Auth0Provider } from "@auth0/auth0-react";
import { config } from "constants/";
import { ReactNode } from "react";

export interface IAuth0State {
  returnTo?: string;
  origin?: string;
  query?: { [key: string]: string };
}

export const AuthProvider = ({
  children,
}: {
  children: ReactNode | ReactNode[];
}) => {

  return (
    <Auth0Provider
      domain={config.AUTH0_DOMAIN!}
      clientId={config.AUTH0_CLIENT_ID!}
      redirectUri={config.AUTH0_REDIRECT_URI}
    >
      {children}
    </Auth0Provider>
  );
};
