![](https://github.com/TheProdigy161/js-object-parser/workflows/build/badge.svg)

# Typescript Object Parser

## Table of Contents

* [Summary](#summary)
* [Getting Started](#getting-started)
	* [Installation](#installation)
	* [Usage](#usage)
	* [ParseObject](#parseObject)
	* [GetTypes](#getTypes)
* [All Done](#all-done)

## Summary

This package aims to help with constructing objects without having to setup in the object class constructor. It takes in a JSON object and the type that the JSON object needs to be parsed to and returns that object with all parameters and class methods being populated.

## Getting Started
### Installation
    npm i ts-object-parser

### Usage
This package is best used with interfaces that need to be converted to a class object as it will populate the object functions. This is due to private methods not being initialized unless the **new** keyword.

### ParseObject
For parsing a JSON object to another object, the following is the general setup.

Initialize the data that will be parsed to the object. The variable for the data will usually be setup with an **interface** as the type so that the variables to be added are stated, but this is optional:

	interface ITestObjectDetails {
		age: number;
		dateOfBirth: Date;
	}

	interface ITestObject {
		id: number;
		firstName: string;
		lastName: string;
		details: ITestObjectDetails;
	}

	let object: ITestObject = {
		id:  12,
		firstName:  "Peter",
		lastName:  "Parker",
		details: {
			age: 26,
			dateOfBirth: new Date(1993, 8, 27)
		}
	};

Then the object is parsed using the **ParseObject** function by passing the object to be parsed along with the type that it should be parsed to. In this example it will be converting an **ITestObject** interface to the **TestObject**:

	class TestObjectDetails implements ITestObjectDetails {
		age: number;
		private _dateOfBirth: Date = new  Date();
		
		get dateOfBirth(): Date {
			return this._dateOfBirth;
		}
		set dateOfBirth(val: Date) {
			this._dateOfBirth = val;
		}
	}
	
	class TestObject implements ITestObject, IJsonParser {
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
	
	let parsedObject: TestObject = ParseObject(obj, TestObject);

Each custom class that will be used within the parsing process needs to implement the interface **IJsonParser** so make sure that the function **getTypes()** will be implemented as it is required.

Using this method the object will be parsed along with all of the class methods needed.

### ParseArray
 This function allows you to pass a full array of the object to be parsed and it will return an array with the type that was specified. The same classes and interfaces are used that were used for the **ParseObject** function.

First initialize the JSON object that will be parsed: 

	let  array: ITestObject[] = [
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

Then pass through the array and the type that each element in the array will be. In this example, that will be the **TestObject** type:

	let parsedArray: TestObject[] = ParseArray(jsonArray, TestObject);

Then an array of **TestObject** will be returned with all of the elements having their functions initialized.

### GetTypes
The **getTypes** is used to specify the type for each complex object. For example on the **TestObject** class the following would be the required function implementation since it implements the class **TestObjectDetails**:

	getTypes() {
		return {
			details: TestObjectDetails
		}
	}

When specifying the types the key (**details**) is the name of the variable as it is shown in the user class. Then the value is the type (**TestObjectDetails**) of the variable.

If there are no complex objects on the class, then the **IJsonParser** interface does not need to be implemented and the **getTypes** function is not required.

## All done
Once the above steps have been followed, the package will be able to be used effectively.