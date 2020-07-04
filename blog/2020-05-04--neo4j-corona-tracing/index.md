---
date: "2020-05-04"
title: "Neo4j Corona Tracing"
categories:
  - Databases

---

![Shenzhen, China](./photo-kt443t6d_64hdh43hfh6dgjdfhg4_d.jpg)


<!-- TOC -->

- [Installing Neo4j Desktop](#installing-neo4j-desktop)
- [Importing Data](#importing-data)

<!-- /TOC -->



## Installing Neo4j Desktop

Download the latest version of the [Neo4j Desktop](https://neo4j.com/download-thanks-desktop/) AppImage and make it executable:


```bash
chmod a+x neo4j-desktop-offline-1.2.9-x86_64.AppImage
```

Then run it from your Terminal `./neo4j-desktop-offline-1.2.9-x86_64.AppImage`.

## Importing Data

1. Create a new Project
2. Create a new Database and choose Create local Graph
3. Give your local Database a name and password
4. Click manage database and open folder - copy your .csv file into the Import directory
5. Click Start to start up the database
6. Import all data


```bash
LOAD CSV WITH HEADERS FROM "file:///gotb3.csv" AS line
WITH line
MERGE (Perpetrator:Character{name:line.Perpetrator, house:line.PerpHouse})
MERGE (Victim:Character{name:line.Victim, house:line.VictimHouse})
MERGE (Perpetrator)-[betrayal:Betrayal{
`Betrayal Description`:line.Betrayal, 
`Relationship perp-victim`:line.`Relationship Perp-Victim`, 
`Immediate Consequence`: CASE WHEN line.`Immediate Consequence` IS NOT NULL THEN line.`Immediate Consequence`
 ELSE '' END,
Location: CASE WHEN line.Geography IS NOT NULL THEN line.Geography ELSE '' END
}]->(Victim)
```

How many betrayals


```bash
MATCH (person:Character)-[rel:Betrayal]->(:Character)
RETURN COUNT (rel)
```

How many Characters of House Lannister


```bash
MATCH (character:Character)
WHERE character.house = 'Lannister'
RETURN character
```


How many betrayed Ned Stark

```bash
MATCH (perp)-[r:Betrayal]->(victim:Character{name:'Ned'})
RETURN perp, victim, r
```

How many were betrayed by Cersei

```bash
MATCH (perp:Character{name:'Cersei'})-[r:Betrayal]->(victim:Character)
RETURN COUNT (victim) AS Victims
```

Ommit double-count:


```bash
MATCH (perp:Character{name:'Cersei'})-[r:Betrayal]->(victim:Character)
RETURN COUNT (DISTINCT victim) AS Victims
```


Select all and order by number of betrayals:


```bash
MATCH (perp:Character)-[rel:Betrayal]->(victim:Character)
RETURN perp, COUNT(perp) AS Betrayals
ORDER BY Betrayals DESC
LIMIT 3
```


Select perpetrator with highest number of betrayals - like above - but list all his victims:


```bash
MATCH (n)-[b:Betrayal]->(m)
WITH n, COUNT((n)-[]->()) as num
ORDER BY num DESC
LIMIT 1
MATCH (n)-[r]->(b)
RETURN n,r,b
```

1. Select all betrayals save the perpetrators and the number of betrayals.
2. Oder perpetrators in descending order of number of betrayals and limit results to 1
3. Take this perpetrator and select all his victims and return them


Show the person who was betrayed the most:


```bash
MATCH (character:Character)-[rel:Betrayal]->(victim:Character)
RETURN victim, COUNT(*) AS Betrayals
ORDER BY Betrayals DESC
LIMIT 1
```


Who betrayed the person who was betrayed the most:


```bash
MATCH (character:Character)-[rel:Betrayal]->(victim:Character)
WITH victim, COUNT(*) AS Betrayals
ORDER BY Betrayals DESC
LIMIT 1
MATCH (victim:Character)<-[r]-(p)
RETURN victim, r, p
```

Who in House Lannister did not Betray anyone

```bash
MATCH (a)
WHERE NOT(a:Character)-[:Betrayal]->()
AND a.house = "Lannister"
RETURN a
```


Select traitor that betrayed his own house the most:


```bash
MATCH (traitor:Character)-[r]->(victim:Character)
WHERE traitor.house = victim.house
WITH traitor, COUNT(*) as Betrayals
ORDER BY Betrayals DESC
LIMIT 2
MATCH (v:Character)<-[r]-(traitor)
RETURN v,r,traitor
```


Path of betrayal between Sansa and Ned Stark


```bash
MATCH path=(b:Character{name:'Sansa'})-[*]->(a:Character{name:'Ned'})
RETURN path
```