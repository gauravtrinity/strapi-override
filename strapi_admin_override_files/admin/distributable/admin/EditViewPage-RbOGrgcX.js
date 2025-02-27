'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const formik = require('formik');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const Theme = require('./Theme-DaGRg2qU.js');
const index = require('./index-UB9JNjeZ.js');
const apiTokens = require('./apiTokens-rbJHW5Y2.js');
const admin = require('./admin-DRnq5SAg.js');
const constants = require('./constants-DF68OPrs.js');
const TokenTypeSelect = require('./TokenTypeSelect-Btv-7SJf.js');
const reactContext = require('@radix-ui/react-context');
const map = require('lodash/map');
const tail = require('lodash/tail');
const styledComponents = require('styled-components');
const icons = require('@strapi/icons');
const capitalize = require('lodash/capitalize');
const yup = require('yup');
const immer = require('immer');
const pull = require('lodash/pull');

const _interopDefault = e => e && e.__esModule ? e : { default: e };

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  const n = Object.create(null, { [Symbol.toStringTag]: { value: 'Module' } });
  if (e) {
    for (const k in e) {
      if (k !== 'default') {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}

const React__namespace = /*#__PURE__*/_interopNamespace(React);
const map__default = /*#__PURE__*/_interopDefault(map);
const tail__default = /*#__PURE__*/_interopDefault(tail);
const capitalize__default = /*#__PURE__*/_interopDefault(capitalize);
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);
const pull__default = /*#__PURE__*/_interopDefault(pull);

const contentApiService = admin.adminApi.injectEndpoints({
  endpoints: (builder) => ({
    getPermissions: builder.query({
      query: () => "/admin/content-api/permissions",
      transformResponse: (response) => response.data
    }),
    getRoutes: builder.query({
      query: () => "/admin/content-api/routes",
      transformResponse: (response) => response.data
    })
  }),
  overrideExisting: false
});
const { useGetPermissionsQuery, useGetRoutesQuery } = contentApiService;

const [ApiTokenPermissionsContextProvider, useApiTokenPermissionsContext] = reactContext.createContext("ApiTokenPermissionsContext");
const ApiTokenPermissionsProvider = ({
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsxRuntime.jsx(ApiTokenPermissionsContextProvider, { ...rest, children });
};
const useApiTokenPermissions = () => useApiTokenPermissionsContext("useApiTokenPermissions");

const FormApiTokenContainer = ({
  errors = {},
  onChange,
  canEditInputs,
  isCreating,
  values = {},
  apiToken = {},
  onDispatch,
  setHasChangedPermissions
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const handleChangeSelectApiTokenType = ({ target: { value } }) => {
    setHasChangedPermissions(false);
    if (value === "full-access") {
      onDispatch({
        type: "SELECT_ALL_ACTIONS"
      });
    }
    if (value === "read-only") {
      onDispatch({
        type: "ON_CHANGE_READ_ONLY"
      });
    }
  };
  const typeOptions = [
    {
      value: "read-only",
      label: {
        id: "Settings.tokens.types.read-only",
        defaultMessage: "Read-only"
      }
    },
    {
      value: "full-access",
      label: {
        id: "Settings.tokens.types.full-access",
        defaultMessage: "Full access"
      }
    },
    {
      value: "custom",
      label: {
        id: "Settings.tokens.types.custom",
        defaultMessage: "Custom"
      }
    }
  ];
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "filterShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenName,
            {
              error: errors["name"],
              value: values["name"],
              canEditInputs,
              onChange
            }
          ) }, "name"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenDescription,
            {
              error: errors["description"],
              value: values["description"],
              canEditInputs,
              onChange
            }
          ) }, "description"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.LifeSpanInput,
            {
              isCreating,
              error: errors["lifespan"],
              value: values["lifespan"],
              onChange,
              token: apiToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            TokenTypeSelect.TokenTypeSelect,
            {
              value: values["type"],
              error: errors["type"],
              label: {
                id: "Settings.tokens.form.type",
                defaultMessage: "Token type"
              },
              onChange: (value) => {
                handleChangeSelectApiTokenType({ target: { value } });
                onChange({ target: { name: "type", value } });
              },
              options: typeOptions,
              canEditInputs
            }
          ) }, "type")
        ] })
      ] })
    }
  );
};

