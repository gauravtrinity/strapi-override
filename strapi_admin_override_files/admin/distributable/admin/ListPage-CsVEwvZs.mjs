import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { JSONInput, Modal as Modal$1, Breadcrumbs, Crumb, Flex, Loader, Box, Typography, Grid, Field, Combobox, ComboboxOption, IconButton } from '@strapi/design-system';
import { Eye } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { j as useAdminUsers, u as useField, b as Layouts, s as Filters, T as Table, P as Pagination } from './index-CyEyTBzg.mjs';
import { u as useNotification, e as useAPIErrorHandler, n as useQueryParams, b as useTypedSelector, P as Page, j as useRBAC } from './Theme-6doxg5FV.mjs';
import * as React from 'react';
import { styled } from 'styled-components';
import { a as adminApi } from './admin-DOzK8yjX.mjs';
import parseISO from 'date-fns/parseISO';
import { g as getDisplayName } from './users-8N93LH7R.mjs';

const auditLogsService = adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query({
      query: (params) => ({
        url: `/admin/audit-logs`,
        config: {
          params
        }
      })
    }),
    getAuditLog: builder.query({
      query: (id) => `/admin/audit-logs/${id}`
    })
  }),
  overrideExisting: false
});
const { useGetAuditLogsQuery, useGetAuditLogQuery } = auditLogsService;

const useFormatTimeStamp = () => {
  const { formatDate } = useIntl();
  const formatTimeStamp = (value) => {
    const date = parseISO(value);
    const formattedDate = formatDate(date, {
      dateStyle: "long"
    });
    const formattedTime = formatDate(date, {
      timeStyle: "medium",
      hourCycle: "h24"
    });
    return `${formattedDate}, ${formattedTime}`;
  };
  return formatTimeStamp;
};

const actionTypes = {
  "entry.create": "Create entry{model, select, undefined {} other { ({model})}}",
  "entry.update": "Update entry{model, select, undefined {} other { ({model})}}",
  "entry.delete": "Delete entry{model, select, undefined {} other { ({model})}}",
  "entry.publish": "Publish entry{model, select, undefined {} other { ({model})}}",
  "entry.unpublish": "Unpublish entry{model, select, undefined {} other { ({model})}}",
  "media.create": "Create media",
  "media.update": "Update media",
  "media.delete": "Delete media",
  "media-folder.create": "Create media folder",
  "media-folder.update": "Update media folder",
  "media-folder.delete": "Delete media folder",
  "user.create": "Create user",
  "user.update": "Update user",
  "user.delete": "Delete user",
  "admin.auth.success": "Admin login",
  "admin.logout": "Admin logout",
  "content-type.create": "Create content type",
  "content-type.update": "Update content type",
  "content-type.delete": "Delete content type",
  "component.create": "Create component",
  "component.update": "Update component",
  "component.delete": "Delete component",
  "role.create": "Create role",
  "role.update": "Update role",
  "role.delete": "Delete role",
  "permission.create": "Create permission",
  "permission.update": "Update permission",
  "permission.delete": "Delete permission"
};
const getDefaultMessage = (value) => {
  return actionTypes[value] || value;
};

const Modal = ({ handleClose, logId }) => {
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const { data, error, isLoading } = useGetAuditLogQuery(logId);
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
      handleClose();
    }
  }, [error, formatAPIError, handleClose, toggleNotification]);
  const formatTimeStamp = useFormatTimeStamp();
  const formattedDate = data && "date" in data ? formatTimeStamp(data.date) : "";
  return /* @__PURE__ */ jsx(Modal$1.Root, { defaultOpen: true, onOpenChange: handleClose, children: /* @__PURE__ */ jsxs(Modal$1.Content, { children: [
    /* @__PURE__ */ jsx(Modal$1.Header, { children: /* @__PURE__ */ jsx(Breadcrumbs, { label: formattedDate, id: "title", children: /* @__PURE__ */ jsx(Crumb, { isCurrent: true, children: formattedDate }) }) }),
    /* @__PURE__ */ jsx(Modal$1.Body, { children: /* @__PURE__ */ jsx(ActionBody, { isLoading, data, formattedDate }) })
  ] }) });
};
const ActionBody = ({ isLoading, data, formattedDate }) => {
  const { formatMessage } = useIntl();
  if (isLoading) {
    return /* @__PURE__ */ jsx(Flex, { padding: 7, justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsx(Loader, { children: "Loading content..." }) });
  }
  const { action, user, payload } = data;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Box, { marginBottom: 3, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", id: "title", children: formatMessage({
      id: "Settings.permissions.auditLogs.details",
      defaultMessage: "Log Details"
    }) }) }),
    /* @__PURE__ */ jsxs(
      Grid.Root,
      {
        gap: 4,
        gridCols: 2,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 6,
        paddingRight: 6,
        marginBottom: 4,
        background: "neutral100",
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.action",
                defaultMessage: "Action"
              }),
              actionName: formatMessage(
                {
                  id: `Settings.permissions.auditLogs.${action}`,
                  defaultMessage: getDefaultMessage(action)
                },
                // @ts-expect-error - any
                { model: payload?.model }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.date",
                defaultMessage: "Date"
              }),
              actionName: formattedDate
            }
          ),
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.user",
                defaultMessage: "User"
              }),
              actionName: user?.displayName || "-"
            }
          ),
          /* @__PURE__ */ jsx(
            ActionItem,
            {
              actionLabel: formatMessage({
                id: "Settings.permissions.auditLogs.userId",
                defaultMessage: "User ID"
              }),
              actionName: user?.id.toString() || "-"
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs(Field.Root, { children: [
      /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
        id: "Settings.permissions.auditLogs.payload",
        defaultMessage: "Payload"
      }) }),
      /* @__PURE__ */ jsx(Payload, { value: JSON.stringify(payload, null, 2), disabled: true })
    ] })
  ] });
};
const Payload = styled(JSONInput)`
  max-width: 100%;
  overflow: scroll;
`;
const ActionItem = ({ actionLabel, actionName }) => {
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "baseline", gap: 1, children: [
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", variant: "sigma", children: actionLabel }),
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: actionName })
  ] });
};

