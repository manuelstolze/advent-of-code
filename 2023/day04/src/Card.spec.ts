import {describe, expect} from "@jest/globals";
import {Card} from "./Card";


describe('Card', () => {

    it('should handle no matched numbers', function () {
        const winningNumbers = [1,2,3,4,5];
        const selectedNumbers = [6,7]

        const card = new Card(1, winningNumbers, selectedNumbers)

        expect(card.sumOfPoints).toBe(0)
    });

    it('should handle more than 3 matched numbers', function () {
        const winningNumbers = [1,2,3,4,5];
        const selectedNumbers = [1,2,3,4,6,7]

        const card = new Card(1, winningNumbers, selectedNumbers)

        expect(card.sumOfPoints).toBe(8)
    });

})