'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const Theme = require('./Theme-DaGRg2qU.js');
const EditView = require('./EditView-ClHCZXPS.js');

const ProtectedCreateView = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"].create
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditView.EditView, {}) });
};

exports.ProtectedCreateView = ProtectedCreateView;
//# sourceMappingURL=CreateView-BeXqSHzY.js.map
