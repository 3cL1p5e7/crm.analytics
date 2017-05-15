# crm.analytics
CRM analytics "Hello world"

Component "Transition":
Default example
```
// CSS transition handler
.main-fade-enter-active {
  opacity: 0;
}

.main-fade-enter {
  will-change: opacity;
  opacity: 1!important;
  transition: opacity .3s ease;
}

.main-fade-leave-active {
  opacity: 1;
}
.main-fade-leave {
  will-change: opacity;
  opacity: 0!important;
  transition: opacity .3s ease;
}

// Using in render function. All props required
<Transition duration={300} // duration of transition 
            switch={this.props.active} // state variable. Switcher
            className="main__wrapper" // className of transition's container
            name="main-fade"> // name of fade
    <Component1 key="comp1" // key must exist
                case="comp1" /> // case of "switch"'s result
    <Component2 key="comp2" // key must exist
                case="comp2"
                className="booster" />
</Transition>
```

With router example. React-router is required.
```
// CSS transition handler
.main-fade-enter-active {
  opacity: 0;
}

.main-fade-enter {
  will-change: opacity;
  opacity: 1!important;
  transition: opacity .3s ease;
}

.main-fade-leave-active {
  opacity: 1;
}
.main-fade-leave {
  will-change: opacity;
  opacity: 0!important;
  transition: opacity .3s ease;
}

// Using in render function. All props required
<Transition duration={300} // duration of transition
            router={true}
            className="main__wrapper" // className of transition's container
            name="main-fade"> // name of fade
    <Component1 key="comp1" // key must exist
                case="/router/path/to/component1" /> // path
    <Component2 key="comp2" // key must exist
                case="/router/path/to/component2"
                className="booster" />
</Transition>
```