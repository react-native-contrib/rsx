# Quick start

This is a quick start guide for getting up and running with `rsx`.

## Introduction

[Docbase](https://github.com/appbaseio/Docbase) turns your **markdown** documentation project into a collaborative HTML site. It:

[rsx](https://github.com/react-native-contrib/rsx) is a CLI tool built to ease your daily React Native development. Out of the box, it can:

* create new React Native projects
* add, remove and list platform-specific projects using Yeoman generators
* add, remove and list plugins - using the awesome `rnpm` under the hood
* get the status of installed React Native dependencies
* easily extensible
* is MIT licensed

## Getting Started

Assuming you already have `npm` and `rnpm` installed, run:

```bash
$ npm install -g rsx
```

## Usage

### Creating a new project

Creating a new React Native project is as simple as:

```bash
$ rsx new AwesomeApp
```

This will create a folder called `AwesomeApp` within the current directory, and then create a React Native project with iOS and Android projects.

### Running a project

```bash
$ rsx run ios
$ rsx run android
```
