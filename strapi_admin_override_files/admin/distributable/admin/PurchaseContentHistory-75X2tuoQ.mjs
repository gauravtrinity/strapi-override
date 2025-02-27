import { jsx, jsxs } from 'react/jsx-runtime';
import { Main, Box, EmptyStateLayout, LinkButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import { EmptyPermissions } from '@strapi/icons/symbols';
import { useIntl } from 'react-intl';
import { b as Layouts } from './index-CyEyTBzg.mjs';

const PurchaseContentHistory = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
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
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsx(EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.content-history.not-available",
          defaultMessage: "Content History is only available as part of a paid plan. Upgrade to get full control over your content's lifecycle."
        }),
        action: /* @__PURE__ */ jsx(
          LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
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

export { PurchaseContentHistory };
//# sourceMappingURL=PurchaseContentHistory-75X2tuoQ.mjs.map
