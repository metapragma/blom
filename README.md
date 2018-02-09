# Blom

[![build status](https://secure.travis-ci.org/escapace/blom.png)](https://travis-ci.org/escapace/blom)
[![Greenkeeper badge](https://badges.greenkeeper.io/escapace/blom.svg)](https://greenkeeper.io/)
[![license](https://img.shields.io/badge/license-Mozilla%20Public%20License%20Version%202.0-blue.svg)]()

# Introduction

In the following document, we introduce Blom, a modern zero-configuration application bundler based on Vue.js, 
TypeScript, and webpack. We examine the evolution of JavaScript modules, build tools and static type-checkers. 
We start from CommonJS— the first JavaScript module system that got widespread adoption—and continue up until most 
recent ES6 modules. Overviews of Browserify, Webpack, and Rollup follow. We then describe two technologies that
provide static typing — Flow and TypeScript. In the last section, we offer a brief history of front-end frameworks. 
We compare the different approaches and methodologies used and also describe alternative options.

*Keywords: module, build, package, front-end, types, vue*

# Main

## JavaScript Module Systems
- CommonJS
- AMD
- UMD
- ES6 Modules

### CommonJS

CommonJS is an initiative that began in January with a post by Kevin Dangoor to his blog and the opening of a mailing list. In his blog post, Kevin called for interoperability on various platforms. 
In 2009 Tom Robinson and Kris Kowal presented Narwhal (now deprecated), a cross-platform, multi-interpreter, general purpose JavaScript platform which was also the earliest implementation of the emerging CommonJS standard. At 2009 JSConfEU, Dangoor, Kowal and Robinson presented a talk titled “CommonJS: JavaScript Everywhere.”
In early 2010, Node.js was released. Ryan Dahl originally wrote Node.js in 2009, about thirteen years after the introduction of the first server-side JavaScript environment. Its development and maintenance was led by Dahl and later sponsored by Joyent. Dahl demonstrated the project at the inaugural European JSConf on November 8, 2009. Node.js combined Google’s V8 JavaScript engine, an event loop, and a low-level I/O API.


> “The CommonJS module format is increasingly ubiquitous as the de facto module format for JavaScript. However, if CommonJS modules, by themselves, are directly executed, they require synchronous loading of modules. Synchronous loading is known to be problematic in the browser since it locks the browser user interface, requires eval-based compilation of scripts which confuses debuggers and is less efficient than using standard script tags.”
> Kris Zyp

CommonJS modules are synchronous. To work in a browser, they needed to support asynchronous loading. 


### AMD

The CommonJS module format only allowed one module per file, so a “transport format” would be used for bundling more than one module in a file for optimization/bundling purposes. To transfer module syntax from server usage to browser usage, CommonJS proposed several module formats. One of the proposals, “Module/Transfer/C” later become Asynchronous Module Definition (AMD). Asynchronous module definition (AMD) is a specification for the programming language JavaScript. It defines an application programming interface (API) that defines code modules and their dependencies and loads them asynchronously if needed. 


### UMD

The UMD pattern typically attempts to offer compatibility with the most popular script loaders (e.g., RequireJS amongst others). In many cases, it uses AMD as a base, with special-casing added to handle CommonJS compatibility. 


### ES6 Modules

ES6 modules have a compact syntax, a preference for single exports and support for cyclic dependencies. They have direct support for asynchronous loading and configurable module loading. Module structure can be statically analyzed (for static checking, optimization, etc.).
ES6 modules must work independently of whether the engine loads modules synchronously (e.g., on servers) or asynchronously (e.g., in browsers). Its syntax is well suited for synchronous loading. The static structure enables asynchronous loading. Because all imports can be statically determined, they can be loaded before evaluating the body of the module (in a manner reminiscent of AMD modules).

### Recap

CommonJS became popular through Node.js. It’s mostly dedicated for servers, and it supports synchronous loading. CommonJS also has a compact syntax focused on export and require keywords. AMD and the most popular implementation — RequireJS, are dedicated for browsers. AMD also supports asynchronous loading. UMD is a compatible format for both CommonJS and AMD. ES6 modules are built into the language. They have a declarative syntax and support for asynchronous loading.

# Build Tools and Module Resolution

## Browserify

> Browserify is a tool for compiling node-flavored commonjs modules for the browser. 

Conceptually, a JavaScript bundle is a collection of multiple scripts, combined into a single file. Browserify wasn’t originally intended to solve the problem of bundling. Instead, it was designed to solve the problem of Node developers who wanted to reuse their code in the browser. 
By 2014, npm had already grown to over 50,000 modules, so the idea of reusing those modules within browser code was a compelling proposition. The problems Browserify solved was thus to make the CommonJS module system and Node built-ins, conventions work in the browser.

## Webpack

> Webpack is a static module bundler for modern JavaScript applications. When webpack processes an application, it recursively builds a dependency graph that includes every module the application needs, then packages all of those modules into one or more bundles.

Webpack was started in 2012 by Tobias Koppers to solve a problem that existing tools didn’t address: building complex single-page applications (SPAs).  Webpack and Browserify are often seen today as solutions to the same problem, but webpack’s initial focus was a bit different from Browserify’s. Whereas Browserify’s goal was to make Node modules run in the browser, Webpack’s goal was to create a dependency graph for all of the assets in a website — not just JavaScript, but also CSS, images, SVG, and even HTML. Webpack introduced Hot Module Replacement. It allows all kinds of modules to updatee at runtime without the need for a full refresh.


## Rollup

> Rollup is a module bundler for JavaScript which compiles small pieces of code into something larger and more complex, such as a library or application. It uses the new standardized format for code modules included in the ES6 revision of JavaScript, instead of previous idiosyncratic solutions such as CommonJS and AMD. ES6 modules let you freely and seamlessly combine the most useful individual functions from your favorite libraries. This will eventually be possible natively, but Rollup lets you do it today.

Rollup was created to build exports of JavaScript libraries as efficiently as possible, taking advantage of the design of ES6 modules. ES6 modules enable a different approach, which Rollup uses. All code is put in the same place and evaluates in one go, resulting in leaner, simpler code that starts up faster. Rollup doesn’t support code-splitting. Similarly, Rollup doesn’t implement hot module replacement (HMR).


# Front-End Frameworks
## The First Frameworks

The beginning of front-end development as we know it is marked by the introduction of AJAX (Asynchronous JavaScript And XMLHttpRequest). It was the first step towards asynchronous web applications. With Ajax, web applications can send and retrieve data from a server asynchronously (in the background) without interfering with the display and behavior of the existing page. By decoupling the data interchange layer from the presentation layer, Ajax allows for web pages to change content dynamically without the need to reload the entire page.
Frameworks were introduced to help organize applications coherently, standardize practices to allow for seamless collaboration, make code more reusable and enable cross-platform compatibility. The first front-end JavaScript front-end frameworks—Dojo (2004), Prototype (2005), jQuery, Mootools (2006)— were all built upon techniques of Ajax.  The official website description of the jQuery project still reads “jQuery makes things like HTML document traversal and manipulation, event handling, animation, and Ajax much simpler with an easy-to-use API that works across a multitude of browsers.”.  jQuery became arguably the most popular solution, and soon enough the majority of front-end practitioners were using it.


## MVC Frameworks

As web applications were becoming more and more popular and complex, servers needed to support and render millions of pages for users. In the meantime, developers set their eyes to create client-side rendering techniques. 
This era also brought along the model–view–controller (MVC) pattern to the front-end world. MVC divided code into a presentational layer, a business layer, and a data layer. The MVC architectural pattern for these frameworks is interpreted far more loosely than server-side frameworks, with variations of it commonly abbreviated to MV*. 
The first MVC framework to be widely commercially used was Backbone.js. Created by Jeremy Ashkenas, who also authored CoffeeScript, its initial public release came in the autumn of 2010. AngularJS and Ember were in the first wave as well. Misko Hevery initially developed AngularJS in 2009. To cite Hevery himself: “Angular in a way acts as a polyfill or a shim to give the browser the vocabulary which is useful for building web-applications.” 
 

## React & Vue

Starting from 2013-14 front-end development has seen an influx of new ideas and techniques such as virtual DOMs, component-based architectures, etc. New frameworks were built upon these ideas. In this section, we describe two of those — React and Vue. 

### React
React was created by Jordan Walke, a software engineer at Facebook. It was first deployed on Facebook's newsfeed in 2011 and later on Instagram.com in 2012. It was open-sourced at JSConf US in May 2013.    
React embraces the fact that rendering logic is inherently coupled with other UI logic: how events are handled, how the state changes over time, and how the data is prepared for display. Instead of putting markup and logic in separate files, React was one of the first frameworks to incorporate components that contain both logic and markup thoroughly. For this, React recommends using JSX, a syntax extension to JavaScript. React has helped develop component-based front-end architectures.   
The DOM (Document Object Model) is a tree-like data structure representing an HTML document. In modern applications there can be thousands of nodes in the DOM and updates can be computationally expensive. React uses a virtual DOM which is a lightweight copy of the DOM. Whenever something on the UI changes, the Virtual DOM representation changes as well. The difference between the previous Virtual DOM and the new one is calculated. The DOM then updates only the differences, resulting in performance gains. 

### Vue
Vue.js is an open-source progressive JavaScript framework for building user interfaces. The core library is focused on the view layer only and is easy to pick up and integrate with other libraries or existing projects. It was created by Evan You after working for Google using AngularJS in a number of projects. To quote You, "I figured, what if I could just extract the part that I really liked about Angular and build something lightweight without all the extra concepts involved?" Vue was originally released in February 2014.   
Vue.js is able to intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the application state changes. It uses HTML-based templates that allow to declaratively bind the rendered DOM to the underlying Vue instance’s data. Support for directly writing render functions using JSX is also provided. Vue recommends writing single-file components which are made possible with build tools such as webpack and Browserify. Single-file components offer component-scoped CSS, CSS modules, complete syntax highlighting, usage of preprocessors such as Babel, SCSS, Buble, and so on.

# Statically Typed JavaScript

The main advantage of static types is that the compiler can carry all kinds of checks, and therefore a lot of bugs and errors are caught at an early stage. Type systems can make the code a lot easier to maintain, more readable and easier to analyze. Errors can be detected early, and refactoring code can be more reliable. In recent years, two solutions were developed in the JavaScript ecosystem: Flow and TypeScript. 

## Flow

Flow is developed and maintained by Facebook. The idea of Flow is to be a static type checker, designed to find errors in JavaScript applications quickly. It’s not a compiler, but a checker. It can work without any type annotations, and it’s very good at inferring types.


## TypeScript 

TypeScript, on the other hand, is a superset of JavaScript that also adds several language features such as encapsulation with public, private and protected modifiers, interfaces, mixins, generics, namespaces, and tuples. Typescript is developed by Microsoft and architected by Anders Hejlsberg (the creator of C#, Delphi, and Turbo Pascal). Typescript adds optional type annotations, decorators, and compiles the code — checks and removes the annotations and outputs the generated JavaScript code. 


# Blom
# Overview

Blom is a modern zero-configuration application bundler. It’s tailored specifically for Vue.js, TypeScript and webpack users. Blom abstracts away setting up and maintaining projects. It uses webpack, TypeScript and other tools to provide a cohesive developer experience. The configuration of both development and production builds is handled so a developer can focus on writing code. A similar project called `vue-cli` exists. The two projects share a lot of features, such as preprocessing, building, etc. Blom differs from `vue-cli` by providing server-side rendering, and by focusing on the TypeScript integration. 


## Vue, Webpack, TypeScript and Server-Side Rendering

### Vue.js
Vue is capable of powering sophisticated single-page applications. Vue provides optimized re-rendering out of the box. Each component keeps track of its reactive dependencies during render, so the system knows precisely when to re-render, and which components to re-render. Models are plain JavaScript objects. When models are modified, the view updates. It makes state management simple and intuitive. Vue is less opinionated, offering official support for a variety of build systems, such as webpack. 

### Webpack
Webpack simplifies modern web development by solving a fundamental problem: bundling. It takes in various assets, such as Vue components, plain JavaScript, CSS files and so on, and then transforms these assets into a format that’s convenient to consume through a browser. Webpack helps create modularized, organized code structure and provides support for asset hashing, hot module replacement, code splitting, etc. 

### TypeScript
Types enable JavaScript developers to use highly-productive development tools and practices like static checking and code refactoring when developing JavaScript applications. Type inference allows a few type annotations to make a big difference to the static verification of code. TypeScript offers support for the latest and evolving JavaScript features, including those from ES6 and future proposals, like async functions and decorators. All of these features are available in Blom by default.

### Server-Side Rendering
Modern client-side rendered single-page applications (SPA) are getting a bare-bones HTML document with a JavaScript file that will render the rest of the site using the browser, without additional network requests to the server. Server-side rendering single-page applications has a big benefit: it is great for SEO. Content is present before the user gets it, so search engines are able to index and crawl it without problems. This is something that doesn’t come with client-side rendering. Initial load time is reduced as well, thanks to prerendering (not yet). Blom is one of the very few solutions out there that offers server-side rendering in the Vue.js ecosystem.

# Installation
``` bash
$ git clone https://github.com/escapace/blom-simple.git
$ cd blom-simple
$ npm install
$ npm run start
```

The application will start running on http://localhost:8000/

# Roadmap
- [x] Server-Side Rendering
- [ ] Prerendering
- [x] Hot Module Replacement
- [x] Fast Development Builds
- [x] Optimized Production Configuration
- [x] Vuex Integration
- [ ] Redux Integration
- [ ] End-To-End Test Coverage

# Contributing

Please read our [contributing](https://github.com/paerallax/contributing) guideline.

# License

[MPL](https://www.mozilla.org/en-US/MPL/2.0/)

# [Reference](https://www.evernote.com/shard/s235/nl/30656392/4e70fef9-ad60-4d27-9089-f4fbc9837a88?title=Reference)

## Links 
[Vue.js](https://vuejs.org/)   
[ReactJS](https://reactjs.org/)   
[Browserify](http://browserify.org/)   
[Rollup](https://rollupjs.org/guide/en)    
[Wepback](https://webpack.js.org/)   
[Flow](https://flow.org/)   
[TypeScript](http://www.typescriptlang.org/)

