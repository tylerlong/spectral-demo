import {Spectral, Document, Ruleset} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers';
import {readFileSync} from 'fs';
import {join} from 'path';
import {bundleAndLoadRuleset} from '@stoplight/spectral-ruleset-bundler/dist/loader/node';
import * as fs from 'fs';

const myDocument = new Document(
  readFileSync(join(__dirname, 'spec.yml'), 'utf-8').trim(),
  Yaml,
  'spec.yml'
);

const spectral = new Spectral();
const main = async () => {
  const customRules = await bundleAndLoadRuleset(
    join(__dirname, '.spectral.yml'),
    {
      fs,
      fetch: {} as any,
    }
  );
  spectral.setRuleset(customRules as unknown as Ruleset);
  const issues = await spectral.run(myDocument);
  console.log(JSON.stringify(issues, null, 2));
};

main();
