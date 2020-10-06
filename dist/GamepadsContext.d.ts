import React from 'react';
declare const GamepadsContext: React.Context<{}>;
interface GamepadsProviderProps {
    children: React.ReactNode;
}
declare const GamepadsProvider: ({ children }: GamepadsProviderProps) => JSX.Element;
export { GamepadsProvider, GamepadsContext };
