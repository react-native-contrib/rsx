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
  "flatdocHtml": "./html/flatdoc.html",
  "default_version": "v0",
  "manual_override": false,
  "versions" : {
    "v0": [
      {
        "name": "quick-start",
        "label": "Quick Start",
        "default": "installation",
        "files": [
          {
            "name": "installation",
            "label": "Installation"
          },
          {
            "name": "usage",
            "label": "Usage"
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
        "name": "development",
        "label": "Development",
        "default": "custom-plugins",
        "files": [
          {
            "name": "common-package",
            "label": "Common Package"
          },
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
