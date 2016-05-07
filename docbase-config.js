var docbaseConfig = {
  "method": "file",
  "generic": {
    "baseurl": "",
    "path": "docs"
  },
  "file": {
    "path": "docs"
  },
  "github": {
    "user": "",
    "repo": "",
    "path": "",
    "branch": "",
    "access_token": "ODM5ZjE4ZmE0NzRmNzY5ZmE3MzIyMTQzM2Y0MWJkYmYyZTJkMjM4ZQ=="
  },
  "indexHtml": "./html/main.html",
  "flatdocHtml": "./bower_components/docbase/html/flatdoc.html",
  "default_version": "v0",
  "manual_override": false,
  "versions" : {
    "v0": [
      {
        "name": "quick-start",
        "label": "Quick Start",
        "files": [
          {
            "name": "installation",
            "label": "Installation and Usage"
          },
        ]
      },
      {
        "name": "available-commands",
        "label": "Commands",
        "files": [
          {
            "name": "new",
            "label": "new"
          },
          {
            "name": "platforms",
            "label": "platforms"
          },
          {
            "name": "plugins",
            "label": "plugins"
          },
          {
            "name": "status",
            "label": "status"
          }
        ]
      },
      {
        "name": "custom-plugins",
        "label": "Custom Plugins",
        "files": [
          {
            "name": "custom-plugins",
            "label": "Custom Plugins"
          }
        ]
      }
    ],
},
  "publish": "github"
}
