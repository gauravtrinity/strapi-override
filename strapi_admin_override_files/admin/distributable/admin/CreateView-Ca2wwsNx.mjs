import { jsx } from 'react/jsx-runtime';
import { b as useTypedSelector, P as Page } from './Theme-6doxg5FV.mjs';
import { EditView } from './EditViewPage-BYpd2eyV.mjs';

const ProtectedCreateView = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"].create
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditView, {}) });
};

export { ProtectedCreateView };
//# sourceMappingURL=CreateView-Ca2wwsNx.mjs.map
