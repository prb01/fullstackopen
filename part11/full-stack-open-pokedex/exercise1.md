Some common steps in a CI setup include linting, testing, and building. What are the specific tools for taking care of these steps in the ecosystem of the language you picked? You can search for the answers by google.

>>Language: Ruby
>>Linting: Rubocop, ruby -wc, reek
>>Testing: RSpec
>>Building: N/A

What alternatives are there to set up the CI besides Jenkins and GitHub Actions? Again, you can ask google!
>>GitLab, Travis CI, Buddy, AWS CodePipeline

Would this setup be better in a self-hosted or a cloud-based environment? Why? What information would you need to make that decision?
>>Likely cloud-based env (to start at least). The team is relatively small and
the application hasn't been deployed yet (e.g. no 1st deployment). However, 
some factors that may affect the choice are:
1) How long is the build time?
2) What is the complexity of the CI going to be?
3) Is the app & team expected to scale significantly in short-term?
