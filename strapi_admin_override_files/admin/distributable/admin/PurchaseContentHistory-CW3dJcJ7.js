'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const symbols = require('@strapi/icons/symbols');
const reactIntl = require('react-intl');
const index = require('./index-UB9JNjeZ.js');

const PurchaseContentHistory = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Root, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        title: formatMessage({
          id: "Settings.content-history.title",
          defaultMessage: "Content History"
        }),
        subtitle: formatMessage({
          id: "Settings.content-history.description",
          defaultMessage: "Get more control over every step of your content’s lifecycle."
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.content-history.not-available",
          defaultMessage: "Content History is only available as part of a paid plan. Upgrade to get full control over your content's lifecycle."
        }),
        action: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ExternalLink, {}),
            href: "https://strapi.io/features/content-history?utm_campaign=In-Product-CTA&utm_source=Content-History",
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

exports.PurchaseContentHistory = PurchaseContentHistory;
//# sourceMappingURL=PurchaseContentHistory-CW3dJcJ7.js.map
