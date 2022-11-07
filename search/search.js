[{
  $search: /**
 * index: The name of the Search index.
 * text: Analyzed search, with required fields of query and path, the analyzed field(s) to search.
 * term: Un-analyzed search.
 * compound: Combines ops.
 * span: Find in text field regions.
 * exists: Test for presence of a field.
 * near: Find near number or date.
 * range: Find in numeric or date range.
 */
{
  "compound": {
    "should": [{
      "text": {
        "query": "funny",
        "path": "plot"
      }
    },
    {
      "text": {
        "query": "funny",
        "path": "title",
        "score": { "boost": { "value": 3 } }
      }
    }]
  }
}
},
{
  $project: /**
 * specifications: The fields to
 *   include or exclude.
 */
{
  title: 1, 
  plot: 1,
  score: {$meta: "searchScore"}
}
}
]