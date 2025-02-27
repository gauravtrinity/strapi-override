'use strict';

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const Theme = require('./Theme-DaGRg2qU.js');
const selectors = require('./selectors-BKYO5J5S.js');
const admin = require('./admin-DRnq5SAg.js');
const icons = require('@strapi/icons');
const yup = require('yup');
const index = require('./index-UB9JNjeZ.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const styledComponents = require('styled-components');
const useWebhooks = require('./useWebhooks-oYy_qRlY.js');

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
const yup__namespace = /*#__PURE__*/_interopNamespace(yup);

const EventsRoot = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  const label = formatMessage({
    id: "Settings.webhooks.form.events",
    defaultMessage: "Events"
  });
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { "aria-hidden": true, children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(StyledTable, { "aria-label": label, children })
  ] });
};
const StyledTable = styledComponents.styled(designSystem.RawTable)`
  tbody tr:nth-child(odd) {
    background: ${({ theme }) => theme.colors.neutral100};
  }

  thead th span {
    color: ${({ theme }) => theme.colors.neutral500};
  }

  td,
  th {
    padding-block-start: ${({ theme }) => theme.spaces[3]};
    padding-block-end: ${({ theme }) => theme.spaces[3]};
    width: 6%;
    vertical-align: middle;
  }

  tbody tr td:first-child {
    /**
     * Add padding to the start of the first column to avoid the checkbox appearing
     * too close to the edge of the table
     */
    padding-inline-start: ${({ theme }) => theme.spaces[2]};
  }
`;
const getCEHeaders = () => {
  const headers = [
    { id: "Settings.webhooks.events.create", defaultMessage: "Create" },
    { id: "Settings.webhooks.events.update", defaultMessage: "Update" },
    { id: "app.utils.delete", defaultMessage: "Delete" },
    { id: "app.utils.publish", defaultMessage: "Publish" },
    { id: "app.utils.unpublish", defaultMessage: "Unpublish" }
  ];
  return headers;
};
const EventsHeaders = ({ getHeaders = getCEHeaders }) => {
  const { formatMessage } = reactIntl.useIntl();
  const headers = getHeaders();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawThead, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.RawTr, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTh, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: formatMessage({
      id: "Settings.webhooks.event.select",
      defaultMessage: "Select event"
    }) }) }),
    headers.map((header) => {
      if (["app.utils.publish", "app.utils.unpublish"].includes(header?.id ?? "")) {
        return /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.RawTh,
          {
            title: formatMessage({
              id: "Settings.webhooks.event.publish-tooltip",
              defaultMessage: "This event only exists for content with draft & publish enabled"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) })
          },
          header.id
        );
      }
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTh, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", children: formatMessage(header) }) }, header.id);
    })
  ] }) });
};
const EventsBody = ({ providedEvents }) => {
  const events = providedEvents || getCEEvents();
  const { value = [], onChange } = index.useField("events");
  const inputName = "events";
  const inputValue = value;
  const disabledEvents = [];
  const formattedValue = inputValue.reduce((acc, curr) => {
    const key = curr.split(".")[0];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(curr);
    return acc;
  }, {});
  const handleSelect = (name, value2) => {
    const set = new Set(inputValue);
    if (value2) {
      set.add(name);
    } else {
      set.delete(name);
    }
    onChange(inputName, Array.from(set));
  };
  const handleSelectAll = (name, value2) => {
    const set = new Set(inputValue);
    if (value2) {
      events[name].forEach((event) => {
        if (!disabledEvents.includes(event)) {
          set.add(event);
        }
      });
    } else {
      events[name].forEach((event) => set.delete(event));
    }
    onChange(inputName, Array.from(set));
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTbody, { children: Object.entries(events).map(([event, value2]) => {
    return /* @__PURE__ */ jsxRuntime.jsx(
      EventsRow,
      {
        disabledEvents,
        name: event,
        events: value2,
        inputValue: formattedValue[event],
        handleSelect,
        handleSelectAll
      },
      event
    );
  }) });
};
const getCEEvents = () => {
  const entryEvents = [
    "entry.create",
    "entry.update",
    "entry.delete",
    "entry.publish",
    "entry.unpublish"
  ];
  return {
    entry: entryEvents,
    media: ["media.create", "media.update", "media.delete"]
  };
};
const EventsRow = ({
  disabledEvents = [],
  name,
  events = [],
  inputValue = [],
  handleSelect,
  handleSelectAll
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const enabledCheckboxes = events.filter((event) => !disabledEvents.includes(event));
  const hasSomeCheckboxSelected = inputValue.length > 0;
  const areAllCheckboxesSelected = inputValue.length === enabledCheckboxes.length;
  const onChangeAll = () => {
    const valueToSet = !areAllCheckboxesSelected;
    handleSelectAll(name, valueToSet);
  };
  const targetColumns = 5;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.RawTr, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Checkbox,
      {
        "aria-label": formatMessage({
          id: "global.select-all-entries",
          defaultMessage: "Select all entries"
        }),
        name,
        checked: hasSomeCheckboxSelected && !areAllCheckboxesSelected ? "indeterminate" : areAllCheckboxesSelected,
        onCheckedChange: onChangeAll,
        children: removeHyphensAndTitleCase(name)
      }
    ) }),
    events.map((event) => {
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { textAlign: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { width: "100%", justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Checkbox,
        {
          disabled: disabledEvents.includes(event),
          "aria-label": event,
          name: event,
          checked: inputValue.includes(event),
          onCheckedChange: (value) => handleSelect(event, !!value)
        }
      ) }) }, event);
    }),
    events.length < targetColumns && /* @__PURE__ */ jsxRuntime.jsx(designSystem.RawTd, { colSpan: targetColumns - events.length })
  ] });
};
const removeHyphensAndTitleCase = (str) => str.replace(/-/g, " ").split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
const Events = { Root: EventsRoot, Headers: EventsHeaders, Body: EventsBody, Row: EventsRow };

