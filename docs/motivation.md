Motivation
==========

Introduction
------------

aDI is a dependency injector for JavaScript. While there are a number
of DI tools available for JavaScript, aDI takes the lead from
[Angular 2.0 di.js](https://github.com/angular/di.js) in providing a clean
API. aDI, however, aims to be idiomatic ES6, be well-documented, and support
common use cases without trying to be too sophisticated.

Google's Guice for Java (and the related Gin for GWT), as well as Spring,
are key influences.


Concepts
--------

* Injector / container
* Tokens? (Types vs Names - why conflate these?
* Providers
* Singleton vs Transient


Motivating API
--------------

The following is indicative of how aDI should be invoked by its clients:


### Simple example

Consider the following simple application layers:

1. View with dependency on some (local/browser-based) Service (effectively a proxy for remote Service)
2. Service with dependency on a HTTP/REST client
3. HTTP/REST client

Now, the View is not a singleton, in that subsequent calls to the container/injector should produce
new instances of the View (i.e. it is disposable), whereas the Service and REST client modules
would likely be singletons.

```javascript
class Service {
    constructor(httpClient, serviceLogger) {
        ...
    }
}
adi.construct(Service).with(
    a(HttpClient), 
    a(Logger, named("ServiceLogger")));

class MyView {
    constructor(service, entityId) {
        ...
    }
}
adi.construct(MyView).with(
    a(Service), 
    parameter("entityId"));
adi.transientByDefault(MyView);

const bindings = new adi.Bindings();
bindings.bind(Logger).named("ServiceLogger").to

const injector = new adi.Injector(); 

const myView = injector.get(MyView, {entityId: "ac7adak9u66"});
```

Notes:

* injected items are singleton (cached) by default, but this can be easily overridden to transient
* the `with` clause takes a list of types, since JavaScript cannot provide runtime type information
* by default, the injector will instantiate the type referenced (but this can be overridden through Providers)
* where necessary, additional parameters can be supplied at injection (`injector.get(...)`) particularly for transients


Considerations
--------------

* Support for streams (e.g. injecting an Observable) - these will probably be "named" in some way
* Support for asynchronous modules (or equivalent)


Features (planned)
------------------

* Singleton and Transient instances
* Support for `Bindings` that link types to implementations (where not default)
    * linked from 'interface' to 'implementation': `bind(Int).to(Imp)`
        * including chaining, i.e. `bind(A).to(B); bind(B).to(C)`
    * Binding *names* for resolution: `bind(Int).named("someName").to...`
    * Instance bindings from matcher to a particular instance: `bind(Number).named("port").toInstance(1234)`
    * Provider bindings from matcher to factory: `bind(Int).toProvider(IntProvider)`
* ES6 classes, as well as constructor functions, regular functions, etc. as appropriate
* For Transient instances, ability to provide additional constructor args at get-time.
* Future:
    * Support for async resources/modules
    
    
References
----------
* [Google Guice bindings](https://github.com/google/guice/wiki/Bindings)