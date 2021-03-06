# The Elastic Stack

## Setup

1. Download the this [repository](https://github.com/deviantony/docker-elk):

```bash
git clone https://github.com/deviantony/docker-elk.git
```

2. Disable paid security features:

```bash
# xpack.license.self_generated.type: trial
xpack.license.self_generated.type: basic
```

By changing your XPack license from `trial` to `basic`: `elasticsearch/config/elasticsearch.yml`.

3. ELK Stack Version

To use a different version of the core Elastic components, simply change the version number inside the `./.env` file.


4. User Login

Open the `./docker-compose.yml` file and take note of the `changeme` password. The default user name is `elastic`. ([Changing your Login](https://github.com/deviantony/docker-elk#initial-setup))


1. Build your stack

```bash
cd ./docker-elk
docker-compose build
```

6. Start Up

```bash
docker-compose up -d
```


You can now access Elasticsearch on `http://localhost:9200`:


![ELK Stack in Docker](./docker-elk_01.png)


and Kibana on `http://localhost:5601`:


![ELK Stack in Docker](./docker-elk_02.png)


7. Shutdown & CleanUp

In order to entirely shutdown the stack and remove all persisted data, use the following Docker Compose command:

```
docker-compose down -v
```



## MAPPING

Continue by creating a mapping for your Elasticsearch index:

```json
PUT /wiki_ssr_en_2020_07_06
{
  "settings": {
    "analysis": {
      "analyzer": {
        "custom_analyzer": {
          "type": "custom",
          "char_filter": [
            "symbol",
            "html_strip"
          ],
          "tokenizer": "punctuation",
          "filter": [
            "lowercase",
            "word_delimiter",
            "english_stop",
            "english_stemmer"
          ]
        }
      },
      "filter": {
        "english_stop": {
          "type": "stop",
          "stopwords": "_english_ "
        },
        "english_stemmer": {
          "type": "stemmer",
          "language": "english"
        }
      },
      "tokenizer": {
        "punctuation": {
          "type": "pattern",
          "pattern": "[.,!?&=_:;']"
        }
      },
      "char_filter": {
        "symbol": {
          "type": "mapping",
          "mappings": [
              "& => and",
              ":) => happy",
              ":( => unhappy",
              "+ => plus"
            ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true"
      },
      "series": {
        "type": "text",
        "index": "false"
      },
      "models": {
        "type": "text",
        "index": "false"
      },
      "description": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true"
      },
      "link": {
        "type": "text",
        "index": "false"
      },
      "title2": {
        "type": "text",
        "analyzer": "german",
        "index": "true"
      },
      "chapters": {
        "type": "text",
        "analyzer": "english",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "tags": {
        "type": "text",
        "analyzer": "english",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "image": {
        "type": "text",
        "index": "false"
      },
      "imagesquare": {
        "type": "text",
        "index": "false"
      },
      "abstract": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true"
      },
      "sublink1": {
        "type": "text",
        "index": "false"
      },
      "sublink2": {
        "type": "text",
        "index": "false"
      },
      "sublink3": {
        "type": "text",
        "index": "false"
      },
      "sublink4": {
        "type": "text",
        "index": "false"
      },
      "subtitle1": {
        "type": "text",
        "index": "false"
      },
      "subtitle2": {
        "type": "text",
        "index": "false"
      },
      "subtitle3": {
        "type": "text",
        "index": "false"
      },
      "subtitle4": {
        "type": "text",
        "index": "false"
      },
      "badge": {
        "type": "text",
        "index": "false"
      }
    }
  }
}
```


Test your Custom Analyzer:

```json
POST /wiki_ssr_en_2020_07_06/_analyze  //Test your custom analyzer - strip HTML + english stopwords + custom characters
{
  "analyzer": "custom_analyzer",
  "text": "<p>This + This is an HTML posting going well, hopefully ? :)</p>. And this is a CGI command: http://admin:instar@192.168.178.88/param.cgi?cmd=setsmtpattr&-ma_ssl=3&-ma_from=cam%40instar.email&-ma_to=me@gmail.com%3B&-ma_subject=Alarm%20Email&-ma_text=ALARM&-ma_server=mx.instar.email&-ma_port=587&-ma_logintype=1&-ma_username=cam%40instar.email&-ma_password=kunde123"
  
}
```



## INDEX

Add Single Post

```json
PUT /wiki_ssr_en_2020_07_06/_doc/documentid
{
  "title": "How Does An IP Camera Work?",
  "series": ["HD", "VGA", "Indoor", "Outdoor"],
  "models": ["IN-2905", "IN-2908", "IN-3011", "IN-4010", "IN-4011", "IN-5905 HD", "IN-5907 HD", "IN-6001 HD", "IN-6012 HD", "IN-6014 HD", "IN-7011 HD"],
  "description": "How does an IP-Camera-Network work? LAN or Wifi connectivity. Remote access to your camera via DDNS (Dynamic Domain Name Service). Internal IP address vs internet address (DDNS). What is the difference between the internal IP (LAN) and the external IP address (WAN). Internal port / external port - How to open a door to the internet (Port Forwarding)",
  "link": "/Quick_Installation/How_Does_An_IP_Camera_Work",
  "title2": "Wie arbeitet eine IP Kamera?",
  "chapters": "Quick Installation",
  "tags": ["Introduction", "Quickinstallation"],
  "image": "/images/Search/QI_SearchThumb_HowDoesAnIPCameraWork.png",
  "abstract": "How do IP Cameras work in my Network"
}
```



### UPDATE

Update only one key pair in document with ID yt-intro:

```json
POST /wiki_ssr_en_2020_07_06/_update/yt-intro
{
  "doc": {
    "image": "/images/Search/InstarWiki_SearchThumb_HowDoesAnIPCameraWork.jpg"
  }
}
```

Update complete document:

```json
PUT /wiki_ssr_en_2020_07_06/_doc/yt-intro
{
  "title": "IP Cameras - An Introduction Video",
  "...": "..."
}
```


### DELETE

Delete only document with ID yt-intro

```bash
DELETE /wiki_ssr_en_2020_07_06/_doc/yt-intro 
```


Delete complete Index

```bash
DELETE /wiki_ssr_en_2020_07_06
```



### BULK

Bulk actions INDEX, UPDATE and DELETE:

```json
POST _bulk
{"index": {"_index": "wiki_ssr_en_2020_07_06", "_id": "yt-intro"}}
{"title": "IP Cameras - An Introduction Video", "description": "How does an IP-Camera work? An IP camera is a complex product, however it is not complicated to operate a INSTAR product. In the following we want to give you an intorduction to the basic functions of an IP camera. For more information about our cameras you can continue reading the FIRST STEPS, where we will dive a little deeper. What is an IP camera and how does it work? The IP in IP-camera stands for Internet Protocol. This implies that the camera is being connected with a network, from which it can be accessed by other devices. The access is not only possible within the same network, but even through the internet. Using our IP cameras works like this: You connect your IP camera via LAN cable or wireless with your router. When your computer or smartphone is connected to the same router, you just type the camera´s IP address into your browsers address bar to access the web user interface (1080P MODELS / 720P MODELS). You can also remotely access your camera through the internet. This is possible via DDNS ADDRESS or via a POINT-TO-POINT connection. When you access your camera, you will enter its Web User Interface 1080P MODELS / 720P MODELS. There you can see the current live video and adjust settings such as alarms, schedules or video configuration. Those settings will be saved on the camera. The camera is opersting 24/7 and will notify you if something moves within the camera´s field of view. How sensitive the camera´s MOTION DETECTION is, and what happens after the alarm was triggered, can be set individually for each camera. Manual or planned recordings following a SCHEDULE are possible as well. This is the basic concept of our cameras. For further information you can check out the FIRST STEPS or you browse our Wiki. Of course you can ask us your unanswered questions PERSONALLY as well.", "sublink1": "/Quick_Installation/How_Does_An_IP_Camera_Work/Video/", "subtitle1": "Video • ", "sublink2": "/Quick_Installation/How_Does_An_IP_Camera_Work/", "subtitle2": "How does an IP Camera Work • ", "sublink3": "/Quick_Installation/", "subtitle3": "Quick Installation", "sublink4": "", "subtitle4": "", "badge": "Video", "title2": "Wie arbeitet eine IP Kamera?", "chapter": "Quick Installation", "tags": ["Introduction", "Quickinstallation"], "image": "/images/Search/QI_SearchThumb_HowDoesAnIPCameraWork.png", "imagesquare": "/images/Search/TOC_Icons/Wiki_Tiles_Youtube_white.png", "short": "How do IP Cameras work in my Network", "abstract": "These videos contain an overview over the basic IP camera features like: LAN or WiFi connectivity and remote access via DDNS and P2P."}
{"index": {"_index": "wiki_ssr_en_2020_07_06", "_id": "yt-powerline"}}
{"title": "Powerline - Introduction Video", "description": "Powerline INSTALLATION Network over your Power Grid IN-LAN is an intelligent and secure technology that lets you set up a home network easily via your household power grid - without the need of complex and expensive dedicated cabling. IN-LAN communication now attains speeds you would expect from other LAN technologies. IN-LAN uses the household power grid to transfer data between computers equipped with suitable adapters and other network components. As a result, any power outlet can be used as a network access point. State-of-the-art technology ensures that the power and data networks do not interfere with one another. Powerline vs Power-over-Ethernet Powerline allows you to connect your camera to your local network over the power grid. The camera still needs to be powered by the included power supply. Power-over-Ethernet combines both the network as well as the power supply in a regular Ethernet cable. You only need a POE INJECTOR or POE SWITCH to add the voltage to the Ethernet cable. What is the difference between IN-LAN 500 & IN-LAN 500p? The P in IN-LAN 500p stands for pass-through. Unlike the base model the 500p will block your power outlet but pass through the existing one. Both models offer the same advantages otherwise: Use existing power lines to implement a network with IN-LAN. Very simple plug&play technology. Just plug into the wall socket and you're done. Ultra-fast data transfer up to 500Mbps. Expand your network with for e.g. IP cameras without laying network cables. A very detailed instruction will make the installation very easy. Installation Warnings Powerline communication will fail. if both adaptors (one at your router / the other for your camera) are not connected to the same phase on your powergrid. The Powerline network can suffer quality issues, if the cables, used in your power grid are old. Always directly plug in your IN-LAN adaptors into a wall socket. Don't use extensions cords.", "sublink1": "/Quick_Installation/Powerline/Video/", "subtitle1": "Video • ", "sublink2": "/Quick_Installation/Powerline/", "subtitle2": "Powerline • ", "sublink3": "/Quick_Installation/", "subtitle3": "Quick Installation", "sublink4": "", "subtitle4": "", "badge": "Video", "title2": "Powerline", "chapter": "Quick Installation", "tags": ["Introduction", "Quickinstallation", "Network", "D-LAN", "IN-LAN", "Homeplug AV", "Devolo"], "image": "/images/Search/QI_SearchThumb_Powerline.png", "imagesquare": "/images/Search/TOC_Icons/Wiki_Tiles_Youtube_white.png", "short": "Network Connection over your Power Grid", "abstract": "IN-LAN is an intelligent and secure technology that lets you set up a home network easily via your household power grid - without the need of complex and expensive dedicated cabling."}
{"update": {"_id": "yt-intro", "_index": "wiki_ssr_en_2020_07_06"}}
{"doc": {"image": "/images/Search/updatedimage.png"}}
{"delete": {"_index": "wiki_ssr_en_2020_07_06", "_id": "yt-powerline"}}
```



## SEARCH

### Cheat Sheet

Return all documents

```bash
GET /wiki_ssr_en_2020_07_06/_search
```


Return all documents from all indices starting with wiki_ssr_en

```bash
GET /wiki_ssr_en*/_search
```


Return all documents from all indices

```bash
GET /_search
```


Return all documents from index 1&2

```bash
GET /index1,index2/_search
```

This request returned 5 documents with the search query `fritzbox` and the article with the highest match has a score of >5.

```json
GET /wiki_ssr_en_2020_07_06/_search?q=fritzbox


{
  "took" : 16,
  "timed_out" : false,
  "_shards" : {
    "total" : 1,
    "successful" : 1,
    "skipped" : 0,
    "failed" : 0
  },
  "hits" : {
    "total" : {
      "value" : 5,
      "relation" : "eq"
    },
    "max_score" : 5.1948776
  }
}
```


Only return documents with search query in it's title

```bash
GET /wiki_ssr_en_2020_07_06/_search?q=title:9008
```


Search query in request body

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": "fritzbox"
    }
  }
}
```


Multiple terms with OR operator

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": "avm fritzbox"
    }
  }
}
```