const EventTableCE = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs(Events.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Events.Headers, {}),
    /* @__PURE__ */ jsxRuntime.jsx(Events.Body, {})
  ] });
};

const AddHeaderButton = styledComponents.styled(designSystem.TextButton)`
  cursor: pointer;
`;
const HeadersInput = () => {
  const { formatMessage } = reactIntl.useIntl();
  const addFieldRow = index.useForm("HeadersInput", (state) => state.addFieldRow);
  const removeFieldRow = index.useForm("HeadersInput", (state) => state.removeFieldRow);
  const setFieldValue = index.useForm("HeadersInput", (state) => state.onChange);
  const { value = [] } = index.useField("headers");
  const removeRow = (index) => {
    if (value.length === 1) {
      setFieldValue("headers", [{ key: "", value: "" }]);
    } else {
      removeFieldRow("headers", index);
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 1, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
      id: "Settings.webhooks.form.headers",
      defaultMessage: "Headers"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { padding: 8, background: "neutral100", hasRadius: true, children: [
      value.map((val, index$1) => {
        return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, padding: 2, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
            HeaderCombobox,
            {
              name: `headers.${index$1}.key`,
              "aria-label": `row ${index$1 + 1} key`,
              label: formatMessage({
                id: "Settings.webhooks.key",
                defaultMessage: "Key"
              })
            }
          ) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-end", gap: 2, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { style: { flex: 1 }, children: /* @__PURE__ */ jsxRuntime.jsx(
              index.MemoizedStringInput,
              {
                name: `headers.${index$1}.value`,
                "aria-label": `row ${index$1 + 1} value`,
                label: formatMessage({
                  id: "Settings.webhooks.value",
                  defaultMessage: "Value"
                }),
                type: "string"
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.IconButton,
              {
                width: "4rem",
                height: "4rem",
                onClick: () => removeRow(index$1),
                color: "primary600",
                label: formatMessage(
                  {
                    id: "Settings.webhooks.headers.remove",
                    defaultMessage: "Remove header row {number}"
                  },
                  { number: index$1 + 1 }
                ),
                type: "button",
                children: /* @__PURE__ */ jsxRuntime.jsx(icons.Minus, { width: "0.8rem" })
              }
            )
          ] }) })
        ] }, `${index$1}-${JSON.stringify(val.key)}`);
      }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 4, children: /* @__PURE__ */ jsxRuntime.jsx(
        AddHeaderButton,
        {
          type: "button",
          onClick: () => {
            addFieldRow("headers", { key: "", value: "" });
          },
          startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {}),
          children: formatMessage({
            id: "Settings.webhooks.create.header",
            defaultMessage: "Create new header"
          })
        }
      ) })
    ] })
  ] });
};
const HeaderCombobox = ({ name, label, ...restProps }) => {
  const [options, setOptions] = React__namespace.useState([...HTTP_HEADERS]);
  const { value: headers } = index.useField("headers");
  const field = index.useField(name);
  React__namespace.useEffect(() => {
    const headerOptions = HTTP_HEADERS.filter(
      (key) => !headers?.some((header) => header.key !== field.value && header.key === key)
    );
    setOptions(headerOptions);
  }, [headers, field.value]);
  const handleChange = (value) => {
    field.onChange(name, value);
  };
  const handleCreateOption = (value) => {
    setOptions((prev) => [...prev, value]);
    handleChange(value);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { name, error: field.error, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: label }),
    /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.Combobox,
      {
        ...restProps,
        onClear: () => handleChange(""),
        onChange: handleChange,
        onCreateOption: handleCreateOption,
        placeholder: "",
        creatable: true,
        value: field.value,
        children: options.map((key) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.ComboboxOption, { value: key, children: key }, key))
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
  ] });
};
const HTTP_HEADERS = [
  "A-IM",
  "Accept",
  "Accept-Charset",
  "Accept-Encoding",
  "Accept-Language",
  "Accept-Datetime",
  "Access-Control-Request-Method",
  "Access-Control-Request-Headers",
  "Authorization",
  "Cache-Control",
  "Connection",
  "Content-Length",
  "Content-Type",
  "Cookie",
  "Date",
  "Expect",
  "Forwarded",
  "From",
  "Host",
  "If-Match",
  "If-Modified-Since",
  "If-None-Match",
  "If-Range",
  "If-Unmodified-Since",
  "Max-Forwards",
  "Origin",
  "Pragma",
  "Proxy-Authorization",
  "Range",
  "Referer",
  "TE",
  "User-Agent",
  "Upgrade",
  "Via",
  "Warning"
];

