import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useNotifyAT, Table, Thead, Tr, Th, Typography, Tbody, Td } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { b as Layouts } from './index-CyEyTBzg.mjs';
import { b as useTypedSelector, P as Page, u as useNotification, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { b as useGetPluginsQuery } from './admin-DOzK8yjX.mjs';

const InstalledPlugins = () => {
  const { formatMessage } = useIntl();
  const { notifyStatus } = useNotifyAT();
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { isLoading, data, error } = useGetPluginsQuery();
  React.useEffect(() => {
    if (data) {
      notifyStatus(
        formatMessage(
          {
            id: "app.utils.notify.data-loaded",
            defaultMessage: "The {target} has loaded"
          },
          {
            target: formatMessage({
              id: "global.plugins",
              defaultMessage: "Plugins"
            })
          }
        )
      );
    }
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [data, error, formatAPIError, formatMessage, notifyStatus, toggleNotification]);
  if (isLoading) {
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsx(Layouts.Root, { children: /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({
          id: "global.plugins",
          defaultMessage: "Plugins"
        }),
        subtitle: formatMessage({
          id: "app.components.ListPluginsPage.description",
          defaultMessage: "List of the installed plugins in the project."
        })
      }
    ),
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Table, { colCount: 2, rowCount: data?.plugins?.length ?? 0 + 1, children: [
      /* @__PURE__ */ jsx(Thead, { children: /* @__PURE__ */ jsxs(Tr, { children: [
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
          id: "global.name",
          defaultMessage: "Name"
        }) }) }),
        /* @__PURE__ */ jsx(Th, { children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage({
          id: "global.description",
          defaultMessage: "description"
        }) }) })
      ] }) }),
      /* @__PURE__ */ jsx(Tbody, { children: data?.plugins.map(({ name, displayName, description }) => {
        return /* @__PURE__ */ jsxs(Tr, { children: [
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", variant: "omega", fontWeight: "bold", children: formatMessage({
            id: `global.plugins.${name}`,
            defaultMessage: displayName
          }) }) }),
          /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: formatMessage({
            id: `global.plugins.${name}.description`,
            defaultMessage: description
          }) }) })
        ] }, name);
      }) })
    ] }) })
  ] }) });
};
const ProtectedInstalledPlugins = () => {
  const { formatMessage } = useIntl();
  const permissions = useTypedSelector((state) => state.admin_app.permissions);
  return /* @__PURE__ */ jsxs(Page.Protect, { permissions: permissions.marketplace?.main, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({
      id: "global.plugins",
      defaultMessage: "Plugins"
    }) }),
    /* @__PURE__ */ jsx(InstalledPlugins, {})
  ] });
};

export { InstalledPlugins, ProtectedInstalledPlugins };
//# sourceMappingURL=InstalledPlugins-D1Pn59jk.mjs.map
