import { ReactNode, ReactElement } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

type PrivateRouteProps = {
  children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
  const location = useLocation();
  const { user } = useSelector((state: RootState) => state.auth);

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to="/" state={{ from: location }} />
  );
};

export default PrivateRoute;
