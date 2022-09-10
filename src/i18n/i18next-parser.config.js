// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ns, defaultNS, nsSeparator, pluralSeparator, interpolation } = require("./i18n.config");

module.exports = {
  createOldCatalogs: false,
  defaultNamespace: defaultNS,
  defaultValue: "",
  indentation: 2,
  keepRemoved: false,
  keySeparator: false,
  lexers: {
    js: ["JavascriptLexer"],
    ts: ["JavascriptLexer"],
    jsx: ["JsxLexer"],
    tsx: ["JsxLexer"],
    default: ["JavascriptLexer"],
  },
  lineEnding: "lf",
  locales: ["en", "ua"],
  namespaceSeparator: nsSeparator,
  output: "src/i18n/$LOCALE/$NAMESPACE.json",
  pluralSeparator,
  input: ["../**/*.{ts,tsx}"],
  sort: (a, b) => (a > b ? 1 : -1),
  skipDefaultValues: true,
  useKeysAsDefaultValue: false,
  verbose: true,
  failOnWarnings: false,
  failOnUpdate: false,
  customValueTemplate: null,
  resetDefaultValueLocale: null,
  i18nextOptions: {
    ns,
    interpolation,
  },
};
