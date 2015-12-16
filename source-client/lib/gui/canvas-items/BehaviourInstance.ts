module Animate
{
	/**
	* A behaviour node that represents a Behaviour Container
	*/
	export class BehaviourInstance extends Behaviour
	{
		private _container: Container;

		constructor( parent : Component, container : Container, createPotrals : boolean = true )
		{
            var text: string = (container.entry.name !== undefined ? container.entry.name : "Instance" );

			this._container = container;

			// Call super-class constructor
			super( parent, text );
			this.element.addClass( "behaviour-instance" );

			if ( createPotrals )
			{
				// Now that its created we need to create the starting portals. If the canvas exists we use that as a 
				// reference, otherwise we use the json
				if ( this._container.canvas )
				{
					var children = this._container.canvas.children;
					var ci = children.length;
					while ( ci-- )
						if ( children[ci] instanceof BehaviourPortal )
						{
							var portals : Array<Portal> = (<BehaviourPortal>children[ci]).portals;
							var ii = portals.length;

							while ( ii-- )
								this.addPortal( (<BehaviourPortal>children[ci]).portaltype, portals[ii].property.clone(), false );
						}
				}
                else if (this._container.entry.json != null )
				{
					//Parse the saved object and get the portal data
                    var jsonObj: CanvasToken = this._container.entry.json;

					if ( jsonObj && jsonObj.items )
					{
						for ( var i in jsonObj.items )
						{
							var item = null;

							//Create the portals only if its a Behaviour portal
							if ( jsonObj.items[i].type == "BehaviourPortal" )
							{
								this.addPortal( jsonObj.items[i].portalType,
									jsonObj.items[i].name,
									jsonObj.items[i].value,
									jsonObj.items[i].dataType, false );
							}
						}
					}
				}
			}

			this.updateDimensions();

			PluginManager.getSingleton().on( EditorEvents.PORTAL_ADDED, this.onPortalChanged, this );
			PluginManager.getSingleton().on( EditorEvents.PORTAL_REMOVED, this.onPortalChanged, this );
			PluginManager.getSingleton().on( EditorEvents.PORTAL_EDITED, this.onPortalChanged, this );
			PluginManager.getSingleton().on( EditorEvents.CONTAINER_DELETED, this.onContainerDeleted, this );
		}

		/**
		* Called when a behaviour is disposed
		*/
		onContainerDeleted( response: EditorEvents, event: ContainerEvent )
		{
            if (event.container.entry.name == this._container.entry.name )
			{
				var parent: Canvas = <Canvas>this.element.parent().data( "component" );
				if ( parent && parent.removeItem )
					parent.removeItem( this );
			}
		}

		/**
		* This is called when a Canvas reports a portal being added, removed or modified.
		*/
		onPortalChanged( response: EditorEvents, event: PluginPortalEvent )
		{
			var curParent: JQuery = this.element.parent();

			if ( response == EditorEvents.PORTAL_ADDED )
			{
				jQuery( "body" ).append( this.element ); //We need this for size calculations
				var type: PortalType = null;
				if ( event.portal.type == PortalType.INPUT )
					type = PortalType.OUTPUT;
				else if ( event.portal.type == PortalType.OUTPUT )
					type = PortalType.INPUT;
				else if ( event.portal.type == PortalType.PARAMETER )
					type = PortalType.PRODUCT;
				else if ( event.portal.type == PortalType.PRODUCT )
					type = PortalType.PARAMETER;


                if (event.container.entry.name == this._container.entry.name )
					this.addPortal( type, event.portal.name, event.portal.value, event.portal.dataType, true );
			}
			else if ( response == EditorEvents.PORTAL_REMOVED )
			{
				var i = this.portals.length;
				while ( i-- )
				{
					if ( this.portals[i].name == event.portal.name )
					{
						this.removePortal( this.portals[i], true );
						break;
					}
				}
			}
			else if ( response == EditorEvents.PORTAL_EDITED )
			{
				var i = this.portals.length;
				while ( i-- )
				{
					if ( this.portals[i].name == event.oldName )
					{
						var portal = this.portals[i];
						portal.edit( event.portal.name, portal.type, event.portal.value, event.portal.dataType );
						break;
					}
				}
			}


			jQuery( "body" ).append( this.element ); //We need this for size calculations	
			this.updateDimensions();
			curParent.append( this.element );
		}

		/**
		* Diposes and cleans up this component and all its child Components
		*/
		dispose()
		{
			PluginManager.getSingleton().off( EditorEvents.PORTAL_ADDED, this.onPortalChanged, this );
			PluginManager.getSingleton().off( EditorEvents.PORTAL_REMOVED, this.onPortalChanged, this );
			PluginManager.getSingleton().off( EditorEvents.PORTAL_EDITED, this.onPortalChanged, this );
			PluginManager.getSingleton().off( EditorEvents.CONTAINER_DELETED, this.onContainerDeleted, this );

			this._container = null;

			//Call super
			super.dispose();
		}

		get container(): Container { return this._container; }
	}
}