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
        squares: Array(9).fill(null),
        xIsNext: true
    });

    /**
     * Вычислить победителя, если он есть.
     * @param squares Массив игрового поле
     * @return результат игры. PERSON1 -- победили крестики, PERSON2 -- победили нолики
     * или null -- пока нет победителя (или уже не будет, если это ничья).
     */
    function calculateWinner(squares: SquareValue[]): SquareValue {
        if (((squares[0]==squares[1])&&(squares[1]==squares[2])&&(squares[0] != null))||
            ((squares[0]==squares[3])&&(squares[3]==squares[6])&&(squares[6] != null))||
            ((squares[0]==squares[4])&&(squares[4]==squares[8])&&(squares[0] != null)))
        {return squares[0]}
        else if (((squares[3]==squares[4])&&(squares[4]==squares[5])&&(squares[3] != null))||
        ((squares[1]==squares[4])&&(squares[4]==squares[7])&&(squares[4] != null))||
            ((squares[2]==squares[4])&&(squares[4]==squares[6])&&(squares[4] != null)))
        {return squares[4]}
        else if (((squares[2]==squares[5])&&(squares[5]==squares[8])&&(squares[8] != null))||
        ((squares[6]==squares[7])&&(squares[7]==squares[8])&&(squares[6] != null))){return squares[8]}
        // return PLAYER2;
        // return PLAYER1;
        else return null;
    }
    /**
     * Вычисляет ничья в игре или нет.
     * @param squares Массив игрового поля.
     * @return true если ничья, false если не ничья.
     */
    function isTie(squares: SquareValue[]): boolean {
        // return true;
        if (!(calculateWinner(squares))&&!(squares.includes(null))){
            return true
        }
        else return false;
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
