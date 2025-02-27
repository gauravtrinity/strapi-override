import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import * as React from 'react';
import { Field, Modal, CarouselInput, CarouselActions, IconButton, CarouselSlide, Box, Tabs, TextInput, Button, Flex, Typography, Card, CardHeader, CardAsset, CardBody, CardContent, CardTitle, CardSubtitle, CardBadge, Grid } from '@strapi/design-system';
import { Plus, ArrowClockwise, PlusCircle, Check } from '@strapi/icons';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { b as Layouts } from './index-CyEyTBzg.mjs';
import { c as useTracking, r as useConfiguration, p as useAppInfo, j as useRBAC, P as Page } from './Theme-6doxg5FV.mjs';
import { u as useEnterprise } from './useEnterprise-BGzVPL4w.mjs';
import { s as selectAdminPermissions } from './selectors-DXYlWdPm.mjs';
import { createContext } from '@radix-ui/react-context';
import axios, { AxiosError } from 'axios';
import { styled } from 'styled-components';

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

const [LogoInputContextProvider, useLogoInputContext] = createContext("LogoInput");
const LogoInput = ({
  canUpdate,
  customLogo,
  defaultLogo,
  hint,
  label,
  onChangeLogo
}) => {
  const [localImage, setLocalImage] = React.useState();
  const [currentStep, setCurrentStep] = React.useState();
  const { formatMessage } = useIntl();
  const handleClose = () => {
    setLocalImage(void 0);
    setCurrentStep(void 0);
  };
  return /* @__PURE__ */ jsx(
    Modal.Root,
    {
      open: !!currentStep,
      onOpenChange: (state) => {
        if (state === false) {
          handleClose();
        }
      },
      children: /* @__PURE__ */ jsxs(
        LogoInputContextProvider,
        {
          setLocalImage,
          localImage,
          goToStep: setCurrentStep,
          onClose: handleClose,
          children: [
            /* @__PURE__ */ jsx(
              CarouselInput,
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
                actions: /* @__PURE__ */ jsxs(CarouselActions, { children: [
                  /* @__PURE__ */ jsx(Modal.Trigger, { children: /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      disabled: !canUpdate,
                      onClick: () => setCurrentStep("upload"),
                      label: formatMessage({
                        id: "Settings.application.customization.carousel.change-action",
                        defaultMessage: "Change logo"
                      }),
                      children: /* @__PURE__ */ jsx(Plus, {})
                    }
                  ) }),
                  customLogo?.url && /* @__PURE__ */ jsx(
                    IconButton,
                    {
                      disabled: !canUpdate,
                      onClick: () => onChangeLogo(null),
                      label: formatMessage({
                        id: "Settings.application.customization.carousel.reset-action",
                        defaultMessage: "Reset logo"
                      }),
                      children: /* @__PURE__ */ jsx(ArrowClockwise, {})
                    }
                  )
                ] }),
                children: /* @__PURE__ */ jsx(
                  CarouselSlide,
                  {
                    label: formatMessage({
                      id: "Settings.application.customization.carousel-slide.label",
                      defaultMessage: "Logo slide"
                    }),
                    children: /* @__PURE__ */ jsx(
                      Box,
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
            /* @__PURE__ */ jsxs(Modal.Content, { children: [
              /* @__PURE__ */ jsx(Modal.Header, { children: /* @__PURE__ */ jsx(Modal.Title, { children: formatMessage(
                currentStep === "upload" ? {
                  id: "Settings.application.customization.modal.upload",
                  defaultMessage: "Upload logo"
                } : {
                  id: "Settings.application.customization.modal.pending",
                  defaultMessage: "Pending logo"
                }
              ) }) }),
              currentStep === "upload" ? /* @__PURE__ */ jsx(AddLogoDialog, {}) : /* @__PURE__ */ jsx(PendingLogoDialog, { onChangeLogo })
            ] })
          ]
        }
      )
    }
  );
};
const AddLogoDialog = () => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Tabs.Root, { variant: "simple", defaultValue: "computer", children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, children: /* @__PURE__ */ jsxs(
      Tabs.List,
      {
        "aria-label": formatMessage({
          id: "Settings.application.customization.modal.tab.label",
          defaultMessage: "How do you want to upload your assets?"
        }),
        children: [
          /* @__PURE__ */ jsx(Tabs.Trigger, { value: "computer", children: formatMessage({
            id: "Settings.application.customization.modal.upload.from-computer",
            defaultMessage: "From computer"
          }) }),
          /* @__PURE__ */ jsx(Tabs.Trigger, { value: "url", children: formatMessage({
            id: "Settings.application.customization.modal.upload.from-url",
            defaultMessage: "From url"
          }) })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Tabs.Content, { value: "computer", children: /* @__PURE__ */ jsx(ComputerForm, {}) }),
    /* @__PURE__ */ jsx(Tabs.Content, { value: "url", children: /* @__PURE__ */ jsx(URLForm, {}) })
  ] });
};
const URLForm = () => {
  const { formatMessage } = useIntl();
  const [logoUrl, setLogoUrl] = React.useState("");
  const [error, setError] = React.useState();
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
      const res = await axios.get(url.toString(), { responseType: "blob", timeout: 8e3 });
      const file = new File([res.data], res.config.url ?? "", {
        type: res.headers["content-type"]
      });
      const asset = await parseFileMetadatas(file);
      setLocalImage(asset);
      goToStep("pending");
    } catch (err) {
      if (err instanceof AxiosError) {
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
  return /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
    /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsxs(Field.Root, { error, name: "logo-url", children: [
      /* @__PURE__ */ jsx(Field.Label, { children: formatMessage({
        id: "Settings.application.customization.modal.upload.from-url.input-label",
        defaultMessage: "URL"
      }) }),
      /* @__PURE__ */ jsx(TextInput, { onChange: handleChange, value: logoUrl }),
      /* @__PURE__ */ jsx(Field.Error, {})
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }),
      /* @__PURE__ */ jsx(Button, { type: "submit", children: formatMessage({
        id: "Settings.application.customization.modal.upload.next",
        defaultMessage: "Next"
      }) })
    ] })
  ] });
};
const ComputerForm = () => {
  const { formatMessage } = useIntl();
  const [dragOver, setDragOver] = React.useState(false);
  const [fileError, setFileError] = React.useState();
  const inputRef = React.useRef(null);
  const id = React.useId();
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("form", { children: /* @__PURE__ */ jsx(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: /* @__PURE__ */ jsx(Field.Root, { name: id, error: fileError, children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 2, children: [
      /* @__PURE__ */ jsxs(
        Flex,
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
            /* @__PURE__ */ jsx(PlusCircle, { fill: "primary600", width: "6rem", height: "6rem", "aria-hidden": true }),
            /* @__PURE__ */ jsx(Box, { paddingTop: 3, paddingBottom: 5, children: /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "label", htmlFor: id, children: formatMessage({
              id: "Settings.application.customization.modal.upload.drag-drop",
              defaultMessage: "Drag and Drop here or"
            }) }) }),
            /* @__PURE__ */ jsx(Box, { position: "relative", children: /* @__PURE__ */ jsx(
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
            /* @__PURE__ */ jsx(Button, { type: "button", onClick: handleClick, children: formatMessage({
              id: "Settings.application.customization.modal.upload.cta.browse",
              defaultMessage: "Browse files"
            }) }),
            /* @__PURE__ */ jsx(Box, { paddingTop: 6, children: /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
              {
                id: "Settings.application.customization.modal.upload.file-validation",
                defaultMessage: "Max dimension: {dimension}x{dimension}, Max size: {size}KB"
              },
              { size: SIZE, dimension: DIMENSION }
            ) }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(Field.Error, {})
    ] }) }) }) }),
    /* @__PURE__ */ jsx(Modal.Footer, { children: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({ id: "app.components.Button.cancel", defaultMessage: "Cancel" }) }) })
  ] });
};
const FileInput = styled(Field.Input)`
  opacity: 0;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
const PendingLogoDialog = ({ onChangeLogo }) => {
  const { formatMessage } = useIntl();
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
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Modal.Body, { children: /* @__PURE__ */ jsxs(Box, { paddingLeft: 8, paddingRight: 8, paddingTop: 6, paddingBottom: 6, children: [
      /* @__PURE__ */ jsxs(Flex, { justifyContent: "space-between", paddingBottom: 6, children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "flex-start", children: [
          /* @__PURE__ */ jsx(Typography, { variant: "pi", fontWeight: "bold", children: formatMessage({
            id: "Settings.application.customization.modal.pending.title",
            defaultMessage: "Logo ready to upload"
          }) }),
          /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral500", children: formatMessage({
            id: "Settings.application.customization.modal.pending.subtitle",
            defaultMessage: "Manage the chosen logo before uploading it"
          }) })
        ] }),
        /* @__PURE__ */ jsx(Button, { onClick: handleGoBack, variant: "secondary", children: formatMessage({
          id: "Settings.application.customization.modal.pending.choose-another",
          defaultMessage: "Choose another logo"
        }) })
      ] }),
      /* @__PURE__ */ jsx(Box, { maxWidth: `18rem`, children: localImage?.url ? /* @__PURE__ */ jsx(ImageCardAsset, { asset: localImage }) : null })
    ] }) }),
    /* @__PURE__ */ jsxs(Modal.Footer, { children: [
      /* @__PURE__ */ jsx(Modal.Close, { children: /* @__PURE__ */ jsx(Button, { onClick: onClose, variant: "tertiary", children: formatMessage({
        id: "Settings.application.customization.modal.cancel",
        defaultMessage: "Cancel"
      }) }) }),
      /* @__PURE__ */ jsx(Button, { onClick: handleUpload, children: formatMessage({
        id: "Settings.application.customization.modal.pending.upload",
        defaultMessage: "Upload logo"
      }) })
    ] })
  ] });
};
const ImageCardAsset = ({ asset }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Card, { children: [
    /* @__PURE__ */ jsx(CardHeader, { children: /* @__PURE__ */ jsx(CardAsset, { size: "S", src: asset.url }) }),
    /* @__PURE__ */ jsxs(CardBody, { children: [
      /* @__PURE__ */ jsxs(CardContent, { children: [
        /* @__PURE__ */ jsx(CardTitle, { children: asset.name }),
        /* @__PURE__ */ jsx(CardSubtitle, { children: `${asset.ext?.toUpperCase()} - ${asset.width}✕${asset.height}` })
      ] }),
      /* @__PURE__ */ jsx(CardBadge, { children: formatMessage({
        id: "Settings.application.customization.modal.pending.card-badge",
        defaultMessage: "image"
      }) })
    ] })
  ] });
};

const AdminSeatInfoCE = () => null;
const ApplicationInfoPage = () => {
  const { trackUsage } = useTracking();
  const { formatMessage } = useIntl();
  const { logos: serverLogos, updateProjectSettings } = useConfiguration("ApplicationInfoPage");
  const [logos, setLogos] = React.useState({ menu: serverLogos.menu, auth: serverLogos.auth });
  const { settings } = useSelector(selectAdminPermissions);
  useAppInfo("ApplicationInfoPage", (state) => state.communityEdition);
  useAppInfo(
    "ApplicationInfoPage",
    (state) => state.latestStrapiReleaseTag
  );
  const nodeVersion = useAppInfo("ApplicationInfoPage", (state) => state.nodeVersion);
  useAppInfo("ApplicationInfoPage", (state) => state.shouldUpdateStrapi);
  const strapiVersion = useAppInfo("ApplicationInfoPage", (state) => state.strapiVersion);
  const AdminSeatInfo = useEnterprise(
    AdminSeatInfoCE,
    async () => (await import('./AdminSeatInfo-DxmSummy.mjs')).AdminSeatInfoEE
  );
  const {
    allowedActions: { canRead, canUpdate }
  } = useRBAC(settings ? settings["project-settings"] : {});
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
  React.useEffect(() => {
    setLogos({
      menu: serverLogos.menu,
      auth: serverLogos.auth
    });
  }, [serverLogos]);
  if (!AdminSeatInfo) {
    return null;
  }
  const isSaveDisabled = logos.auth.custom === serverLogos.auth.custom && logos.menu.custom === serverLogos.menu.custom;
  return /* @__PURE__ */ jsxs(Layouts.Root, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage(
      { id: "Settings.PageTitle", defaultMessage: "Settings - {name}" },
      {
        name: formatMessage({
          id: "Settings.application.header",
          defaultMessage: "Application"
        })
      }
    ) }),
    /* @__PURE__ */ jsx(Page.Main, { children: /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, children: [
      /* @__PURE__ */ jsx(
        Layouts.Header,
        {
          title: formatMessage({
            id: "Settings.application.title",
            defaultMessage: "Overview"
          }),
          subtitle: formatMessage({
            id: "Settings.application.description",
            defaultMessage: "Administration panel’s global information"
          }),
          primaryAction: canUpdate && /* @__PURE__ */ jsx(Button, { disabled: isSaveDisabled, type: "submit", startIcon: /* @__PURE__ */ jsx(Check, {}), children: formatMessage({ id: "global.save", defaultMessage: "Save" }) })
        }
      ),
      /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
        /* @__PURE__ */ jsxs(
          Flex,
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
              /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage({
                id: "global.details",
                defaultMessage: "Details"
              }) }),
              /* @__PURE__ */ jsxs(Grid.Root, { gap: 5, tag: "dl", children: [
                /* @__PURE__ */ jsxs(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "start", children: [
                  /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", tag: "dt", children: formatMessage({
                    id: "Settings.application.strapiVersion",
                    defaultMessage: "strapi version"
                  }) }),
                  /* @__PURE__ */ jsx(Flex, { gap: 3, direction: "column", alignItems: "start", tag: "dd", children: /* @__PURE__ */ jsxs(Typography, { children: [
                    "v",
                    strapiVersion
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxs(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "start", children: [
                  /* @__PURE__ */ jsx(Typography, { variant: "sigma", textColor: "neutral600", tag: "dt", children: formatMessage({
                    id: "Settings.application.node-version",
                    defaultMessage: "node version"
                  }) }),
                  /* @__PURE__ */ jsx(Typography, { tag: "dd", children: nodeVersion })
                ] }),
                /* @__PURE__ */ jsx(AdminSeatInfo, {})
              ] })
            ]
          }
        ),
        canRead && /* @__PURE__ */ jsxs(
          Box,
          {
            hasRadius: true,
            background: "neutral0",
            shadow: "tableShadow",
            paddingTop: 6,
            paddingBottom: 6,
            paddingRight: 7,
            paddingLeft: 7,
            children: [
              /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage({
                id: "Settings.application.customization",
                defaultMessage: "Customization"
              }) }),
              /* @__PURE__ */ jsx(Typography, { variant: "pi", textColor: "neutral600", children: formatMessage(
                {
                  id: "Settings.application.customization.size-details",
                  defaultMessage: "Max dimension: {dimension}×{dimension}, Max file size: {size}KB"
                },
                { dimension: DIMENSION, size: SIZE }
              ) }),
              /* @__PURE__ */ jsxs(Grid.Root, { paddingTop: 4, gap: 4, children: [
                /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
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
                /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, direction: "column", alignItems: "stretch", children: /* @__PURE__ */ jsx(
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

export { ApplicationInfoPage };
//# sourceMappingURL=ApplicationInfoPage-DrOhT9OV.mjs.map