const getMethodColor = (verb) => {
  switch (verb) {
    case "POST": {
      return {
        text: "success600",
        border: "success200",
        background: "success100"
      };
    }
    case "GET": {
      return {
        text: "secondary600",
        border: "secondary200",
        background: "secondary100"
      };
    }
    case "PUT": {
      return {
        text: "warning600",
        border: "warning200",
        background: "warning100"
      };
    }
    case "DELETE": {
      return {
        text: "danger600",
        border: "danger200",
        background: "danger100"
      };
    }
    default: {
      return {
        text: "neutral600",
        border: "neutral200",
        background: "neutral100"
      };
    }
  }
};
const MethodBox = styledComponents.styled(designSystem.Box)`
  margin: -1px;
  border-radius: ${({ theme }) => theme.spaces[1]} 0 0 ${({ theme }) => theme.spaces[1]};
`;
const BoundRoute = ({
  route = {
    handler: "Nocontroller.error",
    method: "GET",
    path: "/there-is-no-path"
  }
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail__default.default(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "delta", tag: "h3", children: [
      formatMessage({
        id: "Settings.apiTokens.createPage.BoundRoute.title",
        defaultMessage: "Bound route to"
      }),
      " ",
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: controller }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { variant: "delta", textColor: "primary600", children: [
        ".",
        action
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { hasRadius: true, background: "neutral0", borderColor: "neutral200", gap: 0, children: [
      /* @__PURE__ */ jsxRuntime.jsx(MethodBox, { background: colors.background, borderColor: colors.border, padding: 2, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "bold", textColor: colors.text, children: method }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 2, paddingRight: 2, children: map__default.default(formattedRoute, (value) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { textColor: value.includes(":") ? "neutral600" : "neutral900", children: [
        "/",
        value
      ] }, value)) })
    ] })
  ] });
};

const ActionBoundRoutes = () => {
  const {
    value: { selectedAction, routes }
  } = useApiTokenPermissions();
  const { formatMessage } = reactIntl.useIntl();
  const actionSection = selectedAction?.split(".")[0];
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Grid.Item,
    {
      col: 5,
      background: "neutral150",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      style: { minHeight: "100%" },
      direction: "column",
      alignItems: "stretch",
      children: selectedAction ? /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: actionSection && actionSection in routes && routes[actionSection].map((route) => {
        return route.config.auth?.scope?.includes(selectedAction) || route.handler === selectedAction ? /* @__PURE__ */ jsxRuntime.jsx(BoundRoute, { route }, route.handler) : null;
      }) }) : /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h3", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};

const activeCheckboxWrapperStyles = styledComponents.css`
  background: ${(props) => props.theme.colors.primary100};

  #cog {
    opacity: 1;
  }
`;
const CheckboxWrapper = styledComponents.styled(designSystem.Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;

  #cog {
    opacity: 0;
    path {
      fill: ${(props) => props.theme.colors.primary600};
    }
  }

  /* Show active style both on hover and when the action is selected */
  ${(props) => props.$isActive && activeCheckboxWrapperStyles}
  &:hover {
    ${activeCheckboxWrapperStyles}
  }
`;
const Border = styledComponents.styled.div`
  flex: 1;
  align-self: center;
  border-top: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const CollapsableContentType = ({
  controllers = [],
  label,
  orderNumber = 0,
  disabled = false
}) => {
  const {
    value: { onChangeSelectAll, onChange, selectedActions, setSelectedAction, selectedAction }
  } = useApiTokenPermissions();
  const { formatMessage } = reactIntl.useIntl();
  const isActionSelected = (actionId) => actionId === selectedAction;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Accordion.Item, { value: `${label}-${orderNumber}`, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Header, { variant: orderNumber % 2 ? "primary" : "secondary", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Trigger, { children: capitalize__default.default(label) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Content, { children: controllers?.map((controller) => {
      const allActionsSelected = controller.actions.every(
        (action) => selectedActions.includes(action.actionId)
      );
      const someActionsSelected = controller.actions.some(
        (action) => selectedActions.includes(action.actionId)
      );
      return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", alignItems: "center", padding: 4, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 4, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: controller?.controller }) }),
          /* @__PURE__ */ jsxRuntime.jsx(Border, {}),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Checkbox,
            {
              checked: !allActionsSelected && someActionsSelected ? "indeterminate" : allActionsSelected,
              onCheckedChange: () => {
                onChangeSelectAll({ target: { value: [...controller.actions] } });
              },
              disabled,
              children: formatMessage({ id: "app.utils.select-all", defaultMessage: "Select all" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 4, padding: 4, children: controller?.actions && controller?.actions.map((action) => {
          return /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.Grid.Item,
            {
              col: 6,
              direction: "column",
              alignItems: "stretch",
              children: /* @__PURE__ */ jsxRuntime.jsxs(
                CheckboxWrapper,
                {
                  $isActive: isActionSelected(action.actionId),
                  padding: 2,
                  hasRadius: true,
                  children: [
                    /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Checkbox,
                      {
                        checked: selectedActions.includes(action.actionId),
                        name: action.actionId,
                        onCheckedChange: () => {
                          onChange({ target: { value: action.actionId } });
                        },
                        disabled,
                        children: action.action
                      }
                    ),
                    /* @__PURE__ */ jsxRuntime.jsx(
                      "button",
                      {
                        type: "button",
                        "data-testid": "action-cog",
                        onClick: () => setSelectedAction({ target: { value: action.actionId } }),
                        style: { display: "inline-flex", alignItems: "center" },
                        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Cog, { id: "cog" })
                      }
                    )
                  ]
                }
              )
            },
            action.actionId
          );
        }) })
      ] }, `${label}.${controller?.controller}`);
    }) })
  ] });
};

