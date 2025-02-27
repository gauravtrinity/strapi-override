'use strict';

Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });

const jsxRuntime = require('react/jsx-runtime');
const React = require('react');
const designSystem = require('@strapi/design-system');
const reactDnd = require('react-dnd');
const reactDndHtml5Backend = require('react-dnd-html5-backend');
const reactIntl = require('react-intl');
const reactRouterDom = require('react-router-dom');
const lt = require('semver/functions/lt');
const valid = require('semver/functions/valid');
const icons = require('@strapi/icons');
const get = require('lodash/get');
const styledComponents = require('styled-components');
const Theme = require('./Theme-DaGRg2qU.js');
const Ornaments = require('./Ornaments-CID1aaLv.js');
const users = require('./users-DaPfjlwf.js');
const index = require('./index-UB9JNjeZ.js');
const immer = require('immer');
const set = require('lodash/set');
const PrivateRoute = require('./PrivateRoute-CF2oRq-F.js');
const cloneDeep = require('lodash/cloneDeep');
const useOnce = require('./useOnce-C7EQufL3.js');
const admin = require('./admin-DRnq5SAg.js');

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
const lt__default = /*#__PURE__*/_interopDefault(lt);
const valid__default = /*#__PURE__*/_interopDefault(valid);
const get__default = /*#__PURE__*/_interopDefault(get);
const set__default = /*#__PURE__*/_interopDefault(set);
const cloneDeep__default = /*#__PURE__*/_interopDefault(cloneDeep);

const name = "@strapi/admin";
const version = "5.8.1";
const description = "Strapi Admin";
const repository = {
	type: "git",
	url: "git://github.com/strapi/strapi.git"
};
const license = "SEE LICENSE IN LICENSE";
const author = {
	name: "Strapi Solutions SAS",
	email: "hi@strapi.io",
	url: "https://strapi.io"
};
const maintainers = [
	{
		name: "Strapi Solutions SAS",
		email: "hi@strapi.io",
		url: "https://strapi.io"
	}
];
const exports$1 = {
	"./strapi-admin": {
		types: "./dist/admin/src/index.d.ts",
		source: "./admin/src/index.ts",
		"import": "./dist/admin/index.mjs",
		require: "./dist/admin/index.js",
		"default": "./dist/admin/index.js"
	},
	"./strapi-admin/ee": {
		types: "./dist/admin/src/ee.d.ts",
		source: "./admin/src/ee.ts",
		"import": "./dist/admin/ee.mjs",
		require: "./dist/admin/ee.js",
		"default": "./dist/admin/ee.js"
	},
	"./strapi-admin/test": {
		types: "./dist/admin/tests/index.d.ts",
		source: "./admin/tests/index.ts",
		"import": "./dist/admin/test.mjs",
		require: "./dist/admin/test.js",
		"default": "./dist/admin/test.js"
	},
	"./_internal": {
		types: "./dist/_internal/index.d.ts",
		source: "./_internal/index.ts",
		"import": "./dist/_internal.mjs",
		require: "./dist/_internal.js",
		"default": "./dist/_internal.js"
	},
	"./strapi-server": {
		types: "./dist/server/src/index.d.ts",
		source: "./server/src/index.js",
		"import": "./dist/server/index.mjs",
		require: "./dist/server/index.js",
		"default": "./dist/server/index.js"
	},
	"./package.json": "./package.json"
};
const files = [
	"dist/",
	"strapi-server.js"
];
const scripts = {
	build: "pack-up build && vite build",
	clean: "run -T rimraf ./dist",
	lint: "run -T eslint .",
	"test:front": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js",
	"test:front:watch": "run -T cross-env IS_EE=true jest --config ./jest.config.front.js --watchAll",
	"test:ts": "run -T tsc -p tsconfig.json",
	"test:ts:back": "run -T tsc --noEmit -p server/tsconfig.json",
	"test:ts:front": "run -T tsc -p admin/tsconfig.json && run -T tsc -p ee/admin/tsconfig.json",
	"test:unit": "run -T jest",
	"test:unit:watch": "run -T jest --watch",
	watch: "pack-up watch"
};
const dependencies = {
	"@casl/ability": "6.5.0",
	"@internationalized/date": "3.5.4",
	"@radix-ui/react-context": "1.0.1",
	"@radix-ui/react-toolbar": "1.0.4",
	"@reduxjs/toolkit": "1.9.7",
	"@strapi/design-system": "2.0.0-rc.14",
	"@strapi/icons": "2.0.0-rc.14",
	"@strapi/permissions": "5.8.1",
	"@strapi/types": "5.8.1",
	"@strapi/typescript-utils": "5.8.1",
	"@strapi/utils": "5.8.1",
	"@testing-library/dom": "10.1.0",
	"@testing-library/react": "15.0.7",
	"@testing-library/user-event": "14.5.2",
	axios: "1.7.4",
	bcryptjs: "2.4.3",
	boxen: "5.1.2",
	chalk: "^4.1.2",
	codemirror5: "npm:codemirror@^5.65.11",
	"cross-env": "^7.0.3",
	"date-fns": "2.30.0",
	execa: "5.1.1",
	"fast-deep-equal": "3.1.3",
	formik: "2.4.5",
	"fractional-indexing": "3.2.0",
	"fs-extra": "11.2.0",
	"highlight.js": "^10.4.1",
	immer: "9.0.21",
	inquirer: "8.2.5",
	invariant: "^2.2.4",
	"is-localhost-ip": "2.0.0",
	jsonwebtoken: "9.0.0",
	koa: "2.15.2",
	"koa-compose": "4.1.0",
	"koa-passport": "6.0.0",
	"koa-static": "5.0.0",
	"koa2-ratelimit": "^1.1.3",
	lodash: "4.17.21",
	"node-schedule": "2.1.1",
	ora: "5.4.1",
	"p-map": "4.0.0",
	"passport-local": "1.0.0",
	pluralize: "8.0.0",
	punycode: "2.3.1",
	qs: "6.11.1",
	"react-dnd": "16.0.1",
	"react-dnd-html5-backend": "16.0.1",
	"react-intl": "6.6.2",
	"react-is": "^18.2.0",
	"react-query": "3.39.3",
	"react-redux": "8.1.3",
	"react-select": "5.8.0",
	"react-window": "1.8.10",
	rimraf: "5.0.5",
	"sanitize-html": "2.13.0",
	scheduler: "0.23.0",
	semver: "7.5.4",
	sift: "16.0.1",
	typescript: "5.3.2",
	"use-context-selector": "1.4.1",
	yup: "0.32.9",
	zod: "^3.22.4"
};
const devDependencies = {
	"@strapi/admin-test-utils": "5.8.1",
	"@strapi/data-transfer": "5.8.1",
	"@strapi/pack-up": "5.0.2",
	"@types/codemirror5": "npm:@types/codemirror@^5.60.15",
	"@types/fs-extra": "11.0.4",
	"@types/invariant": "2.2.36",
	"@types/jsonwebtoken": "9.0.3",
	"@types/koa-passport": "6.0.1",
	"@types/lodash": "^4.14.191",
	"@types/markdown-it": "13.0.7",
	"@types/markdown-it-container": "2.0.9",
	"@types/markdown-it-emoji": "2.0.4",
	"@types/markdown-it-footnote": "3.0.3",
	"@types/passport-local": "1.0.36",
	"@types/pluralize": "0.0.32",
	"@types/punycode": "2.1.4",
	"@types/react-window": "1.8.8",
	"@types/sanitize-html": "2.13.0",
	"@vitejs/plugin-react-swc": "3.6.0",
	"koa-body": "6.0.1",
	msw: "1.3.0",
	react: "18.3.1",
	"react-dom": "18.3.1",
	"react-router-dom": "6.22.3",
	"styled-components": "6.1.8",
	vite: "5.2.14",
	"vite-plugin-dts": "^4.3.0"
};
const peerDependencies = {
	"@strapi/data-transfer": "^5.0.0",
	react: "^17.0.0 || ^18.0.0",
	"react-dom": "^17.0.0 || ^18.0.0",
	"react-router-dom": "^6.0.0",
	"styled-components": "^6.0.0"
};
const engines = {
	node: ">=18.0.0 <=22.x.x",
	npm: ">=6.0.0"
};
const nx = {
	targets: {
		build: {
			outputs: [
				"{projectRoot}/build"
			]
		}
	}
};
const packageJSON = {
	name: name,
	version: version,
	description: description,
	repository: repository,
	license: license,
	author: author,
	maintainers: maintainers,
	exports: exports$1,
	files: files,
	scripts: scripts,
	dependencies: dependencies,
	devDependencies: devDependencies,
	peerDependencies: peerDependencies,
	engines: engines,
	nx: nx
};