const TriggerContainer = ({ isPending, onCancel, response }) => {
  const { statusCode, message } = response ?? {};
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 5, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 4, style: { alignItems: "center" }, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({
      id: "Settings.webhooks.trigger.test",
      defaultMessage: "Test-trigger"
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 3, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(Status, { isPending, statusCode }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, direction: "column", alignItems: "stretch", children: !isPending ? /* @__PURE__ */ jsxRuntime.jsx(Message, { statusCode, message }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx("button", { onClick: onCancel, type: "button", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral400", children: formatMessage({
        id: "Settings.webhooks.trigger.cancel",
        defaultMessage: "cancel"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { fill: "neutral400", height: "1.2rem", width: "1.2rem" })
    ] }) }) }) })
  ] }) });
};
const Status = ({ isPending, statusCode }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (isPending || !statusCode) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(icons.Loader, { height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.pending", defaultMessage: "pending" }) })
    ] });
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(icons.Check, { fill: "success700", height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children: formatMessage({ id: "Settings.webhooks.trigger.success", defaultMessage: "success" }) })
    ] });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, alignItems: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, { fill: "danger700", height: "1.2rem", width: "1.2rem" }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { children: [
        formatMessage({ id: "Settings.error", defaultMessage: "error" }),
        " ",
        statusCode
      ] })
    ] });
  }
  return null;
};
const Message = ({ statusCode, message }) => {
  const { formatMessage } = reactIntl.useIntl();
  if (!statusCode) {
    return null;
  }
  if (statusCode >= 200 && statusCode < 300) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", ellipsis: true, children: formatMessage({
      id: "Settings.webhooks.trigger.success.label",
      defaultMessage: "Trigger succeeded"
    }) }) });
  }
  if (statusCode >= 300) {
    return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { maxWidth: `25rem`, justifyContent: "flex-end", title: message, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { ellipsis: true, textColor: "neutral600", children: message }) }) });
  }
  return null;
};