Multiple terms with AND operator

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_phrase": {
      "title": "avm fritzbox"
    }
  }
}
```

Search as you type - when you want to display suggestions to the user you can use `match_phrase_prefix` in this case the last word the user typed will be understood as a prefix instead of a whole search query.


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match_phrase_prefix": {
            "title": {
              "query": "Heater Install"
            }
          }
        }
      ]
    }
  }
}
```

You can also use `prefix` to match terms that start with the search query


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "prefix": {
      "title": {
        "value": "adjust"
      }
    }
  }
}
```


Multi match more than one field

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "multi_match": {
      "query": "fritzbox",
      "fields": ["title", "tags"]
    }
  }
}
```


Highlight search query in search results:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": "Forward"
    }
  },
  "highlight": {
    "fields": {
      "title": {}
    }
  }
}
```

The search result will now contain an extra field below `_source` allowing you to style the em-tags in your search results:


```json
"highlight" : {
      "title" : [
        "Port <em>Forwarding</em> Digitalisierungsbox Video"
      ]
    }
```


Check if a specific field is present and display all documents that fit:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "exists": {
      "field": "published"
    }
  }
}
```



Bool queries

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [{
        "match": {
          "title": "fritzbox"
        }
      }],
      "must_not": [{
        "match": {
          "title": "forwarding"
        }
      }],
      "should": [{
        "match": {
          "tags": "ftp"
        }
      }]
    }
  }
}
```


Range filter greater-to-equal or lesser-to-equal

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [{
        "match": {
          "title": "fritzbox"
        }
      }],
      "filter": {
        "match": {
          "range": {
            "likes": {
              "gte": 10,
              "lte": 100
            }
          }
        }
      }
    }
  }
}
```


