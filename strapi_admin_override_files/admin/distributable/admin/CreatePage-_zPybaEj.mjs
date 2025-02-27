import { jsx } from 'react/jsx-runtime';
import { b as useTypedSelector, P as Page } from './Theme-6doxg5FV.mjs';
import { E as EditPage } from './EditPage-DlKvCZKq.mjs';

const ProtectedCreatePage = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.webhooks.create
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditPage, {}) });
};

export { EditPage as CreatePage, ProtectedCreatePage };
//# sourceMappingURL=CreatePage-_zPybaEj.mjs.map
