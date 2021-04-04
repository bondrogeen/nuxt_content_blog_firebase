# nuxt_content_blog_firebase
Blog template on nuxt content, firebase and vuetify


[Demo](https://nuxt-content-blog-firebase.web.app/) 

`npm run dev`
`npm run build`
`npm run static` 

Rules firebase Realtime Database

```json
{
  "rules": {
    "users": {
      ".read": "root.child('users/'+ auth.uid +'/admin').val() === true",
      "$uid": {
        ".read": "auth != null && auth.uid == $uid",
        "create": {
          ".validate": true,
          ".write": "$uid === auth.uid"
        },
        "email": {
          ".validate": true,
          ".write": "$uid === auth.uid"
        },
      	"uid": {
          ".validate": true,
          ".write": "$uid === auth.uid"
        },
        "name": {
          ".validate": true,
          ".write": "$uid === auth.uid"
        },
      	"surname": {
          ".write": "$uid === auth.uid"
        },
        "avatar": {
          ".write": "$uid === auth.uid"
        },
        "lastLogin": {
          ".write": "$uid === auth.uid"
        },
        "admin": {
          ".write": "root.child('users/'+ auth.uid +'/admin').val() === true"
        },
        "verified": {
          ".write": "root.child('users/'+ auth.uid +'/admin').val() === true"
        }
      }
    },
    "ratings": {
      ".read": true,
      "$title": {
        ".read": true,
          "$uid": {
            ".read": true,
            ".write": "$uid === auth.uid"  
        	}
      }
    },
    "comments": {
      ".read": true,
      ".write": "root.child('users/'+ auth.uid +'/admin').val() === true",
      ".indexOn": "title",
      "$items": {
        ".read": true,
        "name": { ".write": "auth != null && !data.exists()" },
        "title": { ".write": "auth != null && !data.exists()" },
        "comment": { ".write": "auth != null && !data.exists()" },
        "timestamp": { ".write": "auth != null && !data.exists()" },
        "avatar": { ".write": "auth != null && !data.exists()" },
        "uid": { ".write": "auth != null && !data.exists()" },
        "reply": { ".write": "auth != null && !data.exists()" },
        "verified": {
          ".write": "root.child('users/'+ auth.uid +'/admin').val() === true ||	root.child('users/'+ auth.uid +'/verified').val() === true"
        }
      }
    }
  }
}
```


```text[.env]

BASE_URL=https://best-blog.com

BLOG_TITLE=best-blog.com - larem proident
BLOG_DESCRIPTION=Quis irure quis proident pariatur minim est nisi nisi nisi. Labore in Lorem dolor nisi proident sint dolor laboris

# Settings page
BLOG_POSTS_SIZE=5

# you settings firebase
API_KEY=XXXXXxxxxXXXxxxXXxxxXXXxXXXXXXXXXXXXSX
AUTH_DOMAIN=nuxt-content-blog-firebase.firebaseapp.com
PROJECT_ID=nuxt-content-blog-firebase
STORAGE_BUCKET=nuxt-content-blog-firebase.appspot.com
MESSAGING_SENDER_ID=123456578965
APP_ID=X:XXXXXXXXXXXX:xxx:xxxxxxxxxxxxxxxxxxx
MEASUREMENT_ID=X-XXXXXXXXXX
```


#### 0.0.1
* (bondrogeen) initial release

## License
The MIT License (MIT)

Copyright (c) 2017 bondrogeen <bondrogeen@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.