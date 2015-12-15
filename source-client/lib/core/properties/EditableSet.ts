﻿module Animate
{
    /**
    * Defines a set of variables to use in the property grid
    */
    export class EditableSet
    {
        private _variables: Array<Prop<any>>;

        /**
        * Creates a {PropertyGridSet} 
        */
        constructor()
        {
            this._variables = [];
        }
		
        /** 
        * Adds a variable to the set 
        * @param {Prop<any>} prop
        */
        addVar(prop: Prop<any>): void
        {
            var items = this._variables;
            for (var i = 0; i < items.length; i++)
                if (items[i].name == prop.name)
                    throw new Error(`A property with the name '${prop.name}' already exists`);

            this._variables.push(prop);
        }

        /** 
        * Gets a variable by name 
        * @param {string} name
        * @returns {Prop<T>}
        */
        getVar<T>(name: string): Prop<T>
        {
            var items = this._variables;
            for (var i = 0, l = items.length; i < l; i++)
                if (items[i].name == name)
                    return items[i];

            return null;
        }

        /** 
        * Removes a variable 
        * @param {string} prop
        */
        removeVar(name: string): void
        {
            var items = this._variables;
            for (var i = 0, l = items.length; i < l; i++)
                if (items[i].name == name)
                {
                    items[i].dispose();
                    items.splice(i, 1);
                }
        }

        /**
        * Updates a variable with a new value 
        * @returns {T}
        */
        updateValue<T>(name: string, value: T): T
        {
            var items = this._variables;
            for (var i = 0, l = items.length; i < l; i++)
                if (items[i].name == name)
                {
                    items[i].setVal(value);
                    return <T>items[i].getVal();
                }

            return null;
        }

        /**
        * Tokenizes the data into a JSON. 
        * @param {boolean} slim If true, only the core value is exported. If false, additional data is exported so that it can be re-created at a later stage
        */
        tokenize(slim: boolean = false): any
        {
            var toRet: any = {};
            var items = this._variables;
            for (var i = 0; i < items.length; i++)
                toRet[items[i].name] = items[i].tokenize(slim);

            return toRet;
        }

        /**
        * De-Tokenizes data from a JSON. 
        * @param {any} data The data to import from
        * @param {boolean} slim If true, only the core value is exported. If false, additional data is exported so that it can be re-created at a later stage
        */
        deTokenize( data: any, slim: boolean = false)
        {
            var toRet: any = {};
            var items = this._variables;
            for (var t in data)
                for (var i = 0, l = items.length; i < l; i++)
                    if (items[i].name == t)
                    {
                        items[i].deTokenize(data[t]);
                        break;
                    }
        }

         /**
        * Tokenizes the data into a JSON. 
        * @returns {Array<Prop<any>>}
        */
        get variables(): Array<Prop<any>> { return this._variables; }
    }
}