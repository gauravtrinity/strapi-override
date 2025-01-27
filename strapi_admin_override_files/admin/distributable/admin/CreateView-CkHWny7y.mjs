import { jsx } from 'react/jsx-runtime';
import { b as useTypedSelector, P as Page } from './Theme-6doxg5FV.mjs';
import { EditView } from './EditView-BpK3Too3.mjs';

const ProtectedCreateView = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"].create
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditView, {}) });
};

export { ProtectedCreateView };
//# sourceMappingURL=CreateView-CkHWny7y.mjs.map
