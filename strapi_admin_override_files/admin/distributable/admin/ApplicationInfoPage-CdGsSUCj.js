'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const icons = require('@strapi/icons');
const reactIntl = require('react-intl');
const reactRedux = require('react-redux');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const selectors = require('./selectors-BKYO5J5S.js');
const reactContext = require('@radix-ui/react-context');
const axios = require('axios');
const styledComponents = require('styled-components');

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
const axios__default = /*#__PURE__*/_interopDefault(axios);

const DIMENSION = 750;
const SIZE = 100;
const ACCEPTED_FORMAT = ["image/jpeg", "image/png", "image/svg+xml"];

const FILE_FORMAT_ERROR_MESSAGE = {
  id: "Settings.application.customization.modal.upload.error-format",
  defaultMessage: "Wrong format uploaded (accepted formats only: jpeg, jpg, png, svg)."
};
const FILE_SIZING_ERROR_MESSAGE = {
  id: "Settings.application.customization.modal.upload.error-size",
  defaultMessage: "The file uploaded is too large (max dimension: {dimension}x{dimension}, max file size: {size}KB)"
};
const parseFileMetadatas = async (file) => {
  const isFormatAuthorized = ACCEPTED_FORMAT.includes(file.type);
  if (!isFormatAuthorized) {
    throw new ParsingFileError("File format", FILE_FORMAT_ERROR_MESSAGE);
  }
  const fileDimensions = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
  const areDimensionsAuthorized = fileDimensions.width <= DIMENSION && fileDimensions.height <= DIMENSION;
  if (!areDimensionsAuthorized) {
    throw new ParsingFileError("File sizing", FILE_SIZING_ERROR_MESSAGE);
  }
  const asset = {
    ext: file.name.split(".").pop(),
    size: file.size / 1e3,
    name: file.name,
    url: URL.createObjectURL(file),
    rawFile: file,
    width: fileDimensions.width,
    height: fileDimensions.height
  };
  const isSizeAuthorized = asset.size <= SIZE;
  if (!isSizeAuthorized) {
    throw new ParsingFileError("File sizing", FILE_SIZING_ERROR_MESSAGE);
  }
  return asset;
};
class ParsingFileError extends Error {
  displayMessage;
  constructor(message, displayMessage, options) {
    super(message, options);
    this.displayMessage = displayMessage;
  }
}

