import { jsxs, jsx } from 'react/jsx-runtime';
import { Flex, Typography, Box, Loader, Table, Tbody, Tr, Td, IconButton, Status, LinkButton, Button, Main, Grid } from '@strapi/design-system';
import { useIntl } from 'react-intl';
import { b as Layouts } from './index-CyEyTBzg.mjs';
import { c as useTracking, t as capitalise, m as useGuidedTour, a as useAuth, P as Page } from './Theme-6doxg5FV.mjs';
import * as React from 'react';
import { a as adminApi } from './admin-DOzK8yjX.mjs';
import { u as useEnterprise } from './useEnterprise-BGzVPL4w.mjs';
import { PuzzlePiece, WarningCircle, Pencil, CheckCircle, ArrowRight } from '@strapi/icons';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { styled } from 'styled-components';
import { R as RelativeTime } from './RelativeTime-BGJ1PWx_.mjs';
import { EmptyDocuments } from '@strapi/icons/symbols';
import { L as LAYOUT_DATA, N as Number, V as VerticalDivider, S as STATES } from './Ornaments-BFThxr2U.mjs';

const homepageService = adminApi.enhanceEndpoints({
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

const Root = ({ title, icon = PuzzlePiece, children }) => {
  const { formatMessage } = useIntl();
  const id = React.useId();
  const Icon = icon;
  return /* @__PURE__ */ jsxs(
    Flex,
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
        /* @__PURE__ */ jsxs(Flex, { direction: "row", alignItems: "center", gap: 2, tag: "header", children: [
          /* @__PURE__ */ jsx(Icon, { fill: "neutral500", "aria-hidden": true }),
          /* @__PURE__ */ jsx(Typography, { textColor: "neutral500", variant: "sigma", tag: "h2", id, children: formatMessage(title) })
        ] }),
        /* @__PURE__ */ jsx(Box, { width: "100%", height: "261px", overflow: "auto", tag: "main", children })
      ]
    }
  );
};
const Loading = ({ children }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Flex, { height: "100%", justifyContent: "center", alignItems: "center", children: /* @__PURE__ */ jsx(Loader, { children: children ?? formatMessage({
    id: "HomePage.widget.loading",
    defaultMessage: "Loading widget content"
  }) }) });
};
const Error = ({ children }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { height: "100%", direction: "column", justifyContent: "center", alignItems: "center", gap: 2, children: [
    /* @__PURE__ */ jsx(WarningCircle, { width: "3.2rem", height: "3.2rem", fill: "danger600" }),
    /* @__PURE__ */ jsx(Typography, { variant: "delta", children: formatMessage({
      id: "global.error",
      defaultMessage: "Something went wrong"
    }) }),
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: children ?? formatMessage({
      id: "HomePage.widget.error",
      defaultMessage: "Couldn't load widget content."
    }) })
  ] });
};
const NoData = ({ children }) => {
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsxs(Flex, { height: "100%", direction: "column", justifyContent: "center", alignItems: "center", gap: 6, children: [
    /* @__PURE__ */ jsx(EmptyDocuments, { width: "16rem", height: "8.8rem" }),
    /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: children ?? formatMessage({
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

const CellTypography = styled(Typography).attrs({ maxWidth: "14.4rem", display: "block" })`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
const DocumentStatus = ({ status = "draft" }) => {
  const statusVariant = status === "draft" ? "secondary" : status === "published" ? "success" : "alternative";
  const { formatMessage } = useIntl();
  return /* @__PURE__ */ jsx(Status, { variant: statusVariant, size: "XS", children: /* @__PURE__ */ jsx(Typography, { tag: "span", variant: "omega", fontWeight: "bold", children: formatMessage({
    id: `content-manager.containers.List.${status}`,
    defaultMessage: capitalise(status)
  }) }) });
};
const RecentDocumentsTable = ({ documents }) => {
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const navigate = useNavigate();
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
  return /* @__PURE__ */ jsx(Table, { colCount: 5, rowCount: documents?.length ?? 0, children: /* @__PURE__ */ jsx(Tbody, { children: documents?.map((document) => /* @__PURE__ */ jsxs(Tr, { onClick: handleRowClick(document), cursor: "pointer", children: [
    /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(CellTypography, { title: document.title, variant: "omega", textColor: "neutral800", children: document.title }) }),
    /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(CellTypography, { variant: "omega", textColor: "neutral600", children: document.kind === "singleType" ? formatMessage({
      id: "content-manager.widget.last-edited.single-type",
      defaultMessage: "Single-Type"
    }) : formatMessage({
      id: document.contentTypeDisplayName,
      defaultMessage: document.contentTypeDisplayName
    }) }) }),
    /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Box, { display: "inline-block", children: document.status ? /* @__PURE__ */ jsx(DocumentStatus, { status: document.status }) : /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", "aria-hidden": true, children: "-" }) }) }),
    /* @__PURE__ */ jsx(Td, { children: /* @__PURE__ */ jsx(Typography, { textColor: "neutral600", children: /* @__PURE__ */ jsx(RelativeTime, { timestamp: new Date(document.updatedAt) }) }) }),
    /* @__PURE__ */ jsx(Td, { onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx(Box, { display: "inline-block", children: /* @__PURE__ */ jsx(
      IconButton,
      {
        tag: Link,
        to: getEditViewLink(document),
        onClick: () => trackUsage("willEditEntryFromHome"),
        label: formatMessage({
          id: "content-manager.actions.edit.label",
          defaultMessage: "Edit"
        }),
        variant: "ghost",
        children: /* @__PURE__ */ jsx(Pencil, {})
      }
    ) }) })
  ] }, document.documentId)) }) });
};
const LastEditedWidgetContent = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading, error } = useGetRecentDocumentsQuery({ action: "update" });
  if (isLoading) {
    return /* @__PURE__ */ jsx(Widget.Loading, {});
  }
  if (error || !data) {
    return /* @__PURE__ */ jsx(Widget.Error, {});
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsx(Widget.NoData, { children: formatMessage({
      id: "content-manager.widget.last-edited.no-data",
      defaultMessage: "No edited entries"
    }) });
  }
  return /* @__PURE__ */ jsx(RecentDocumentsTable, { documents: data });
};
const LastEditedWidget = () => {
  return /* @__PURE__ */ jsx(
    Widget.Root,
    {
      title: {
        id: "content-manager.widget.last-edited.title",
        defaultMessage: "Last edited entries"
      },
      icon: Pencil,
      children: /* @__PURE__ */ jsx(LastEditedWidgetContent, {})
    }
  );
};
const LastPublishedWidgetContent = () => {
  const { formatMessage } = useIntl();
  const { data, isLoading, error } = useGetRecentDocumentsQuery({ action: "publish" });
  if (isLoading) {
    return /* @__PURE__ */ jsx(Widget.Loading, {});
  }
  if (error || !data) {
    return /* @__PURE__ */ jsx(Widget.Error, {});
  }
  if (data.length === 0) {
    return /* @__PURE__ */ jsx(Widget.NoData, { children: formatMessage({
      id: "content-manager.widget.last-published.no-data",
      defaultMessage: "No published entries"
    }) });
  }
  return /* @__PURE__ */ jsx(RecentDocumentsTable, { documents: data });
};
const LastPublishedWidget = () => {
  return /* @__PURE__ */ jsx(
    Widget.Root,
    {
      title: {
        id: "content-manager.widget.last-published.title",
        defaultMessage: "Last published entries"
      },
      icon: CheckCircle,
      children: /* @__PURE__ */ jsx(LastPublishedWidgetContent, {})
    }
  );
};

const GuidedTourHomepage = () => {
  const guidedTourState = useGuidedTour("GuidedTourHomepage", (state) => state.guidedTourState);
  const setSkipped = useGuidedTour("GuidedTourHomepage", (state) => state.setSkipped);
  const { formatMessage } = useIntl();
  const { trackUsage } = useTracking();
  const sections = Object.entries(LAYOUT_DATA).map(([key, val]) => ({
    key,
    title: val.home.title,
    content: /* @__PURE__ */ jsx(
      LinkButton,
      {
        onClick: () => trackUsage(val.home.trackingEvent),
        tag: NavLink,
        to: val.home.cta.target,
        endIcon: /* @__PURE__ */ jsx(ArrowRight, {}),
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
  return /* @__PURE__ */ jsxs(
    Box,
    {
      hasRadius: true,
      shadow: "tableShadow",
      paddingTop: 7,
      paddingRight: 4,
      paddingLeft: 7,
      paddingBottom: 4,
      background: "neutral0",
      children: [
        /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 6, children: [
          /* @__PURE__ */ jsx(Typography, { variant: "beta", tag: "h2", children: formatMessage({
            id: "app.components.GuidedTour.title",
            defaultMessage: "3 steps to get started"
          }) }),
          /* @__PURE__ */ jsx(Box, { children: sections.map((section, index) => {
            const state = getState(activeSectionIndex, index);
            return /* @__PURE__ */ jsxs(Box, { children: [
              /* @__PURE__ */ jsxs(Flex, { children: [
                /* @__PURE__ */ jsx(Box, { minWidth: `3rem`, marginRight: 5, children: /* @__PURE__ */ jsx(Number, { state, children: index + 1 }) }),
                /* @__PURE__ */ jsx(Typography, { variant: "delta", tag: "h3", children: formatMessage(section.title) })
              ] }),
              /* @__PURE__ */ jsxs(Flex, { alignItems: "flex-start", children: [
                /* @__PURE__ */ jsx(
                  Flex,
                  {
                    justifyContent: "center",
                    minWidth: `3rem`,
                    marginBottom: 3,
                    marginTop: 3,
                    marginRight: 5,
                    children: index === sections.length - 1 ? null : /* @__PURE__ */ jsx(VerticalDivider, { state })
                  }
                ),
                /* @__PURE__ */ jsx(Box, { marginTop: 2, children: state === STATES.IS_ACTIVE ? section.content : null })
              ] })
            ] }, section.key);
          }) })
        ] }),
        /* @__PURE__ */ jsx(Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsx(Button, { variant: "tertiary", onClick: handleSkip, children: formatMessage({ id: "app.components.GuidedTour.skip", defaultMessage: "Skip the tour" }) }) })
      ]
    }
  );
};
const getState = (activeSectionIndex, index) => {
  if (activeSectionIndex === -1) {
    return STATES.IS_DONE;
  }
  if (index < activeSectionIndex) {
    return STATES.IS_DONE;
  }
  if (index > activeSectionIndex) {
    return STATES.IS_NOT_DONE;
  }
  return STATES.IS_ACTIVE;
};

const GuidedTour = () => {
  const guidedTourState = useGuidedTour("HomePage", (state) => state.guidedTourState);
  const isGuidedTourVisible = useGuidedTour("HomePage", (state) => state.isGuidedTourVisible);
  const isSkipped = useGuidedTour("HomePage", (state) => state.isSkipped);
  const showGuidedTour = !Object.values(guidedTourState).every(
    (section) => Object.values(section).every((step) => step)
  ) && isGuidedTourVisible && !isSkipped;
  if (!showGuidedTour) {
    return null;
  }
  return /* @__PURE__ */ jsx(GuidedTourHomepage, {});
};

const HomePageCE = () => {
  const { formatMessage } = useIntl();
  const user = useAuth("HomePageCE", (state) => state.user);
  const displayName = user?.firstname ?? user?.username ?? user?.email;
  return /* @__PURE__ */ jsxs(Main, { children: [
    /* @__PURE__ */ jsx(Page.Title, { children: formatMessage({ id: "HomePage.head.title", defaultMessage: "Homepage" }) }),
    /* @__PURE__ */ jsx(
      Layouts.Header,
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
    /* @__PURE__ */ jsx(Layouts.Content, { children: /* @__PURE__ */ jsxs(Flex, { direction: "column", alignItems: "stretch", gap: 8, paddingBottom: 10, children: [
      /* @__PURE__ */ jsx(GuidedTour, {}),
      /* @__PURE__ */ jsxs(Grid.Root, { gap: 5, children: [
        /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, children: /* @__PURE__ */ jsx(LastEditedWidget, {}) }),
        /* @__PURE__ */ jsx(Grid.Item, { col: 6, s: 12, children: /* @__PURE__ */ jsx(LastPublishedWidget, {}) })
      ] })
    ] }) })
  ] });
};
const HomePage = () => {
  const Page2 = useEnterprise(
    HomePageCE,
    // eslint-disable-next-line import/no-cycle
    async () => (await import('./HomePage-CXm3BYP6.mjs')).HomePageEE
  );
  if (!Page2) {
    return null;
  }
  return /* @__PURE__ */ jsx(Page2, {});
};

export { HomePage, HomePageCE };
//# sourceMappingURL=HomePage-BrO-IGaT.mjs.map
