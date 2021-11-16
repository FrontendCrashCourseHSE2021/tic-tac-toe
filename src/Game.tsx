import React, {useState} from "react";
import {Board} from "./Board";

// Крестики, они же Игрок1
const PLAYER1 = "X";

// Нолики, они же Игрок2
const PLAYER2 = "O";

// Наш специальный тип данных, может принимать три значения "X", "O" или null
export type SquareValue = (typeof PLAYER1 | typeof PLAYER2 | null);

/**
 * Тип состояния игры
 */
interface GameState {
    /**
     * Массив с игровым полем (0 - 2 первая строка, 3 - 5 вторая строка, 6 - 8 третья строка)
     */
    squares: SquareValue[];

    /**
     * true -- следующим ходит игрок с "крестиками", false -- с "ноликами"
     */
    xIsNext: boolean;
}

/**
 * Компонента "игра".
 * @constructor
 */
export function Game() {
    // получаем состояние игры и функцию для его изменения
    const [state, changeState] = useState<GameState>({
        squares: Array(9).fill(null) as Array<SquareValue>,
        xIsNext: true
    });

    /**
     * Вычислить победителя, если он есть.
     * @param squares Массив игрового поле
     * @return результат игры. PERSON1 -- победили крестики, PERSON2 -- победили нолики
     * или null -- пока нет победителя (или уже не будет, если это ничья).
     */
    function calculateWinner(squares: SquareValue[]): SquareValue {
        // return PLAYER2;
        // return PLAYER1;
        if ((squares[0] === PLAYER1 && squares[1] === PLAYER1 && squares[2] === PLAYER1)
            || (squares[3] === PLAYER1 && squares[4] === PLAYER1 && squares[5] === PLAYER1)
            || (squares[6] === PLAYER1 && squares[7] === PLAYER1 && squares[8] === PLAYER1)
            || (squares[0] === PLAYER1 && squares[4] === PLAYER1 && squares[8] === PLAYER1)
            || (squares[2] === PLAYER1 && squares[4] === PLAYER1 && squares[6] === PLAYER1)) {
            return PLAYER1;
            //    vertical 1
        } else if ((squares[0] === PLAYER1 && squares[3] === PLAYER1 && squares[6] === PLAYER1)
            || (squares[1] === PLAYER1 && squares[4] === PLAYER1 && squares[7] === PLAYER1)
            || (squares[2] === PLAYER1 && squares[5] === PLAYER1 && squares[8] === PLAYER1)) {
            return PLAYER1;
            //    horiz 2 + diag
        } else if ((squares[0] === PLAYER2 && squares[1] === PLAYER2 && squares[2] === PLAYER2)
            || (squares[3] === PLAYER2 && squares[4] === PLAYER2 && squares[5] === PLAYER2)
            || (squares[6] === PLAYER2 && squares[7] === PLAYER2 && squares[8] === PLAYER2)
            || (squares[0] === PLAYER2 && squares[4] === PLAYER2 && squares[8] === PLAYER2)
            || (squares[2] === PLAYER2 && squares[4] === PLAYER2 && squares[6] === PLAYER2)) {
            return PLAYER2;
            //    vertical 2
        } else if((squares[0] === PLAYER2 && squares[3] === PLAYER2 && squares[6] === PLAYER2)
            || (squares[1] === PLAYER2 && squares[4] === PLAYER2 && squares[7] === PLAYER2)
            || (squares[2] === PLAYER2 && squares[5] === PLAYER2 && squares[8] === PLAYER2)) {
            return PLAYER2;
        } else {
            return null
        }
    }

    /**
     * Вычисляет ничья в игре или нет.
     * @param squares Массив игрового поля.
     * @return true если ничья, false если не ничья.
     */
    function isTie(squares: SquareValue[]): boolean {
        // return true;
        if ((squares[0] === PLAYER1 || squares[0] === PLAYER2) &&
            (squares[1] === PLAYER1 || squares[1] === PLAYER2) &&
            (squares[2] === PLAYER1 || squares[2] === PLAYER2) &&
            (squares[3] === PLAYER1 || squares[3] === PLAYER2) &&
            (squares[4] === PLAYER1 || squares[4] === PLAYER2) &&
            (squares[5] === PLAYER1 || squares[5] === PLAYER2) &&
            (squares[6] === PLAYER1 || squares[6] === PLAYER2) &&
            (squares[7] === PLAYER1 || squares[7] === PLAYER2) &&
            (squares[8] === PLAYER1 || squares[8] === PLAYER2))
        {
            return true;
        }
        return false;
    }

    /**
     * Обработчик нажатия на кнопку.
     * @param idx Индекс ячейки игрового поля, на которую нажали.
     */
    function handleClick(idx: number) {
        const squares = state.squares;

        if (calculateWinner(squares) || squares[idx] != null) {
            // если есть победитель или на эту ячейку уже нажимали не делаем ничего
            return;
        }

        // Заполняем массив. Если сейчас ходят крестики, то кладём крестик и наоборот.
        squares[idx] = state.xIsNext ? PLAYER1 : PLAYER2;

        // Меняем состояние игры.
        changeState({
            squares: squares,
            xIsNext: !state.xIsNext
        });
    }

    const squares = state.squares;

    // Посмотрим есть ли победитель.
    const winner = calculateWinner(squares);

    let status;

    if (winner != null) {
        // Победитель есть, "положим" его в статус игры
        status = "Winner: " + winner;
    } else {
        if (isTie(squares)) {
            // Ничья
            status = "It's a tie!";
        } else {
            // Выведем кто ходит следующим
            status = "Next player: " + (state.xIsNext ? PLAYER1 : PLAYER2);
        }
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board
                    squares={squares}
                    onClick={i => handleClick(i)}
                />
            </div>
            <div className="game-info">
                <div>{status}</div>
            </div>
        </div>
    );
}