const WebhookForm = ({
  handleSubmit,
  triggerWebhook,
  isCreating,
  isTriggering,
  triggerResponse,
  data
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const [showTriggerResponse, setShowTriggerResponse] = React__namespace.useState(false);
  const EventTable = useEnterprise.useEnterprise(
    EventTableCE,
    async () => (await Promise.resolve().then(() => require('./EventsTable-DVErtAAi.js'))).EventsTableEE
  );
  const mapHeaders = (headers) => {
    if (!Object.keys(headers).length) {
      return [{ key: "", value: "" }];
    }
    return Object.entries(headers).map(([key, value]) => ({ key, value }));
  };
  if (!EventTable) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    index.Form,
    {
      initialValues: {
        name: data?.name || "",
        url: data?.url || "",
        headers: mapHeaders(data?.headers || {}),
        events: data?.events || []
      },
      method: isCreating ? "POST" : "PUT",
      onSubmit: handleSubmit,
      validationSchema: makeWebhookValidationSchema({ formatMessage }),
      children: ({ isSubmitting, modified }) => /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          index.Layouts.Header,
          {
            primaryAction: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 2, children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  onClick: () => {
                    triggerWebhook();
                    setShowTriggerResponse(true);
                  },
                  variant: "tertiary",
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Play, {}),
                  disabled: isCreating || isTriggering,
                  children: formatMessage({
                    id: "Settings.webhooks.trigger",
                    defaultMessage: "Trigger"
                  })
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx(
                designSystem.Button,
                {
                  startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
                  type: "submit",
                  disabled: !modified,
                  loading: isSubmitting,
                  children: formatMessage({
                    id: "global.save",
                    defaultMessage: "Save"
                  })
                }
              )
            ] }),
            title: isCreating ? formatMessage({
              id: "Settings.webhooks.create",
              defaultMessage: "Create a webhook"
            }) : data?.name,
            navigationAction: /* @__PURE__ */ jsxRuntime.jsx(index.BackButton, { fallback: "../webhooks" })
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, children: [
          showTriggerResponse && /* @__PURE__ */ jsxRuntime.jsx(
            TriggerContainer,
            {
              isPending: isTriggering,
              response: triggerResponse,
              onCancel: () => setShowTriggerResponse(false)
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { background: "neutral0", padding: 8, shadow: "filterShadow", hasRadius: true, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Root, { gap: 6, children: [
              {
                label: formatMessage({
                  id: "global.name",
                  defaultMessage: "Name"
                }),
                name: "name",
                required: true,
                size: 6,
                type: "string"
              },
              {
                label: formatMessage({
                  id: "Settings.roles.form.input.url",
                  defaultMessage: "Url"
                }),
                name: "url",
                required: true,
                size: 12,
                type: "string"
              }
            ].map(({ size, ...field }) => /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Grid.Item,
              {
                col: size,
                direction: "column",
                alignItems: "stretch",
                children: /* @__PURE__ */ jsxRuntime.jsx(index.MemoizedInputRenderer, { ...field })
              },
              field.name
            )) }),
            /* @__PURE__ */ jsxRuntime.jsx(HeadersInput, {}),
            /* @__PURE__ */ jsxRuntime.jsx(EventTable, {})
          ] }) })
        ] }) })
      ] })
    }
  );
};
const NAME_REGEX = /(^$)|(^[A-Za-z][_0-9A-Za-z ]*$)/;
const URL_REGEX = /(^$)|((https?:\/\/.*)(d*)\/?(.*))/;
const makeWebhookValidationSchema = ({ formatMessage }) => yup__namespace.object().shape({
  name: yup__namespace.string().nullable().required(
    formatMessage({
      id: "Settings.webhooks.validation.name.required",
      defaultMessage: "Name is required"
    })
  ).matches(
    NAME_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.name.regex",
      defaultMessage: "The name must start with a letter and only contain letters, numbers, spaces and underscores"
    })
  ),
  url: yup__namespace.string().nullable().required(
    formatMessage({
      id: "Settings.webhooks.validation.url.required",
      defaultMessage: "Url is required"
    })
  ).matches(
    URL_REGEX,
    formatMessage({
      id: "Settings.webhooks.validation.url.regex",
      defaultMessage: "The value must be a valid Url"
    })
  ),
  headers: yup__namespace.lazy((array) => {
    const baseSchema = yup__namespace.array();
    if (array.length === 1) {
      const { key, value } = array[0];
      if (!key && !value) {
        return baseSchema;
      }
    }
    return baseSchema.of(
      yup__namespace.object().shape({
        key: yup__namespace.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.key",
            defaultMessage: "Key is required"
          })
        ).nullable(),
        value: yup__namespace.string().required(
          formatMessage({
            id: "Settings.webhooks.validation.value",
            defaultMessage: "Value is required"
          })
        ).nullable()
      })
    );
  }),
  events: yup__namespace.array()
});

