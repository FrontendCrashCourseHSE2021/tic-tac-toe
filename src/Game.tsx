import React from "react";
import {Board} from "./Board";

interface GameState {
    squares: string[];
    xIsNext: boolean;
}

export class Game extends React.Component<{}, GameState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            squares: Array(9).fill(null) as Array<string>,
            xIsNext: true
        };
    }

    static calculateWinner(squares: string[]): string {
        return "X";
    }

    static isTie(squares: string[]): boolean {
        return false;
    }

    handleClick(idx: number) {
        const squares = this.state.squares;

        if (Game.calculateWinner(squares) || squares[idx]) {
            return;
        }

        squares[idx] = this.state.xIsNext ? "X" : "O";

        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext
        });
    }

    render() {
        const squares = this.state.squares;

        const winner = Game.calculateWinner(squares);

        let status;

        if (winner) {
            status = "Winner: " + winner;
        } else {
            if (Game.isTie(squares)) {
                status = "It's a tie!";
            } else {
                status = "Next player: " + (this.state.xIsNext ? "X" : "O");
            }
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={squares}
                        onClick={i => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                </div>
            </div>
        );
    }
}