const useAuditLogsData = ({
  canReadAuditLogs,
  canReadUsers
}) => {
  const { toggleNotification } = useNotification();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  const [{ query }] = useQueryParams();
  const {
    data,
    error,
    isError: isUsersError,
    isLoading: isLoadingUsers
  } = useAdminUsers(
    {},
    {
      skip: !canReadUsers,
      refetchOnMountOrArgChange: true
    }
  );
  React.useEffect(() => {
    if (error) {
      toggleNotification({ type: "danger", message: formatAPIError(error) });
    }
  }, [error, toggleNotification, formatAPIError]);
  const {
    data: auditLogs,
    isLoading: isLoadingAuditLogs,
    isError: isAuditLogsError,
    error: auditLogsError
  } = useGetAuditLogsQuery(query, {
    refetchOnMountOrArgChange: true,
    skip: !canReadAuditLogs
  });
  React.useEffect(() => {
    if (auditLogsError) {
      toggleNotification({ type: "danger", message: formatAPIError(auditLogsError) });
    }
  }, [auditLogsError, toggleNotification, formatAPIError]);
  return {
    auditLogs,
    users: data?.users ?? [],
    isLoading: isLoadingUsers || isLoadingAuditLogs,
    hasError: isAuditLogsError || isUsersError
  };
};

const ComboboxFilter = (props) => {
  const { formatMessage } = useIntl();
  const field = useField(props.name);
  const ariaLabel = formatMessage({
    id: "Settings.permissions.auditLogs.filter.aria-label",
    defaultMessage: "Search and select an option to filter"
  });
  const handleChange = (value) => {
    field.onChange(props.name, value);
  };
  return /* @__PURE__ */ jsx(Combobox, { "aria-label": ariaLabel, value: field.value, onChange: handleChange, children: props.options?.map((opt) => {
    const value = typeof opt === "string" ? opt : opt.value;
    const label = typeof opt === "string" ? opt : opt.label;
    return /* @__PURE__ */ jsx(ComboboxOption, { value, children: label }, value);
  }) });
};

const getDisplayedFilters = ({
  formatMessage,
  users,
  canReadUsers
}) => {
  const operators = [
    {
      label: formatMessage({
        id: "components.FilterOptions.FILTER_TYPES.$eq",
        defaultMessage: "is"
      }),
      value: "$eq"
    },
    {
      label: formatMessage({
        id: "components.FilterOptions.FILTER_TYPES.$ne",
        defaultMessage: "is not"
      }),
      value: "$ne"
    }
  ];
  const filters = [
    {
      input: ComboboxFilter,
      label: formatMessage({
        id: "Settings.permissions.auditLogs.action",
        defaultMessage: "Action"
      }),
      name: "action",
      operators,
      options: Object.keys(actionTypes).map((action) => ({
        label: formatMessage(
          {
            id: `Settings.permissions.auditLogs.${action}`,
            defaultMessage: getDefaultMessage(action)
          },
          { model: void 0 }
        ),
        value: action
      })),
      type: "enumeration"
    },
    {
      label: formatMessage({
        id: "Settings.permissions.auditLogs.date",
        defaultMessage: "Date"
      }),
      name: "date",
      type: "datetime"
    }
  ];
  if (canReadUsers && users) {
    return [
      ...filters,
      {
        input: ComboboxFilter,
        label: formatMessage({
          id: "Settings.permissions.auditLogs.user",
          defaultMessage: "User"
        }),
        mainField: { name: "id", type: "integer" },
        name: "user",
        operators,
        options: users.map((user) => ({
          label: getDisplayName(user),
          value: user.id.toString()
        })),
        type: "relation"
      }
    ];
  }
  return filters;
};

