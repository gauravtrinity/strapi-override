'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const styledComponents = require('styled-components');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const SSOProviders = require('./SSOProviders-nCeEldEQ.js');

const Providers = () => {
  const navigate = reactRouterDom.useNavigate();
  const { formatMessage } = reactIntl.useIntl();
  const { isLoading, data: providers = [] } = Theme.useGetProvidersQuery(void 0, {
    skip: !window.strapi.features.isEnabled(window.strapi.features.SSO)
  });
  const handleClick = () => {
    navigate("/auth/login");
  };
  if (!window.strapi.features.isEnabled(window.strapi.features.SSO) || !isLoading && providers.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Navigate, { to: "/auth/login" });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(index.UnauthenticatedLayout, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(index.LayoutContent, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(index.Column, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(index.Logo, {}),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, paddingBottom: 1, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "h1", variant: "alpha", children: formatMessage({ id: "Auth.form.welcome.title" }) }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingBottom: 7, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "epsilon", textColor: "neutral600", children: formatMessage({ id: "Auth.login.sso.subtitle" }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
        isLoading ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: formatMessage({ id: "Auth.login.sso.loading" }) }) }) : /* @__PURE__ */ jsxRuntime.jsx(SSOProviders.SSOProviders, { providers }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
          /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {}),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "or" }) }) }),
          /* @__PURE__ */ jsxRuntime.jsx(DividerFull, {})
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { fullWidth: true, size: "L", onClick: handleClick, children: formatMessage({ id: "Auth.form.button.login.strapi" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Link, { tag: reactRouterDom.NavLink, to: "/auth/forgot-password", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", children: formatMessage({ id: "Auth.link.forgot-password" }) }) }) }) })
  ] }) });
};
const DividerFull = styledComponents.styled(designSystem.Divider)`
  flex: 1;
`;

const FORMS = {
  providers: Providers
};

exports.FORMS = FORMS;
//# sourceMappingURL=constants-DG1peVCU.js.map
