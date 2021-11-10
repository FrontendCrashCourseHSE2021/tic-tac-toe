import React from 'react'
import {mount, ReactWrapper, shallow} from 'enzyme'
import {Game, SquareValue} from "./Game";
import each from "jest-each";
import {Board} from "./Board";

class TestCase {
    constructor(public order: number[]) {
    }

    toString() {
        return this.order + "";
    }
}

it('renders without crashing', () => {
    shallow(<Game />);
});

describe('normal gameplay', () => {
    each(generateTestCases())
        .it('order %s', (theCase: TestCase) => {
            const wrapper: ReactWrapper = mount(<Game/>);

            const firstPlayer = wrapper.find('div.game-info').children().first().text();
            expect(firstPlayer).toEqual('Next player: X');

            const buttons = wrapper.find('button.square');

            for (const idx of theCase.order) {
                buttons.at(idx).simulate('click');
            }

            const winner = wrapper.find('div.game-info').children().first().text();

            let board = wrapper.find(Board);

            let squares = board.prop("squares");

            let realWinner = calculateWinner(squares);

            if (realWinner == null) {
                expect(winner).toEqual("It's a tie!");
                return;
            }

            expect(winner).toEqual('Winner: ' + realWinner);
        });
});

function pseudoRandomWithSeed(s: number): () => number {
    const mask = 0xffffffff;
    let m_w = (123456789 + s) & mask;
    let m_z = (987654321 - s) & mask;

    return function() {
        m_z = (36969 * (m_z & 65535) + (m_z >>> 16)) & mask;
        m_w = (18000 * (m_w & 65535) + (m_w >>> 16)) & mask;

        let result = ((m_z << 16) + (m_w & 65535)) >>> 0;
        result /= 4294967296;
        return result;
    }
}

function generateTestCases(): TestCase[] {
    let rnd: () => number = pseudoRandomWithSeed(0xDEADBEEF);

    let cases: TestCase[] = [];
    for (let i = 0; i < 1_000; i++) {
        let available = [0, 1, 2, 3, 4, 5, 6, 7, 8];

        let theCase: number[] = [];

        while (available.length > 0) {
            theCase.push(available.splice(rnd() * available.length, 1)[0]);
        }

        cases.push(new TestCase(theCase));
    }

    return cases;
}

function calculateWinner(squares: SquareValue[]) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
