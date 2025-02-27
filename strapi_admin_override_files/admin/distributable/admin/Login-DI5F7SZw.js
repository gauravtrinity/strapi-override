'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const reactIntl = require('react-intl');
const styledComponents = require('styled-components');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const SSOProviders = require('./SSOProviders-nCeEldEQ.js');

const DividerFull = styledComponents.styled(designSystem.Divider)`
  flex: 1;
`;
const LoginEE = (loginProps) => {
  const { formatMessage } = reactIntl.useIntl();
  const { isLoading, data: providers = [] } = Theme.useGetProvidersQuery(void 0, {
    skip: !window.strapi.features.isEnabled(window.strapi.features.SSO)
  });
  if (!window.strapi.features.isEnabled(window.strapi.features.SSO) || !isLoading && providers.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(index.Login, { ...loginProps });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(index.Login, { ...loginProps, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 7, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {}),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "Auth.login.sso.divider" }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(SSOProviders.SSOProviders, { providers, displayAllProviders: false })
  ] }) }) });
};

exports.LoginEE = LoginEE;
//# sourceMappingURL=Login-DI5F7SZw.js.map
