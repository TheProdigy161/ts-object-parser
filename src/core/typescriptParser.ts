//Using the obj provided recreates the data from this, into the new object.
export function ParseObject<S, T>(obj: S, type): T {
    //Create JSON object using the json provided.
    //Stringify object being passed.
    let json: string = JSON.stringify(obj);
    //Parse the json to a JSON Object.
    let jsonObject = JSON.parse(json);
    
    //Create a new object of the type provided.
    let newObject = new type();

    //Loop through JSON object and assign parameters/create complex objects.
    for (let propName in jsonObject) {
        if (typeof(jsonObject[propName]) !== "object") {
            //Assign primitive parameter.
            newObject[propName] = jsonObject[propName];
        }
        else {
            //Get the complex types that are contained within the object. 
            let nonPrimitiveTypes = newObject.getTypes();
            
            //Create complex object.
            if (jsonObject[propName].length === undefined)
                newObject[propName] = this.ParseObject(jsonObject[propName], nonPrimitiveTypes[propName]);
            else
                newObject[propName] = this.ParseArray(jsonObject[propName], nonPrimitiveTypes[propName]);
        }
    }

    return newObject;
}

//Takes an array of objects and parses 
export function ParseArray<S, T>(array: S[], type): T[] {
    //Create the array to be passed back.
    let newArray: T[] = [];

    //Loop through JSON object and assign parameters/create complex objects.
    for (let index in array) {
        //Create the new element from the array element.
        let newElement= this.ParseObject(array[index], type);
        newArray.push(newElement);
    }

    return newArray;
}