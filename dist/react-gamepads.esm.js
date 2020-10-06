import React, { useRef, useEffect, createContext, useState, useCallback } from 'react';

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function useGamepads(callback) {
  var gamepads = useRef([]);
  var requestRef = useRef();
  var haveEvents = ('ongamepadconnected' in window);

  var addGamepad = function addGamepad(gamepad) {
    var _extends2;

    gamepads.current = _extends({}, gamepads.current, (_extends2 = {}, _extends2[gamepad.index] = gamepad, _extends2)); // Send data to external callback (like React state)

    callback(gamepads.current); // Handle controller input before render
    // @TODO: Add API to hook callback into this
    // requestAnimationFrame(updateStatus);
  };
  /**
   * Adds game controllers during connection event listener
   * @param {object} e
   */


  var connectGamepadHandler = function connectGamepadHandler(e) {
    addGamepad(e.gamepad);
  };
  /**
   * Finds all gamepads and adds them to context
   */


  var scanGamepads = function scanGamepads() {
    // Grab gamepads from browser API
    var detectedGamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []; // Loop through all detected controllers and add if not already in state

    for (var i = 0; i < detectedGamepads.length; i++) {
      var newGamepads = detectedGamepads[i];
      if (newGamepads && newGamepads !== null) addGamepad(newGamepads);
    }
  }; // Add event listener for gamepad connecting


  useEffect(function () {
    window.addEventListener('gamepadconnected', connectGamepadHandler);
    return window.removeEventListener('gamepadconnected', connectGamepadHandler);
  }); // Update each gamepad's status on each "tick"

  var animate = function animate() {
    if (!haveEvents) scanGamepads();
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(function () {
    requestRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(requestRef.current);
    };
  });
  return gamepads.current;
}

var GamepadsContext = /*#__PURE__*/createContext({});

var GamepadsProvider = function GamepadsProvider(_ref) {
  var children = _ref.children;

  var _useState = useState({}),
      gamepads = _useState[0],
      setGamepads = _useState[1];

  var requestRef = useRef();
  var haveEvents = ('ongamepadconnected' in window);
  var addGamepad = useCallback(function (gamepad) {
    var _extends2;

    setGamepads(_extends({}, gamepads, (_extends2 = {}, _extends2[gamepad.index] = {
      buttons: gamepad.buttons,
      id: gamepad.id,
      axes: gamepad.axes
    }, _extends2))); // Handle controller input before render
    // requestAnimationFrame(updateStatus);
  }, [gamepads, setGamepads]);
  /**
   * Adds game controllers during connection event listener
   * @param {object} e
   */

  var connectGamepadHandler = function connectGamepadHandler(e) {
    addGamepad(e.gamepad);
  };
  /**
   * Finds all gamepads and adds them to context
   */


  var scanGamepads = useCallback(function () {
    // Grab gamepads from browser API
    var detectedGamepads = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []; // Loop through all detected controllers and add if not already in state

    for (var i = 0; i < detectedGamepads.length; i++) {
      if (detectedGamepads[i]) {
        addGamepad(detectedGamepads[i]);
      }
    }
  }, [addGamepad]); // Add event listener for gamepad connecting

  useEffect(function () {
    window.addEventListener('gamepadconnected', connectGamepadHandler);
    return window.removeEventListener('gamepadconnected', connectGamepadHandler);
  }); // Update each gamepad's status on each "tick"

  var animate = useCallback(function () {
    if (!haveEvents) scanGamepads();
    requestRef.current = requestAnimationFrame(animate);
  }, [requestRef, scanGamepads, haveEvents]);
  useEffect(function () {
    requestRef.current = requestAnimationFrame(animate);
    return function () {
      return cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);
  return React.createElement(GamepadsContext.Provider, {
    value: {
      gamepads: gamepads,
      setGamepads: setGamepads
    }
  }, children);
};

export { GamepadsContext, GamepadsProvider, useGamepads };
//# sourceMappingURL=react-gamepads.esm.js.map
