import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { LinkButton, EmptyStateLayout } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import * as qs from 'qs';
import { useIntl } from 'react-intl';
import { useNavigate, Link } from 'react-router-dom';
import { b as useTypedSelector, P as Page, u as useNotification, j as useRBAC, c as useTracking, m as useGuidedTour, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { b as Layouts } from './index-CyEyTBzg.mjs';
import { u as useOnce } from './useOnce-NHeEacbN.mjs';
import { u as useGetAPITokensQuery, a as useDeleteAPITokenMutation } from './apiTokens-ByCd8ZnO.mjs';
import { A as API_TOKEN_TYPE } from './constants-CRj0ViV1.mjs';
import { T as Table } from './Table-C9EBml8A.mjs';

const TABLE_HEADERS = [
  {
    name: "name",
    label: {
      id: "Settings.apiTokens.ListView.headers.name",
      defaultMessage: "Name"
    },
    sortable: true
  },
  {
    name: "description",
    label: {
      id: "Settings.apiTokens.ListView.headers.description",
      defaultMessage: "Description"
    },
    sortable: false
  },
  {
    name: "createdAt",
    label: {
      id: "Settings.apiTokens.ListView.headers.createdAt",
      defaultMessage: "Created at"
    },
    sortable: false
  },
  {
    name: "lastUsedAt",
    label: {
      id: "Settings.apiTokens.ListView.headers.lastUsedAt",
      defaultMessage: "Last used"
    },
    sortable: false
  }
];
const ListView = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"]
  );
  const {
    allowedActions: { canRead, canCreate, canDelete, canUpdate }
  } = useRBAC(permissions);
  const navigate = useNavigate();
  const { trackUsage } = useTracking();
  const startSection = useGuidedTour("ListView", (state) => state.startSection);
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  React.useEffect(() => {
    startSection("apiTokens");
  }, [startSection]);
  React.useEffect(() => {
    navigate({ search: qs.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [navigate]);
  const headers = TABLE_HEADERS.map((header) => ({
    ...header,
    label: formatMessage(header.label)
  }));
  useOnce(() => {
    trackUsage("willAccessTokenList", {
      tokenType: API_TOKEN_TYPE
    });
  });
  const { data: apiTokens = [], isLoading, error } = useGetAPITokensQuery();
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  React.useEffect(() => {
    trackUsage("didAccessTokenList", { number: apiTokens.length, tokenType: API_TOKEN_TYPE });
  }, [apiTokens, trackUsage]);
  const [deleteToken] = useDeleteAPITokenMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteToken(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      trackUsage("didDeleteToken");
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "Something went wrong"
        })
      });
    }
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "API Tokens" }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({ id: "Settings.apiTokens.title", defaultMessage: "API Tokens" }),
        subtitle: formatMessage({
          id: "Settings.apiTokens.description",
          defaultMessage: "List of generated tokens to consume the API"
        }),
        primaryAction: canCreate && /* @__PURE__ */ jsx(
          LinkButton,
          {
            tag: Link,
            "data-testid": "create-api-token-button",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: API_TOKEN_TYPE
            }),
            to: "/settings/api-tokens/create",
            children: formatMessage({
              id: "Settings.apiTokens.create",
              defaultMessage: "Create new API Token"
            })
          }
        )
      }
    ),
    !canRead ? /* @__PURE__ */ jsx(Page.NoPermissions, {}) : /* @__PURE__ */ jsx(Page.Main, { "aria-busy": isLoading, children: /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      apiTokens.length > 0 && /* @__PURE__ */ jsx(
        Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          isLoading,
          onConfirmDelete: handleDelete,
          tokens: apiTokens,
          tokenType: API_TOKEN_TYPE
        }
      ),
      canCreate && apiTokens.length === 0 ? /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.apiTokens.addFirstToken",
            defaultMessage: "Add your first API Token"
          }),
          action: /* @__PURE__ */ jsx(
            LinkButton,
            {
              tag: Link,
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              to: "/settings/api-tokens/create",
              children: formatMessage({
                id: "Settings.apiTokens.addNewToken",
                defaultMessage: "Add new API Token"
              })
            }
          )
        }
      ) : null,
      !canCreate && apiTokens.length === 0 ? /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.apiTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          })
        }
      ) : null
    ] }) })
  ] });
};
const ProtectedListView = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"].main
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(ListView, {}) });
};

export { ListView, ProtectedListView };
//# sourceMappingURL=ListView-DaBs-N3m.mjs.map