const GuidedTourModal = () => {
  const guidedTour = Theme.useGuidedTour("GuidedTourModal", (state) => state);
  const {
    currentStep,
    guidedTourState,
    setCurrentStep,
    setStepState,
    isGuidedTourVisible,
    setSkipped
  } = guidedTour;
  const { formatMessage } = reactIntl.useIntl();
  const { trackUsage } = Theme.useTracking();
  if (!currentStep || !isGuidedTourVisible) {
    return null;
  }
  const stepData = get__default.default(Ornaments.LAYOUT_DATA, currentStep);
  const sectionKeys = Object.keys(guidedTourState);
  const [sectionName, stepName] = currentStep.split(".");
  const sectionIndex = sectionKeys.indexOf(sectionName);
  const stepIndex = Object.keys(guidedTourState[sectionName]).indexOf(stepName);
  const hasSectionAfter = sectionIndex < sectionKeys.length - 1;
  const hasStepAfter = stepIndex < Object.keys(guidedTourState[sectionName]).length - 1;
  const handleCtaClick = () => {
    setStepState(currentStep, true);
    if (stepData) {
      trackUsage(stepData.trackingEvent);
    }
    setCurrentStep(null);
  };
  const handleSkip = () => {
    setSkipped(true);
    setCurrentStep(null);
    trackUsage("didSkipGuidedtour");
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Portal, { children: /* @__PURE__ */ jsxRuntime.jsx(ModalWrapper, { onClick: handleCtaClick, padding: 8, justifyContent: "center", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.FocusTrap, { onEscape: handleCtaClick, children: /* @__PURE__ */ jsxRuntime.jsxs(
    designSystem.Flex,
    {
      direction: "column",
      alignItems: "stretch",
      background: "neutral0",
      width: `66rem`,
      shadow: "popupShadow",
      hasRadius: true,
      padding: 4,
      gap: 8,
      role: "dialog",
      "aria-modal": true,
      onClick: (e) => e.stopPropagation(),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.IconButton,
          {
            onClick: handleCtaClick,
            withTooltip: false,
            label: formatMessage({
              id: "app.utils.close-label",
              defaultMessage: "Close"
            }),
            children: /* @__PURE__ */ jsxRuntime.jsx(icons.Cross, {})
          }
        ) }),
        /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Box,
          {
            paddingLeft: 7,
            paddingRight: 7,
            paddingBottom: !hasStepAfter && !hasSectionAfter ? 8 : 0,
            children: /* @__PURE__ */ jsxRuntime.jsx(
              GuidedTourStepper,
              {
                title: stepData && "title" in stepData ? stepData.title : void 0,
                cta: stepData && "cta" in stepData ? stepData.cta : void 0,
                onCtaClick: handleCtaClick,
                sectionIndex,
                stepIndex,
                hasSectionAfter,
                children: stepData && "content" in stepData && /* @__PURE__ */ jsxRuntime.jsx(GuidedTourContent, { ...stepData.content })
              }
            )
          }
        ),
        !(!hasStepAfter && !hasSectionAfter) && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "flex-end", children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { variant: "tertiary", onClick: handleSkip, children: formatMessage({
          id: "app.components.GuidedTour.skip",
          defaultMessage: "Skip the tour"
        }) }) })
      ]
    }
  ) }) }) });
};
const ModalWrapper = styledComponents.styled(designSystem.Flex)`
  position: fixed;
  z-index: 4;
  inset: 0;
  /* this is theme.colors.neutral800 with opacity */
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
`;
const GuidedTourStepper = ({
  title,
  children,
  cta,
  onCtaClick,
  sectionIndex,
  stepIndex,
  hasSectionAfter
}) => {
  const { formatMessage } = reactIntl.useIntl();
  const hasSectionBefore = sectionIndex > 0;
  const hasStepsBefore = stepIndex > 0;
  const nextSectionIndex = sectionIndex + 1;
  return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, justifyContent: "center", minWidth: `3rem`, children: hasSectionBefore && /* @__PURE__ */ jsxRuntime.jsx(Ornaments.VerticalDivider, { state: Ornaments.STATES.IS_DONE, minHeight: `2.4rem` }) }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "sigma", textColor: "primary600", children: formatMessage({
        id: "app.components.GuidedTour.title",
        defaultMessage: "3 steps to get started"
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, minWidth: `3rem`, children: /* @__PURE__ */ jsxRuntime.jsx(
        Ornaments.Number,
        {
          state: hasStepsBefore ? Ornaments.STATES.IS_DONE : Ornaments.STATES.IS_ACTIVE,
          paddingTop: 3,
          paddingBottom: 3,
          children: sectionIndex + 1
        }
      ) }),
      title && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { variant: "alpha", fontWeight: "bold", textColor: "neutral800", tag: "h3", id: "title", children: formatMessage(title) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "stretch", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, direction: "column", justifyContent: "center", minWidth: `3rem`, children: hasSectionAfter && /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        /* @__PURE__ */ jsxRuntime.jsx(Ornaments.VerticalDivider, { state: Ornaments.STATES.IS_DONE }),
        hasStepsBefore && /* @__PURE__ */ jsxRuntime.jsx(Ornaments.Number, { state: Ornaments.STATES.IS_ACTIVE, paddingTop: 3, children: nextSectionIndex + 1 })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { children: [
        children,
        cta && (cta.target ? /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.LinkButton,
          {
            tag: reactRouterDom.NavLink,
            endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowRight, {}),
            onClick: onCtaClick,
            to: cta.target,
            children: formatMessage(cta.title)
          }
        ) : /* @__PURE__ */ jsxRuntime.jsx(designSystem.Button, { endIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.ArrowRight, {}), onClick: onCtaClick, children: formatMessage(cta.title) }))
      ] })
    ] }),
    hasStepsBefore && hasSectionAfter && /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingTop: 3, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { marginRight: 8, justifyContent: "center", width: `3rem`, children: /* @__PURE__ */ jsxRuntime.jsx(Ornaments.VerticalDivider, { state: Ornaments.STATES.IS_DONE, minHeight: `2.4rem` }) }) })
  ] });
};
const GuidedTourContent = ({ id, defaultMessage }) => {
  const { formatMessage } = reactIntl.useIntl();
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { direction: "column", alignItems: "stretch", gap: 4, paddingBottom: 6, children: formatMessage(
    { id, defaultMessage },
    {
      documentationLink: DocumentationLink,
      b: Bold,
      p: Paragraph,
      light: Light,
      ul: List,
      li: ListItem
    }
  ) });
};
const DocumentationLink = (children) => /* @__PURE__ */ jsxRuntime.jsx(
  designSystem.Typography,
  {
    tag: "a",
    textColor: "primary600",
    target: "_blank",
    rel: "noopener noreferrer",
    href: "https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest-api.html#api-parameters",
    children
  }
);
const Bold = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { fontWeight: "semiBold", children });
const Paragraph = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { children });
const Light = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", children });
const List = (children) => /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingLeft: 6, children: /* @__PURE__ */ jsxRuntime.jsx("ul", { children }) });
const LiStyled = styledComponents.styled.li`
  list-style: disc;
  &::marker {
    color: ${({ theme }) => theme.colors.neutral800};
  }
`;
const ListItem = (children) => /* @__PURE__ */ jsxRuntime.jsx(LiStyled, { children });

