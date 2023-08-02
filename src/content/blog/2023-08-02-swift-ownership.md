---
title: Swift Ownership
description: In Swift 5.9, the language adds support for opt-in ownership and borrowing, enabling finer control over how your data moves.
pubDate: 08-02-2023
---

The concept of ownership and borrowing has risen in popularity due to Rust's claim to fame. Rather than having a garbage collector or fully managed memory, Rust opted into compile-time guarantees for tracking references to data. This approach has solved countless memory issues, including in multithreaded contexts, and has made developing in Rust very pleasant once you get used to it.

Swift 5.9 brings these semantics to the language, giving you more control over how data is passed around. You can implement `~Copyable` on a struct to remove its ability to implicitly copy and make its methods default to pass-by-reference for `self`. This feature effectively opens up the concept of ownership and borrowing for structs that implement it. One of the key advantages this brings developers is the ability to express at compile-time when something becomes usable. For instance, if you close an IO stream, you should not be able to continue to use that stream. If you do not have explicit checks in your methods for if the stream is closed, this can lead to errors you might not have considered.

With Swift's ownership, you can mark a function/argument as `consuming`. This annotation will effectively enforce that the struct is unusable after it's passed to a consuming function. You can also mark functions/arguments as `borrowing`, which will take a immutable reference to the variable, or `mutating` to take a mutable one.

To make it simpler, here's a simple example of what this all means:

```swift
struct Person: ~Copyable {
    var name: String

    // This will run when the Person is out of scope/consumed
    deinit {
        print("*\(self.name) says goodbye*")
    }

    // Takes an immutable reference to self.
    borrowing func greet() {
        print("Hello, \(self.name)");
    }

    // Takes a mutable reference to self.
    mutating func changeName(to newName: String) {
        print("*\(self.name) has changed their name to \(newName)*")
        self.name = newName;
    }

    // Takes ownership of self, rendering it unusable after this is called.
    consuming func sayBye() {
        print("Bye, \(self.name)");
    }
}

@main
struct App {
    static func main() {
        var person = Person(name: "John Smith");
        person.greet();
        person.changeName(to: "Smith John");
        person.greet();
        person.sayBye();
        person.greet(); // <-- This will emit a compile-time error.
        print("/end")
    }
}
```

And, sure enough, if we run the compiler we'd get the following error:

```
$ swiftc -parse-as-library ./main.swift && ./main
./main.swift:29:13: error: 'person' used after consume
        var person = Person(name: "John Smith");
            ^
./main.swift:33:9: note: consumed here
        person.sayBye();
        ^
./main.swift:34:9: note: used here
        person.greet(); // <-- This will emit a compile-time error.
        ^
```

If we remove the offending `person.greet()` after `person.sayBye()`, and compile and run it, we'll see exactly what you'd expect:

```
$ swiftc -parse-as-library ./main.swift && ./main
Hello, John Smith
*John Smith has changed their name to Smith John*
Hello, Smith John
Bye, Smith John
*Smith John says goodbye*
/end
```

An alternate way of doing this is to mark arguments specifically as consuming, borrowing, or inout (in place of mutating). The following is equivalent to what we had before:

```swift
struct Person: ~Copyable {
    var name: String

    // This will run when the Person is out of scope/consumed
    deinit {
        print("*\(self.name) says goodbye*")
    }
}

// Takes an immutable reference to self.
func greet(_ person: borrowing Person) {
    print("Hello, \(person.name)");
}

// Takes a mutable reference to self.
func changeName(_ person: inout Person, to newName: String) {
    print("*\(person.name) has changed their name to \(newName)*")
    person.name = newName;
}

// Takes ownership of self, rendering it unusable after this is called.
func sayBye(to person: consuming Person) {
    print("Bye, \(person.name)");
}

@main
struct App {
    static func main() {
        var person = Person(name: "John Smith");
        greet(person);
        changeName(&person, to: "Smith John");
        greet(person);
        sayBye(to: person);
        print("/end")
    }
}
```

While this is a really basic example, I hope it gets the gears turning for what's possible with the new feature. It probably won't be relevant to most Swift developers, but for those working at the systems-level, it's a very exciting addition to the language. And while some may say you could already do this with classes, which are passed-by-reference, those are heap allocated - which can end up being a performance hitch if you don't pay attention. Additionally classes do not have the level of control this offers, giving all the more incentive to follow Apple's advice to generally use structs over classes.