const cleanData = (data) => ({
  ...data,
  headers: data.headers.reduce((acc, { key, value }) => {
    if (key !== "") {
      acc[key] = value;
    }
    return acc;
  }, {})
});
const EditPage = () => {
  const { formatMessage } = reactIntl.useIntl();
  const match = reactRouterDom.useMatch("/settings/webhooks/:id");
  const id = match?.params.id;
  const isCreating = id === "create";
  const navigate = reactRouterDom.useNavigate();
  const { toggleNotification } = Theme.useNotification();
  const {
    _unstableFormatAPIError: formatAPIError,
    _unstableFormatValidationErrors: formatValidationErrors
  } = Theme.useAPIErrorHandler();
  const stableFormatAPIError = React__namespace.useCallback(formatAPIError, []);
  const [isTriggering, setIsTriggering] = React__namespace.useState(false);
  const [triggerResponse, setTriggerResponse] = React__namespace.useState();
  const { isLoading, webhooks, error, createWebhook, updateWebhook, triggerWebhook } = useWebhooks.useWebhooks(
    { id },
    {
      skip: isCreating
    }
  );
  React__namespace.useEffect(() => {
    if (error) {
      toggleNotification({
        type: "danger",
        message: stableFormatAPIError(error)
      });
    }
  }, [error, toggleNotification, stableFormatAPIError]);
  const handleTriggerWebhook = async () => {
    try {
      setIsTriggering(true);
      const res = await triggerWebhook(id);
      if ("error" in res) {
        toggleNotification({
          type: "danger",
          message: formatAPIError(res.error)
        });
        return;
      }
      setTriggerResponse(res.data);
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    } finally {
      setIsTriggering(false);
    }
  };
  const handleSubmit = async (data, helpers) => {
    try {
      if (isCreating) {
        const res = await createWebhook(cleanData(data));
        if ("error" in res) {
          if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            helpers.setErrors(formatValidationErrors(res.error));
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
          message: formatMessage({ id: "Settings.webhooks.created" })
        });
        navigate(`../webhooks/${res.data.id}`, { replace: true });
      } else {
        const res = await updateWebhook({ id, ...cleanData(data) });
        if ("error" in res) {
          if (admin.isBaseQueryError(res.error) && res.error.name === "ValidationError") {
            helpers.setErrors(formatValidationErrors(res.error));
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
          message: formatMessage({ id: "notification.form.success.fields" })
        });
      }
    } catch {
      toggleNotification({
        type: "danger",
        message: formatMessage({
          id: "notification.error",
          defaultMessage: "An error occurred"
        })
      });
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  const [webhook] = webhooks ?? [];
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: "Webhooks"
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      WebhookForm,
      {
        data: webhook,
        handleSubmit,
        triggerWebhook: handleTriggerWebhook,
        isCreating,
        isTriggering,
        triggerResponse
      }
    )
  ] });
};
const ProtectedEditPage = () => {
  const permissions = Theme.useTypedSelector(selectors.selectAdminPermissions);
  return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Protect, { permissions: permissions.settings?.webhooks.update, children: /* @__PURE__ */ jsxRuntime.jsx(EditPage, {}) });
};

const EditPage$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  EditPage,
  ProtectedEditPage
}, Symbol.toStringTag, { value: 'Module' }));

exports.EditPage = EditPage;
exports.EditPage$1 = EditPage$1;
exports.Events = Events;
//# sourceMappingURL=EditPage-MgWvoG8u.js.map
