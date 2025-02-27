import { jsx, jsxs } from 'react/jsx-runtime';
import { Main, Box, EmptyStateLayout, LinkButton } from '@strapi/design-system';
import { ExternalLink } from '@strapi/icons';
import { EmptyPermissions } from '@strapi/icons/symbols';
import { useIntl } from 'react-intl';
import { b as Layouts } from './index-CyEyTBzg.mjs';

const PurchaseAuditLogs = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({ id: "global.auditLogs", defaultMessage: "Audit Logs" }),
        subtitle: formatMessage({
          id: "Settings.permissions.auditLogs.listview.header.subtitle",
          defaultMessage: "Logs of all the activities that happened in your environment"
        })
      }
    ),
    /* @__PURE__ */ jsx(Box, { paddingLeft: 10, paddingRight: 10, children: /* @__PURE__ */ jsx(
      EmptyStateLayout,
      {
        icon: /* @__PURE__ */ jsx(EmptyPermissions, { width: "16rem" }),
        content: formatMessage({
          id: "Settings.permissions.auditLogs.not-available",
          defaultMessage: "Audit Logs is only available as part of a paid plan. Upgrade to get a searchable and filterable display of all activities."
        }),
        action: /* @__PURE__ */ jsx(
          LinkButton,
          {
            variant: "default",
            endIcon: /* @__PURE__ */ jsx(ExternalLink, {}),
            href: "https://strapi.io/features/audit-logs?utm_campaign=In-Product-CTA&utm_source=Audit-Logs",
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

export { PurchaseAuditLogs };
//# sourceMappingURL=PurchaseAuditLogs-CK0kBY8D.mjs.map
