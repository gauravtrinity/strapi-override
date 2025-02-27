import { jsx, jsxs } from "react/jsx-runtime";
const styles = `
.strapi--root {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #fff;
}

.strapi--no-js {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  font-family: helvetica, arial, sans-serif;
}
`;
const NoJavascript = () => {
  return /* @__PURE__ */ jsx("noscript", { children: /* @__PURE__ */ jsx("div", { className: "strapi--root", children: /* @__PURE__ */ jsxs("div", { className: "strapi--no-js", children: [
    /* @__PURE__ */ jsx("style", { type: "text/css", children: styles }),
    /* @__PURE__ */ jsx("h1", { children: "JavaScript disabled" }),
    /* @__PURE__ */ jsxs("p", { children: [
      "Please ",
      /* @__PURE__ */ jsx("a", { href: "https://www.enable-javascript.com/", children: "enable JavaScript" }),
      " in your browser and reload the page to proceed."
    ] })
  ] }) }) });
};
const globalStyles = `
  html,
  body,
  #strapi {
    height: 100%;
  }
  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
  }
`;
const DefaultDocument = ({ entryPath }) => {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" }),
      /* @__PURE__ */ jsx("meta", { name: "robots", content: "noindex" }),
      /* @__PURE__ */ jsx("meta", { name: "referrer", content: "same-origin" }),
      /* @__PURE__ */ jsx("title", { children: "ScoreMe Admin" }),
      /* @__PURE__ */ jsx("style", { children: globalStyles })
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx("div", { id: "strapi" }),
      /* @__PURE__ */ jsx(NoJavascript, {}),
      entryPath ? /* @__PURE__ */ jsx("script", { type: "module", src: entryPath }) : null
    ] })
  ] });
};
export {
  DefaultDocument
};
//# sourceMappingURL=_internal.mjs.map
