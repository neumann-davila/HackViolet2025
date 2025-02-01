import {
  ClientStyleContext_default
} from "/build/_shared/chunk-F3P7VWJ7.js";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  init_dist,
  isRouteErrorResponse,
  useNavigate,
  useRouteError
} from "/build/_shared/chunk-FJL4OTCY.js";
import {
  AppBar_default,
  Button_default,
  Container_default,
  MenuItem_default,
  Menu_default,
  SvgIcon_default,
  Toolbar_default,
  Typography_default,
  createSvgIcon,
  useEnhancedEffect_default
} from "/build/_shared/chunk-O2QCMDBM.js";
import {
  theme_default,
  withEmotionCache
} from "/build/_shared/chunk-WJVFBMPA.js";
import {
  require_jsx_runtime
} from "/build/_shared/chunk-B43JI2TA.js";
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

// app/root.tsx
var React2 = __toESM(require_react());

// app/src/appBar.tsx
var React = __toESM(require_react());
init_dist();

// node_modules/@mui/icons-material/esm/utils/createSvgIcon.js
"use client";

// node_modules/@mui/icons-material/esm/KeyboardArrowDown.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
"use client";
var KeyboardArrowDown_default = createSvgIcon(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
  d: "M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
}), "KeyboardArrowDown");

