import { useEffect, useRef } from 'react';

interface GamepadRef {
  [key: number]: Gamepad;
}

export default function useGamepads(callback: (data: GamepadRef) => void) {
  const gamepads = useRef<GamepadRef>([]);
  const requestRef = useRef<number>();

  var haveEvents = 'ongamepadconnected' in window;

  const addGamepad = (gamepad: Gamepad) => {
    gamepads.current = {
      ...gamepads.current,
      [gamepad.index]: gamepad,
    };

    // Send data to external callback (like React state)
    callback(gamepads.current);

    // Handle controller input before render
    // @TODO: Add API to hook callback into this
    // requestAnimationFrame(updateStatus);
  };

  /**
   * Adds game controllers during connection event listener
   * @param {object} e
   */
  const connectGamepadHandler = (e: Event) => {
    addGamepad((e as GamepadEvent).gamepad);
  };

  /**
   * Finds all gamepads and adds them to context
   */
  const scanGamepads = () => {
    // Grab gamepads from browser API
    var detectedGamepads = navigator.getGamepads
      ? navigator.getGamepads()
      : navigator.webkitGetGamepads
      ? navigator.webkitGetGamepads()
      : [];

    // Loop through all detected controllers and add if not already in state
    for (var i = 0; i < detectedGamepads.length; i++) {
      const newGamepads = detectedGamepads[i];
      if (newGamepads && newGamepads !== null) addGamepad(newGamepads);
    }
  };

  // Add event listener for gamepad connecting
  useEffect(() => {
    window.addEventListener('gamepadconnected', connectGamepadHandler);

    return window.removeEventListener(
      'gamepadconnected',
      connectGamepadHandler
    );
  });

  // Update each gamepad's status on each "tick"
  const animate = () => {
    if (!haveEvents) scanGamepads();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current!);
  });

  return gamepads.current;
}