const [LogoInputContextProvider, useLogoInputContext] = reactContext.createContext("LogoInput");
const LogoInput = ({
  canUpdate,
  customLogo,
  defaultLogo,
  hint,
  label,
  onChangeLogo
}) => {
  const [localImage, setLocalImage] = React__namespace.useState();
  const [currentStep, setCurrentStep] = React__namespace.useState();
  const { formatMessage } = reactIntl.useIntl();
  const handleClose = () => {
    setLocalImage(void 0);
    setCurrentStep(void 0);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(
    designSystem.Modal.Root,
    {
      open: !!currentStep,
      onOpenChange: (state) => {
        if (state === false) {
          handleClose();
        }
      },
      children: /* @__PURE__ */ jsxRuntime.jsxs(
        LogoInputContextProvider,
        {
          setLocalImage,
          localImage,
          goToStep: setCurrentStep,
          onClose: handleClose,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.CarouselInput,
              {
                label,
                selectedSlide: 0,
                hint,
                previousLabel: "",
                nextLabel: "",
                onNext: () => {
                },
                onPrevious: () => {
                },
                secondaryLabel: customLogo?.name || "logo.png",
                actions: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CarouselActions, { children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.IconButton,
                    {
                      disabled: !canUpdate,
                      onClick: () => setCurrentStep("upload"),
                      label: formatMessage({
                        id: "Settings.application.customization.carousel.change-action",
                        defaultMessage: "Change logo"
                      }),
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.Plus, {})
                    }
                  ) }),
                  customLogo?.url && /* @__PURE__ */ jsxRuntime.jsx(
                    designSystem.IconButton,
                    {
                      disabled: !canUpdate,
                      onClick: () => onChangeLogo(null),
                      label: formatMessage({
                        id: "Settings.application.customization.carousel.reset-action",
                        defaultMessage: "Reset logo"
                      }),
                      children: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowClockwise, {})
                    }
                  )
                ] }),
                children: /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.CarouselSlide,
                  {
                    label: formatMessage({
                      id: "Settings.application.customization.carousel-slide.label",
                      defaultMessage: "Logo slide"
                    }),
                    children: /* @__PURE__ */ jsxRuntime.jsx(
                      designSystem.Box,
                      {
                        maxHeight: "40%",
                        maxWidth: "40%",
                        tag: "img",
                        src: customLogo?.url || defaultLogo,
                        alt: formatMessage({
                          id: "Settings.application.customization.carousel.title",
                          defaultMessage: "Logo"
                        })
                      }
                    )
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Content, { children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Header, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Title, { children: formatMessage(
                currentStep === "upload" ? {
                  id: "Settings.application.customization.modal.upload",
                  defaultMessage: "Upload logo"
                } : {
                  id: "Settings.application.customization.modal.pending",
                  defaultMessage: "Pending logo"
                }
              ) }) }),
              currentStep === "upload" ? /* @__PURE__ */ jsxRuntime.jsx(AddLogoDialog, {}) : /* @__PURE__ */ jsxRuntime.jsx(PendingLogoDialog, { onChangeLogo })
            ] })
          ]
        }
      )
    }
  );
};
const AddLogoDialog = () => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tabs.Root, { variant: "simple", defaultValue: "computer", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, children: /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Tabs.List,
      {
        "aria-label": formatMessage({
          id: "Settings.application.customization.modal.tab.label",
          defaultMessage: "How do you want to upload your assets?"
        }),
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "computer", children: formatMessage({
            id: "Settings.application.customization.modal.upload.from-computer",
            defaultMessage: "From computer"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Trigger, { value: "url", children: formatMessage({
            id: "Settings.application.customization.modal.upload.from-url",
            defaultMessage: "From url"
          }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "computer", children: /* @__PURE__ */ jsxRuntime.jsx(ComputerForm, {}) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tabs.Content, { value: "url", children: /* @__PURE__ */ jsxRuntime.jsx(URLForm, {}) })
  ] });
};
const URLForm = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [logoUrl, setLogoUrl] = React__namespace.useState("");
  const [error, setError] = React__namespace.useState();
  const { setLocalImage, goToStep, onClose } = useLogoInputContext("URLForm");
  const handleChange = (e) => {
    setLogoUrl(e.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const url = data.get("logo-url");
    if (!url) {
      return;
    }
    try {
      const res = await axios__default.default.get(url.toString(), { responseType: "blob", timeout: 8e3 });
      const file = new File([res.data], res.config.url ?? "", {
        type: res.headers["content-type"]
      });
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof axios.AxiosError) {
        setError(
          formatMessage({
            id: "Settings.application.customization.modal.upload.error-network",
            defaultMessage: "Network error"
          })
        );
      } else if (err instanceof ParsingFileError) {
        setError(formatMessage(err.displayMessage, { size: SIZE, dimension: DIMENSION }));
      } else {
        throw err;
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Field.Root, { error, name: "logo-url", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Label, { children: formatMessage({
        id: "Settings.application.customization.modal.upload.from-url.input-label",
        defaultMessage: "URL"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.TextInput, { onChange: handleChange, value: logoUrl }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "submit", children: formatMessage({
        id: "Settings.application.customization.modal.upload.next",
        defaultMessage: "Next"
      }) })
    ] })
  ] });
};
const ComputerForm = () => {
  const { formatMessage } = reactIntl.useIntl();
  const [dragOver, setDragOver] = React__namespace.useState(false);
  const [fileError, setFileError] = React__namespace.useState();
  const inputRef = React__namespace.useRef(null);
  const id = React__namespace.useId();
  const { setLocalImage, goToStep, onClose } = useLogoInputContext("ComputerForm");
  const handleDragEnter = () => {
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };
  const handleChange = async () => {
    handleDragLeave();
    if (!inputRef.current.files) {
      return;
    }
    const [file] = inputRef.current.files;
    try {
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof ParsingFileError) {
        setFileError(formatMessage(err.displayMessage, { size: SIZE, dimension: DIMENSION }));
        inputRef.current.focus();
      } else {
        throw err;
      }
    }
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx("form", { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Root, { name: id, error: fileError, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          paddingTop: 9,
          paddingBottom: 7,
          hasRadius: true,
          justifyContent: "center",
          direction: "column",
          background: dragOver ? "primary100" : "neutral100",
          borderColor: dragOver ? "primary500" : fileError ? "danger600" : "neutral300",
          borderStyle: "dashed",
          borderWidth: "1px",
          position: "relative",
          onDragEnter: handleDragEnter,
          onDragLeave: handleDragLeave,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(icons.PlusCircle, { fill: "primary600", width: "6rem", height: "6rem", "aria-hidden": true }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "label", htmlFor: id, children: formatMessage({
              id: "Settings.application.customization.modal.upload.drag-drop",
              defaultMessage: "Drag and Drop here or"
            }) }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { position: "relative", children: /* @__PURE__ */ jsxRuntime.jsx(
              FileInput,
              {
                accept: ACCEPTED_FORMAT.join(", "),
                type: "file",
                name: "files",
                tabIndex: -1,
                onChange: handleChange,
                ref: inputRef,
                id
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { type: "button", onClick: handleClick, children: formatMessage({
              id: "Settings.application.customization.modal.upload.cta.browse",
              defaultMessage: "Browse files"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 6, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.modal.upload.file-validation",
                defaultMessage: "Max dimension: {dimension}x{dimension}, Max size: {size}KB"
              },
              { size: SIZE, dimension: DIMENSION }
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Field.Error, {})
    ] }) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Footer, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) })
  ] });
};
const FileInput = styledComponents.styled(designSystem.Field.Input)`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const PendingLogoDialog = ({ onChangeLogo }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { localImage, setLocalImage, goToStep, onClose } = useLogoInputContext("PendingLogoDialog");
  const handleGoBack = () => {
    setLocalImage(void 0);
    goToStep("upload");
  };
  const handleUpload = () => {
    if (localImage) {
      onChangeLogo(localImage);
    }
    onClose();
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Body, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { justifyContent: "space-between", paddingBottom: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "flex-start", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "Settings.application.customization.modal.pending.title",
            defaultMessage: "Logo ready to upload"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral500", children: formatMessage({
            id: "Settings.application.customization.modal.pending.subtitle",
            defaultMessage: "Manage the chosen logo before uploading it"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleGoBack, variant: "secondary", children: formatMessage({
          id: "Settings.application.customization.modal.pending.choose-another",
          defaultMessage: "Choose another logo"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { maxWidth: `18rem`, children: localImage?.url ? /* @__PURE__ */ jsxRuntime.jsx(ImageCardAsset, { asset: localImage }) : null })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Modal.Footer, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Modal.Close, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
        id: "Settings.application.customization.modal.cancel",
        defaultMessage: "Cancel"
      }) }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { onClick: handleUpload, children: formatMessage({
        id: "Settings.application.customization.modal.pending.upload",
        defaultMessage: "Upload logo"
      }) })
    ] })
  ] });
};
const ImageCardAsset = ({ asset }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Card, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardHeader, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardAsset, { size: "S", src: asset.url }) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardBody, { children: [
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.CardContent, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardTitle, { children: asset.name }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardSubtitle, { children: `${asset.ext?.toUpperCase()} - ${asset.width}✕${asset.height}` })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.CardBadge, { children: formatMessage({
        id: "Settings.application.customization.modal.pending.card-badge",
        defaultMessage: "image"
      }) })
    ] })
  ] });
};

const AdminSeatInfoCE = () => null;
const ApplicationInfoPage = () => {
  const { trackUsage } = Theme.useTracking();
  const { formatMessage } = reactIntl.useIntl();
  const { logos: serverLogos, updateProjectSettings } = Theme.useConfiguration("ApplicationInfoPage");
  const [logos, setLogos] = React__namespace.useState({ menu: serverLogos.menu, auth: serverLogos.auth });
  const { settings } = reactRedux.useSelector(selectors.selectAdminPermissions);
  Theme.useAppInfo("ApplicationInfoPage", (state) => state.communityEdition);
  Theme.useAppInfo(
    "ApplicationInfoPage",
    (state) => state.latestStrapiReleaseTag
  );
  const nodeVersion = Theme.useAppInfo("ApplicationInfoPage", (state) => state.nodeVersion);
  Theme.useAppInfo("ApplicationInfoPage", (state) => state.shouldUpdateStrapi);
  const strapiVersion = Theme.useAppInfo("ApplicationInfoPage", (state) => state.strapiVersion);
  const AdminSeatInfo = useEnterprise.useEnterprise(
    AdminSeatInfoCE,
    async () => (await Promise.resolve().then(() => require('./AdminSeatInfo-CguI3ov-.js'))).AdminSeatInfoEE
  );
  const {
    allowedActions: { canRead, canUpdate }
  } = Theme.useRBAC(settings ? settings["project-settings"] : {});
  const handleSubmit = (e) => {
    e.preventDefault();
    updateProjectSettings({
      authLogo: logos.auth.custom ?? null,
      menuLogo: logos.menu.custom ?? null
    });
  };
  const handleChangeLogo = (logo) => (newLogo) => {
    if (newLogo === null) {
      trackUsage("didClickResetLogo", {
        logo
      });
    }
    setLogos((prev) => ({
      ...prev,
      [logo]: {
        ...prev[logo],
        custom: newLogo
      }
    }));
  };
  React__namespace.useEffect(() => {
    setLogos({
      menu: serverLogos.menu,
      auth: serverLogos.auth
    });
  }, [serverLogos]);
  if (!AdminSeatInfo) {
    return null;
  }
  const isSaveDisabled = logos.auth.custom === serverLogos.auth.custom && logos.menu.custom === serverLogos.menu.custom;
  return /* @__PURE__ */ jsxRuntime.jsxs(index.Layouts.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: "Settings.application.header",
          defaultMessage: "Application"
        })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Main, { children: /* @__PURE__ */ jsxRuntime.jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        index.Layouts.Header,
        {
          title: formatMessage({
            id: "Settings.application.title",
            defaultMessage: "Overview"
          }),
          subtitle: formatMessage({
            id: "Settings.application.description",
            defaultMessage: "Administration panel’s global information"
          }),
          primaryAction: canUpdate && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { disabled: isSaveDisabled, type: "submit", startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}), children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
        /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Flex,
          {
            direction: "column",
            alignItems: "stretch",
            gap: 4,
            hasRadius: true,
            background: "neutral0",
            shadow: "tableShadow",
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 7,
            paddingLeft: 7,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h3", children: formatMessage({
                id: "global.details",
                defaultMessage: "Details"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, tag: "dl", children: [
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", tag: "dt", children: formatMessage({
                    id: "Settings.application.strapiVersion",
                    defaultMessage: "strapi version"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { gap: 3, direction: "column", alignItems: "start", tag: "dd", children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Typography, { children: [
                    "v",
                    strapiVersion
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "start", children: [
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "neutral600", tag: "dt", children: formatMessage({
                    id: "Settings.application.node-version",
                    defaultMessage: "node version"
                  }) }),
                  /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "dd", children: nodeVersion })
                ] }),
                /* @__PURE__ */ jsxRuntime.jsx(AdminSeatInfo, {})
              ] })
            ]
          }
        ),
        canRead && /* @__PURE__ */ jsxRuntime.jsxs(
          designSystem.Box,
          {
            hasRadius: true,
            background: "neutral0",
            shadow: "tableShadow",
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 7,
            paddingLeft: 7,
            children: [
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h3", children: formatMessage({
                id: "Settings.application.customization",
                defaultMessage: "Customization"
              }) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
                {
                  id: "Settings.application.customization.size-details",
                  defaultMessage: "Max dimension: {dimension}×{dimension}, Max file size: {size}KB"
                },
                { dimension: DIMENSION, size: SIZE }
              ) }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { paddingTop: 4, gap: 4, children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
                  LogoInput,
                  {
                    canUpdate,
                    customLogo: logos.menu.custom,
                    defaultLogo: logos.menu.default,
                    hint: formatMessage({
                      id: "Settings.application.customization.menu-logo.carousel-hint",
                      defaultMessage: "Replace the logo in the main navigation"
                    }),
                    label: formatMessage({
                      id: "Settings.application.customization.carousel.menu-logo.title",
                      defaultMessage: "Menu logo"
                    }),
                    onChangeLogo: handleChangeLogo("menu")
                  }
                ) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsxRuntime.jsx(
                  LogoInput,
                  {
                    canUpdate,
                    customLogo: logos.auth.custom,
                    defaultLogo: logos.auth.default,
                    hint: formatMessage({
                      id: "Settings.application.customization.auth-logo.carousel-hint",
                      defaultMessage: "Replace the logo in the authentication pages"
                    }),
                    label: formatMessage({
                      id: "Settings.application.customization.carousel.auth-logo.title",
                      defaultMessage: "Auth logo"
                    }),
                    onChangeLogo: handleChangeLogo("auth")
                  }
                ) })
              ] })
            ]
          }
        )
      ] }) })
    ] }) })
  ] });
};

exports.ApplicationInfoPage = ApplicationInfoPage;
//# sourceMappingURL=ApplicationInfoPage-CdGsSUCj.js.map
