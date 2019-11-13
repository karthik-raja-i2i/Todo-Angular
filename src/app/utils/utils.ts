
export class Utils {
    /**
    * It adds content inside a particular element
    * 
    * @param  obj - The element to which the content is to be added 
    * @param content - The content to be added  
    */
    public addInnerHTML(obj,content) {
        obj.innerHTML = content;
    }

    /**
    * It clears all the contents of an element
    * @param  obj - The element whoose content is to be cleared 
    */
    public clearContent(obj) {
        obj.innerHTML = "";
    }

    /**
    * It sets attributes for an element
    * 
    * @param obj - The element to which the attributes are to set
    * @param propertyMap - The map with keys as the properties and the values as property value
    */
    public mapAttributes(obj,propertyMap) {
        console.log(obj);
        for (let [key,value] of propertyMap) {
            obj.setAttribute(key,value);
            console.log(key);
            console.log(value);
        }
    }

    /**
 * It creates and returns an HTML element based on requirement
 * 
 * @param  type - The type of element to be created
 * @returns The created element
 */
public createElement(type) {
    return document.createElement(type);
}
}