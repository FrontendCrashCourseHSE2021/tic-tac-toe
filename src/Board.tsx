import React from "react";
import {Square} from "./Square";
import {SquareValue} from "./Game";

/**
 * Тип входных данных для компоненты "Игровая доска"
 */
interface BoardProps {
    /**
     * Сама доска в виде списка.
     */
    squares: SquareValue[];

    /**
     * Обработчик нажатия на элемент доски
     * @param idx Индекс на доске.
     */
    onClick: (idx: number) => void;
}

/**
 * Компонента "Игровая доска"
 * @param props Входные данные
 * @constructor
 */
export function Board(props: BoardProps) {
    /**
     * Функция, которая создаёт вёрстку для отдельной ячейки на доске
     * @param i номер ячейки.
     */
    function renderSquare(i: number) {
        return (
            <Square
                value={props.squares[i]}  // из массива доски
                onClick={() => props.onClick(i)}  // вызывается функция
            />
        );
    }

    // Рисуем все 9 ячеек
    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