const ContentTypesSection = ({ section = null, ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 4, background: "neutral0", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Accordion.Root, { size: "M", children: section && section.map((api, index) => /* @__PURE__ */ jsxRuntime.jsx(
    CollapsableContentType,
    {
      label: api.label,
      controllers: api.controllers,
      orderNumber: index,
      ...props
    },
    api.apiId
  )) }) });
};

const Permissions = ({ ...props }) => {
  const {
    value: { data }
  } = useApiTokenPermissions();
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Grid.Item,
      {
        col: 7,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        direction: "column",
        alignItems: "stretch",
        children: [
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h2", children: formatMessage({
              id: "Settings.apiTokens.createPage.permissions.title",
              defaultMessage: "Permissions"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
              id: "Settings.apiTokens.createPage.permissions.description",
              defaultMessage: "Only actions bound by a route are listed below."
            }) })
          ] }),
          data?.permissions && /* @__PURE__ */ jsxRuntime.jsx(ContentTypesSection, { section: data?.permissions, ...props })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(ActionBoundRoutes, {})
  ] });
};

const schema = yup__namespace.object().shape({
  name: yup__namespace.string().max(100).required(index.errorsTrads.required.id),
  type: yup__namespace.string().oneOf(["read-only", "full-access", "custom"]).required(index.errorsTrads.required.id),
  description: yup__namespace.string().nullable(),
  lifespan: yup__namespace.number().integer().min(0).nullable().defined(index.errorsTrads.required.id)
});

const transformPermissionsData = (data) => {
  const layout = {
    allActionsIds: [],
    permissions: []
  };
  layout.permissions = Object.entries(data).map(([apiId, permission]) => ({
    apiId,
    label: apiId.split("::")[1],
    controllers: Object.keys(permission.controllers).map((controller) => ({
      controller,
      actions: controller in permission.controllers ? permission.controllers[controller].map((action) => {
        const actionId = `${apiId}.${controller}.${action}`;
        if (apiId.includes("api::")) {
          layout.allActionsIds.push(actionId);
        }
        return {
          action,
          actionId
        };
      }).flat() : []
    })).flat()
  }));
  return layout;
};

const initialState = {
  data: {
    allActionsIds: [],
    permissions: []
  },
  routes: {},
  selectedAction: "",
  selectedActions: []
};
const reducer = (state, action) => immer.produce(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      if (draftState.selectedActions.includes(action.value)) {
        pull__default.default(draftState.selectedActions, action.value);
      } else {
        draftState.selectedActions.push(action.value);
      }
      break;
    }
    case "SELECT_ALL_IN_PERMISSION": {
      const areAllSelected = action.value.every(
        (item) => draftState.selectedActions.includes(item.actionId)
      );
      if (areAllSelected) {
        action.value.forEach((item) => {
          pull__default.default(draftState.selectedActions, item.actionId);
        });
      } else {
        action.value.forEach((item) => {
          draftState.selectedActions.push(item.actionId);
        });
      }
      break;
    }
    case "SELECT_ALL_ACTIONS": {
      draftState.selectedActions = [...draftState.data.allActionsIds];
      break;
    }
    case "ON_CHANGE_READ_ONLY": {
      const onlyReadOnlyActions = draftState.data.allActionsIds.filter(
        (actionId) => actionId.includes("find") || actionId.includes("findOne")
      );
      draftState.selectedActions = [...onlyReadOnlyActions];
      break;
    }
    case "UPDATE_PERMISSIONS_LAYOUT": {
      draftState.data = transformPermissionsData(action.value);
      break;
    }
    case "UPDATE_ROUTES": {
      draftState.routes = { ...action.value };
      break;
    }
    case "UPDATE_PERMISSIONS": {
      draftState.selectedActions = [...action.value];
      break;
    }
    case "SET_SELECTED_ACTION": {
      draftState.selectedAction = action.value;
      break;
    }
    default:
      return draftState;
  }
});

