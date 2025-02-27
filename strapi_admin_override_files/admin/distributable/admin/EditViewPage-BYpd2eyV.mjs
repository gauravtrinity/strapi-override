import { jsx, jsxs } from 'react/jsx-runtime';
import * as React from 'react';
import { Box, Flex, Typography, Grid, Accordion, Checkbox } from '@strapi/design-system';
import { Formik, Form } from 'formik';
import { useIntl } from 'react-intl';
import { useLocation, useMatch, useNavigate } from 'react-router-dom';
import { b as useTypedSelector, P as Page, u as useNotification, c as useTracking, m as useGuidedTour, j as useRBAC, e as useAPIErrorHandler } from './Theme-6doxg5FV.mjs';
import { e as errorsTrads, b as Layouts } from './index-CyEyTBzg.mjs';
import { b as useGetAPITokenQuery, c as useCreateAPITokenMutation, d as useUpdateAPITokenMutation } from './apiTokens-ByCd8ZnO.mjs';
import { a as adminApi, i as isBaseQueryError } from './admin-DOzK8yjX.mjs';
import { A as API_TOKEN_TYPE } from './constants-CRj0ViV1.mjs';
import { a as TokenName, b as TokenDescription, L as LifeSpanInput, c as TokenTypeSelect, F as FormHead, T as TokenBox } from './TokenTypeSelect-B3V4GKDs.mjs';
import { createContext } from '@radix-ui/react-context';
import map from 'lodash/map';
import tail from 'lodash/tail';
import { styled, css } from 'styled-components';
import { Cog } from '@strapi/icons';
import capitalize from 'lodash/capitalize';
import * as yup from 'yup';
import { produce } from 'immer';
import pull from 'lodash/pull';

