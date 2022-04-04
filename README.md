# Spectral Demo

This is a demo project to show how to use Spectral programmatically. 

It tries to lint a yaml text with rulesets from `@stoplight/spectral-rulesets`.


## Known issues

- https://github.com/microsoft/TypeScript/issues/33079
  - workaround: delete exports from package.json and `import {xxx} from @stoplight/spectral-ruleset-bundler/dist/loader/node`
