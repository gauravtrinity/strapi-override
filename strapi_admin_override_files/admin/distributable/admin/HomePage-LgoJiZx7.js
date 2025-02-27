'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const designSystem = require('@strapi/design-system');
const reactIntl = require('react-intl');
const index = require('./index-UB9JNjeZ.js');
const Theme = require('./Theme-DaGRg2qU.js');
const React = require('react');
const admin = require('./admin-DRnq5SAg.js');
const useEnterprise = require('./useEnterprise-ijNnK53J.js');
const icons = require('@strapi/icons');
const reactRouterDom = require('react-router-dom');
const styledComponents = require('styled-components');
const RelativeTime = require('./RelativeTime-DPLD3wf-.js');
const symbols = require('@strapi/icons/symbols');
const Ornaments = require('./Ornaments-CID1aaLv.js');

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

const homepageService = admin.adminApi.enhanceEndpoints({
  // TODO: remove when the CM widgets are moved to the CM package, the type already exists there
  addTagTypes: ["RecentDocumentList"]
}).injectEndpoints({
  endpoints: (builder) => ({
    getRecentDocuments: builder.query({
      query: (params) => `/admin/homepage/recent-documents?action=${params.action}`,
      transformResponse: (response) => response.data,
      providesTags: (res, _err, { action }) => [
        { type: "RecentDocumentList", id: action }
      ]
    })
  })
});
const { useGetRecentDocumentsQuery } = homepageService;

const Root = ({ title, icon = icons.PuzzlePiece, children }) => {
  const { formatMessage } = reactIntl.useIntl();
  const id = React__namespace.useId();
  const Icon = icon;
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      width: "100%",
      hasRadius: true,
      direction: "column",
      alignItems: "flex-start",
      background: "neutral0",
      borderColor: "neutral150",
      shadow: "tableShadow",
      tag: "section",
      gap: 4,
      padding: 6,
      "aria-labelledby": id,
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "row", alignItems: "center", gap: 2, tag: "header", children: [
          /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: "neutral500", "aria-hidden": true }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral500", variant: "sigma", tag: "h2", id, children: formatMessage(title) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { width: "100%", height: "261px", overflow: "auto", tag: "main", children })
      ]
    }
  );
};
const Loading = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { height: "100%", justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, { children: children ?? formatMessage({
    id: "HomePage.widget.loading",
    defaultMessage: "Loading widget content"
  }) }) });
};
const Error = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "100%", direction: "column", justifyContent: "center", alignItems: "center", gap: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(icons.WarningCircle, { width: "3.2rem", height: "3.2rem", fill: "danger600" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", children: formatMessage({
      id: "global.error",
      defaultMessage: "Something went wrong"
    }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children: children ?? formatMessage({
      id: "HomePage.widget.error",
      defaultMessage: "Couldn't load widget content."
    }) })
  ] });
};
const NoData = ({ children }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { height: "100%", direction: "column", justifyContent: "center", alignItems: "center", gap: 6, children: [
    /* @__PURE__ */ jsxRuntime.jsx(symbols.EmptyDocuments, { width: "16rem", height: "8.8rem" }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children: children ?? formatMessage({
      id: "HomePage.widget.no-data",
      defaultMessage: "No content found."
    }) })
  ] });
};
const Widget = {
  Root,
  Loading,
  Error,
  NoData
};

