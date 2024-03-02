---
title: Invokers, a Simpler Future for the Web
description: A proposal that enables you to write less JS and write more declarative HTML.
pubDate: 03-02-2023 
---

*At the time of writing this, the Invokers API is just a proposal. However, it is very simple to polyfill yourself or to use an existing one.*

If you do any work with JS and the DOM, you’ll probably have some of grievances with event and element management in your JS. I have found myself writing custom elements that encompass a large part of a page and end up needing to manage a lot of buttons *just* so I can nicely bind and clean up their event handlers. Something like this always ends up happening:

```ts
class Foo extends HTMLElement {
	button1: HTMLElement;
	button2: HTMLElement;
	button3: HTMLElement;
	// ...

	handler1 = () => {};
	handler2 = () => {};
	handler3 = () => {};
	// ...

	connectedCallback() {
		this.button1.addEventListener("click", this.handler1);
		this.button2.addEventListener("click", this.handler2);
		this.button3.addEventListener("click", this.handler3);
		// ...
	}
	
	disconnectedCallback() {
		this.button1.removeEventListener("click", this.handler1);
		this.button2.removeEventListener("click", this.handler2);
		this.button3.removeEventListener("click", this.handler3);
		// ...
	}
}
```

We can simplify that down a bit by using the newer `{ signal }` option on the event listener, which means we can shrink the code down to something like this:

```ts
class Foo extends HTMLElement {
	abortController: AbortController | null = null;

	handler1 = () => {};
	handler2 = () => {};
	handler3 = () => {};
	// ...

	connectedCallback() {
		this.abortController = new AbortController();
		const options = { signal: this.abortController.signal };
		// we'd get button1 and friends here instead of in the constructor 
		button1.addEventListener("click", this.handler1, options);
		button2.addEventListener("click", this.handler2, options);
		button3.addEventListener("click", this.handler3, options);
		// ...
	}
	
	disconnectedCallback() {
		this.abortController.abort();
		this.abortController = null;
	}
}
```

Doing this still comes with issues, though. For starters, it's too new to really use today. Additionally, we've really only just removed the properties and the `removeEventListener`s. You still need to find each of the buttons, which means they all need some sort of identifier so your element can find them. What if, instead, we flip this and have the buttons find your element and have them tell it what action they want to perform? Well, that's exactly what invokers do.

Instead, we can have our HTML look something more like this:

```html
<foo-bar id="baz">
	<button invoketarget="baz" invokeaction="handler-1">1</button>
	<button invoketarget="baz" invokeaction="handler-2">2</button>	
	<button invoketarget="baz" invokeaction="handler-3">3</button>
</foo-bar>
```

The two new attributes come into play:
- `invokeaction` specifies which named action to perform on an element.
- `invoketarget` specifies which element to send the action to, via its `id`.

And our custom element becomes:

```ts
class Foo extends HTMLElement {
	handler1 = () => {};
	handler2 = () => {};
	handler3 = () => {};
	// ...

	handleInvoke = (event: InvokeEvent) => {
		switch (event.action) {
		case "handler-1": return this.handler1();
		case "handler-2": return this.handler2();
		case "handler-3": return this.handler3();
		// ...
		default:
			break;
		}
	}

	connectedCallback() {
		this.addEventListener("invoke", this.handleInvoke);
	}
	
	disconnectedCallback() {
		this.removeEventListener("invoke", this.handleInvoke);
	}
}
```

That's it. You only need one event handler and can just check which action it wants to perform. Your element doesn't need to know anything about the buttons, just what actions it allows.

You even get access to which button triggered the event, so if you're creating a dynamic list, you can just have a `WeakMap` with the button as the key, associate it with some data, and go wild. Suddenly, your HTML becomes much more declarative and your element feels simpler.

It is worth stating that this is currently limited to just click events and buttons (including the input button types), but thats typically a large part of what you do on the web anyways.

And, better yet, this supports opening/closing both the Popover API and the Dialog API out of the box. So things like confirmation dialogs lose a lot of the boilerplate and helps put your focus on the handling the result.

I'm super excited about this as it drastically simplifies my own web projects. Even if it doesn't land, I'll still be using it in one form or another. I do realize that a lot of frameworks deal with all this for you already, but I think it brings some draw to just going vanilla and using good old HTML. It helps make the web feel simpler – to me at least – and that's how it should feel.

Here's some links if you want to learn more:
- [Explainer](https://open-ui.org/components/invokers.explainer/)
- [Polyfill](https://github.com/keithamus/invokers-polyfill)
- [Proposal](https://github.com/whatwg/html/issues/9625)