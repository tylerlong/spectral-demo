import {Spectral, Document, Ruleset} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers'; // make sure to install the package if you intend to use default parsers!
import {oas} from '@stoplight/spectral-rulesets';

const myDocument = new Document(
  `---
responses:
  '200':
    description: ''`,
  Yaml,
  '/my-file'
);

const spectral = new Spectral();
spectral.setRuleset(oas as unknown as Ruleset);

const main = async () => {
  const result = await spectral.run(myDocument);
  console.log(JSON.stringify(result, null, 2));
};

main();