const MainNavWrapper = styledComponents.styled(designSystem.Flex)`
  border-right: 1px solid ${({ theme }) => theme.colors.neutral150};
`;
const MainNav = (props) => /* @__PURE__ */ jsxRuntime.jsx(
  MainNavWrapper,
  {
    alignItems: "normal",
    tag: "nav",
    background: "neutral0",
    direction: "column",
    height: "100vh",
    position: "sticky",
    top: 0,
    zIndex: 2,
    width: 10,
    ...props
  }
);

const BrandIconWrapper = styledComponents.styled(designSystem.Flex)`
  svg,
  img {
    border-radius: ${({ theme }) => theme.borderRadius};
    object-fit: contain;
    height: 2.4rem;
    width: 2.4rem;
  }
`;
const NavBrand = () => {
  const { formatMessage } = reactIntl.useIntl();
  const {
    logos: { menu }
  } = Theme.useConfiguration("LeftMenu");
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { padding: 3, children: /* @__PURE__ */ jsxRuntime.jsxs(BrandIconWrapper, { direction: "column", justifyContent: "center", width: "3.2rem", height: "3.2rem", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      "img",
      {
        src: menu.custom?.url || menu.default,
        alt: formatMessage({
          id: "app.components.LeftMenu.logo.alt",
          defaultMessage: "Application logo"
        }),
        width: "100%",
        height: "100%"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.VisuallyHidden, { children: [
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: formatMessage({
        id: "app.components.LeftMenu.navbrand.title",
        defaultMessage: "Strapi Dashboard"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsx("span", { children: formatMessage({
        id: "app.components.LeftMenu.navbrand.workplace",
        defaultMessage: "Workplace"
      }) })
    ] })
  ] }) });
};

const MainNavLinkWrapper = styledComponents.styled(reactRouterDom.NavLink)`
  text-decoration: none;
  display: flex;
  border-radius: ${({ theme }) => theme.borderRadius};
  background: ${({ theme }) => theme.colors.neutral0};
  color: ${({ theme }) => theme.colors.neutral500};
  position: relative;
  width: fit-content;
  padding-block: 0.6rem;
  padding-inline: 0.6rem;

  &:hover {
    svg path {
      fill: ${({ theme }) => theme.colors.neutral600};
    }
    background: ${({ theme }) => theme.colors.neutral100};
  }

  &.active {
    svg path {
      fill: ${({ theme }) => theme.colors.primary600};
    }
    background: ${({ theme }) => theme.colors.primary100};
  }
`;
const LinkImpl = ({ children, ...props }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(MainNavLinkWrapper, { ...props, children });
};
const TooltipImpl = ({ children, label, position = "right" }) => {
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Tooltip, { side: position, label, delayDuration: 0, children: /* @__PURE__ */ jsxRuntime.jsx("span", { children }) });
};
const IconImpl = ({ label, children }) => {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.AccessibleIcon, { label, children });
};
const CustomBadge = styledComponents.styled(designSystem.Badge)`
  /* override default badge styles to change the border radius of the Base element in the Design System */
  border-radius: ${({ theme }) => theme.spaces[10]};
  height: 2rem;
`;
const BadgeImpl = ({ children, label, ...props }) => {
  if (!children) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntime.jsx(
    CustomBadge,
    {
      position: "absolute",
      top: "-0.8rem",
      left: "1.7rem",
      "aria-label": label,
      active: false,
      ...props,
      children
    }
  );
};
const NavLink = {
  Link: LinkImpl,
  Tooltip: TooltipImpl,
  Icon: IconImpl,
  Badge: BadgeImpl
};

