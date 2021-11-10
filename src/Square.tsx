import React from "react";
import {SquareValue} from "./Game";

/**
 * Тип входных данных для компонента "Ячейка на доске"
 */
interface SquareProps {
    /**
     * Обработчик нажатия на эту ячейка
     */
    onClick: () => void;

    /**
     * Данные в ячейке ("X", "O", null)
     */
    value: SquareValue;
}

export function Square(props: SquareProps) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
