import {Spectral, Document} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers';
import {bundleAndLoadRuleset} from '@stoplight/spectral-ruleset-bundler/dist/loader/node';
import {join} from 'path';
import * as fs from 'fs';

const myDocument = new Document(
  fs.readFileSync(join(__dirname, 'spec.yml'), 'utf-8').trim(),
  Yaml,
  'spec.yml'
);

const spectral = new Spectral();
const main = async () => {
  const fakeFS: any = {
    promises: {
      async readFile(filepath: string) {
        if (filepath === '/.spectral-default.yaml') {
          return `extends: ["spectral:oas", "spectral:asyncapi"]
rules:
  ensure-paths-kebab-case:
    description: Paths must be in kebab-case.
    message: '{{description}} (lower case and separated with hyphens)'
    formats: [oas3]
    type: style
    severity: error
    given: $.paths[*]~
    then:
      function: pattern
      functionOptions:
        match: "^(/|[a-z0-9-.]+|{[a-zA-Z0-9]+})+$"`;
        }
        return fs.promises.readFile(filepath);
      },
    },
  };
  // /.spectral-default.yaml is a fake file which doesn't exist
  const customRules = await bundleAndLoadRuleset('/.spectral-default.yaml', {
    // const customRules = await bundleAndLoadRuleset(
    //   join(__dirname, '.spectral.yml'),
    //   {
    fs: fakeFS,
    fetch: globalThis.fetch,
  });
  spectral.setRuleset(customRules as any);
  const issues = await spectral.run(myDocument);
  console.log(JSON.stringify(issues, null, 2));
};

main();
