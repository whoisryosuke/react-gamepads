interface GamepadRef {
    [key: number]: Gamepad;
}
export default function useGamepads(callback: (data: GamepadRef) => void): GamepadRef;
export {};
