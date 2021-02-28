# Jose Template

Using panva/jose in node and in the browser.

Rollup breaks since it resolves the es module even though `browser: true` is set.

So webpack needs to be used to resolve the browser field.

```json
// in jose/package.json
"exports": {
"./jwk/parse": {
    "browser": "./dist/browser/jwk/parse.js",
    "import": "./dist/node/esm/jwk/parse.js",
    "require": "./dist/node/cjs/jwk/parse.js"
```

## License

[MIT](LICENSE).
