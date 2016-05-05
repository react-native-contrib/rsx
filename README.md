# rsx

![rsx logo](assets/img/logo.png)

![npm version](https://img.shields.io/npm/v/rsx.svg)
![dependencies](https://img.shields.io/david/react-native-contrib/rsx.svg)
<!-- [![Code Climate](https://codeclimate.com/github/rnpm/rnpm/badges/gpa.svg)](https://codeclimate.com/github/rnpm/rnpm)
[![Test Coverage](https://codeclimate.com/github/rnpm/rnpm/badges/coverage.svg)](https://codeclimate.com/github/rnpm/rnpm/coverage)
[![Circle CI](https://img.shields.io/circleci/project/rnpm/rnpm/master.svg)](https://circleci.com/gh/rnpm/rnpm) -->

**React Starter eXtension** - a CLI tool built to ease your daily React Native development.

## Rationale

Inspired by the `cordova` tool and motivated by how crap the `react-native` CLI tool is. Also a big shoutout to the rnpm guys, most of the code is cribbed from them.

## Requirements

- node >= 4.1

## Getting started

#### Installation
```bash
$ npm install rsx -g
```

## Available commands

This list may be out of date - for a full list of commands, type `rsx --help`.

#### rsx new [project]
Creates a new project.

```bash
$ rsx new MyNewApp
```

Source: https://github.com/react-native-contrib/rsx-plugin-new

#### rsx platforms [action] [name]
- `action` can be one of: `add`, `rm`, and `ls`.
- `name` can be one of: `ios`, `android`.

```bash
$ rsx platforms add android
$ rsx platforms rm android
$ rsx platforms ls
```

Source: https://github.com/react-native-contrib/rsx-plugin-platforms

#### rsx plugins [action] [name]
- `action` can be one of: `add`, `rm`, and `ls`.
- `name` can be any valid React Native plugin

```bash
$ rsx plugins add react-native-module
$ rsx plugins rm react-native-module
$ rsx plugins ls
```

Source: https://github.com/react-native-contrib/rsx-plugin-plugins

#### rsx run [platform]
- `platform` can be one of: `ios`, `android`.

```bash
$ rsx run ios
```

Source: https://github.com/react-native-contrib/rsx-plugin-run

#### rsx status
Shows a list of React Native and all its components with versions.

```bash
$ rsx status
```

Source: https://github.com/react-native-contrib/rsx-plugin-status

### Developers

SOON

We're open to community ideas! If you know how to improve `rsx` - please, [let us know](https://github.com/react-native-contrib/rsx/issues/new)!
