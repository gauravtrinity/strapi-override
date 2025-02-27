'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const symbols = require('@strapi/icons/symbols');
const reactIntl = require('react-intl');
const index = require('./index-UB9JNjeZ.js');

const PurchaseSingleSignOn = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        title: formatMessage({
          id: "Settings.sso.title",
          defaultMessage: "Single Sign-On"
        }),
        subtitle: formatMessage({
          id: "Settings.sso.subTitle",
          defaultMessage: "Configure the settings for the Single Sign-On feature."
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.sso.not-available",
          defaultMessage: "SSO is only available as part of a paid plan. Upgrade to configure additional sign-in & sign-up methods for your administration panel."
        }),
        action: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ExternalLink, {}),
            href: "https://strapi.io/features/single-sign-on-sso?utm_campaign=In-Product-CTA&utm_source=Single-sign-on",
            isExternal: true,
            target: "_blank",
            children: formatMessage({
              id: "global.learn-more",
              defaultMessage: "Learn more"
            })
          }
        )
      }
    ) })
  ] }) });
};

exports.PurchaseSingleSignOn = PurchaseSingleSignOn;
//# sourceMappingURL=PurchaseSingleSignOn-uzVo7W65.js.map
