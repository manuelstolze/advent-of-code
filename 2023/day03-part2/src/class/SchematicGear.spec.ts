import { SchematicGear } from './SchematicGear';

describe('SchematicGear', () => {
    const x = 2;
    const y = 3;

    const schematicGear = new SchematicGear(x, y);

    it('should be initialized correctly', () => {
        expect(schematicGear).toBeInstanceOf(SchematicGear);
        expect(schematicGear.x).toBe(x);
        expect(schematicGear.y).toBe(y);
        expect(schematicGear.adjacentNumbers).toEqual([]);
    });
});
