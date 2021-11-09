import React from "react";

interface SquareProps {
    onClick: () => void;
    value: string;
}

export function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
