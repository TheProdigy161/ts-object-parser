export class JsonParser {
    //Using the obj provided recreates the data from this, into the new object.
    static ReParse(obj, type): any {
        //Create JSON object using the json provided.
        // console.log("Stringifying obj to json.");
        let json: string = JSON.stringify(obj);
        // console.log("Parsing 'json' to jsonObject.");
        let jsonObject = JSON.parse(json);
        
        // console.log("Getting class name.");
        // console.log(`Class name is: ${type}`);

        let newObject = new type();
        let nonPrimitiveTypes = newObject.getTypes();

        // console.log("Successfully created new type.")
        // console.log("Starting to populate object.");

        for (let propName in jsonObject) {
            if (typeof(jsonObject[propName]) !== "object")
            newObject[propName] = jsonObject[propName];
            else {
                // console.log("Configuring non-primitive type.");
                newObject[propName] = JsonParser.ReParse(jsonObject[propName], nonPrimitiveTypes[propName]);
            }
        }

        return newObject;
    }
}