const EditView = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { toggleNotification } = Theme.useNotification();
  const { state: locationState } = reactRouterDom.useLocation();
  const permissions = Theme.useTypedSelector((state2) => state2.admin_app.permissions);
  const [apiToken, setApiToken] = React__namespace.useState(
    locationState?.apiToken?.accessKey ? {
      ...locationState.apiToken
    } : null
  );
  const { trackUsage } = Theme.useTracking();
  const setCurrentStep = Theme.useGuidedTour("EditView", (state2) => state2.setCurrentStep);
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
  } = Theme.useRBAC(permissions.settings?.["api-tokens"]);
  const [state, dispatch] = React__namespace.useReducer(reducer, initialState);
  const match = reactRouterDom.useMatch("/settings/api-tokens/:id");
  const id = match?.params?.id;
  const isCreating = id === "create";
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidtionErrors
  } = Theme.useAPIErrorHandler();
  const navigate = reactRouterDom.useNavigate();
  const contentAPIPermissionsQuery = useGetPermissionsQuery();
  const contentAPIRoutesQuery = useGetRoutesQuery();
  React__namespace.useEffect(() => {
    if (contentAPIPermissionsQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentAPIPermissionsQuery.error)
      });
    }
  }, [contentAPIPermissionsQuery.error, formatAPIError, toggleNotification]);
  React__namespace.useEffect(() => {
    if (contentAPIRoutesQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentAPIRoutesQuery.error)
      });
    }
  }, [contentAPIRoutesQuery.error, formatAPIError, toggleNotification]);
  React__namespace.useEffect(() => {
    if (contentAPIPermissionsQuery.data) {
      dispatch({
        type: "UPDATE_PERMISSIONS_LAYOUT",
        value: contentAPIPermissionsQuery.data
      });
    }
  }, [contentAPIPermissionsQuery.data]);
  React__namespace.useEffect(() => {
    if (contentAPIRoutesQuery.data) {
      dispatch({
        type: "UPDATE_ROUTES",
        value: contentAPIRoutesQuery.data
      });
    }
  }, [contentAPIRoutesQuery.data]);
  React__namespace.useEffect(() => {
    if (apiToken) {
      if (apiToken.type === "read-only") {
        dispatch({
          type: "ON_CHANGE_READ_ONLY"
        });
      }
      if (apiToken.type === "full-access") {
        dispatch({
          type: "SELECT_ALL_ACTIONS"
        });
      }
      if (apiToken.type === "custom") {
        dispatch({
          type: "UPDATE_PERMISSIONS",
          value: apiToken?.permissions
        });
      }
    }
  }, [apiToken]);
  React__namespace.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: constants.API_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  const { data, error, isLoading } = apiTokens.useGetAPITokenQuery(id, {
    skip: !id || isCreating || !!apiToken
  });
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  React__namespace.useEffect(() => {
    if (data) {
      setApiToken(data);
      if (data.type === "read-only") {
        dispatch({
          type: "ON_CHANGE_READ_ONLY"
        });
      }
      if (data.type === "full-access") {
        dispatch({
          type: "SELECT_ALL_ACTIONS"
        });
      }
      if (data.type === "custom") {
        dispatch({
          type: "UPDATE_PERMISSIONS",
          value: data?.permissions
        });
      }
    }
  }, [data]);
  const [createToken] = apiTokens.useCreateAPITokenMutation();
  const [updateToken] = apiTokens.useUpdateAPITokenMutation();
  const handleSubmit = async (body, formik) => {
    trackUsage(isCreating ? "willCreateToken" : "willEditToken", {
      tokenType: constants.API_TOKEN_TYPE
    });
    try {
      if (isCreating) {
        const res = await createToken({
          ...body,
          // lifespan must be "null" for unlimited (0 would mean instantly expired and isn't accepted)
          lifespan: body?.lifespan && body.lifespan !== "0" ? parseInt(body.lifespan.toString(), 10) : null,
          permissions: body.type === "custom" ? state.selectedActions : null
        });
        if ("error" in res) {
          if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            formik.setErrors(formatValidtionErrors(res.error));
          } else {
            toggleNotification({
              type: "danger",
              message: formatAPIError(res.error)
            });
          }
          return;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "notification.success.apitokencreated",
            defaultMessage: "API Token successfully created"
          })
        });
        trackUsage("didCreateToken", {
          type: res.data.type,
          tokenType: constants.API_TOKEN_TYPE
        });
        navigate(`../api-tokens/${res.data.id.toString()}`, {
          state: { apiToken: res.data },
          replace: true
        });
        setCurrentStep("apiTokens.success");
      } else {
        const res = await updateToken({
          id,
          name: body.name,
          description: body.description,
          type: body.type,
          permissions: body.type === "custom" ? state.selectedActions : null
        });
        if ("error" in res) {
          if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            formik.setErrors(formatValidtionErrors(res.error));
          } else {
            toggleNotification({
              type: "danger",
              message: formatAPIError(res.error)
            });
          }
          return;
        }
        toggleNotification({
          type: "success",
          message: formatMessage({
            id: "notification.success.apitokenedited",
            defaultMessage: "API Token successfully edited"
          })
        });
        trackUsage("didEditToken", {
          type: res.data.type,
          tokenType: constants.API_TOKEN_TYPE
        });
      }
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
  const [hasChangedPermissions, setHasChangedPermissions] = React__namespace.useState(false);
  const handleChangeCheckbox = ({
    target: { value }
  }) => {
    setHasChangedPermissions(true);
    dispatch({
      type: "ON_CHANGE",
      value
    });
  };
  const handleChangeSelectAllCheckbox = ({
    target: { value }
  }) => {
    setHasChangedPermissions(true);
    dispatch({
      type: "SELECT_ALL_IN_PERMISSION",
      value
    });
  };
  const setSelectedAction = ({
    target: { value }
  }) => {
    dispatch({
      type: "SET_SELECTED_ACTION",
      value
    });
  };
  const providerValue = {
    ...state,
    onChange: handleChangeCheckbox,
    onChangeSelectAll: handleChangeSelectAllCheckbox,
    setSelectedAction
  };
  const canEditInputs = canUpdate && !isCreating || canCreate && isCreating;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsx(ApiTokenPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxRuntime.jsxs(Theme.Page.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "API Tokens" }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      formik.Formik,
      {
        validationSchema: schema,
        validateOnChange: false,
        initialValues: {
          name: apiToken?.name || "",
          description: apiToken?.description || "",
          type: apiToken?.type,
          lifespan: apiToken?.lifespan
        },
        enableReinitialize: true,
        onSubmit: (body, actions) => handleSubmit(body, actions),
        children: ({ errors, handleChange, isSubmitting, values, setFieldValue }) => {
          if (hasChangedPermissions && values?.type !== "custom") {
            setFieldValue("type", "custom");
          }
          return /* @__PURE__ */ jsxRuntime.jsxs(formik.Form, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              TokenTypeSelect.FormHead,
              {
                title: {
                  id: "Settings.apiTokens.createPage.title",
                  defaultMessage: "Create API Token"
                },
                token: apiToken,
                setToken: setApiToken,
                canEditInputs,
                canRegenerate,
                isSubmitting,
                regenerateUrl: "/admin/api-tokens/"
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              Boolean(apiToken?.name) && /* @__PURE__ */ jsxRuntime.jsx(TokenTypeSelect.TokenBox, { token: apiToken?.accessKey, tokenType: constants.API_TOKEN_TYPE }),
              /* @__PURE__ */ jsxRuntime.jsx(
                FormApiTokenContainer,
                {
                  errors,
                  onChange: handleChange,
                  canEditInputs,
                  isCreating,
                  values,
                  apiToken,
                  onDispatch: dispatch,
                  setHasChangedPermissions
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                Permissions,
                {
                  disabled: !canEditInputs || values?.type === "read-only" || values?.type === "full-access"
                }
              )
            ] }) })
          ] });
        }
      }
    )
  ] }) });
};
const ProtectedEditView = () => {
  const permissions = Theme.useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"].read
  );
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(EditView, {}) });
};

exports.EditView = EditView;
exports.ProtectedEditView = ProtectedEditView;
//# sourceMappingURL=EditViewPage-RbOGrgcX.js.map
