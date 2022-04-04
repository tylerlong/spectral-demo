import {Spectral, Document, Ruleset} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers';
import {oas, asyncapi} from '@stoplight/spectral-rulesets';
import {readFileSync} from 'fs';
import {join} from 'path';
import {load} from 'js-yaml';

const myDocument = new Document(
  readFileSync(join(__dirname, 'spec.yml'), 'utf-8').trim(),
  Yaml,
  'spec.yml'
);

const customRules = load(
  readFileSync(join(__dirname, '.spectral.yml'), 'utf-8').trim()
) as any;

const spectral = new Spectral();
spectral.setRuleset({
  ...asyncapi,
  ...oas,
  ...customRules,
} as unknown as Ruleset);

const main = async () => {
  const issues = await spectral.run(myDocument);
  console.log(JSON.stringify(issues, null, 2));
};

main();