// app/src/appBar.tsx
var import_jsx_dev_runtime = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\src\\\\appBar.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\src\\appBar.tsx"
  );
  import.meta.hot.lastModified = "1738428570394.3596";
}
function WebsiteIcon() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SvgIcon_default, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 24H0V0H12L5.73913 12.2553L12 24Z", fill: "#8AA96A" }, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 34,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", { d: "M12 24V0L24 24H12Z", fill: "#C2D7AD" }, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 35,
      columnNumber: 9
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 33,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 32,
    columnNumber: 10
  }, this);
}
_c = WebsiteIcon;
var menuItems = [{
  name: "Blog",
  link: "/blog"
}, {
  name: "Projects",
  link: "/projects"
}];
function DropDownMenu() {
  _s();
  const navigate = useNavigate();
  const buttonRef = React.useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [buttonWidth, setButtonWidth] = React.useState(0);
  React.useEffect(() => {
    if (buttonRef.current) {
      setButtonWidth(buttonRef.current.offsetWidth);
    }
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenuItemClick = (link, name) => {
    navigate(link);
    handleClose();
  };
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button_default, { ref: buttonRef, sx: {
      borderRadius: "8px",
      // Rounded corners
      paddingTop: 0.1,
      paddingBottom: 0.1,
      paddingLeft: 1.5,
      paddingRight: 1.5,
      border: `1px solid ${theme_default.palette.divider}`,
      color: "#fef9ec",
      // Text color
      fontWeight: "bold",
      textTransform: "none"
    }, onClick: handleClick, endIcon: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyboardArrowDown_default, {}, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 81,
      columnNumber: 39
    }, this), children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h6", children: "Menu" }, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 82,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 69,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Menu_default, { anchorEl, open: Boolean(anchorEl), onClose: handleClose, slotProps: {
      paper: {
        style: {
          width: buttonWidth,
          backgroundColor: theme_default.palette.background.paper
        }
      }
    }, children: menuItems.map((item) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MenuItem_default, { onClick: () => handleMenuItemClick(item.link, item.name), children: item.name }, item.name, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 94,
      columnNumber: 32
    }, this)) }, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 86,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 68,
    columnNumber: 10
  }, this);
}
_s(DropDownMenu, "ZImdTTXdunk8bwqfA39aqompA6I=", false, function() {
  return [useNavigate];
});
_c2 = DropDownMenu;
function ResponsiveAppBar() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AppBar_default, { position: "static", color: "transparent", sx: {
    borderBottom: `1px solid ${theme_default.palette.divider}`,
    boxShadow: "none"
  }, children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Container_default, { maxWidth: "xl", children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Toolbar_default, { disableGutters: true, sx: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { style: {
      display: "flex",
      alignItems: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WebsiteIcon, {}, void 0, false, {
        fileName: "app/src/appBar.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Typography_default, { variant: "h5", noWrap: true, component: "a", href: "/", sx: {
        ml: 2,
        mr: 2,
        display: "flex",
        fontWeight: 500,
        color: "inherit",
        textDecoration: "none"
      }, children: "Remix with Material UI" }, void 0, false, {
        fileName: "app/src/appBar.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropDownMenu, {}, void 0, false, {
      fileName: "app/src/appBar.tsx",
      lineNumber: 131,
      columnNumber: 11
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 110,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 109,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/src/appBar.tsx",
    lineNumber: 105,
    columnNumber: 10
  }, this);
}
_c3 = ResponsiveAppBar;
var appBar_default = ResponsiveAppBar;
var _c;
var _c2;
var _c3;
$RefreshReg$(_c, "WebsiteIcon");
$RefreshReg$(_c2, "DropDownMenu");
$RefreshReg$(_c3, "ResponsiveAppBar");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/src/Layout.tsx
var import_jsx_dev_runtime2 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\src\\\\Layout.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\src\\Layout.tsx"
  );
  import.meta.hot.lastModified = "1738426629406.9292";
}
function Layout({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Container_default, { maxWidth: false, disableGutters: true, children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(appBar_default, {}, void 0, false, {
      fileName: "app/src/Layout.tsx",
      lineNumber: 28,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime2.jsxDEV)(Container_default, { maxWidth: "xl", sx: {
      marginTop: "8px"
    }, children }, void 0, false, {
      fileName: "app/src/Layout.tsx",
      lineNumber: 29,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/src/Layout.tsx",
    lineNumber: 27,
    columnNumber: 10
  }, this);
}
_c4 = Layout;
var _c4;
$RefreshReg$(_c4, "Layout");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

// app/root.tsx
var import_jsx_dev_runtime3 = __toESM(require_jsx_dev_runtime());
if (!window.$RefreshReg$ || !window.$RefreshSig$ || !window.$RefreshRuntime$) {
  console.warn("remix:hmr: React Fast Refresh only works when the Remix compiler is running in development mode.");
} else {
  prevRefreshReg = window.$RefreshReg$;
  prevRefreshSig = window.$RefreshSig$;
  window.$RefreshReg$ = (type, id) => {
    window.$RefreshRuntime$.register(type, '"app\\\\root.tsx"' + id);
  };
  window.$RefreshSig$ = window.$RefreshRuntime$.createSignatureFunctionForTransform;
}
var prevRefreshReg;
var prevRefreshSig;
var _s2 = $RefreshSig$();
var _s22 = $RefreshSig$();
if (import.meta) {
  import.meta.hot = createHotContext(
    //@ts-expect-error
    "app\\root.tsx"
  );
  import.meta.hot.lastModified = "1738426629400.8726";
}
var Document = _s2(withEmotionCache(_c5 = _s2(({
  children,
  title
}, emotionCache) => {
  _s2();
  const clientStyleData = React2.useContext(ClientStyleContext_default);
  useEnhancedEffect_default(() => {
    emotionCache.sheet.container = document.head;
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      emotionCache.sheet._insertTag(tag);
    });
    clientStyleData.reset();
  }, []);
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("html", { lang: "en", children: [
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("head", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { charSet: "utf-8" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 53,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "viewport", content: "width=device-width,initial-scale=1" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 54,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "theme-color", content: theme_default.palette.primary.main }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 55,
        columnNumber: 9
      }, this),
      title ? /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("title", { children: title }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 56,
        columnNumber: 18
      }, this) : null,
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Meta, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Links, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 58,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 60,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("link", { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Petrona:ital,wght@0,100..900;1,100..900&display=swap" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("meta", { name: "emotion-insertion-point", content: "emotion-insertion-point" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 52,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("body", { children: [
      children,
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(ScrollRestoration, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 66,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Scripts, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 67,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(LiveReload, {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 64,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "app/root.tsx",
    lineNumber: 51,
    columnNumber: 10
  }, this);
}, "DLeJk/J5GiFhAF52FJ/3oWg5qx4=", false, function() {
  return [useEnhancedEffect_default];
})), "DLeJk/J5GiFhAF52FJ/3oWg5qx4=", false, function() {
  return [useEnhancedEffect_default];
});
_c22 = Document;
function App() {
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Outlet, {}, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 83,
    columnNumber: 9
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 82,
    columnNumber: 7
  }, this) }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 81,
    columnNumber: 10
  }, this);
}
_c32 = App;
function ErrorBoundary() {
  _s22();
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    let message;
    switch (error.status) {
      case 401:
        message = /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "Oops! Looks like you tried to visit a page that you do not have access to." }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 97,
          columnNumber: 19
        }, this);
        break;
      case 404:
        message = /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "Oops! Looks like you tried to visit a page that does not exist." }, void 0, false, {
          fileName: "app/root.tsx",
          lineNumber: 100,
          columnNumber: 19
        }, this);
        break;
      default:
        throw new Error(error.data || error.statusText);
    }
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { title: `${error.status} ${error.statusText}`, children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Layout, { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: [
        error.status,
        ": ",
        error.statusText
      ] }, void 0, true, {
        fileName: "app/root.tsx",
        lineNumber: 107,
        columnNumber: 11
      }, this),
      message
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 106,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 105,
      columnNumber: 12
    }, this);
  }
  if (error instanceof Error) {
    console.error(error);
    return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Document, { title: "Error!", children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)(Layout, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "There was an error" }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 119,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: error.message }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 120,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("hr", {}, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 121,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("p", { children: "Hey, developer, you should replace this with what you want your users to see." }, void 0, false, {
        fileName: "app/root.tsx",
        lineNumber: 122,
        columnNumber: 13
      }, this)
    ] }, void 0, true, {
      fileName: "app/root.tsx",
      lineNumber: 118,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 117,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "app/root.tsx",
      lineNumber: 116,
      columnNumber: 12
    }, this);
  }
  return /* @__PURE__ */ (0, import_jsx_dev_runtime3.jsxDEV)("h1", { children: "Unknown Error" }, void 0, false, {
    fileName: "app/root.tsx",
    lineNumber: 127,
    columnNumber: 10
  }, this);
}
_s22(ErrorBoundary, "oAgjgbJzsRXlB89+MoVumxMQqKM=", false, function() {
  return [useRouteError];
});
_c42 = ErrorBoundary;
var _c5;
var _c22;
var _c32;
var _c42;
$RefreshReg$(_c5, "Document$withEmotionCache");
$RefreshReg$(_c22, "Document");
$RefreshReg$(_c32, "App");
$RefreshReg$(_c42, "ErrorBoundary");
window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;
export {
  ErrorBoundary,
  App as default
};
//# sourceMappingURL=/build/root-BUJCRLLD.js.map
