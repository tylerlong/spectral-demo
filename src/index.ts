import {Spectral, Document} from '@stoplight/spectral-core';
import {Yaml} from '@stoplight/spectral-parsers'; // make sure to install the package if you intend to use default parsers!
import {truthy} from '@stoplight/spectral-functions'; // this has to be installed as well

const myDocument = new Document(
  `---
responses:
  '200':
    description: ''`,
  Yaml,
  '/my-file'
);

const spectral = new Spectral();
spectral.setRuleset({
  // a ruleset has to be provided
  rules: {
    'no-empty-description': {
      given: '$..description',
      message: 'Description must not be empty',
      then: {
        function: truthy,
      },
    },
  },
});

const main = async () => {
  const result = await spectral.run(myDocument);
  console.log(JSON.stringify(result, null, 2));
};

main();
