# Demo for the DEV hackathon

## Change Streams

Create a new database "DEV", and collection "changeStream"
Create a trigger (use a different way than Mira (App Services vs Atlas))
* Type: Scheduled
* Name: addDocumentToCollection
* Link Data Source: FreeCluster (then click Link)
* Add function code (from `addDocumentToCollection.function.js`)
  * Note: Change cluster, database, and collection name on line 30 if needed

A new document will be inserted every minute. Let's create a website that shows this new document every time it gets added.

Create a new app in App Services if needed.
Add Authentication
* Go to the authentication page from the left nav
* Edit anonymous authentication
* Toggle the button to enable and click Save

Add Rules data access
* Go to the rules page from the left nav
* Select the DEV database and changeStream collection
* Choose readAndWriteAll and click Add preset role

Deploy the application
Copy the Application ID

Create file `index.html`, run a local server. 
Change the application id (line 21)
Refresh the page
Within a minute, the page should update with the current time.

# Atlas Search

> **Note**
> A search index should be pre-created on the `movies` collection from `sample_mflix`

Go to the `restaurants` collection from `sample_restaurants`.
Click on "Search Indexes"
Create a new Search index
Keep defaults, and create

This takes about 90 seconds. Talk about data sync with Lucene.

If the index is ready: Query the data using the Search Tester
Show query syntax

Go to Database -> Connect -> Compass
Open Compass and introduce the Aggregation Pipeline builder.

Build the `demoAggregation.js` pipeline on the `movies` collection.
Show how to export to code with driver syntax.

Create a new pipeline to search for a movie title.

```
{
  $match: {
    title: "Harry Potter"
  }
}
```
(No results)

```
{
  $match: {
    title: {$regex: /Harry Potter/}
  }
}
```

Search for Harry Potter and the Sorcerer's Stone
```
{
  $match: {
    title: {$regex: /Har*[iy] P[ao]t*er.*Sorcerer/}
  }
}
```

This query is slow, and users won't be able to type in regexes.
Use $search instead

```
{
  index: 'default',
  text: {
    query: 'Harry Potter Sorcerer',
    path: 'title'
  }
}
```

Try with Harry Potter alone
Try with genres: "Comedy"
Show case insensitive with "comedy"
Get movies with "funny" anywhere

```
{
  index: 'default',
  text: {
    query: 'funny',
    path: { wildcard: "*" }
  }
}
```

Add custom score to boost funny in the title.

Start by adding a projection to see the search score
```
{
  title: 1, 
  plot: 1,
  score: {$meta: "searchScore"}
}
```

Now edit the search to use `search.js`