const ListPage = () => {
  const { formatMessage } = useIntl();
  const permissions = useTypedSelector((state) => state.admin_app.permissions.settings);
  const {
    allowedActions: { canRead: canReadAuditLogs, canReadUsers },
    isLoading: isLoadingRBAC
  } = useRBAC({
    ...permissions?.auditLogs,
    readUsers: permissions?.users.read || []
  });
  const [{ query }, setQuery] = useQueryParams();
  const {
    auditLogs,
    users,
    isLoading: isLoadingData,
    hasError
  } = useAuditLogsData({
    canReadAuditLogs,
    canReadUsers
  });
  const formatTimeStamp = useFormatTimeStamp();
  const displayedFilters = getDisplayedFilters({ formatMessage, users, canReadUsers });
  const headers = [
    {
      name: "action",
      label: formatMessage({
        id: "Settings.permissions.auditLogs.action",
        defaultMessage: "Action"
      }),
      sortable: true
    },
    {
      name: "date",
      label: formatMessage({
        id: "Settings.permissions.auditLogs.date",
        defaultMessage: "Date"
      }),
      sortable: true
    },
    {
      name: "user",
      label: formatMessage({
        id: "Settings.permissions.auditLogs.user",
        defaultMessage: "User"
      }),
      sortable: false,
      // In this case, the passed parameter cannot and shouldn't be something else than User
      cellFormatter: ({ user }) => user ? user.displayName : ""
    }
  ];
  if (hasError) {
    return /* @__PURE__ */ jsx(Page.Error, {});
  }
  const isLoading = isLoadingData || isLoadingRBAC;
  const { results = [] } = auditLogs ?? {};
  return /* @__PURE__ */ jsxs(Page.Main, { "aria-busy": isLoading, children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: "global.auditLogs",
          defaultMessage: "Audit Logs"
        })
      }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({
          id: "global.auditLogs",
          defaultMessage: "Audit Logs"
        }),
        subtitle: formatMessage({
          id: "Settings.permissions.auditLogs.listview.header.subtitle",
          defaultMessage: "Logs of all the activities that happened in your environment"
        })
      }
    ),
    /* @__PURE__ */ jsx(
      Layouts.Action,
      {
        startActions: /* @__PURE__ */ jsxs(Filters.Root, { options: displayedFilters, children: [
          /* @__PURE__ */ jsx(Filters.Trigger, {}),
          /* @__PURE__ */ jsx(Filters.Popover, {}),
          /* @__PURE__ */ jsx(Filters.List, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      /* @__PURE__ */ jsx(Table.Root, { rows: results, headers, isLoading, children: /* @__PURE__ */ jsxs(Table.Content, { children: [
        /* @__PURE__ */ jsx(Table.Head, { children: headers.map((header) => /* @__PURE__ */ jsx(Table.HeaderCell, { ...header }, header.name)) }),
        /* @__PURE__ */ jsx(Table.Empty, {}),
        /* @__PURE__ */ jsx(Table.Loading, {}),
        /* @__PURE__ */ jsx(Table.Body, { children: results.map((log) => /* @__PURE__ */ jsxs(Table.Row, { onClick: () => setQuery({ id: log.id }), children: [
          headers.map((header) => {
            const { name, cellFormatter } = header;
            switch (name) {
              case "action":
                return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: formatMessage(
                  {
                    id: `Settings.permissions.auditLogs.${log.action}`,
                    // @ts-expect-error – getDefaultMessage probably doesn't benefit from being so strongly typed unless we just add string at the end.
                    defaultMessage: getDefaultMessage(log.action)
                  },
                  { model: log.payload?.model ?? "" }
                ) }) }, name);
              case "date":
                return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: formatTimeStamp(log.date) }) }, name);
              case "user":
                return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: cellFormatter ? cellFormatter(log, header) : "-" }) }, name);
              default:
                return /* @__PURE__ */ jsx(Table.Cell, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral800", children: log[name] || "-" }) }, name);
            }
          }),
          /* @__PURE__ */ jsx(Table.Cell, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(Flex, { justifyContent: "end", children: /* @__PURE__ */ jsx(
            IconButton,
            {
              onClick: () => setQuery({ id: log.id }),
              withTooltip: false,
              label: formatMessage(
                { id: "app.component.table.view", defaultMessage: "{target} details" },
                { target: `${log.action} action` }
              ),
              variant: "ghost",
              children: /* @__PURE__ */ jsx(Eye, {})
            }
          ) }) })
        ] }, log.id)) })
      ] }) }),
      /* @__PURE__ */ jsxs(Pagination.Root, { ...auditLogs?.pagination, children: [
        /* @__PURE__ */ jsx(Pagination.PageSize, {}),
        /* @__PURE__ */ jsx(Pagination.Links, {})
      ] })
    ] }),
    query?.id && /* @__PURE__ */ jsx(Modal, { handleClose: () => setQuery({ id: "" }, "remove"), logId: query.id.toString() })
  ] });
};
const ProtectedListPage = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.auditLogs?.main
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(ListPage, {}) });
};

export { ListPage, ProtectedListPage };
//# sourceMappingURL=ListPage-CsVEwvZs.mjs.map
