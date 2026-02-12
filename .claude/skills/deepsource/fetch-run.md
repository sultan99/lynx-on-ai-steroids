# Fetch Issues from Analysis Run

Fetches issues from a specific DeepSource analysis run via the GraphQL API — required for run-scoped data like test-coverage issues.

## Sub-step 1: Extract run UUID

Parse the `--run` value:
- If it's a full URL (contains `/run/`), extract the UUID segment after `/run/` (strip any trailing path like `/test-coverage`)
- If it's already a UUID, use it directly

## Sub-step 2: Fetch via GraphQL

```bash
TOKEN=$(grep "^token " ~/.deepsource/config.toml | sed 's/.*= *"//;s/".*//')
RUN_UID="<extracted-uuid>"
LIMIT=30  # or --limit value
curl -s "https://api.deepsource.io/graphql/" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"query":"{ run(runUid: \"'$RUN_UID'\") { checks(first: 10) { edges { node { analyzer { shortcode } occurrences(first: '$LIMIT') { totalCount edges { node { issue { shortcode title } path beginLine endLine } } } } } } } }"}' \
  -o /tmp/deepsource-graphql-raw.json
```

## Sub-step 3: Transform to CLI JSON format

Convert the GraphQL response to the same JSON structure the CLI produces, so the review workflow continues unchanged:

```bash
ANALYZER_FILTER="<--analyzer value or empty>" node -e "
const raw = require('/tmp/deepsource-graphql-raw.json');
if (raw.errors) { console.error(JSON.stringify(raw.errors)); process.exit(1); }
const filter = process.env.ANALYZER_FILTER || '';
const occurences = [];
for (const check of raw.data.run.checks.edges) {
  const analyzer = check.node.analyzer.shortcode;
  if (filter && analyzer !== filter) continue;
  for (const occ of check.node.occurrences.edges) {
    occurences.push({
      analyzer,
      issue_code: occ.node.issue.shortcode,
      issue_title: occ.node.issue.title,
      occurence_title: occ.node.issue.title,
      issue_category: '',
      location: { path: occ.node.path,
        position: {
          begin: { line: occ.node.beginLine, column: 0 },
          end: { line: occ.node.endLine, column: 0 } } }
    });
  }
}
const result = { occurences, summary: { total_occurences: occurences.length, unique_issues: new Set(occurences.map(o => o.issue_code)).size } };
require('fs').writeFileSync('/tmp/deepsource-issues.json', JSON.stringify(result, null, 2));
"
```

Output is written to `/tmp/deepsource-issues.json` — return to `review.md` Step 2.
