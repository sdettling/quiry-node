quiry-node
==========

API
---

### create new question

/api/questions
post

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

