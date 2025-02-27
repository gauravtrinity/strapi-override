import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { LinkButton, EmptyStateLayout } from '@strapi/design-system';
import { Plus } from '@strapi/icons';
import { EmptyDocuments } from '@strapi/icons/symbols';
import * as qs from 'qs';
import { useIntl } from 'react-intl';
import { useNavigate, Link } from 'react-router-dom';
import { b as Layouts } from './index-CyEyTBzg.mjs';
import { b as useTypedSelector, P as Page, u as useNotification, j as useRBAC, c as useTracking, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { u as useOnce } from './useOnce-NHeEacbN.mjs';
import { u as useGetTransferTokensQuery, a as useDeleteTransferTokenMutation } from './transferTokens-AKclIHTx.mjs';
import { T as TRANSFER_TOKEN_TYPE } from './constants-CRj0ViV1.mjs';
import { T as Table } from './Table-C9EBml8A.mjs';

const tableHeaders = [
  {
    name: "name",
    label: {
      id: "Settings.tokens.ListView.headers.name",
      defaultMessage: "Name"
    },
    sortable: true
  },
  {
    name: "description",
    label: {
      id: "Settings.tokens.ListView.headers.description",
      defaultMessage: "Description"
    },
    sortable: false
  },
  {
    name: "createdAt",
    label: {
      id: "Settings.tokens.ListView.headers.createdAt",
      defaultMessage: "Created at"
    },
    sortable: false
  },
  {
    name: "lastUsedAt",
    label: {
      id: "Settings.tokens.ListView.headers.lastUsedAt",
      defaultMessage: "Last used"
    },
    sortable: false
  }
];
const ListView = () => {
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"]
  );
  const {
    isLoading: isLoadingRBAC,
    allowedActions: { canCreate, canDelete, canUpdate, canRead }
  } = useRBAC(permissions);
  const navigate = useNavigate();
  const { trackUsage } = useTracking();
  const { _unstableFormatAPIError: formatAPIError } = useAPIErrorHandler();
  React.useEffect(() => {
    navigate({ search: qs.stringify({ sort: "name:ASC" }, { encode: false }) });
  }, [navigate]);
  useOnce(() => {
    trackUsage("willAccessTokenList", {
      tokenType: TRANSFER_TOKEN_TYPE
    });
  });
  const headers = tableHeaders.map((header) => ({
    ...header,
    label: formatMessage(header.label)
  }));
  const {
    data: transferTokens = [],
    isLoading: isLoadingTokens,
    error
  } = useGetTransferTokensQuery(void 0, {
    skip: !canRead
  });
  React.useEffect(() => {
    if (transferTokens) {
      trackUsage("didAccessTokenList", {
        number: transferTokens.length,
        tokenType: TRANSFER_TOKEN_TYPE
      });
    }
  }, [trackUsage, transferTokens]);
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  const [deleteToken] = useDeleteTransferTokenMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteToken(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
      }
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({ id: "notification.error", defaultMessage: "An error occured" })
      });
    }
  };
  const isLoading = isLoadingTokens || isLoadingRBAC;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Transfer Tokens"
      }
    ) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        title: formatMessage({
          id: "Settings.transferTokens.title",
          defaultMessage: "Transfer Tokens"
        }),
        subtitle: formatMessage({
          id: "Settings.transferTokens.description",
          defaultMessage: '"List of generated transfer tokens"'
          // TODO change this message
        }),
        primaryAction: canCreate ? /* @__PURE__ */ jsx(
          LinkButton,
          {
            role: "button",
            tag: Link,
            "data-testid": "create-transfer-token-button",
            startIcon: /* @__PURE__ */ jsx(Plus, {}),
            size: "S",
            onClick: () => trackUsage("willAddTokenFromList", {
              tokenType: TRANSFER_TOKEN_TYPE
            }),
            to: "/settings/transfer-tokens/create",
            children: formatMessage({
              id: "Settings.transferTokens.create",
              defaultMessage: "Create new Transfer Token"
            })
          }
        ) : void 0
      }
    ),
    !canRead ? /* @__PURE__ */ jsx(Page.NoPermissions, {}) : /* @__PURE__ */ jsx(Page.Main, { "aria-busy": isLoading, children: /* @__PURE__ */ jsxs(Layouts.Content, { children: [
      transferTokens.length > 0 && /* @__PURE__ */ jsx(
        Table,
        {
          permissions: { canRead, canDelete, canUpdate },
          headers,
          isLoading,
          onConfirmDelete: handleDelete,
          tokens: transferTokens,
          tokenType: TRANSFER_TOKEN_TYPE
        }
      ),
      canCreate && transferTokens.length === 0 ? /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          action: /* @__PURE__ */ jsx(
            LinkButton,
            {
              tag: Link,
              variant: "secondary",
              startIcon: /* @__PURE__ */ jsx(Plus, {}),
              to: "/settings/transfer-tokens/create",
              children: formatMessage({
                id: "Settings.transferTokens.addNewToken",
                defaultMessage: "Add new Transfer Token"
              })
            }
          ),
          icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.transferTokens.addFirstToken",
            defaultMessage: "Add your first Transfer Token"
          })
        }
      ) : null,
      !canCreate && transferTokens.length === 0 ? /* @__PURE__ */ jsx(
        EmptyStateLayout,
        {
          icon: /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem" }),
          content: formatMessage({
            id: "Settings.transferTokens.emptyStateLayout",
            defaultMessage: "You don’t have any content yet..."
          })
        }
      ) : null
    ] }) })
  ] });
};
const ProtectedListView = () => {
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["transfer-tokens"].main
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(ListView, {}) });
};

export { ListView, ProtectedListView };
//# sourceMappingURL=ListView-DCkpRh-Y.mjs.map
