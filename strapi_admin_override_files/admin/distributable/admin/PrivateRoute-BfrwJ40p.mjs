import { jsx } from 'react/jsx-runtime';
import { useLocation, Navigate } from 'react-router-dom';
import { a as useAuth } from './Theme-6doxg5FV.mjs';

const PrivateRoute = ({ children }) => {
  const token = useAuth("PrivateRoute", (state) => state.token);
  const { pathname, search } = useLocation();
  return token !== null ? children : /* @__PURE__ */ jsx(
    Navigate,
    {
      to: {
        pathname: "/auth/login",
        search: pathname !== "/" ? `?redirectTo=${encodeURIComponent(`${pathname}${search}`)}` : void 0
      }
    }
  );
};

export { PrivateRoute as P };
//# sourceMappingURL=PrivateRoute-BfrwJ40p.mjs.map