const MenuTrigger = styledComponents.styled(designSystem.Menu.Trigger)`
  height: 100%;
  border-radius: 0;
  border-width: 1px 0 0 0;
  border-color: ${({ theme }) => theme.colors.neutral150};
  border-style: solid;
  padding: ${({ theme }) => theme.spaces[3]};
  // padding 12px - 1px border width
  padding-top: 11px;
  // Prevent empty pixel from appearing below the main nav
  overflow: hidden;
`;
const MenuContent = styledComponents.styled(designSystem.Menu.Content)`
  left: ${({ theme }) => theme.spaces[5]};
`;
const MenuItem = styledComponents.styled(designSystem.Menu.Item)`
  & > span {
    width: 100%;
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spaces[3]};
    justify-content: space-between;
  }
`;
const MenuItemDanger = styledComponents.styled(MenuItem)`
  &:hover {
  ${({ theme }) => `
    background: ${theme.colors.danger100};
  `}
`;
const NavUser = ({ children, initials, ...props }) => {
  const { formatMessage } = reactIntl.useIntl();
  const navigate = reactRouterDom.useNavigate();
  const logout = Theme.useAuth("Logout", (state) => state.logout);
  const handleProfile = () => {
    navigate("/me");
  };
  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { justifyContent: "center", ...props, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Menu.Root, { children: [
    /* @__PURE__ */ jsxRuntime.jsxs(MenuTrigger, { endIcon: null, fullWidth: true, justifyContent: "center", children: [
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Avatar.Item, { delayMs: 0, fallback: initials }),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { tag: "span", children })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs(MenuContent, { popoverPlacement: "top-center", zIndex: 3, children: [
      /* @__PURE__ */ jsxRuntime.jsx(MenuItem, { onSelect: handleProfile, children: formatMessage({
        id: "global.profile",
        defaultMessage: "Profile"
      }) }),
      /* @__PURE__ */ jsxRuntime.jsxs(MenuItemDanger, { onSelect: handleLogout, color: "danger600", children: [
        formatMessage({
          id: "app.components.LeftMenu.logout",
          defaultMessage: "Logout"
        }),
        /* @__PURE__ */ jsxRuntime.jsx(icons.SignOut, {})
      ] })
    ] })
  ] }) });
};

const sortLinks = (links) => {
  return links.sort((a, b) => {
    const positionA = a.position ?? 6;
    const positionB = b.position ?? 6;
    if (positionA < positionB) {
      return -1;
    } else {
      return 1;
    }
  });
};
const NavLinkBadgeCounter = styledComponents.styled(NavLink.Badge)`
  span {
    color: ${({ theme }) => theme.colors.neutral0};
  }
`;
const NavLinkBadgeLock = styledComponents.styled(NavLink.Badge)`
  background-color: transparent;
`;
const NavListWrapper = styledComponents.styled(designSystem.Flex)`
  overflow-y: auto;
`;
const LeftMenu = ({ generalSectionLinks, pluginsSectionLinks }) => {
  const user = Theme.useAuth("AuthenticatedApp", (state) => state.user);
  const { trackUsage } = Theme.useTracking();
  const { pathname } = reactRouterDom.useLocation();
  const userDisplayName = users.getDisplayName(user);
  const { formatMessage, locale } = reactIntl.useIntl();
  const formatter = designSystem.useCollator(locale, {
    sensitivity: "base"
  });
  const initials = userDisplayName.split(" ").map((name) => name.substring(0, 1)).join("").substring(0, 2);
  const handleClickOnLink = (destination) => {
    trackUsage("willNavigate", { from: pathname, to: destination });
  };
  const listLinksAlphabeticallySorted = [...pluginsSectionLinks, ...generalSectionLinks].sort(
    (a, b) => formatter.compare(formatMessage(a.intlLabel), formatMessage(b.intlLabel))
  );
  const listLinks = sortLinks(listLinksAlphabeticallySorted);
  return /* @__PURE__ */ jsxRuntime.jsxs(MainNav, { children: [
    /* @__PURE__ */ jsxRuntime.jsx(NavBrand, {}),
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
    /* @__PURE__ */ jsxRuntime.jsx(NavListWrapper, { tag: "ul", gap: 3, direction: "column", flex: 1, paddingTop: 3, paddingBottom: 3, children: listLinks.length > 0 ? listLinks.map((link) => {
      const LinkIcon = link.icon;
      const badgeContentLock = link?.licenseOnly ? /* @__PURE__ */ jsxRuntime.jsx(icons.Lightning, { fill: "warning500" }) : void 0;
      const badgeContentNumeric = link.notificationsCount && link.notificationsCount > 0 ? link.notificationsCount.toString() : void 0;
      const labelValue = formatMessage(link.intlLabel);
      return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Flex, { tag: "li", children: /* @__PURE__ */ jsxRuntime.jsx(NavLink.Tooltip, { label: labelValue, children: /* @__PURE__ */ jsxRuntime.jsxs(
        NavLink.Link,
        {
          to: link.to,
          onClick: () => handleClickOnLink(link.to),
          "aria-label": labelValue,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(NavLink.Icon, { label: labelValue, children: /* @__PURE__ */ jsxRuntime.jsx(LinkIcon, { width: "20", height: "20", fill: "neutral500" }) }),
            badgeContentLock ? /* @__PURE__ */ jsxRuntime.jsx(
              NavLinkBadgeLock,
              {
                label: "locked",
                textColor: "neutral500",
                paddingLeft: 0,
                paddingRight: 0,
                children: badgeContentLock
              }
            ) : badgeContentNumeric ? /* @__PURE__ */ jsxRuntime.jsx(
              NavLinkBadgeCounter,
              {
                label: badgeContentNumeric,
                backgroundColor: "primary600",
                width: "2.3rem",
                color: "neutral0",
                children: badgeContentNumeric
              }
            ) : null
          ]
        }
      ) }) }, link.to);
    }) : null }),
    /* @__PURE__ */ jsxRuntime.jsx(NavUser, { initials, children: userDisplayName })
  ] });
};

