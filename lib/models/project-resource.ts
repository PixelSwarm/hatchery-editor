﻿import { Model, IModelOptions } from './model';
import { EditableSet } from '../core/properties/editable-set';

/**
 * Events related to project resources
 */
export type ResourceEvents =
    'edited' |
    'refreshed' |
    'modified';

/**
 * An event token for events dispatched by changes to or from resources
 */
export interface IResourceEvent {
    resource: ProjectResource<HatcheryServer.IResource>;
}

/**
* A base class for all project resources
*/
export abstract class ProjectResource<T extends HatcheryServer.IResource> extends Model<T> {

    private _saved: boolean;
    protected _properties: EditableSet;
    protected _options: { [ s: string ]: any; };

    constructor( options?: IModelOptions<T> ) {
        super( options );
        this._saved = true;
        this._options = {};
        this._properties = new EditableSet( this );
    }

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