Limit the amount of returned documents (__Note__: the default value in Elasticsearch is `10`!):

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 2
}
```


To paginate through your search results use `from` to set the start point:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 2,
  "from": 2
}
```


Limit the source output to values you are interested in:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 2,
  "_source": ["title*", "abstract", "*link*"]
}
```

Or the other way around - use excludes:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 2,
  "_source": {
      "excludes": "*link*"
  }
}
```

Sort your search results (default is by relevancy) - this example fails, see reason below:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 2,
  "sort": [
    {
      "title": {
        "order": "desc"
      }
    }
  ]
}
```


> Text fields are not optimised for operations that require per-document field data like aggregations and sorting, so these operations are disabled by default. Please use a keyword field instead. Alternatively, set `fielddata=true` on [title] in order to load field data by uninverting the inverted index. Note that this can use significant memory.


Our mapping sets `chapter` and `tags` to be a keyword fields that are not analyzed - we can use them to sort our results:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match_all": {}
  },
  "size": 5,
  "_source": [
    "chapter",
    "tags"
  ],
  "sort": [
    {
      "chapters.raw": {
        "order": "desc"
      }
    },
    {
      "tags.raw": {
        "order": "desc"
      }
    }
  ]
}
```


Use the AND operator to get exact results (matched to all keywords you provide - default behaviour is OR):


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": "avm fritzbox wireless protected setup"
    }
  }
}
```



This query returns 10 results for documents that have either of those search keywords in their title. Let's change this query to the AND operator to get only the documents that has all of those keywords in it's title:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": {
        "query": "avm fritzbox wireless protected setup",
        "operator": "and"
      }
    }
  }
}
```

