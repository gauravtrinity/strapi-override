import { jsx, jsxs } from 'react/jsx-runtime';
import { Divider, Box, Flex, Typography } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { styled } from 'styled-components';
import { c as Login } from './index-CyEyTBzg.mjs';
import { k as useGetProvidersQuery } from './Theme-6doxg5FV.mjs';
import { S as SSOProviders } from './SSOProviders-BD7LHrkI.mjs';

const DividerFull = styled(Divider)`
  flex: 1;
`;
const LoginEE = (loginProps) => {
  const { formatMessage } = useIntl();
  const { isLoading, data: providers = [] } = useGetProvidersQuery(void 0, {
    skip: !window.strapi.features.isEnabled(window.strapi.features.SSO)
  });
  if (!window.strapi.features.isEnabled(window.strapi.features.SSO) || !isLoading && providers.length === 0) {
    return /* @__PURE__ */ jsx(Login, { ...loginProps });
  }
  return /* @__PURE__ */ jsx(Login, { ...loginProps, children: /* @__PURE__ */ jsx(Box, { paddingTop: 7, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 7, children: [
    /* @__PURE__ */ jsxs(Flex, { children: [
      /* @__PURE__ */ jsx(DividerFull, {}),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 3, paddingRight: 3, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({ id: "Auth.login.sso.divider" }) }) }),
      /* @__PURE__ */ jsx(DividerFull, {})
    ] }),
    /* @__PURE__ */ jsx(SSOProviders, { providers, displayAllProviders: false })
  ] }) }) });
};

export { LoginEE };
//# sourceMappingURL=Login-DB0gOMKE.mjs.map
