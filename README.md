# react-gamepads

A set of hooks and utilities for using the [Gamepad API](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API) inside React. Use a hook, get access to gamepad input -- it's that easy.

## Getting Started

```bash
yarn add react-gamepads
```

Now you just pick: **hooks** or **context**? 👇🏼

### useGamepads Hook

With this hook you can have a component **subscribe** to all gamepad input. This allows you to have a component "react" to gameplay input as it's received.

In this example, we take the input and set the component's state to it. This lets you use the state inside the component and have it change. _You could also store it inside a "ref" (with `useRef`) if preferred._

```jsx
import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads';

export default function App() {
  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));

  return <div>{gamepads[0].buttons[4].pressed}</div>;
}
```

> Hooks are a great way of quickly bringing gamepad input to any component. You could also use this to create a single "controller" component that handles all input across the app (like a `<GameController buttonOne={() => yourFunc} />`) -- see [react-gamepad for an example of this](https://github.com/SBRK/react-gamepad/blob/master/src/Gamepad.js).

### Gamepads Context Provider

With context, you can have parts (or the entire app) get "provided" all gamepad input, and **subscribe** to the data using a context consumer.

First, wrap the app in the provider:

```jsx
import React from 'react';

import { GamepadsProvider } from 'react-gamepads';

export default function App() {
  return <GamepadsProvider>Your app</GamepadsProvider>;
}
```

Then you can use the context in another component with `useContext()`:

```jsx
import React, { useContext, useLayoutEffect, useState } from 'react';
import { GamepadsContext } from '../context/GamepadsContext';

const GameInput = () => {
  const { gamepads } = useContext(GamepadsContext);

  return <div>{gamepads[0].buttons[0].pressed}</div>;
};

export default GameCursor;
```

Or you can use a context consumer component, which provides the gamepad data as a "render prop":

```jsx
<GamepadsContext.Consumer>
  {({ gamepads }) => {
    return <div>{gamepads[0].buttons[0].pressed}</div>;
  }}
</GamepadsContext.Consumer>
```

> Context is great for providing sections of the app with gamepad input and isolate the state inside the context -- rather than having multiple components subscribed (like the hook -> state example).

### Debugging Gamepad Input

When working on apps with gamepad input, it helps to visualize the input.

You can quickly print out all buttons using this code:

```jsx
import React, { useState } from 'react';
import { useGamepads } from 'react-gamepads';

export default function App() {
  const [gamepads, setGamepads] = useState({});
  useGamepads(gamepads => setGamepads(gamepads));

  const gamepadDisplay = Object.keys(gamepads).map(gamepadId => {
    // console.log("displaying gamepad", gamepads[gamepadId]);
    return (
      <div>
        <h2>{gamepads[gamepadId].id}</h2>
        {gamepads[gamepadId].buttons &&
          gamepads[gamepadId].buttons.map((button, index) => (
            <div>
              {index}: {button.pressed ? 'True' : 'False'}
            </div>
          ))}
      </div>
    );
  });

  return (
    <div className="Gamepads">
      <h1>Gamepads</h1>
      {gamepadDisplay}
    </div>
  );
}
```

Or you can use the `<GamepadController>` component to see a controller. This will display the specified controller's input, and you can _optionally_ provide styling (like fixing it to a corner of the screen):

```jsx
<GamepadController
  controller={1}
  style={{ position: 'fixed', bottom: 0, right: 0 }}
/>
```

## Examples

Here are some examples to get you started using this library and get those creative juices pumping ⚡️🧠💡

### Game Cursor

This is a simple example of using the analog sticks and directional pad to move a cursor around the screen. You can also press a button to change the cursor color. It uses `framer-motion` under the hood to smoothly animate the cursor. Keep in mind this does not check for the edges of the screen.

[Browse and run the code using CodeSandbox](https://codesandbox.io/s/react-gamepad-with-cursor-analog-support-better-perf-4buhx)

### Menu

This is an example of using controller input to navigate an HTML menu. You can press the up or down buttons on the directional pad to change the active item of the menu. Pressing a button "clicks" the link, navigating to the selected route.

[Browse and run the code using CodeSandbox](https://codesandbox.io/s/react-gamepad-menu-w-controller-ui-hook-version-with-press-navigation-5y03m)

### Horse Game

This is a simple game based on the **"Horse Stance"** mini-game from Shenmue 3. It features a "Game Start" screen with a "Press any button" example, game input using analog sticks and directional pad, and other basic game design techniques. The goal of the game is to keep the "position" at or around 500, which gives you the highest score.

[Browse and run the code using CodeSandbox](https://codesandbox.io/s/react-gamepad-menu-w-controller-ui-hook-version-shenmue-horse-working-oioei)

## Development

1. Install dependencies: `yarn`
1. Compile TS to JS with hot reloading: `yarn watch`

> Want to test development inside another React project? Try using `npm link` to symlink the local package to your test React app.

### Commits

1. Stage your changes: `git add .`
1. Commit using the Commitzen CLI: `yarn commit`

This will walk you through the process of writing the proper syntax for semantic release.

> Make sure to lint your work before your try committing. The commit process runs linting, and if it fails it will fail your commit, forcing you to write it over again.

### Release

1. Install: `yarn`
1. Build: `yarn build`
1. Release: `yarn semantic-release`
1. Publish: `npm publish`

Ideally this should be handled by the CI/CD. There is a Github Actions workflow that handles most of this, minus the NPM publish.

# Credits / References

- [Gamepad API - MDN Docs](https://developer.mozilla.org/en-US/docs/Web/API/Gamepad_API/Using_the_Gamepad_API)
