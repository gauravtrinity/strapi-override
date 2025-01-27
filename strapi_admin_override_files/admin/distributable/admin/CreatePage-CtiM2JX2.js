'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const Theme = require('./Theme-DaGRg2qU.js');
const EditPage = require('./EditPage-MgWvoG8u.js');

const ProtectedCreatePage = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.webhooks.create
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage.EditPage, {}) });
};

exports.CreatePage = EditPage.EditPage;
exports.ProtectedCreatePage = ProtectedCreatePage;
//# sourceMappingURL=CreatePage-CtiM2JX2.js.map
