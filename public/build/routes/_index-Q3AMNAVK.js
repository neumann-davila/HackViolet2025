import {
  Container_default,
  Typography_default
} from "/build/_shared/chunk-O2QCMDBM.js";
import {
  theme_default
} from "/build/_shared/chunk-WJVFBMPA.js";
import "/build/_shared/chunk-B43JI2TA.js";
import {
  require_jsx_dev_runtime
} from "/build/_shared/chunk-XGOTYLZ5.js";
import {
  createHotContext
} from "/build/_shared/chunk-GBXQP5FO.js";
import "/build/_shared/chunk-UWV35TSL.js";
import "/build/_shared/chunk-U4FRFQSK.js";
import {
  require_react
} from "/build/_shared/chunk-7M6SC7J5.js";
import {
  __toESM
} from "/build/_shared/chunk-PNG5AS42.js";

// app/routes/_index.tsx
var React = __toESM(require_react());
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\routes\\\\_index.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\routes\\_index.tsx"
  );
  import.meta.hot.lastModified = "1738428568427.7097";
}
var meta = () => [{
  title: "Remix with Material UI"
}, {
  name: "Fun Little Template",
  content: "Welcome to my site!"
}];
function Index() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(React.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { disableGutters: true, maxWidth: "xl", sx: {
      display: {
        xs: "none",
        sm: "none",
        md: "grid"
      },
      mt: 16
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h2", component: "h1", sx: {
        fontWeight: 500,
        pb: 3,
        mb: 4,
        borderBottom: `2px solid ${theme_default.palette.divider}`
      }, children: "Hello World!" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 44,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", children: "Fun Template Stuff" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 52,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { disableGutters: true, maxWidth: "xl", sx: {
      display: {
        xs: "none",
        sm: "grid",
        md: "none",
        lg: "none",
        xl: "none"
      },
      mt: 12
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h3", component: "h1", sx: {
        fontWeight: 500,
        pb: 2,
        mb: 3,
        borderBottom: `2px solid ${theme_default.palette.divider}`
      }, children: "Hello World!" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 69,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", children: "Fun Template Stuff" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 59,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { disableGutters: true, maxWidth: "xl", sx: {
      display: {
        xs: "grid",
        sm: "none",
        md: "none",
        lg: "none",
        xl: "none"
      },
      mt: 8
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", component: "h1", sx: {
        fontWeight: 500,
        pb: 1,
        mb: 2,
        borderBottom: `2px solid ${theme_default.palette.divider}`
      }, children: "Hello World!" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 94,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h4", children: "Fun Template Stuff" }, void 0, false, {
        fileName: "app/routes/_index.tsx",
        lineNumber: 102,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/routes/_index.tsx",
      lineNumber: 84,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}
_c = Index;
var _c;
$RefreshReg$(_c, "Index");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  Index as default,
  meta
};
//# sourceMappingURL=/build/routes/_index-Q3AMNAVK.js.map