This only returns 1 document with the exact title. __Note__: that Elasticsearch uses the same analyzer for your search query that were used for this field in your document. Since `title` uses our custom analyzer all english stop words will be scrubbed - this might lead to different search results. You can also make this query a little bit more fuzzy by defining a number of terms that have to match:



```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": {
        "query": "avm fritzbox wireless protected setup",
        "minimum_should_match": 3
      }
    }
  }
}
```


Or use a relative match:

```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "title": {
        "query": "avm fritzbox wireless protected setup",
        "minimum_should_match": "75%"
      }
    }
  }
}
```


Weighting your search queries to prefer hits in certain fields:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "multi_match": {
      "query": "ASUS",
      "fields": [
        "tag^10",
        "title^9",
        "abstract^7",
        "description^5"
      ]
    }
  }
}
```


Or boost a match clause in your query:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "should": [
        {
          "match": {
            "title": {
              "query": "installation",
              "boost": 3
            }
          }
        },
        {
          "match": {
            "abstract": {
              "query": "installation"
            }
          }
        }
      ]
    }
  }
}
```


If you want to provide a boost factor during index time, you can modify your mapping:


```json
PUT /wiki_ssr_en_2020_07_06
{
  "settings": {
    "analysis": {
      "analyzer": {
        "custom_analyzer": {
          "type": "custom",
          "char_filter": [
            "symbol",
            "html_strip"
          ],
          "tokenizer": "punctuation",
          "filter": [
            "lowercase",
            "word_delimiter",
            "english_stop",
            "english_stemmer"
          ]
        }
      },
      "filter": {
        "english_stop": {
          "type": "stop",
          "stopwords": "_english_ "
        },
        "english_stemmer": {
          "type": "stemmer",
          "language": "english"
        }
      },
      "tokenizer": {
        "punctuation": {
          "type": "pattern",
          "pattern": "[.,!?&=_:;']"
        }
      },
      "char_filter": {
        "symbol": {
          "type": "mapping",
          "mappings": [
              "& => and",
              ":) => happy",
              ":( => unhappy",
              "+ => plus"
            ]
        }
      }
    }
  },
  "mappings": {
    "properties": {
      "title": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true",
        "boost": 9
      },
      "series": {
        "type": "text",
        "index": "false"
      },
      "models": {
        "type": "text",
        "index": "false"
      },
      "description": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true",
        "boost": 3
      },
      "link": {
        "type": "text",
        "index": "false"
      },
      "title2": {
        "type": "text",
        "analyzer": "german",
        "index": "true"
      },
      "chapters": {
        "type": "text",
        "analyzer": "english",
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "tags": {
        "type": "text",
        "analyzer": "english",
        "boost": 10,
        "fields": {
          "raw": {
            "type": "keyword"
          }
        }
      },
      "image": {
        "type": "text",
        "index": "false"
      },
      "imagesquare": {
        "type": "text",
        "index": "false"
      },
      "abstract": {
        "type": "text",
        "analyzer": "custom_analyzer",
        "index": "true",
        "boost": 7
      },
      "sublink1": {
        "type": "text",
        "index": "false"
      },
      "sublink2": {
        "type": "text",
        "index": "false"
      },
      "sublink3": {
        "type": "text",
        "index": "false"
      },
      "sublink4": {
        "type": "text",
        "index": "false"
      },
      "subtitle1": {
        "type": "text",
        "index": "false"
      },
      "subtitle2": {
        "type": "text",
        "index": "false"
      },
      "subtitle3": {
        "type": "text",
        "index": "false"
      },
      "subtitle4": {
        "type": "text",
        "index": "false"
      },
      "badge": {
        "type": "text",
        "index": "false"
      }
    }
  }
}
```