const contentApiService = adminApi.injectEndpoints({
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

const [ApiTokenPermissionsContextProvider, useApiTokenPermissionsContext] = createContext("ApiTokenPermissionsContext");
const ApiTokenPermissionsProvider = ({
  children,
  ...rest
}) => {
  return /* @__PURE__ */ jsx(ApiTokenPermissionsContextProvider, { ...rest, children });
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
  const { formatMessage } = useIntl();
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
  return /* @__PURE__ */ jsx(
    Box,
    {
      background: "neutral0",
      hasRadius: true,
      shadow: "filterShadow",
      paddingTop: 6,
      paddingBottom: 6,
      paddingLeft: 7,
      paddingRight: 7,
      children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
          id: "global.details",
          defaultMessage: "Details"
        }) }),
        /* @__PURE__ */ jsxs(Grid.Root, { gap: 5, children: [
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
            TokenName,
            {
              error: errors["name"],
              value: values["name"],
              canEditInputs,
              onChange
            }
          ) }, "name"),
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
            TokenDescription,
            {
              error: errors["description"],
              value: values["description"],
              canEditInputs,
              onChange
            }
          ) }, "description"),
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
            LifeSpanInput,
            {
              isCreating,
              error: errors["lifespan"],
              value: values["lifespan"],
              onChange,
              token: apiToken
            }
          ) }, "lifespan"),
          /* @__PURE__ */ jsx(Grid.Item, { col: 6, xs: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
            TokenTypeSelect,
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
const MethodBox = styled(Box)`
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
  const { formatMessage } = useIntl();
  const { method, handler: title, path } = route;
  const formattedRoute = path ? tail(path.split("/")) : [];
  const [controller = "", action = ""] = title ? title.split(".") : [];
  const colors = getMethodColor(route.method);
  return /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
    /* @__PURE__ */ jsxs(Typography, { variant: "delta", tag: "h3", children: [
      formatMessage({
        id: "Settings.apiTokens.createPage.BoundRoute.title",
        defaultMessage: "Bound route to"
      }),
      " ",
      /* @__PURE__ */ jsx("span", { children: controller }),
      /* @__PURE__ */ jsxs(Typography, { variant: "delta", textColor: "primary600", children: [
        ".",
        action
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Flex, { hasRadius: true, background: "neutral0", borderColor: "neutral200", gap: 0, children: [
      /* @__PURE__ */ jsx(MethodBox, { background: colors.background, borderColor: colors.border, padding: 2, children: /* @__PURE__ */ jsx(Typography, { fontWeight: "bold", textColor: colors.text, children: method }) }),
      /* @__PURE__ */ jsx(Box, { paddingLeft: 2, paddingRight: 2, children: map(formattedRoute, (value) => /* @__PURE__ */ jsxs(Typography, { textColor: value.includes(":") ? "neutral600" : "neutral900", children: [
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
  const { formatMessage } = useIntl();
  const actionSection = selectedAction?.split(".")[0];
  return /* @__PURE__ */ jsx(
    Grid.Item,
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
      children: selectedAction ? /* @__PURE__ */ jsx(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: actionSection && actionSection in routes && routes[actionSection].map((route) => {
        return route.config.auth?.scope?.includes(selectedAction) || route.handler === selectedAction ? /* @__PURE__ */ jsx(BoundRoute, { route }, route.handler) : null;
      }) }) : /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
        /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.title",
          defaultMessage: "Advanced settings"
        }) }),
        /* @__PURE__ */ jsx(Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
          id: "Settings.apiTokens.createPage.permissions.header.hint",
          defaultMessage: "Select the application's actions or the plugin's actions and click on the cog icon to display the bound route"
        }) })
      ] })
    }
  );
};

const activeCheckboxWrapperStyles = css`
  background: ${(props) => props.theme.colors.primary100};

  #cog {
    opacity: 1;
  }
`;
const CheckboxWrapper = styled(Box)`
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
const Border = styled.div`
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
  const { formatMessage } = useIntl();
  const isActionSelected = (actionId) => actionId === selectedAction;
  return /* @__PURE__ */ jsxs(Accordion.Item, { value: `${label}-${orderNumber}`, children: [
    /* @__PURE__ */ jsx(Accordion.Header, { variant: orderNumber % 2 ? "primary" : "secondary", children: /* @__PURE__ */ jsx(Accordion.Trigger, { children: capitalize(label) }) }),
    /* @__PURE__ */ jsx(Accordion.Content, { children: controllers?.map((controller) => {
      const allActionsSelected = controller.actions.every(
        (action) => selectedActions.includes(action.actionId)
      );
      const someActionsSelected = controller.actions.some(
        (action) => selectedActions.includes(action.actionId)
      );
      return /* @__PURE__ */ jsxs(Box, { children: [
        /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", alignItems: "center", padding: 4, children: [
          /* @__PURE__ */ jsx(Box, { paddingRight: 4, children: /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", children: controller?.controller }) }),
          /* @__PURE__ */ jsx(Border, {}),
          /* @__PURE__ */ jsx(Box, { paddingLeft: 4, children: /* @__PURE__ */ jsx(
            Checkbox,
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
        /* @__PURE__ */ jsx(Grid.Root, { gap: 4, padding: 4, children: controller?.actions && controller?.actions.map((action) => {
          return /* @__PURE__ */ jsx(
            Grid.Item,
            {
              col: 6,
              direction: "column",
              alignItems: "stretch",
              children: /* @__PURE__ */ jsxs(
                CheckboxWrapper,
                {
                  $isActive: isActionSelected(action.actionId),
                  padding: 2,
                  hasRadius: true,
                  children: [
                    /* @__PURE__ */ jsx(
                      Checkbox,
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
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        "data-testid": "action-cog",
                        onClick: () => setSelectedAction({ target: { value: action.actionId } }),
                        style: { display: "inline-flex", alignItems: "center" },
                        children: /* @__PURE__ */ jsx(Cog, { id: "cog" })
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
  return /* @__PURE__ */ jsx(Box, { padding: 4, background: "neutral0", children: /* @__PURE__ */ jsx(Accordion.Root, { size: "M", children: section && section.map((api, index) => /* @__PURE__ */ jsx(
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
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Grid.Root, { gap: 0, shadow: "filterShadow", hasRadius: true, background: "neutral0", children: [
    /* @__PURE__ */ jsxs(
      Grid.Item,
      {
        col: 7,
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 7,
        paddingRight: 7,
        direction: "column",
        alignItems: "stretch",
        children: [
          /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
            /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h2", children: formatMessage({
              id: "Settings.apiTokens.createPage.permissions.title",
              defaultMessage: "Permissions"
            }) }),
            /* @__PURE__ */ jsx(Typography, { tag: "p", textColor: "neutral600", children: formatMessage({
              id: "Settings.apiTokens.createPage.permissions.description",
              defaultMessage: "Only actions bound by a route are listed below."
            }) })
          ] }),
          data?.permissions && /* @__PURE__ */ jsx(ContentTypesSection, { section: data?.permissions, ...props })
        ]
      }
    ),
    /* @__PURE__ */ jsx(ActionBoundRoutes, {})
  ] });
};

const schema = yup.object().shape({
  name: yup.string().max(100).required(errorsTrads.required.id),
  type: yup.string().oneOf(["read-only", "full-access", "custom"]).required(errorsTrads.required.id),
  description: yup.string().nullable(),
  lifespan: yup.number().integer().min(0).nullable().defined(errorsTrads.required.id)
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
const reducer = (state, action) => produce(state, (draftState) => {
  switch (action.type) {
    case "ON_CHANGE": {
      if (draftState.selectedActions.includes(action.value)) {
        pull(draftState.selectedActions, action.value);
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
          pull(draftState.selectedActions, item.actionId);
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
  const { formatMessage } = useIntl();
  const { toggleNotification } = useNotification();
  const { state: locationState } = useLocation();
  const permissions = useTypedSelector((state2) => state2.admin_app.permissions);
  const [apiToken, setApiToken] = React.useState(
    locationState?.apiToken?.accessKey ? {
      ...locationState.apiToken
    } : null
  );
  const { trackUsage } = useTracking();
  const setCurrentStep = useGuidedTour("EditView", (state2) => state2.setCurrentStep);
  const {
    allowedActions: { canCreate, canUpdate, canRegenerate }
  } = useRBAC(permissions.settings?.["api-tokens"]);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const match = useMatch("/settings/api-tokens/:id");
  const id = match?.params?.id;
  const isCreating = id === "create";
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidtionErrors
  } = useAPIErrorHandler();
  const navigate = useNavigate();
  const contentAPIPermissionsQuery = useGetPermissionsQuery();
  const contentAPIRoutesQuery = useGetRoutesQuery();
  React.useEffect(() => {
    if (contentAPIPermissionsQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentAPIPermissionsQuery.error)
      });
    }
  }, [contentAPIPermissionsQuery.error, formatAPIError, toggleNotification]);
  React.useEffect(() => {
    if (contentAPIRoutesQuery.error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(contentAPIRoutesQuery.error)
      });
    }
  }, [contentAPIRoutesQuery.error, formatAPIError, toggleNotification]);
  React.useEffect(() => {
    if (contentAPIPermissionsQuery.data) {
      dispatch({
        type: "UPDATE_PERMISSIONS_LAYOUT",
        value: contentAPIPermissionsQuery.data
      });
    }
  }, [contentAPIPermissionsQuery.data]);
  React.useEffect(() => {
    if (contentAPIRoutesQuery.data) {
      dispatch({
        type: "UPDATE_ROUTES",
        value: contentAPIRoutesQuery.data
      });
    }
  }, [contentAPIRoutesQuery.data]);
  React.useEffect(() => {
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
  React.useEffect(() => {
    trackUsage(isCreating ? "didAddTokenFromList" : "didEditTokenFromList", {
      tokenType: API_TOKEN_TYPE
    });
  }, [isCreating, trackUsage]);
  const { data, error, isLoading } = useGetAPITokenQuery(id, {
    skip: !id || isCreating || !!apiToken
  });
  React.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: formatAPIError(error)
      });
    }
  }, [error, formatAPIError, toggleNotification]);
  React.useEffect(() => {
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
  const [createToken] = useCreateAPITokenMutation();
  const [updateToken] = useUpdateAPITokenMutation();
  const handleSubmit = async (body, formik) => {
    trackUsage(isCreating ? "willCreateToken" : "willEditToken", {
      tokenType: API_TOKEN_TYPE
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
          if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
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
          tokenType: API_TOKEN_TYPE
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
          if (isBaseQueryError(res.error) && res.error.name === "ValidationError") {
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
          tokenType: API_TOKEN_TYPE
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
  const [hasChangedPermissions, setHasChangedPermissions] = React.useState(false);
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
    return /* @__PURE__ */ jsx(Page.Loading, {});
  }
  return /* @__PURE__ */ jsx(ApiTokenPermissionsProvider, { value: providerValue, children: /* @__PURE__ */ jsxs(Page.Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      { name: "API Tokens" }
    ) }),
    /* @__PURE__ */ jsx(
      Formik,
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
          return /* @__PURE__ */ jsxs(Form, { children: [
            /* @__PURE__ */ jsx(
              FormHead,
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
            /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
              Boolean(apiToken?.name) && /* @__PURE__ */ jsx(TokenBox, { token: apiToken?.accessKey, tokenType: API_TOKEN_TYPE }),
              /* @__PURE__ */ jsx(
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
              /* @__PURE__ */ jsx(
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
  const permissions = useTypedSelector(
    (state) => state.admin_app.permissions.settings?.["api-tokens"].read
  );
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(EditView, {}) });
};

export { EditView, ProtectedEditView };
//# sourceMappingURL=EditViewPage-BYpd2eyV.mjs.map
