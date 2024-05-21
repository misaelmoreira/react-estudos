import { FC } from "react";
import { getToken } from "../../utils/token";
import { useRouter } from "next/router";

type IsAuthenticatedProps = {
  children?: React.ReactNode;
};

export const IsAuthenticated: FC<IsAuthenticatedProps> = ({ children }) => {
  const router = useRouter();
  if (!getToken()) {
    router.push(`/login?redirectPath=${router.pathname}`);
  }

  return <>{getToken() ? children : null}</>;
};
