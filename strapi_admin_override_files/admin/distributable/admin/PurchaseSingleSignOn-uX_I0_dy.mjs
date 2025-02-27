import { jsx, jsxs } from 'react/jsx-runtime';
import { Main, Box, EmptyStateLayout, LinkButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import { EmptyPermissions } from '@strapi/icons/symbols';
import { useIntl } from 'react-intl';
import { b as Layouts } from './index-CyEyTBzg.mjs';

const PurchaseSingleSignOn = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
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
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsx(EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.sso.not-available",
          defaultMessage: "SSO is only available as part of a paid plan. Upgrade to configure additional sign-in & sign-up methods for your administration panel."
        }),
        action: /* @__PURE__ */ jsx(
          LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
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

export { PurchaseSingleSignOn };
//# sourceMappingURL=PurchaseSingleSignOn-uX_I0_dy.mjs.map
