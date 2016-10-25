﻿import { EventDispatcher } from '../../core/event-dispatcher';
import { generateLocalId } from '../../core/utils';
import { EditableSet } from '../properties/editable-set';
import { ResourceEvents, IResourceEvent } from '../../setup/events';

/**
* A base class for all project resources
*/
export abstract class ProjectResource<T extends HatcheryServer.IResource> extends EventDispatcher {
    public entry: T;
    private _saved: boolean;
    protected _properties: EditableSet;
    protected _options: { [ s: string ]: any; };

    constructor( entry: T ) {
        super();

        this.entry = entry;
        const resource: HatcheryServer.IResource = <HatcheryServer.IResource>entry;
        resource.shallowId = generateLocalId( resource.shallowId );
        this._saved = true;
        this._options = {};
        this._properties = new EditableSet( this );
    }

    /**
    * Use this function to initialize the resource. This called just after the resource is created and its entry set.
    */
    initialize() {

    }

    /**
    * This function is called just before the entry is saved to the database.
    */
    onSaving(): any { }


    /**
    * Gets the properties of this resource
    */
    get properties(): EditableSet {
        return this._properties;
    }

    /**
    * Sets the properties of this resource
    */
    set properties( val: EditableSet ) {
        this._properties = val;
        val.parent = this;
    }

    /**
    * Gets if this resource is saved
    */
    get saved(): boolean {
        return this._saved
    }

    /**
    * Sets if this resource is saved
    */
    set saved( val: boolean ) {
        this._saved = val;
        this.emit<ResourceEvents, IResourceEvent>( 'modified', { resource: this });
    }



    dispose() {
        super.dispose();
    }

    /**
    * Creates an option which is associated with this asset. The name of the option must be unique. Use this to add your own custom data
    */
    createOption( name: string, val: any ) { this._options[ name ] = val; }

    /**
    * Destroys an option
    */
    removeOption( name: string ) { delete this._options[ name ]; }

    /**
    * Update the value of an option
    */
    updateOption( name: string, val: any ) { this._options[ name ] = val; }

    /**
    * Returns the value of an option
    */
    getOption( name: string ): any { return this._options[ name ]; }
}