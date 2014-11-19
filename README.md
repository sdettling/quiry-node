quiry-node
==========

API
---

### get questions

/api/questions

via get

### get specific question

/api/questions/:id

via get

### create new question

/api/questions

via post

```javascript
{
    "description": "My question?",
    "minSelections": 1,
    "maxSelections": 4,
    "ranked": false,
    "published": true,
    "choices": [
      {
        "description": "choice 1"
      },
      {
        "description": "choice 2"
      },
      {
        "description": "choice 3"
      },
      {
        "description": "choice 4"
      }
    ]
  }
```

### update question

/api/questions/:id

via put

```javascript
{
    "description": "My question?",
    "minSelections": 1,
    "maxSelections": 4,
    "ranked": false,
    "published": true,
    "choices": [
      {
        "description": "choice 1"
      },
      {
        "description": "choice 2"
      },
      {
        "description": "choice 3"
      },
      {
        "description": "choice 4"
      }
    ]
  }
```

### create new answer

via post

```javascript
{
  "displayName": "Mr. Answer",
  "votes": [
    {
      "value": "4",
      "choiceId": "546cd5137498cf1e3c40637a"
    },
    {
      "value": "3",
      "choiceId": "546cd5137498cf1e3c406379"
    },
    {
      "value": "2",
      "choiceId": "546cd5137498cf1e3c406378"
    },
    {
      "value": "1",
      "choiceId": "546cd5137498cf1e3c406377"
    },
  ]
}
```

