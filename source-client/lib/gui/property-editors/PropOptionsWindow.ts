//module Animate
//{
//	export class ButtonOptions
//	{
//		public onWindowShow: ( component: Component ) => void;
//		public onWindowClosing: ( component: Animate.Component, e: OkCancelFormEvent ) => void;
//		public getValue: () => any;

//		constructor( onWindowShow?: ( component: Component ) => void, onWindowClosing?: ( component: Animate.Component, e: OkCancelFormEvent ) => void, getValue?: () => any )
//		{
//			this.onWindowShow = onWindowShow;
//			this.onWindowClosing = onWindowClosing;
//			this.getValue = getValue;
//		}
//	}

//	/**
//	* An editor which allows a user to click a button, which will popup a window  filled with options
//	*/
//	export class PropOptionsWindow extends PropertyGridEditor
//	{
//		private static _window: OkCancelForm;

//		constructor( grid: PropertyGrid )
//		{
//			super( grid );
//		}

//		/**
//		* Given a property, the grid editor must produce HTML that can be used to edit the property
//		* @param {Prop<any>} prop The property being edited
//		* @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
//		*/
//        edit(prop: Prop<any>): JQuery
//		{
//			if ( objectType != ParameterType.OPTIONS )
//				return null;

//			if ( !PropOptionsWindow._window )
//			{
//				PropOptionsWindow._window = new OkCancelForm( 200, 200, true, true, "Options", false );
//				PropOptionsWindow._window.element.css( { width: "", height: "" });
//				PropOptionsWindow._window.content.element.css( { width: "", height: "" });
//				PropOptionsWindow._window.okCancelContent.element.addClass("prop-options-content");
//			}

//			var buttonOptions: ButtonOptions = <ButtonOptions>options;
		
//			//Create HTML	
//			var editor: JQuery = jQuery( "<div class='options-button button'>" + propertyName + "</div><div class='fix' ></div >");
//			var that = this;

//			//Functions to deal with user interactions with JQuery
//			var onOkFormConfirm = function ( e: ENUM, event: OkCancelFormEvent, sender?: EventDispatcher )
//			{
//				PropOptionsWindow._window.headerText = propertyName;

//				if ( buttonOptions.onWindowClosing )
//					buttonOptions.onWindowClosing( PropOptionsWindow._window.okCancelContent, event );

//				if ( event.cancel === false )
//				{
//					PropOptionsWindow._window.off( OkCancelFormEvents.CONFIRM, onOkFormConfirm );
//					var newValue: any = propertyValue;

//					if ( buttonOptions.getValue )
//						newValue = buttonOptions.getValue();

//					that.notify( propertyName, newValue, objectType );
//				}
//			};
			
//			// Called when we click on the button
//            var mouseUp = function (e: JQueryEventObject  ) 
//			{
//				//Remove any previous references
//				PropOptionsWindow._window.off( OkCancelFormEvents.CONFIRM, onOkFormConfirm );
//				PropOptionsWindow._window.on( OkCancelFormEvents.CONFIRM, onOkFormConfirm );
//				PropOptionsWindow._window.show( Application.getInstance(), NaN, NaN, true );
				

//				if ( buttonOptions.onWindowShow )
//					buttonOptions.onWindowShow( PropOptionsWindow._window.okCancelContent );

//				PropOptionsWindow._window.center();
//			};

//			//Add listeners
//			editor.on( "mouseup", mouseUp );

//			//Finall return editor as HTML to be added to the page
//			return editor;
//		}

//		/**
//		* Updates the value of the editor object  because a value was edited externally.
//		* @param {any} newValue The new value
//		* @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
//		*/
//		update( newValue, editHTML )
//		{
//			jQuery( "input", editHTML ).val( newValue );
//		}
//	}
//}