const onboardingPreview = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHAAAABQCAMAAAD2kgFPAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAL9UExURff3+fv7+/X19/Pz9/n5+fv7/f39//////39/UdwTPn5+/X1+fHx++/v8fn5/fHx8/Pz9eTk6e/v8/Hx9fHx/e3u7/X19e3t8evr7+fn6YuR96Gl+OLi59LS2dTU2uvr++nq7ff39+Tk697e4ufn6+vr7enq69ra3tDQ1uDg5/nv7+Dg5Nzc4Nzd4tTU2OTk5+fn7djY3tzc5M/Q1NjY3NLS1tbX3MzM0u/w9crK0unp7+np+/37+8rK0MjIzu/v78PEy9ra4djY4eLi6t7e5NbW2s7O1OLk5+/v/Ojp/dra5MPF9+3u89bX3mxz99DQ2fj4+OLi5PHx8dvb29ze+/f3/7C1+t7e5+vr69PX2OPk/Jydl/T09/f393R7+Gdw96ytuNTU3M7O2ODg6a6vumJq9+3u/dTW/PP19cXGzd7e4O3t7cnK+/f3+uLk683O+Z2h+dLU+9/h++no3/j39bq0pu/v7fv7+fHz9XF4911l93V8+bm5waGirffr7Kqrtq+z9qentF9o93mA+fj4+vr6++/v7/f3++vt+83N0/Pz8+vr8dbY+sjJ98zO1crM0vn5//Pz/ra6n/n59d/g4quvp9fa2OTn66Shm8C2prCuq+/r67Gxr9LLvbCwrcfEwK+vqZSahtPVw5WafKiknff5+ZqapvHw7fv4+YGH9dnb++Tn/Ly8xvfo6Oq5v////6WlsNrc3vPz+dLU2Ovr/eTn+drc4JWXo6Wp+cLE++nr74+T+enr4s7Q1m5098bArefk5Nze0ODc1Pf3/MC8tuDi0KWrh/n39+Tk4qmv+77Cqdjc3PX1/c7S0vv7/7ixo/Px7Z+jh62x+8rMtrS6pZebjY+Rn9bayKuvm+vp5+np6aWrjVJa9fX38bi895+fm1pk9620oevp6bS0r+fp6fv19VZg9fn19X6F+fnz89LS3MDAyPXi4uextvX1+vPW2OCVnYmJl9zc4Xh4iff3+mdy97y8xPf3977C96mpsbS29YeHlamv84qS87i89VXx8BYAAAD/dFJOU319fX19fX19fQB9fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19bX19fX19fX19fX19Lwd9fX19fX19fX19fX19fX1lfX19fX19fX19fX19fX19fX19fX19fW1dED59fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX0PfX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX19fX1mfX19bX1eXn0/fX19fX0/fSWruQsAAAbiSURBVGje7VkFcBtHFD2SbnXO9UA56dRIiiRbFFlmiO3asWKIE0MYGrQbZmjDDA1T06RJ03DSJA2XMaWUmZmZmWm6ki3lTie59kTSlJ40p5nV//tud//b/28P0WiG/PgdkhBMHKzRaBDNyWXSRoqi4ki57CQk/MZsKna58pqa0N4gnoNcNgQZzBV8ml9aYMYaW4DQRKjvDC8MG7TkG0ff+gmobifD78gXYQZE0++8b08tXFg/4uf6H46VLh5Rf/P8TERtXG1ykkmtI7zmtZFLhtW9NWfOnCUjhy0Z+T2CJOFYJMOS+YtPzV884teDX8879sKIhfUHSxG1AzH0ajXhB3UjPxpaVzd37uyls5cunRv30Fx0vhxRDfXdLLbhZWU2W1mGGNtbEPuXdStz+2ycu/+kbmv4YLOWZ3merdEyNSweW0KMxXkW1+J4RwxeMeRfCIbhMsu7/LUd0QgkSYkW8TS5wznVlg93W8LnEiUooAIqFYBQkxBnSIxkMStJVLUPoah90cCqlSurWkSI6ijdGGv0v0Wv3iaIa1i9KLJ+QoR0Wk0l2YCo6jO5unpq9dTJkyesW7uu+oZp09q0iLDXvOQNG0r9uxbtNdU2hIcidV4YELTpt40C17WIsMk9oAyapxMbNxiCR4uRWAP2TNOZ3S/KCmdEyfggEORQ9Xh4kKPkM8O6AjbIS/BWfZLED+N5StmbisEZRttRTzVD2LZtUdW09gPbFx0tatuE0Y2E/YYeVYlI0E7ELYjET68vJJS9nZdRc1shq7dgzRIeKfrtj0W//LTojTDCOE2pMsjb3BiQhSo+gF3jOJNhKQwPUgqcBdqhER+Cc4efUOvL8nFKwhxn/tjKtNLTY12HO3z15ecnTiz4ODaEkUEBgoKqIRAdgR3u8NmC4wuOd3g/noSoWoILGgHU5w7/jGpxbQ28dJRl3/AoPfR6jKIUqcnKstkm2fpnZOlZGSFBqUgQtLt6/9vvSf0Y/19qENYbgIpHSQBvFk6ekgy2NZO9SIqk1Pag7Ttvvttb6pu3Ps9lTtvsqsiTtmLpnC83L8fpyjXlmpMVhDYS+IKbN6YkBNINaubunWiMphTh9d0L1tcqMj6IDwKdszgeYYR9u6old/bsi1SsRohhs3heVBK2mz1QLQTthOe3Xyj1q8xJ3uwZZ/A5jbI17GlPyUlNTk31jHN6DQoyhgLuQNVm7l7bWZkPb719FBnKCIcOTJ8h9bVi8GO16hCdLAxR1N9E6HSsDlOmDGjLNBOlcnR6KlY6RFitODzFlrCM799qyt1eZV1KEqhU+E+/5EiE8EML/8qgXVdIfbPHZhfkrrp2bL5J2sqmJptL8nOzi9fnFxekKgjLUOB/rub58obMCEGjVoGzI7x8986Z5zydsDcQkMXWQguPJG4No25tslXYt08Vs62N8TaYvUnKNVSh6tVBuxl798iE7/QYuRSO5jhB2koYGCHZ4PBwKV2MnF5BhlPqxsqC1uJshKChUDIk3qsOPPmy1LeXIIgMzToYWtqK6nS0vRNNC+P1gqgUPrwFfYuFP+DiWK5hCwhjFzSF/WuzOnd2uwt9fEcZ4dp+l52VxSWvPueQb4ugMc7lcY8GhA+iC5+CETqLhV8Ww5iwmmbKsD4glPHtg3bIhJ/mMpucuelpabK8jqVyqdkVOea0nOtzTR4FYQoKvM1MadcJfSUjvO+uB2MlfP+hgrtLAoUf5VAhzPCe++MepVD4gAmlw71bZMLvnZ5ucBhpe0+ZDokuUPgpnJETofDtkYSfEjhUKP8ks0G5eaOoVPjbpt8t9XUYOU+6gfZYZIUEytMOzmB39OzJGThaQZgBv1EPFeIr/AiHCnEMmmiHCgMnnJHI4oFNjGzySEBGVDZsD2g+ovChX3DzjpCeptT1AaEdf8CgHbKgcbnSXBUmoykvRyb8ZKMnrSIzz2Q2myKV+iHhY0laJeGRfhLhW/dcqWulxqOOkOFNp7v78IRm/BZkiztiF6WRDxX85zRFIKTDGfu3PCr1SxcEmGd1jMDKhD9+jE6kRZHWdrILSh3CTsVAXZqa5eWUhA8P7UqGuuu0bfpDso3fuJXjDILHIBc+LQgp6XaHMd1o4HpFyvgZzUzpE49Jn5563wv+qRk/ej6culFSCG96RBc74UcmnHJnH2A5K/xdj0t9S0oLirMrvSWrKmSlvvMmZ3GBuTI/u7IkX1nqW1BQ2wzh6FskNY11eyuFH2kC4DJRf581/B+tQHzfK4e9ZsIQBkFHbURgLQMfX9x4vAlh1sMhIYnAhxhYxVgSNE6C+E+F0KWJpZuIrEgs4WBkSI9E8vXQIJrlCWTssRwSajSDJyYoXFYM0Wj+BNjsk7mwYOwbAAAAAElFTkSuQmCC";

