module Animate
{
	//class EditorContainer
	//{
	//	public editor: JQuery;
	//	public propertyName: string;
	//	public propertyValue: any;

	//	constructor( editor : JQuery, name : string, value : any )
	//	{
	//		this.editor = editor;
	//		this.propertyName = name;
	//		this.propertyValue = value;
	//	}
	//}

	/**
	* A simple interface for property grid editors 
	*/
	export class PropertyGridEditor
	{
		//private _grid: PropertyGrid;
		//private mEditors: Array<EditorContainer>;

		constructor( grid: PropertyGrid )
		{
			//this._grid = grid;
			//this.mEditors = [];
		}

		/**
		* Given a property, the grid editor must produce HTML that can be used to edit the property
		* @param {Prop<any>} prop The property being edited
		* @param {Component} container The container acting as this editors parent
		*/
        edit(prop: Prop<any>, container: Component)
		{
			return null;
		}

		///**
		//* Use this function to create a nice wrapper for any HTML you want to use as an editor. This will surround the html and css that makes
		//* it fit in with the other property editors already available.
		//*/
		//createEditorJQuery( propertyName : string, html : string, value : any ) : JQuery
		//{
		//	var editor = jQuery(
		//		"<div class='property-grid-label'>" + propertyName + "</div>" +
		//		"<div class='property-grid-value'>" + html + "</div >" +
		//		"<div class='fix' ></div > "
		//		);

		//	this.mEditors.push( new EditorContainer( editor, propertyName, value ) );
		//	return editor;
		//}

		///**
		//* Call this function to tell the grid that a property has been edited.
		//*/
		//notify( prop: Prop<any> )
		//{
		//	this._grid.propUpdated( prop );
		//}

		///* Cleans up the editor */
		//dispose()
		//{
		//	this.mEditors = null;
		//	this._grid = null;
		//}

		///* This function is called when the grid is cleaning up all the editors. */
		//cleanup()
		//{
		//	var items: Array<EditorContainer> = this.mEditors;
		//	var i: number = items.length;

		//	while ( i-- )
		//	{
		//		items[i].editor.off();
		//		items[i].editor.remove();
		//	}

		//	items.splice( 0, items.length );
		//}

		///**
		//* Updates the value of the editor object  because a value was edited externally.
		//* @param {any} newValue The new value
		//* @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
		//*/
		//update( newValue: any, editHTML: JQuery ): void
		//{
		//	throw Error( "All PropertyGridEditors must implement the update function." );
		//}

		///**
		//* Called when the editor is being added to the DOM
		//*/
		//onAddedToDom()
		//{
		//}
	}
}