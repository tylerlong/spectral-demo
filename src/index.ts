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
  const customRules = await bundleAndLoadRuleset(
    join(__dirname, '.spectral.yml'),
    {
      fs,
      fetch: globalThis.fetch,
    }
  );
  spectral.setRuleset(customRules);
  const issues = await spectral.run(myDocument);
  console.log(JSON.stringify(issues, null, 2));
};

main();
