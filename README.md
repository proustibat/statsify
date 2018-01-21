# STATSIFY [![GitHub license](https://img.shields.io/github/license/proustibat/stats-text.svg)](https://github.com/proustibat/stats-text/blob/master/LICENSE.md)

App to get stats about words in a text

------------


| [![google-play-icon](https://user-images.githubusercontent.com/1054387/35104116-2c9addda-fc68-11e7-85fa-91b13423d5f4.png)](https://play.google.com/store/apps/details?id=prstbt.statsify&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1) | [![Build Status](https://travis-ci.org/proustibat/statsify.svg?branch=master)](https://travis-ci.org/proustibat/statsify) <br/> [![Sonar quality gate](https://sonarcloud.io/api/badges/gate?key=prstbt.statsify)](https://sonarcloud.io/dashboard?id=prstbt.statsify) </br> [![Code Climate](https://codeclimate.com/github/proustibat/statsify/badges/gpa.svg)](https://codeclimate.com/github/proustibat/statsify) | [![Maintenance](https://img.shields.io/maintenance/yes/2018.svg)](https://github.com/proustibat/statsify/commits/master) <br/> [![GitHub last commit](https://img.shields.io/github/last-commit/proustibat/statsify.svg)](https://github.com/proustibat/statsify/commits/master) <br/> [![Open issues](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=open_issues)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=open_issues) | [![Greenkeeper badge](https://badges.greenkeeper.io/proustibat/statsify.svg)](https://greenkeeper.io/) <br/> [![Dependencies Status](https://david-dm.org/proustibat/statsify/status.svg)](https://david-dm.org/proustibat/statsify) <br/> [![DevDependencies Status](https://david-dm.org/proustibat/statsify/dev-status.svg)](https://david-dm.org/proustibat/statsify?type=dev) |
| --- | :---- | :---- | :---- 


----------------

## Prerequisites
Be sure ionic and cordova are installed:

```bash
cordova -v
ionic -v
```

You also needs sdks, run `ionic info` to be sure your system is ok:
```bash
// output:
cli packages: (/Users/proustibat/.nvm/versions/node/v8.9.4/lib/node_modules)

    @ionic/cli-utils  : 1.19.0
    ionic (Ionic CLI) : 3.19.0

global packages:

    cordova (Cordova CLI) : 8.0.0 

local packages:

    @ionic/app-scripts : 3.1.7
    Cordova Platforms  : android 7.0.0 ios 4.5.4
    Ionic Framework    : ionic-angular 3.9.2

System:

    Android SDK Tools : 26.1.1
    Node              : v8.9.4
    npm               : 5.6.0 
    OS                : macOS High Sierra
    Xcode             : Xcode 9.2 Build version 9C40b 

Environment Variables:

    ANDROID_HOME : /Users/proustibat/Library/Android/sdk/

Misc:

    backend : pro

```

## Installation

```bash
git clone git@github.com:proustibat/statsify.git
cd statsify
ionic cordova prepare
```

Answer `Y` to the following question to run `npm install` automatically:
```bash
? Looks like a fresh checkout! No ./node_modules directory found. Would you like to install project dependencies? (Y/n) 
```

## Watching

### In a browser
```bash
ionic serve -l
```

### On a device
```bash
ionic cordova run android -l -c -s
```

### On a simulator

```bash
ionic cordova emulate ios --target="iPhone-8"
```

## Build
```bash
ionic cordova build ios android
```

## Contribute
- Issue Tracker: [https://github.com/proustibat/statsify/issues](https://github.com/proustibat/statsify/issues)
- Source Code: [https://github.com/proustibat/statsify](https://github.com/proustibat/statsify)


----------------

## Dev stats
### How simple or complicated the control flow of the application is. 
[![Complexity](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=complexity)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=complexity) 
[![Complexity per file](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=file_complexity)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=file_complexity)
[![Cognitive Complexity](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=cognitive_complexity)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=cognitive_complexity)


### Documentation & sizes
[![Lines](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=lines)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=lines) 
[![Lines of code](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=ncloc)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=ncloc) 
[![Comment lines](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=comment_lines)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=comment_lines) 
[![Comments (%)](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=comment_lines_density)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=comment_lines_density)

[![Directories](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=directories)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=directories) 
[![Files](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=files)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=files)
[![Classes](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=classes)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=classes) 
[![Functions](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=functions)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=functions)


### Duplications
[![Duplicated blocks](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=duplicated_blocks)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=duplicated_blocks) 
[![Duplicated lines](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=duplicated_lines)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=duplicated_lines)


### Issues
[![Open issues](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=open_issues)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=open_issues)
[![Confirmed issues](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=confirmed_issues)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=confirmed_issues)
[![Won't fix issues](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=wont_fix_issues)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=wont_fix_issues) 


### Maintainability
Issues in this domain mark code that will be more difficult to update competently than it should

[![Code smells](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=code_smells)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=code_smells)
[![SQALE Rating](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=sqale_rating)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=sqale_rating)


### Technical debt
Effort to fix all maintainability issues. The measure is stored in minutes. An 8-hour day is assumed when values are shown in days. (The value of the cost to develop a line of code is 0.06 days)

[![Technical debt](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=sqale_index)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=sqale_index) 
[![Technical debt ratio](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=sqale_debt_ratio)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=sqale_debt_ratio)


### Reliability
Issues in this domain mark code where you will get behavior other than what was expected.

[![Bugs](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=bugs)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=bugs)
[![Reliability remediation effort](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=reliability_remediation_effort)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=reliability_remediation_effort)
[![Reliability Rating](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=reliability_rating)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=reliability_rating)


### Security

[![Vulnerabilities](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=vulnerabilities)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=vulnerabilities)
[![Security remediation effort	](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=security_remediation_effort)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=security_remediation_effort)
[![Security Rating](https://sonarcloud.io/api/badges/measure?key=prstbt.statsify&metric=security_rating)](https://sonarcloud.io/component_measures?id=prstbt.statsify&metric=security_rating)

-------

## Dependencies

- [@angular/common](https://github.com/angular/angular): Angular - commonly needed directives and services
- [@angular/compiler](https://github.com/angular/angular): Angular - the compiler library
- [@angular/compiler-cli](https://github.com/angular/angular): Angular - the compiler CLI for Node.js
- [@angular/core](https://github.com/angular/angular): Angular - the core framework
- [@angular/forms](https://github.com/angular/angular): Angular - directives and services for creating forms
- [@angular/http](https://github.com/angular/angular): Angular - the http service
- [@angular/platform-browser](https://github.com/angular/angular): Angular - library for using Angular in a web browser
- [@angular/platform-browser-dynamic](https://github.com/angular/angular): Angular - library for using Angular in a web browser with JIT compilation
- [@ionic-native/core](https://github.com/ionic-team/ionic-native): Ionic Native - Native plugins for ionic apps
- [@ionic-native/splash-screen](https://github.com/ionic-team/ionic-native): Ionic Native - Native plugins for ionic apps
- [@ionic-native/status-bar](https://github.com/ionic-team/ionic-native): Ionic Native - Native plugins for ionic apps
- [@ionic/storage](https://github.com/ionic-team/ionic-storage): Ionic Storage utility
- [cordova-android](https://github.com/apache/cordova-android): cordova-android release
- [cordova-ios](https://github.com/apache/cordova-ios): cordova-ios release
- [cordova-plugin-device](https://github.com/apache/cordova-plugin-device): Cordova Device Plugin
- [cordova-plugin-ionic-webview](https://github.com/ionic-team/cordova-plugin-ionic-webview): The official Ionic&#39;s WKWebView Engine Plugin
- [cordova-plugin-splashscreen](https://github.com/apache/cordova-plugin-splashscreen): Cordova Splashscreen Plugin
- [cordova-plugin-statusbar](https://github.com/apache/cordova-plugin-statusbar): Cordova StatusBar Plugin
- [cordova-plugin-whitelist](https://github.com/apache/cordova-plugin-whitelist): Cordova Whitelist Plugin
- [d3](https://github.com/d3/d3): Data-Driven Documents
- [faker](https://github.com/Marak/Faker.js): Generate massive amounts of fake contextual data
- [ionic-angular](https://github.com/ionic-team/ionic): A powerful framework for building mobile and progressive web apps with JavaScript and Angular
- [ionic-plugin-keyboard](https://github.com/driftyco/ionic-plugin-keyboard): Ionic Keyboard Plugin
- [ionicons](https://github.com/driftyco/ionicons): Premium icons for Ionic.
- [occurences](https://github.com/proustibat/occurences): Calculate the number of occurrences of each word in a text. Words smaller than two letters will be ignored.
- [rxjs](https://github.com/ReactiveX/RxJS): Reactive Extensions for modern JavaScript
- [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox): Service Worker Toolbox provides some simple helpers for use in creating your own service workers.
- [zone.js](https://github.com/angular/zone.js): Zones for JavaScript

## Dev Dependencies

- [@ionic/app-scripts](https://github.com/ionic-team/ionic-app-scripts): Scripts for Ionic Projects
- [@types/d3](https://www.github.com/DefinitelyTyped/DefinitelyTyped.git): TypeScript definitions for D3JS d3 standard bundle
- [@types/node](https://www.github.com/DefinitelyTyped/DefinitelyTyped.git): TypeScript definitions for Node.js
- [cz-conventional-changelog](https://github.com/commitizen/cz-conventional-changelog): Commitizen adapter following the conventional-changelog format.
- [typescript](https://github.com/Microsoft/TypeScript): TypeScript is a language for application scale JavaScript development
