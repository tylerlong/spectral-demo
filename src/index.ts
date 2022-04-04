import {Spectral, Document, Ruleset} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers';
import {oas, asyncapi} from '@stoplight/spectral-rulesets';
import {readFileSync} from 'fs';
import {join} from 'path';

const myDocument = new Document(
  readFileSync(join(__dirname, 'spec.yml'), 'utf-8').trim(),
  Yaml,
  'spec.yml'
);

const spectral = new Spectral();
spectral.setRuleset({...asyncapi, ...oas} as unknown as Ruleset);

const main = async () => {
  const issues = await spectral.run(myDocument);
  console.log(JSON.stringify(issues, null, 2));
};

main();