const CellTypography = styledComponents.styled(designSystem.Typography).attrs({ maxWidth: "14.4rem", display: "block" })`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DocumentStatus = ({ status = "draft" }) => {
  const statusVariant = status === "draft" ? "secondary" : status === "published" ? "success" : "alternative";
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Status, { variant: statusVariant, size: "XS", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { tag: "span", variant: "omega", fontWeight: "bold", children: formatMessage({
    id: `content-manager.containers.List.${status}`,
    defaultMessage: Theme.capitalise(status)
  }) }) });
};
const RecentDocumentsTable = ({ documents }) => {
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  const navigate = reactRouterDom.useNavigate();
  const getEditViewLink = (document) => {
    const isSingleType = document.kind === "singleType";
    const kindPath = isSingleType ? "single-types" : "collection-types";
    const queryParams = document.locale ? `?plugins[i18n][locale]=${document.locale}` : "";
    return `/content-manager/${kindPath}/${document.contentTypeUid}${isSingleType ? "" : "/" + document.documentId}${queryParams}`;
  };
  const handleRowClick = (document) => () => {
    trackUsage("willEditEntryFromHome");
    const link = getEditViewLink(document);
    navigate(link);
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Table, { colCount: 5, rowCount: documents?.length ?? 0, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tbody, { children: documents?.map((document) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Tr, { onClick: handleRowClick(document), cursor: "pointer", children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(CellTypography, { title: document.title, variant: "omega", textColor: "neutral800", children: document.title }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(CellTypography, { variant: "omega", textColor: "neutral600", children: document.kind === "singleType" ? formatMessage({
      id: "content-manager.widget.last-edited.single-type",
      defaultMessage: "Single-Type"
    }) : formatMessage({
      id: document.contentTypeDisplayName,
      defaultMessage: document.contentTypeDisplayName
    }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { display: "inline-block", children: document.status ? /* @__PURE__ */ jsxRuntime.jsx(DocumentStatus, { status: document.status }) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", "aria-hidden": true, children: "-" }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children: /* @__PURE__ */ jsxRuntime.jsx(RelativeTime.RelativeTime, { timestamp: new Date(document.updatedAt) }) }) }),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { display: "inline-block", children: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.IconButton,
      {
        tag: reactRouterDom.Link,
        to: getEditViewLink(document),
        onClick: () => trackUsage("willEditEntryFromHome"),
        label: formatMessage({
          id: "content-manager.actions.edit.label",
          defaultMessage: "Edit"
        }),
        variant: "ghost",
        children: /* @__PURE__ */ jsxRuntime.jsx(icons.Pencil, {})
      }
    ) }) })
  ] }, document.documentId)) }) });
};
const LastEditedWidgetContent = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { data, isLoading, error } = useGetRecentDocumentsQuery({ action: "update" });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.Loading, {});
  }
  if (error || !data) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.Error, {});
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.NoData, { children: formatMessage({
      id: "content-manager.widget.last-edited.no-data",
      defaultMessage: "No edited entries"
    }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(RecentDocumentsTable, { documents: data });
};
const LastEditedWidget = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Widget.Root,
    {
      title: {
        id: "content-manager.widget.last-edited.title",
        defaultMessage: "Last edited entries"
      },
      icon: icons.Pencil,
      children: /* @__PURE__ */ jsxRuntime.jsx(LastEditedWidgetContent, {})
    }
  );
};
const LastPublishedWidgetContent = () => {
  const { formatMessage } = reactIntl.useIntl();
  const { data, isLoading, error } = useGetRecentDocumentsQuery({ action: "publish" });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.Loading, {});
  }
  if (error || !data) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.Error, {});
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsxRuntime.jsx(Widget.NoData, { children: formatMessage({
      id: "content-manager.widget.last-published.no-data",
      defaultMessage: "No published entries"
    }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsx(RecentDocumentsTable, { documents: data });
};
const LastPublishedWidget = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(
    Widget.Root,
    {
      title: {
        id: "content-manager.widget.last-published.title",
        defaultMessage: "Last published entries"
      },
      icon: icons.CheckCircle,
      children: /* @__PURE__ */ jsxRuntime.jsx(LastPublishedWidgetContent, {})
    }
  );
};

const GuidedTourHomepage = () => {
  const guidedTourState = Theme.useGuidedTour("GuidedTourHomepage", (state) => state.guidedTourState);
  const setSkipped = Theme.useGuidedTour("GuidedTourHomepage", (state) => state.setSkipped);
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  const sections = Object.entries(Ornaments.LAYOUT_DATA).map(([key, val]) => ({
    key,
    title: val.home.title,
    content: /* @__PURE__ */ jsxRuntime.jsx(
      designSystem.LinkButton,
      {
        onClick: () => trackUsage(val.home.trackingEvent),
        tag: reactRouterDom.NavLink,
        to: val.home.cta.target,
        endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowRight, {}),
        children: formatMessage(val.home.cta.title)
      }
    ),
    isDone: Object.values(guidedTourState[key]).every((value) => value === true)
  }));
  const activeSectionIndex = sections.findIndex((section) => !section.isDone);
  const handleSkip = () => {
    setSkipped(true);
    trackUsage("didSkipGuidedtour");
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Box,
    {
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 7,
      paddingRight: 4,
      paddingLeft: 7,
      paddingBottom: 4,
      background: "neutral0",
      children: [
        /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "beta", tag: "h2", children: formatMessage({
            id: "app.components.GuidedTour.title",
            defaultMessage: "3 steps to get started"
          }) }),
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { children: sections.map((section, index) => {
            const state = getState(activeSectionIndex, index);
            return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { minWidth: `3rem`, marginRight: 5, children: /* @__PURE__ */ jsxRuntime.jsx(Ornaments.Number, { state, children: index + 1 }) }),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "delta", tag: "h3", children: formatMessage(section.title) })
              ] }),
              /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", children: [
                /* @__PURE__ */ jsxRuntime.jsx(
                  designSystem.Flex,
                  {
                    justifyContent: "center",
                    minWidth: `3rem`,
                    marginBottom: 3,
                    marginTop: 3,
                    marginRight: 5,
                    children: index === sections.length - 1 ? null : /* @__PURE__ */ jsxRuntime.jsx(Ornaments.VerticalDivider, { state })
                  }
                ),
                /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { marginTop: 2, children: state === Ornaments.STATES.IS_ACTIVE ? section.content : null })
              ] })
            ] }, section.key);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleSkip, children: formatMessage({ id: "app.components.GuidedTour.skip", defaultMessage: "Skip the tour" }) }) })
      ]
    }
  );
};
const getState = (activeSectionIndex, index) => {
  if (activeSectionIndex === -1) {
    return Ornaments.STATES.IS_DONE;
  }
  if (index < activeSectionIndex) {
    return Ornaments.STATES.IS_DONE;
  }
  if (index > activeSectionIndex) {
    return Ornaments.STATES.IS_NOT_DONE;
  }
  return Ornaments.STATES.IS_ACTIVE;
};

const GuidedTour = () => {
  const guidedTourState = Theme.useGuidedTour("HomePage", (state) => state.guidedTourState);
  const isGuidedTourVisible = Theme.useGuidedTour("HomePage", (state) => state.isGuidedTourVisible);
  const isSkipped = Theme.useGuidedTour("HomePage", (state) => state.isSkipped);
  const showGuidedTour = !Object.values(guidedTourState).every(
    (section) => Object.values(section).every((step) => step)
  ) && isGuidedTourVisible && !isSkipped;
  if (!showGuidedTour) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(GuidedTourHomepage, {});
};

const HomePageCE = () => {
  const { formatMessage } = reactIntl.useIntl();
  const user = Theme.useAuth("HomePageCE", (state) => state.user);
  const displayName = user?.firstname ?? user?.username ?? user?.email;
  return /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Main, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Title, { children: formatMessage({ id: "HomePage.head.title", defaultMessage: "Homepage" }) }),
    /* @__PURE__ */ jsxRuntime.jsx(
      index.Layouts.Header,
      {
        title: formatMessage(
          { id: "HomePage.header.title", defaultMessage: "Hello {name}" },
          { name: displayName }
        ),
        subtitle: formatMessage({
          id: "HomePage.header.subtitle",
          defaultMessage: "Welcome to your administration panel"
        })
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(index.Layouts.Content, { children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 8, paddingBottom: 10, children: [
      /* @__PURE__ */ jsxRuntime.jsx(GuidedTour, {}),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { gap: 5, children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(LastEditedWidget, {}) }),
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 6, s: 12, children: /* @__PURE__ */ jsxRuntime.jsx(LastPublishedWidget, {}) })
      ] })
    ] }) })
  ] });
};
const HomePage = () => {
  const Page2 = useEnterprise.useEnterprise(
    HomePageCE,
    // eslint-disable-next-line import/no-cycle
    async () => (await Promise.resolve().then(() => require('./HomePage-CAkoeipQ.js'))).HomePageEE
  );
  if (!Page2) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(Page2, {});
};

exports.HomePage = HomePage;
exports.HomePageCE = HomePageCE;
//# sourceMappingURL=HomePage-LgoJiZx7.js.map