const Onboarding = () => {
  const [isOpen, setIsOpen] = React__namespace.useState(false);
  const { formatMessage } = reactIntl.useIntl();
  const communityEdition = Theme.useAppInfo("Onboarding", (state) => state.communityEdition);
  const docLinks = [
    ...DOCUMENTATION_LINKS,
    {
      label: { id: "Settings.application.get-help", defaultMessage: "Get help" },
      icon: icons.Message,
      href: communityEdition ? "https://discord.strapi.io" : "https://support.strapi.io/support/home"
    }
  ];
  const Icon = isOpen ? icons.Cross : icons.Question;
  return /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Root, { onOpenChange: setIsOpen, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "fixed", bottom: 2, right: 2, children: [
    /* @__PURE__ */ jsxRuntime.jsx(designSystem.Popover.Trigger, { children: /* @__PURE__ */ jsxRuntime.jsx(
      HelperButton,
      {
        "aria-label": formatMessage(
          isOpen ? {
            id: "app.components.Onboarding.help.button-close",
            defaultMessage: "Close help menu"
          } : {
            id: "app.components.Onboarding.help.button",
            defaultMessage: "Open help menu"
          }
        ),
        children: /* @__PURE__ */ jsxRuntime.jsx(Icon, { fill: "buttonNeutral0" })
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Popover.Content, { align: "end", side: "top", sideOffset: 12, children: [
      /* @__PURE__ */ jsxRuntime.jsxs(
        designSystem.Flex,
        {
          justifyContent: "space-between",
          paddingBottom: 5,
          paddingRight: 6,
          paddingLeft: 6,
          paddingTop: 6,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(TypographyLineHeight, { fontWeight: "bold", children: formatMessage({
              id: "app.components.Onboarding.title",
              defaultMessage: "Get started videos"
            }) }),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextLink,
              {
                tag: "a",
                href: WATCH_MORE.href,
                target: "_blank",
                rel: "noreferrer noopener",
                variant: "pi",
                textColor: "primary600",
                children: formatMessage(WATCH_MORE.label)
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx(designSystem.Divider, {}),
      VIDEO_LINKS.map(({ href, duration, label }, index) => /* @__PURE__ */ jsxRuntime.jsxs(
        VideoLinkWrapper,
        {
          tag: "a",
          href,
          target: "_blank",
          rel: "noreferrer noopener",
          hasRadius: true,
          paddingTop: 4,
          paddingBottom: 4,
          paddingLeft: 6,
          paddingRight: 11,
          children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Box, { paddingRight: 5, children: /* @__PURE__ */ jsxRuntime.jsx(Number, { textColor: "neutral200", variant: "alpha", children: index + 1 }) }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { position: "relative", children: [
              /* @__PURE__ */ jsxRuntime.jsx(Preview, { src: onboardingPreview, alt: "" }),
              /* @__PURE__ */ jsxRuntime.jsx(
                IconWrapper,
                {
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  background: "primary600",
                  borderRadius: "50%",
                  justifyContent: "center",
                  width: 6,
                  height: 6,
                  children: /* @__PURE__ */ jsxRuntime.jsx(icons.Play, { fill: "buttonNeutral0", width: "12", height: "12" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { direction: "column", alignItems: "start", paddingLeft: 4, children: [
              /* @__PURE__ */ jsxRuntime.jsx(Label, { fontWeight: "bold", children: formatMessage(label) }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.VisuallyHidden, { children: ":" }),
              /* @__PURE__ */ jsxRuntime.jsx(designSystem.Typography, { textColor: "neutral600", variant: "pi", children: duration })
            ] })
          ]
        },
        href
      )),
      /* @__PURE__ */ jsxRuntime.jsx(
        designSystem.Flex,
        {
          direction: "column",
          alignItems: "stretch",
          gap: 2,
          paddingLeft: 5,
          paddingTop: 2,
          paddingBottom: 5,
          children: docLinks.map(({ label, href, icon: Icon2 }) => /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { gap: 3, children: [
            /* @__PURE__ */ jsxRuntime.jsx(Icon2, { fill: "primary600" }),
            /* @__PURE__ */ jsxRuntime.jsx(
              TextLink,
              {
                tag: "a",
                href,
                target: "_blank",
                rel: "noreferrer noopener",
                variant: "sigma",
                textColor: "primary700",
                children: formatMessage(label)
              }
            )
          ] }, href))
        }
      )
    ] })
  ] }) });
};
const HelperButton = styledComponents.styled(designSystem.Button)`
  border-radius: 50%;
  padding: ${({ theme }) => theme.spaces[3]};
  /* Resetting 2rem height defined by Button component */
  height: unset;
  width: unset;

  & > span {
    display: flex;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;
const IconWrapper = styledComponents.styled(designSystem.Flex)`
  transform: translate(-50%, -50%);
`;
const Number = styledComponents.styled(designSystem.Typography)``;
const Label = styledComponents.styled(designSystem.Typography)``;
const VideoLinkWrapper = styledComponents.styled(designSystem.Flex)`
  text-decoration: none;

  :focus-visible {
    outline-offset: ${({ theme }) => `-${theme.spaces[1]}`};
  }

  :hover {
    background: ${({ theme }) => theme.colors.primary100};

    /* Hover style for the number displayed */
    ${Number} {
      color: ${({ theme }) => theme.colors.primary500};
    }

    /* Hover style for the label */
    ${Label} {
      color: ${({ theme }) => theme.colors.primary600};
    }
  }
`;
const Preview = styledComponents.styled.img`
  width: ${({ theme }) => theme.spaces[10]};
  height: ${({ theme }) => theme.spaces[8]};
  /* Same overlay used in ModalLayout */
  background: ${({ theme }) => `${theme.colors.neutral800}1F`};
  border-radius: ${({ theme }) => theme.borderRadius};
`;
const TypographyLineHeight = styledComponents.styled(designSystem.Typography)`
  /* line height of label and watch more to 1 so they can be better aligned visually */
  line-height: 1;
`;
const TextLink = styledComponents.styled(designSystem.Typography)`
  text-decoration: none;
  line-height: 1;

  :hover {
    text-decoration: underline;
  }
`;
const VIDEO_LINKS = [
  {
    label: {
      id: "app.components.Onboarding.link.build-content",
      defaultMessage: "Build a content architecture"
    },
    href: "https://www.youtube.com/watch?v=G9GjN0RxhkE",
    duration: "5:48"
  },
  {
    label: {
      id: "app.components.Onboarding.link.manage-content",
      defaultMessage: "Add & manage content"
    },
    href: "https://www.youtube.com/watch?v=DEZw4KbybAI",
    duration: "3:18"
  },
  {
    label: { id: "app.components.Onboarding.link.manage-media", defaultMessage: "Manage media" },
    href: "https://www.youtube.com/watch?v=-61MuiMQb38",
    duration: "3:41"
  }
];
const WATCH_MORE = {
  href: "https://www.youtube.com/playlist?list=PL7Q0DQYATmvidz6lEmwE5nIcOAYagxWqq",
  label: {
    id: "app.components.Onboarding.link.more-videos",
    defaultMessage: "Watch more videos"
  }
};
const DOCUMENTATION_LINKS = [
  {
    label: { id: "global.documentation", defaultMessage: "documentation" },
    href: "https://docs.strapi.io",
    icon: icons.Book
  },
  {
    label: { id: "app.static.links.cheatsheet", defaultMessage: "cheatsheet" },
    href: "https://strapi-showcase.s3-us-west-2.amazonaws.com/CheatSheet.pdf",
    icon: icons.PaperPlane
  }
];

const PluginsInitializer = ({ children }) => {
  const appPlugins = Theme.useStrapiApp("PluginsInitializer", (state) => state.plugins);
  const [{ plugins }, dispatch] = React__namespace.useReducer(
    reducer,
    initialState,
    () => init(appPlugins)
  );
  const setPlugin = React__namespace.useRef((pluginId) => {
    dispatch({ type: "SET_PLUGIN_READY", pluginId });
  });
  const hasApluginNotReady = Object.keys(plugins).some(
    (plugin) => plugins[plugin].isReady === false
  );
  if (hasApluginNotReady) {
    const initializers = Object.keys(plugins).reduce((acc, current) => {
      const InitializerComponent = plugins[current].initializer;
      if (InitializerComponent) {
        const key = plugins[current].pluginId;
        acc.push(/* @__PURE__ */ jsxRuntime.jsx(InitializerComponent, { setPlugin: setPlugin.current }, key));
      }
      return acc;
    }, []);
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      initializers,
      /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {})
    ] });
  }
  return children;
};
const initialState = {
  plugins: {}
};
const reducer = (state = initialState, action) => immer.produce(state, (draftState) => {
  switch (action.type) {
    case "SET_PLUGIN_READY": {
      set__default.default(draftState, ["plugins", action.pluginId, "isReady"], true);
      break;
    }
    default:
      return draftState;
  }
});
const init = (plugins) => {
  return {
    plugins
  };
};

const useMenu = (shouldUpdateStrapi) => {
  const checkUserHasPermissions = Theme.useAuth("useMenu", (state) => state.checkUserHasPermissions);
  const menu = Theme.useStrapiApp("useMenu", (state) => state.menu);
  const permissions = Theme.useTypedSelector((state) => state.admin_app.permissions);
  const [menuWithUserPermissions, setMenuWithUserPermissions] = React__namespace.useState({
    generalSectionLinks: [
      {
        icon: icons.House,
        intlLabel: {
          id: "global.home",
          defaultMessage: "Home"
        },
        to: "/",
        permissions: [],
        position: 0
      },
      {
        icon: icons.ShoppingCart,
        intlLabel: {
          id: "global.marketplace",
          defaultMessage: "Marketplace"
        },
        to: "/marketplace",
        permissions: permissions.marketplace?.main ?? [],
        position: 7
      },
      {
        icon: icons.Cog,
        intlLabel: {
          id: "global.settings",
          defaultMessage: "Settings"
        },
        to: "/settings",
        // Permissions of this link are retrieved in the init phase
        // using the settings menu
        permissions: [],
        notificationsCount: 0,
        position: 9
      }
    ],
    pluginsSectionLinks: [],
    isLoading: true
  });
  const generalSectionLinksRef = React__namespace.useRef(menuWithUserPermissions.generalSectionLinks);
  React__namespace.useEffect(() => {
    async function applyMenuPermissions() {
      const authorizedPluginSectionLinks = await getPluginSectionLinks(
        menu,
        checkUserHasPermissions
      );
      const authorizedGeneralSectionLinks = await getGeneralLinks(
        generalSectionLinksRef.current,
        shouldUpdateStrapi,
        checkUserHasPermissions
      );
      setMenuWithUserPermissions((state) => ({
        ...state,
        generalSectionLinks: authorizedGeneralSectionLinks,
        pluginsSectionLinks: authorizedPluginSectionLinks,
        isLoading: false
      }));
    }
    applyMenuPermissions();
  }, [
    setMenuWithUserPermissions,
    generalSectionLinksRef,
    menu,
    permissions,
    shouldUpdateStrapi,
    checkUserHasPermissions
  ]);
  return menuWithUserPermissions;
};
const getGeneralLinks = async (generalSectionRawLinks, shouldUpdateStrapi = false, checkUserHasPermissions) => {
  const generalSectionLinksPermissions = await Promise.all(
    generalSectionRawLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
  );
  const authorizedGeneralSectionLinks = generalSectionRawLinks.filter(
    (_, index) => generalSectionLinksPermissions[index].length > 0
  );
  const settingsLinkIndex = authorizedGeneralSectionLinks.findIndex(
    (obj) => obj.to === "/settings"
  );
  if (settingsLinkIndex === -1) {
    return [];
  }
  const authorizedGeneralLinksClone = cloneDeep__default.default(authorizedGeneralSectionLinks);
  authorizedGeneralLinksClone[settingsLinkIndex].notificationsCount = shouldUpdateStrapi ? 1 : 0;
  return authorizedGeneralLinksClone;
};
const getPluginSectionLinks = async (pluginsSectionRawLinks, checkUserHasPermissions) => {
  const pluginSectionLinksPermissions = await Promise.all(
    pluginsSectionRawLinks.map(({ permissions }) => checkUserHasPermissions(permissions))
  );
  const authorizedPluginSectionLinks = pluginsSectionRawLinks.filter(
    (_, index) => pluginSectionLinksPermissions[index].length > 0
  );
  return authorizedPluginSectionLinks;
};

const strapiVersion = packageJSON.version;
const AdminLayout = () => {
  const setGuidedTourVisibility = Theme.useGuidedTour(
    "AdminLayout",
    (state) => state.setGuidedTourVisibility
  );
  const { formatMessage } = reactIntl.useIntl();
  const userInfo = Theme.useAuth("AuthenticatedApp", (state) => state.user);
  const [userId, setUserId] = React__namespace.useState();
  const { showReleaseNotification } = Theme.useConfiguration("AuthenticatedApp");
  const { data: appInfo, isLoading: isLoadingAppInfo } = admin.useInformationQuery();
  const [tagName, setTagName] = React__namespace.useState(strapiVersion);
  React__namespace.useEffect(() => {
    if (showReleaseNotification) {
      fetch("https://api.github.com/repos/strapi/strapi/releases/latest").then(async (res) => {
        if (!res.ok) {
          return;
        }
        const response = await res.json();
        if (!response.tag_name) {
          throw new Error();
        }
        setTagName(response.tag_name);
      }).catch(() => {
      });
    }
  }, [showReleaseNotification]);
  const userRoles = Theme.useAuth("AuthenticatedApp", (state) => state.user?.roles);
  React__namespace.useEffect(() => {
    if (userRoles) {
      const isUserSuperAdmin = userRoles.find(({ code }) => code === "strapi-super-admin");
      if (isUserSuperAdmin && appInfo?.autoReload) {
        setGuidedTourVisibility(true);
      }
    }
  }, [userRoles, appInfo?.autoReload, setGuidedTourVisibility]);
  React__namespace.useEffect(() => {
    users.hashAdminUserEmail(userInfo).then((id) => {
      if (id) {
        setUserId(id);
      }
    });
  }, [userInfo]);
  const { trackUsage } = Theme.useTracking();
  const {
    isLoading: isLoadingMenu,
    generalSectionLinks,
    pluginsSectionLinks
  } = useMenu(checkLatestStrapiVersion(strapiVersion, tagName));
  const { showTutorials } = Theme.useConfiguration("Admin");
  useOnce.useOnce(() => {
    trackUsage("didAccessAuthenticatedAdministration");
  });
  if (isLoadingMenu || isLoadingAppInfo) {
    return /* @__PURE__ */ jsxRuntime.jsx(Theme.Page.Loading, {});
  }
  return /* @__PURE__ */ jsxRuntime.jsxs(
    Theme.AppInfoProvider,
    {
      ...appInfo,
      userId,
      latestStrapiReleaseTag: tagName,
      shouldUpdateStrapi: checkLatestStrapiVersion(strapiVersion, tagName),
      children: [
        /* @__PURE__ */ jsxRuntime.jsx(index.NpsSurvey, {}),
        /* @__PURE__ */ jsxRuntime.jsx(PluginsInitializer, { children: /* @__PURE__ */ jsxRuntime.jsx(reactDnd.DndProvider, { backend: reactDndHtml5Backend.HTML5Backend, children: /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { background: "neutral100", children: [
          /* @__PURE__ */ jsxRuntime.jsx(designSystem.SkipToContent, { children: formatMessage({ id: "skipToContent", defaultMessage: "Skip to content" }) }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Flex, { alignItems: "flex-start", children: [
            /* @__PURE__ */ jsxRuntime.jsx(
              LeftMenu,
              {
                generalSectionLinks,
                pluginsSectionLinks
              }
            ),
            /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Box, { flex: 1, children: [
              /* @__PURE__ */ jsxRuntime.jsx(reactRouterDom.Outlet, {}),
              /* @__PURE__ */ jsxRuntime.jsx(GuidedTourModal, {}),
              showTutorials && /* @__PURE__ */ jsxRuntime.jsx(Onboarding, {})
            ] })
          ] })
        ] }) }) })
      ]
    }
  );
};
const PrivateAdminLayout = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(PrivateRoute.PrivateRoute, { children: /* @__PURE__ */ jsxRuntime.jsx(AdminLayout, {}) });
};
const checkLatestStrapiVersion = (currentPackageVersion, latestPublishedVersion = "") => {
  if (!valid__default.default(currentPackageVersion) || !valid__default.default(latestPublishedVersion)) {
    return false;
  }
  return lt__default.default(currentPackageVersion, latestPublishedVersion);
};

exports.AdminLayout = AdminLayout;
exports.PrivateAdminLayout = PrivateAdminLayout;
//# sourceMappingURL=AuthenticatedLayout-I8iKtB9Z.js.map
