import { expect } from 'chai';
import 'mocha';
import { ParseObject, ParseArray } from '../core/typescriptParser';

interface ITestObjectDetails {
    age: number;
    dateOfBirth: Date;
}

class TestObjectDetails implements ITestObjectDetails {
    age: number;
    private _dateOfBirth: Date = new Date();
    
    get dateOfBirth(): Date {
        return this._dateOfBirth;
    }
    set dateOfBirth(val: Date) {
        this._dateOfBirth = val;
    }
}

interface ITestObject {
    id: number;
    firstName: string;
    lastName: string;
    details: ITestObjectDetails;
}

class TestObject implements ITestObject {
    id: number = 0;
    details: TestObjectDetails;
    private _firstName: string = "Joe";
    private _lastName: string = "Bloggs";
    
    get firstName(): string {
        return this._firstName.toLowerCase();
    }
    set firstName(val: string) {
        this._firstName = val;
    }
    
    get lastName(): string {
        return this._lastName.toUpperCase();
    }
    set lastName(val: string) {
        this._lastName = val;
    }

    getTypes() {
        return {
            details: TestObjectDetails
        }
    }
} 

describe('Parse Object Function', () => {

    it('Parses json object, to object provided.', () => {
        const jsonObject: ITestObject = {
            id: 12,
            firstName: "Joe",
            lastName: "Bloggs",
            details: {
                age: 40,
                dateOfBirth: new Date(1980, 2, 24)
            }
        }

        expect(jsonObject.id).to.equal(12);
        expect(jsonObject.firstName).to.equal('Joe');
        expect(jsonObject.lastName).to.equal('Bloggs');
        expect(jsonObject.details.age).to.equal(40);
        expect(new Date(jsonObject.details.dateOfBirth).toDateString()).to.equal(new Date(1980, 2, 24).toDateString());
        
        let parsedObject: TestObject = ParseObject(jsonObject, TestObject);

        expect(parsedObject.id).to.equal(12);
        expect(parsedObject.firstName).to.equal('joe');
        expect(parsedObject.lastName).to.equal('BLOGGS');
        expect(parsedObject.details.age).to.equal(40);
        expect(new Date(parsedObject.details.dateOfBirth).toDateString()).to.equal(new Date(1980, 2, 24).toDateString());
    });
});

describe('Parse Array Function', () => {

    it('Parses json array of objects, to object provided.', () => {
        const jsonArray: ITestObject[] = [
            {
                id: 12,
                firstName: "Peter",
                lastName: "Parker",
                details: {
                    age: 26,
                    dateOfBirth: new Date(1993, 8, 27)
                }
            },
            {
                id: 13,
                firstName: "Mary",
                lastName: "Jane",
                details: {
                    age: 26,
                    dateOfBirth: new Date(1993, 8, 18)
                }
            }
        ];
        
        expect(jsonArray[0].id).to.equal(12);
        expect(jsonArray[0].firstName).to.equal('Peter');
        expect(jsonArray[0].lastName).to.equal('Parker');
        expect(jsonArray[0].details.age).to.equal(26);
        expect(new Date(jsonArray[0].details.dateOfBirth).toDateString()).to.equal(new Date(1993, 8, 27).toDateString());
        
        expect(jsonArray[1].id).to.equal(13);
        expect(jsonArray[1].firstName).to.equal('Mary');
        expect(jsonArray[1].lastName).to.equal('Jane');
        expect(jsonArray[1].details.age).to.equal(26);
        expect(new Date(jsonArray[1].details.dateOfBirth).toDateString()).to.equal(new Date(1993, 8, 18).toDateString());
        
        let parsedArray: TestObject[] = ParseArray(jsonArray, TestObject);

        expect(parsedArray[0].id).to.equal(12);
        expect(parsedArray[0].firstName).to.equal('peter');
        expect(parsedArray[0].lastName).to.equal('PARKER');
        expect(parsedArray[0].details.age).to.equal(26);
        expect(new Date(parsedArray[0].details.dateOfBirth).toDateString()).to.equal(new Date(1993, 8, 27).toDateString());

        expect(parsedArray[1].id).to.equal(13);
        expect(parsedArray[1].firstName).to.equal('mary');
        expect(parsedArray[1].lastName).to.equal('JANE');
        expect(parsedArray[1].details.age).to.equal(26);
        expect(new Date(parsedArray[1].details.dateOfBirth).toDateString()).to.equal(new Date(1993, 8, 18).toDateString());
    });
});