Term queries, unlike match queries are not analyzed - the following search will give you all the articles that are tagged with `indoor`:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "term": {
      "tags": "indoor"
    }
  },
  "_source": ["tags"]
}
```

If you type `Indoor` with a capital letter you won get a match since all our documents have been analyzed and run through a to-lower-case transformation. When you use a match query instead your search will be run through the same analyzers and you will get a match:




```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "match": {
      "tags": "Indoor"
    }
  },
  "_source": ["tags"]
}
```


Term queries can also be used to filter searches:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "heater installation"
            }
          }
        }
      ],
      "filter": {
        "term": {
          "tags": "instar"
        }
      }
    }
  }
}
```


You can add multiple terms with the `terms` filter:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "heater installation"
            }
          }
        }
      ],
      "filter": {
        "terms": {
          "tags": [
            "instar",
            "products"
          ]
        }
      }
    }
  }
}
```


With multiple filter use the one that eliminates most documents first to improve the performance of the following filters:


```json
GET /wiki_ssr_en_2020_07_06/_search
{
  "query": {
    "bool": {
      "must": [
        {
          "match": {
            "title": {
              "query": "camera unboxing"
            }
          }
        }
      ],
      "must_not": [
        {
          "term": {
            "value": "draft"
          }
        }
      ],
      "filter": [
        {
          "range": {
            "likes": {
              "gte": 100
            }
          }
        },
        {
          "range": {
            "published": {
              "gte": "2020-03-17"
            }
          }
        }
      ],
      "should": [
        {
          "match": {
            "tags": "1080p"
          }
        }
      ],
      "minimum_should_match": 1
    }
  }
}
```

