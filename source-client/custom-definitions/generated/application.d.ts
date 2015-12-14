/// <reference path="../../source-client/definitions/jquery.d.ts" />
/// <reference path="../../source-client/definitions/jqueryui.d.ts" />
/// <reference path="../../source-client/definitions/jquery.scrollTo.d.ts" />
/// <reference path="../../source-client/definitions/JSColor.d.ts" />
/// <reference path="../../source-client/definitions/ace.d.ts" />
/// <reference path="../../source-client/definitions/es6-promise.d.ts" />
/// <reference path="../../source-client/definitions/FileUploader.d.ts" />
/// <reference path="../../source-client/definitions/Recaptcha.d.ts" />
/// <reference path="../../source-client/definitions/ExportToken.d.ts" />
/// <reference path="../../source-server/definitions/webinate-users.d.ts" />
/// <reference path="../../source-server/definitions/modepress-api.d.ts" />
/// <reference path="../../source-server/custom-definitions/app-engine.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/IComponent.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/IPlugin.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/ICanvasItem.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/IDockItem.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/ISettingsPage.d.ts" />
/// <reference path="../../source-client/lib/core/interfaces/IPreviewFactory.d.ts" />
declare module Animate {
    type CompiledEval = (ctrl, event, elm, contexts) => any;
    interface IDirective {
        expand(expression: string, ctrl: any, desc: DescriptorNode, instance: InstanceNode): Array<AppNode>;
    }
    interface AppNode extends Node {
        $ieTextNodes: Array<AppNode>;
        $expression: string;
        $expressionType: string;
        $compliledEval: {
            [name: number]: CompiledEval;
        };
        $ctxValues: Array<{
            name: string;
            value: any;
        }>;
        $events: Array<{
            name: string;
            tag: string;
            func: any;
        }>;
        $dynamic: boolean;
        $clonedData: any;
    }
    interface InstanceNode extends AppNode {
        $clonedElements: Array<AppNode>;
    }
    interface DescriptorNode extends InstanceNode {
        $originalNode: AppNode;
    }
    interface RootNode extends AppNode {
        $ctrl: any;
        $commentReferences: {
            [id: string]: DescriptorNode;
        };
    }
    interface NodeInput extends HTMLInputElement {
        $error: boolean;
        $autoClear: boolean;
        $validate: boolean;
        $value: string;
    }
    interface NodeForm extends HTMLFormElement {
        $error: boolean;
        $errorExpression: string;
        $errorInput: string;
        $pristine: boolean;
        $autoClear: boolean;
    }
    /**
    * Defines a set of functions for compiling template commands and a controller object.
    */
    class Compiler {
        static directives: {
            [name: string]: IDirective;
        };
        private static attrs;
        private static $commentRefIDCounter;
        static validators: {
            "alpha-numeric": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
            "non-empty": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
            "alpha-numeric-plus": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
            "email-plus": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
            "email": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
            "no-html": {
                regex: RegExp;
                name: string;
                negate: boolean;
            };
        };
        /**
        * Clones each of the nodes and their custom attributes
        * @param {Node} node The node to clone
        * @returns {Node}
        */
        static cloneNode(node: AppNode): Node;
        /**
        * Given a string, this function will compile it into machine code that can be stored and run
        * @param {string} script The script to compile
        * @param {AppNode} elm The element whose attributes require the compilation
        * @param {Array<any>} $ctxValues [Optional] Context values passed down from any dynamically generated HTML. The array consists
        * of key object pairs that are translated into variables for use in the script.
        * @returns {CompiledEval}
        */
        private static compileEval(script, elm, $ctxValues?);
        /**
        * Compilers and runs a script which then should return a value
        * @param {string} script The script to compile
        * @param {any} ctrl The controller associated with the compile evaluation
        * @param {AppNode} elm The element whose attributes require the compilation
        * @param {Array<any>} $ctxValues [Optional] Context values passed down from any dynamically generated HTML. The array consists
        * of key object pairs that are translated into variables for use in the script.
        * @returns {CompiledEval}
        * @return {any}
        */
        static parse(script: string, ctrl: any, event: any, elm: AppNode, $ctxValues?: Array<any>): any;
        /**
        * Evaluates an expression and assigns new CSS styles based on the object returned
        */
        static digestCSS(elm: AppNode, controller: any, value: string): void;
        /**
        * Clones an object and creates a new identical object. This does not return the same class - only a copy of each of its properties
        * @param {any} obj The object to clone
        * @returns {any}
        */
        static clone(obj: any, deepCopy?: boolean): any;
        /**
        * Checks each  of the properties of an obejct to see if its the same as another
        * @param {any} a The first object to check
        * @param {any} b The target we are comparing against
        * @returns {boolean}
        */
        static isEquivalent(a: any, b: any): boolean;
        /**
        * Evaluates an expression and assigns new CSS styles based on the object returned
        */
        static digestStyle(elm: AppNode, controller: any, value: string): void;
        /**
        * Removes all registered events from the node
        * @param {Element} elem The element to remove events from
        */
        static removeEvents(elem: Element): void;
        /**
        * Traverses an element down to its child nodes
        * @param {Node} elm The element to traverse
        * @param {Function} callback The callback is called for each child element
        */
        static traverse(elm: Node, callback: Function): void;
        /**
        * Called to remove and clean any dynamic nodes that were added to the node
        * @param {DescriptorNode} sourceNode The parent node from which we are removing clones from
        */
        static cleanupNode(appNode: AppNode): void;
        /**
        * Explores and enflates the html nodes with enflatable expressions present (eg: en-repeat)
        * @param {RootNode} root The root element to explore
        * @param {any} ctrl The controller
        * @param {boolean} includeSubTemplates When traversing the template - should the compiler continue if it finds a child element with an associated controller
        */
        static expand(root: RootNode, ctrl: any, includeSubTemplates?: boolean): Element;
        /**
        * Registers an internal function reference for later cleanup
        * @param {AppNode} node The element we are attaching events to
        * @param {string} name The name of the event
        * @param {any} func The function to call
        */
        static registerFunc(node: AppNode, name: string, tag: string, func: any): void;
        /**
        * Goes through any expressions in the element and updates them according to the expression result.
        * @param {JQuery} elm The element to traverse
        * @param {any} controller The controller associated with the element
        * @param {boolean} includeSubTemplates When traversing the template - should the compiler continue if it finds a child element with an associated controller
        * @returns {Element}
        */
        static digest(jElem: JQuery, controller: any, includeSubTemplates?: boolean): Element;
        static validateNode(elem: NodeInput): void;
        /**
        * Checks each of the validation expressions on an input element. Used to set form and input states like form.$error
        * @param {string} value The list of expression names separated by |
        * @param {HTMLInputElement| HTMLTextAreaElement} elem The element to traverse
        */
        static checkValidations(value: string, elem: HTMLInputElement | HTMLTextAreaElement): boolean;
        /**
        * Given an model directive, any transform commands will change the model's object into something else
        * @param {string} value The list of expression names separated by |
        * @param {HTMLInputElement| HTMLTextAreaElement} elem The element to traverse
        */
        static transform(script: string, elem: HTMLInputElement | HTMLTextAreaElement, controller: any): any;
        /**
        * Goes through an element and prepares it for the compiler. This usually involves adding event listeners
        * and manipulating the DOM. This should only really be called once per element. If you need to update the
        * element after compilation you can use the digest method
        * @param {JQuery} elm The element to traverse
        * @param {any} ctrl The controller associated with the element
        * @param {boolean} includeSubTemplates When traversing the template - should the compiler continue if it finds a child element with an associated controller
        * @returns {JQuery}
        */
        static build(elm: JQuery, ctrl: any, includeSubTemplates?: boolean): JQuery;
    }
}
declare module Animate {
    class Repeater implements IDirective {
        private _returnVal;
        constructor();
        expand(expression: string, ctrl: any, desc: DescriptorNode, instance: InstanceNode): Array<AppNode>;
    }
}
declare module Animate {
    class If implements IDirective {
        private _returnVal;
        constructor();
        expand(expression: string, ctrl: any, desc: DescriptorNode, instance: InstanceNode): Array<AppNode>;
    }
}
declare module Animate {
    /**
    * Describes the type of access users have to a project
    */
    enum PrivilegeType {
        NONE = 0,
        READ = 1,
        WRITE = 2,
        ADMIN = 3,
    }
    /**
    * Describes the category of a project
    */
    enum Category {
        Other = 1,
        Artistic = 2,
        Gaming = 3,
        Informative = 4,
        Musical = 5,
        Technical = 6,
        Promotional = 7,
    }
}
declare module Animate {
    /**
    * Base class for all custom enums
    */
    class ENUM {
        private static allEnums;
        value: string;
        constructor(v: string);
        toString(): string;
    }
    type EventType = ENUM | string;
    type EventCallback = (type: EventType, event: Event, sender?: EventDispatcher) => void;
    /**
    * Internal class only used internally by the {EventDispatcher}
    */
    class EventListener {
        type: EventType;
        func: EventCallback;
        context: any;
        constructor(type: EventType, func: EventCallback, context?: any);
    }
    /**
    * The base class for all events dispatched by the {EventDispatcher}
    */
    class Event {
        type: EventType;
        tag: any;
        /**
        * Creates a new event object
        * @param {EventType} eventType The type event
        */
        constructor(type: EventType, tag?: any);
    }
    /**
    * A simple class that allows the adding, removing and dispatching of events.
    */
    class EventDispatcher {
        private _listeners;
        disposed: boolean;
        constructor();
        /**
        * Returns the list of {EventListener} that are currently attached to this dispatcher.
        */
        listeners: Array<EventListener>;
        /**
        * Adds a new listener to the dispatcher class.
        */
        on(type: EventType, func: EventCallback, context?: any): void;
        /**
        * Adds a new listener to the dispatcher class.
        */
        off(type: EventType, func: EventCallback, context?: any): void;
        /**
        * Sends a message to all listeners based on the eventType provided.
        * @param {String} The trigger message
        * @param {Event} event The event to dispatch
        * @returns {any}
        */
        emit(event: Event | ENUM, tag?: any): any;
        /**
        * This will cleanup the component by nullifying all its variables and clearing up all memory.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A base class for all project resources
    */
    class ProjectResource<T extends Engine.IResource> extends EventDispatcher {
        private static shallowIds;
        entry: T;
        private _saved;
        protected _properties: EditableSet;
        protected _options: {
            [s: string]: any;
        };
        constructor(entry: T);
        /**
        * Gets if this resource is saved
        * @returns {boolean}
        */
        /**
        * Sets if this resource is saved
        * @param {boolean} val
        */
        saved: boolean;
        static generateLocalId(): number;
        dispose(): void;
        /** Creates an option which is associated with this asset. The name of the option must be unique. Use this to add your own custom data */
        createOption(name: string, val: any): void;
        /** Destroys an option */
        removeOption(name: string): void;
        /**  Update the value of an option */
        updateOption(name: string, val: any): void;
        /** Returns the value of an option */
        getOption(name: string): any;
        properties: EditableSet;
        setProperties(val: Array<EditableSetToken>): any;
        setProperties(val: EditableSet): any;
    }
}
declare module Animate {
    enum UserPlan {
        Free = 1,
        Bronze = 2,
        Silver = 3,
        Gold = 4,
        Platinum = 5,
        Custom = 6,
    }
}
declare module Animate {
    class EditorEvents extends ENUM {
        constructor(v: string);
        /**
        * This is called when the project is exporting the data object to the server.
        * The token object passed to this function contains all the information needed to run the project in an Animate runtime.
        * Associate event type is {EditorExportingEvent}
        */
        static EDITOR_PROJECT_EXPORTING: EditorEvents;
        /**
        * This function is called by Animate when everything has been loaded and the user is able to begin their session. Associate event type is {Event}
        */
        static EDITOR_READY: EditorEvents;
        /**
        * This function is called by Animate when the run button is pushed.
        */
        static EDITOR_RUN: EditorEvents;
        static PORTAL_ADDED: EditorEvents;
        static PORTAL_REMOVED: EditorEvents;
        static PORTAL_EDITED: EditorEvents;
        /**
        * This is called by Animate when we a container is created. Associate event type is {ContainerEvent}
        */
        static CONTAINER_CREATED: EditorEvents;
        /**
        * This is called by Animate when we a container is deleted. Associate event type is {ContainerEvent}
        */
        static CONTAINER_DELETED: EditorEvents;
        /**
        * This is called by Animate when we select a container. Associate event type is {ContainerEvent}
        */
        static CONTAINER_SELECTED: EditorEvents;
        /**
        * This is called by Animate when we are exporting a container. The token that gets passed should be used to store any optional
        * data with a container. Associate event type is {ContainerDataEvent}
        */
        static CONTAINER_EXPORTING: EditorEvents;
        /**
        * This is called by Animate when we are saving a container. The token that gets passed should be used to store any optional
        * data with a container.This can be later, re - associated with the container when onOpenContainer is called. Associate event type is {ContainerDataEvent}
        */
        static CONTAINER_SAVING: EditorEvents;
        /**
        * This is called by Animate when we are opening a container. The token that gets passed is filled with optional
        * data when onSaveContainer is called. Associate event type is {ContainerDataEvent}
        */
        static CONTAINER_OPENING: EditorEvents;
        /**
        * Called when an asset is renamed. Associate event type is {AssetRenamedEvent}
        */
        static ASSET_RENAMED: EditorEvents;
        /**
        * Called when an asset is selected in the editor. Associate event type is {AssetEvent}
        */
        static ASSET_SELECTED: EditorEvents;
        /**
        * Called when an asset property is edited by the property grid. Associate event type is {AssetEditedEvent}
        */
        static ASSET_EDITED: EditorEvents;
        /**
        * Called when an asset is added to a container. Associate event type is {AssetContainerEvent}
        */
        static ASSET_ADDED_TO_CONTAINER: EditorEvents;
        /**
        * Called when an asset is removed from a container. Associate event type is {AssetContainerEvent}
        */
        static ASSET_REMOVED_FROM_CONTAINER: EditorEvents;
        /**
        * Called when an asset is created. Associate event type is {AssetCreatedEvent}
        */
        static ASSET_CREATED: EditorEvents;
        /**
        * Called just before an asset is saved to the server. Associate event type is {AssetEvent}
        */
        static ASSET_SAVING: EditorEvents;
        /**
        * Called when an asset is loaded from the database. Associate event type is {AssetEvent}
        */
        static ASSET_LOADED: EditorEvents;
        /**
        * Called when an asset is disposed off. Associate event type is {AssetEvent}
        */
        static ASSET_DESTROYED: EditorEvents;
        /**
        * Called when an asset is copied in the editor. Associate event type is {AssetCopiedEvent}
        */
        static ASSET_COPIED: EditorEvents;
    }
    /**
    * Called when an editor is being exported
    */
    class EditorExportingEvent extends Event {
        /**
        * @param {any} token The token object passed to this function contains all the information needed to run the project in an Animate runtime.
        */
        token: any;
        constructor(token: any);
    }
    /**
    * ContainerEvent associated events
    */
    class ContainerEvent extends Event {
        /**
        * {Container} container The container associated with this event
        */
        container: Container;
        constructor(eventName: EditorEvents, container: Container);
    }
    /**
    * Events associated with Containers and either reading from, or writing to, a data token
    */
    class ContainerDataEvent extends Event {
        /**
        * {Container} container The container associated with this event
        */
        container: Container;
        /**
        * {any} token The data being read or written to
        */
        token: any;
        /**
        * {{ groups: Array<string>; assets: Array<number> }} sceneReferences [Optional] An array of scene asset ID's associated with this container
        */
        sceneReferences: {
            groups: Array<number>;
            assets: Array<number>;
        };
        constructor(eventName: EditorEvents, container: Container, token: any, sceneReferences?: {
            groups: Array<number>;
            assets: Array<number>;
        });
    }
    /**
    * Asset associated events
    */
    class AssetEvent extends Event {
        /**
        * {Asset} asset The asset associated with this event
        */
        asset: Asset;
        constructor(eventName: EditorEvents, asset: Asset);
    }
    /**
    * Called when an asset property is edited by the property grid
    */
    class AssetEditedEvent extends AssetEvent {
        /**
        * {string} propertyName The name of the property that was edited
        */
        propertyName: string;
        /**
        * {any} newValue The updated value
        */
        newValue: any;
        /**
        * {any} oldValue The previous value
        */
        oldValue: any;
        /**
        * {ParameterType} type The parameter type of property
        */
        type: ParameterType;
        constructor(eventName: EditorEvents, asset: Asset, propertyName: any, newValue: any, oldValue: any, type: ParameterType);
    }
    /**
    * Called when an asset is created
    */
    class AssetCreatedEvent extends AssetEvent {
        /**
        * {string} name The name of the asset
        */
        name: string;
        constructor(asset: Asset, name: string);
    }
    /**
    * Called when an asset is renamed
    */
    class AssetRenamedEvent extends AssetEvent {
        /**
        * {string} oldName The old name of the asset
        */
        oldName: string;
        constructor(asset: Asset, oldName: string);
    }
    /**
    * Events assocaited with Assets in relation to Containers
    */
    class AssetContainerEvent extends AssetEvent {
        /**
        * {Container} container The container assocaited with this event
        */
        container: Container;
        constructor(eventName: EditorEvents, asset: Asset, container: Container);
    }
    /**
    * Portal associated events
    */
    class PluginPortalEvent extends Event {
        oldName: string;
        container: Container;
        portal: Portal;
        canvas: Canvas;
        constructor(eventName: EditorEvents, oldName: string, container: Container, portal: Portal, canvas: Canvas);
    }
}
declare module Animate {
    /**
    * Describes an asset variable
    */
    class VariableTemplate {
        name: string;
        value: any;
        type: ParameterType;
        category: string;
        options: any;
        constructor(name: string, value: string, type: ParameterType, category: string, options: any);
        constructor(name: string, value: boolean, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            color?: string;
            opacity?: number;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            className?: string;
            selected?: string;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            classNames?: Array<string>;
            selected?: string;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            className?: string;
            selectedAssets?: Array<number>;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            choices: Array<string>;
            selected: string;
        }, type: ParameterType, category: string, options: any);
        constructor(name: string, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        }, type: ParameterType, category: string, options: any);
        dispose(): void;
    }
    /**
    * This class describes a template. These templates are used when creating assets.
    */
    class AssetClass {
        private _abstractClass;
        private _name;
        parentClass: AssetClass;
        private _imgURL;
        private _variables;
        classes: Array<AssetClass>;
        constructor(name: string, parent: AssetClass, imgURL: string, abstractClass?: boolean);
        /**
        * Creates an object of all the variables for an instance of this class.
        * @returns {EditableSet} The variables we are editing
        */
        buildVariables(): EditableSet;
        /**
        * Finds a class by its name. Returns null if nothing is found
        */
        findClass(name: string): AssetClass;
        /**
        * Adds a variable to the class.
        * @param {string} name The name of the variable
        * @param {any} value The variables default value
        * @param {string} type A string that defines what type of variable it can be.
        * @param {string} category An optional category tag for this variable. This is used for organisational purposes.
        * @param {any} options Any options associated with this variable
        * @returns {AssetClass} A reference to this AssetClass
        */
        addVar(name: string, value: string, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: boolean, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            color?: string;
            opacity?: number;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            className?: string;
            selected?: string;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            classNames?: string;
            selected?: string;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            className?: string;
            selectedAssets?: Array<number>;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            choices: Array<string>;
            selected: string;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        addVar(name: string, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        }, type: ParameterType, category?: string, options?: any): AssetClass;
        /**
        * This will clear and dispose of all the nodes
        */
        dispose(): void;
        /**
        * Gets a variable based on its name
        * @param {string} name The name of the class
        * @returns {VariableTemplate}
        */
        getVariablesByName(name: string): VariableTemplate;
        imgURL: string;
        variables: Array<VariableTemplate>;
        /**
        * Adds a class
        * @param {string} name The name of the class
        * @param {string} img The optional image of the class
        * @param {boolean} abstractClass A boolean to define if this class is abstract or not. I.e. does this class allow for creating assets or is it just the base for others.
        * @returns {AssetClass}
        */
        addClass(name: string, img: string, abstractClass: boolean): AssetClass;
        /** Gets the name of the class */
        name: string;
        /** Gets if this class is abstract or not */
        abstractClass: boolean;
    }
}
declare module Animate {
    interface IAjaxError {
        message: string;
        status: number;
    }
    class Utils {
        private static _withCredentials;
        /**
        * A predefined shorthand method for calling put methods that use JSON communication
        */
        static post<T>(url: string, data: any): Promise<T>;
        /**
        * A predefined shorthand method for calling put methods that use JSON communication
        */
        static get<T>(url: string): Promise<T>;
        /**
        * A predefined shorthand method for calling put methods that use JSON communication
        */
        static put<T>(url: string, data: any): Promise<T>;
        /**
        * A predefined shorthand method for calling deleta methods that use JSON communication
        */
        static delete<T>(url: string, data?: any): Promise<T>;
        static getMousePos(evt: any, id: any): any;
        /**
        * Use this function to check if a value contains characters that break things.
        * @param {string} text The text to check
        * @param {boolean} allowSpace If this is true, empty space will be allowed
        * @returns {string} Returns null or string. If it returns null then everything is fine. Otherwise a message is returned with what's wrong.
        */
        static checkForSpecialChars(text: string, allowSpace?: boolean): string;
        /**
        Tells us if a string is a valid email address
        */
        static validateEmail(email: string): boolean;
        static getObjectClass(obj: any): any;
    }
}
declare module Animate {
    /**
    * The plugin manager is used to load and manage external Animate plugins.
    */
    class PluginManager extends EventDispatcher {
        private static _singleton;
        private _plugins;
        private _loadedPlugins;
        private behaviourTemplates;
        private _assetTemplates;
        private _converters;
        private _dataTypes;
        private scriptTemplate;
        private _previewVisualizers;
        private _resourceCreated;
        constructor();
        onResourceCreated(type: string, event: ProjectEvent): void;
        /**
        * Updates an assets value as well as any components displaying the asset.
        * For example the property grid or scene view.
        * @param {Asset} asset The asset we are editing
        * @param {string} propName The name of the asset's property
        * @param {any} propValue The new value
        * @param {boolean} notifyEditor If true, the manager will send out a notify event of the new value
        */
        updateAssetValue(asset: Asset, propName: string, propValue: any, notifyEditor?: boolean): void;
        /**
        * Attempts to download a plugin by its URL and insert it onto the page.
        * Each plugin should then register itself with the plugin manager by setting the __newPlugin variable. This variable is set in the plugin that's downloaded.
        * Once downloaded - the __newPlugin will be set as the plugin and is assigned to the plugin definition.
        * @param {IPlugin} pluginDefinition The plugin to load
        * @returns {Promise<Engine.IPlugin>}
        */
        loadPlugin(pluginDefinition: Engine.IPlugin): Promise<Engine.IPlugin>;
        /**
        * This funtcion is used to load a plugin.
        * @param {IPlugin} pluginDefinition The IPlugin constructor that is to be created
        * @param {boolean} createPluginReference Should we keep this constructor in memory? The default is true
        */
        preparePlugin(pluginDefinition: Engine.IPlugin, createPluginReference?: boolean): void;
        /**
        * Call this function to unload a plugin
        * @param {IPlugin} plugin The IPlugin object that is to be loaded
        */
        unloadPlugin(plugin: IPlugin): void;
        /**
        * Loops through each of the converters to see if a conversion is possible. If it is
        * it will return an array of conversion options, if not it returns false.
        * @param {any} typeA The first type to check
        * @param {any} typeB The second type to check
        */
        getConverters(typeA: any, typeB: any): any;
        /**
        * Gets a behaviour template by its name.
        * @param {string} behaviorName The name of the behaviour template
        */
        getTemplate(behaviorName: string): BehaviourDefinition;
        /**
        * Use this function to select an asset in the tree view and property grid
        * @param {Asset} asset The Asset object we need to select
        * @param {boolean} panToNode When set to true, the treeview will bring the node into view
        * @param {boolean} multiSelect When set to true, the treeview not clear any previous selections
        */
        selectAsset(asset: Asset, panToNode?: boolean, multiSelect?: boolean): void;
        /**
        * Gets the currently selected asset from the PropertyGrid
        * @returns {Asset} asset The Asset object we need to select
        */
        getSelectedAsset(): Asset;
        /**
        * This is called when the scene is built. The object passed to this function represents
        * the scene as an object.
        * @param {Asset} asset The asset that was edited
        * @param {string} propertyNam The name of the property that was edited
        * @param {any} newValue The new value of the property
        * @param {any} oldValue The old value of the property
        * @param {ParameterType} propertyType The type of property
        */
        assetEdited(asset: Asset, propertyNam: string, newValue: any, oldValue: any, propertyType: ParameterType): void;
        /**
        * Gets an asset class by its name
        * @param {string} name The name of the asset class
        * @param {AssetClass}
        */
        getAssetClass(name: string): AssetClass;
        /**
        * When an asset is created this function will notify all plugins of its existance
        * @param {string} name The name of the asset
        * @param {Asset} asset The asset itself
        */
        assetCreated(name: string, asset: Asset): void;
        /**
        * Called when the project is reset by either creating a new one or opening an older one.
        */
        projectReset(project: Project): void;
        /**
        * This function is called by Animate when everything has been loaded and the user is able to begin their session.
        */
        projectReady(project: Project): void;
        /**
        * This function generates an html node that is used to preview a file
        * @param {Engine.IFile} file The file we are looking to preview
        * @param {(file: Engine.IFile, image: HTMLCanvasElement | HTMLImageElement) => void} updatePreviewImg A function we can use to update the file's preview image
        * @returns {Node} If a node is returned, the factory is responsible for showing the preview. The node will be added to the DOM. If null is returned then the engine
        * will continue looking for a factory than can preview the file
        */
        displayPreview(file: Engine.IFile, updatePreviewImg: (file: Engine.IFile, image: HTMLCanvasElement | HTMLImageElement) => void): Node;
        dataTypes: Array<string>;
        assetTemplates: Array<AssetTemplate>;
        loadedPlugins: Array<IPlugin>;
        /**
        * Gets the singleton instance.
        */
        static getSingleton(): PluginManager;
    }
}
declare module Animate {
    class ImportExportEvents extends ENUM {
        constructor(v: string);
        static COMPLETE: ImportExportEvents;
    }
    class ImportExportEvent extends Event {
        live_link: any;
        constructor(eventName: ImportExportEvents, live_link: any);
    }
    /**
    * A class to help with importing and exporting a project
    */
    class ImportExport extends EventDispatcher {
        private static _singleton;
        private runWhenDone;
        private mRequest;
        constructor();
        /**
        * @type public mfunc run
        * This function will first export the scene and then attempt to create a window that runs the application.
        * @extends <ImportExport>
        */
        run(): void;
        /**
        * @type public mfunc exportScene
        * This function is used to exort the Animae scene. This function creates an object which is exported as a string. Plugins
        * can hook into this process and change the output to suit the plugin needs.
        * @extends <ImportExport>
        */
        exportScene(): void;
        /**
        * Adds asset references to a container token during the export.
        * @param {Asset} asset the asset object to check
        * @param {ContainerToken} container The container to add refernces on
        * @returns {any}
        */
        referenceCheckAsset(asset: Asset, container: ContainerToken): void;
        /**
        * Adds group references to a container token during the export.
        * @param {TreeNodeGroup} group the group object to check
        * @param {ContainerToken} container The container to add refernces on
        * @returns {any}
        */
        referenceCheckGroup(group: TreeNodeGroup, container: ContainerToken): void;
        /**
        * Gets the value of an object without any of the additional data associated with it.
        * @param {ParameterType} propType the object type
        * @param {any} value Its current value
        * @returns {any}
        */
        static getExportValue(propType: ParameterType, value: any): any;
        /**
        * This is the resonse from the server
        */
        onServer(response: LoaderEvents, event: AnimateLoaderEvent, sender?: EventDispatcher): void;
        /**
        * Gets the singleton instance.
        * @extends <ImportExport>
        */
        static getSingleton(): ImportExport;
    }
}
declare module Animate {
    /**
    * A simple interface for property grid editors
    */
    class PropertyGridEditor {
        private _grid;
        private mEditors;
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Use this function to create a nice wrapper for any HTML you want to use as an editor. This will surround the html and css that makes
        * it fit in with the other property editors already available.
        */
        createEditorJQuery(propertyName: string, html: string, value: any): JQuery;
        /**
        * Call this function to tell the grid that a property has been edited.
        */
        notify(propertyName: string, propertyValue: any, objectType: ParameterType): void;
        dispose(): void;
        cleanup(): void;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: JQuery): void;
        /**
        * Called when the editor is being added to the DOM
        */
        onAddedToDom(): void;
    }
}
declare module Animate {
    class Asset extends ProjectResource<Engine.IAsset> {
        /**
        * @param {string} name The name of the asset
        * @param {string} className The name of the "class" or "template" that this asset belongs to
        * @param {any} json The JSON with all the asset properties
        * @param {string} id The id of this asset
        */
        constructor(entry?: Engine.IAsset);
        /** Writes this assset to a readable string */
        toString(): string;
        /**
        * Use this function to reset the asset properties
        * @param {string} name The name of the asset
        * @param {string} className The "class" or "template" name of the asset
        * @param {any} json The JSON data of the asset.
        */
        update(name: string, className: string, json?: any): void;
        /**
        * Disposes and cleans up the data of this asset
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Each project has a list of containers. These are saved into the database and retrieved when we work with Animate. A container is
    * essentially a piece of code that executes behaviour nodes and plugin logic when activated.
    */
    class Container extends ProjectResource<Engine.IContainer> {
        canvas: Canvas;
        /**
        * {string} name The name of the container
        */
        constructor(entry?: Engine.IContainer);
        /**
        * This will download and update all data of the asset.
        * @param {string} name The name of the behaviour
        * @param {CanvasToken} json Its data object
        */
        update(name: string, json: CanvasToken): void;
        /**
        * This will cleanup the behaviour.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A simple array resource for wrapping ids
    */
    class GroupArray extends ProjectResource<Engine.IGroup> {
        /**
        * @param {string} name The name of the asset
        * @param {string} className The name of the "class" or "template" that this asset belongs to
        * @param {any} json The JSON with all the asset properties
        * @param {string} id The id of this asset
        */
        constructor(entry?: Engine.IGroup);
        /**
        * Adds a new reference to the group
        * @param {number} shallowId
        */
        addReference(shallowId: number): void;
        /**
        * Removes a reference from the group
        * @param {number} shallowId
        */
        removeReference(shallowId: number): void;
        /**
        * Disposes and cleans up the data of this asset
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A wrapper for DB file instances
    * @events deleted, refreshed
    */
    class FileResource extends ProjectResource<Engine.IFile> {
        /**
        * @param {IFile} entry The DB entry of this file
        */
        constructor(entry: Engine.IFile);
    }
}
declare module Animate {
    /**
    * A wrapper for DB script instances
    */
    class ScriptResource extends ProjectResource<Engine.IScript> {
        /**
        * @param {IScript} entry The DB entry of this script
        */
        constructor(entry: Engine.IScript);
    }
}
declare module Animate {
    /**
    * The AssetTemplate object is used to define what assets are available to the scene.
    * Assets are predefined tempaltes of data that can be instantiated. The best way to think of an asset
    * is to think of it as a predefined object that contains a number of variables. You could for example
    * create Assets like cats, dogs, animals or humans. Its really up you the plugin writer how they want
    * to define their assets. This function can return null if no Assets are required.
    */
    class AssetTemplate {
        private plugin;
        classes: Array<AssetClass>;
        /**
        * @param {IPlugin} plugin The plugin who created this template
        */
        constructor(plugin: any);
        /**
        * Adds a class to this template
        * @param {string} name The name of the class
        * @param {string} img The optional image
        * @param {boolean} abstractClass A boolean to define if this class is abstract or not.
        * @returns {AssetClass}
        */
        addClass(name: string, img: string, abstractClass: boolean): AssetClass;
        /**
        * Removes a class by name
        * @param {string} name The name of the class to remove
        */
        removeClass(name: string): void;
        /**
        * Finds a class by its name. Returns null if nothing is found
        */
        findClass(name: string): AssetClass;
    }
}
declare module Animate {
    /**
    *  A simple class to define the behavior of a behaviour object.
    */
    class BehaviourDefinition {
        private _behaviourName;
        private _canBuildOutput;
        private _canBuildInput;
        private _canBuildParameter;
        private _canBuildProduct;
        private _portalTemplates;
        private _plugin;
        /**
        * @param <string> behaviourName The name of the behaviour
        * @param <bool> canBuildInput
        * @param <bool> canBuildOutput
        * @param <bool> canBuildParameter
        * @param <bool> canBuildProduct
        * @param <array> portalTemplates
        * @param <IPlugin> plugin The plugin this is associated with
        */
        constructor(behaviourName: string, canBuildInput?: boolean, canBuildOutput?: boolean, canBuildParameter?: boolean, canBuildProduct?: boolean, portalTemplates?: Array<PortalTemplate>, plugin?: IPlugin);
        dispose(): void;
        canBuildOutput(behaviour: Behaviour): boolean;
        canBuildInput(behaviour: Behaviour): boolean;
        canBuildProduct(behaviour: Behaviour): boolean;
        canBuildParameter(behaviour: Behaviour): boolean;
        createPortalsTemplates(): Array<PortalTemplate>;
        behaviourName: string;
        plugin: IPlugin;
    }
}
declare module Animate {
    class DataToken {
        category: string;
        command: string;
        projectID: string;
    }
}
declare module Animate {
    class CanvasTokenPortal {
        name: string;
        value: string;
        type: PortalType;
        dataType: ParameterType;
        customPortal: boolean;
        constructor(token?: any);
    }
    class CanvasTokenItem {
        id: string;
        type: string;
        left: string;
        top: string;
        zIndex: string;
        position: string;
        text: string;
        name: string;
        alias: string;
        assetID: number;
        scriptId: any;
        shallowId: number;
        containerId: number;
        behaviourID: string;
        portalType: PortalType;
        dataType: ParameterType;
        value: string;
        portals: Array<CanvasTokenPortal>;
        frameDelay: number;
        startPortal: string;
        endPortal: string;
        startBehaviour: string;
        endBehaviour: string;
        targetStartBehaviour: string;
        targetEndBehaviour: string;
        constructor(token?: any);
    }
    class CanvasToken {
        id: number;
        name: string;
        items: Array<CanvasTokenItem>;
        properties: Array<EditableSetToken>;
        plugins: any;
        constructor(id: number);
        toString(): string;
        fromDatabase(json: any): CanvasToken;
        static fromDatabase(json: any, id: number): CanvasToken;
    }
}
declare module Animate {
    class DB {
        static USERS: string;
        static HOST: string;
        static API: string;
        static PLAN_FREE: string;
        static PLAN_BRONZE: string;
        static PLAN_SILVER: string;
        static PLAN_GOLD: string;
        static PLAN_PLATINUM: string;
    }
}
declare module Animate {
    /**
    * Basic set of loader events shared by all loaders
    */
    class LoaderEvents extends ENUM {
        constructor(v: string);
        static COMPLETE: LoaderEvents;
        static FAILED: LoaderEvents;
        /**
        * Returns an enum reference by its name/value
        * @param {string} val
        * @returns {LoaderEvents}
        */
        static fromString(val: string): LoaderEvents;
    }
    /**
    * Abstract base loader class. This should not be instantiated, instead use the sub class loaders. Keeps track of loading
    * variables as well as functions for showing or hiding the loading dialogue
    */
    class LoaderBase extends EventDispatcher {
        private static loaderBackdrop;
        private static showCount;
        url: string;
        numTries: number;
        data: any;
        dataType: string;
        domain: string;
        contentType: any;
        processData: boolean;
        getVariables: any;
        _getQuery: string;
        /**
        * Creates an instance of the Loader
        * @param {string} domain [Optional] Specify the base domain of this call. By default it uses DB.HOST.
        */
        constructor(domain?: string);
        /**
        * Starts the loading process
        * @param {string} url The URL we want to load
        * @param {any} data The data associated with this load
        * @param {number} numTries The number of attempts allowed to make this load
        */
        load(url: string, data: any, numTries?: number): void;
        /**
        * Call this function to create a jQuery object that acts as a loader modal window (the window with the spinning cog)
        * @returns {JQuery}
        */
        static createLoaderModal(): JQuery;
        /**
        * Shows the loader backdrop which prevents the user from interacting with the application. Each time this is called a counter
        * is incremented. To hide it call the hideLoader function. It will only hide the loader if the hideLoader is called the same
        * number of times as the showLoader function. I.e. if you call showLoader 5 times and call hideLoader 4 times, it will not hide
        * the loader. If you call hideLoader one more time - it will.
        */
        static showLoader(): void;
        /**
        * see showLoader for information on the hideLoader
        */
        static hideLoader(): void;
        /**
       * Cleans up the object
       */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Valid response codes for requests made to the Animate server
    */
    class AnimateLoaderResponses extends ENUM {
        constructor(v: string);
        static SUCCESS: AnimateLoaderResponses;
        static ERROR: AnimateLoaderResponses;
        static fromString(val: string): ENUM;
    }
    /**
    * Events associated with requests made to the animate servers
    */
    class AnimateLoaderEvent extends Event {
        message: string;
        return_type: AnimateLoaderResponses;
        data: any;
        constructor(eventName: LoaderEvents, message: string, return_type: AnimateLoaderResponses, data?: any);
    }
    /**
    * This class acts as an interface loader for the animate server.
    */
    class AnimateLoader extends LoaderBase {
        private _curCall;
        /**
        * Creates an instance of the Loader
        * @param {string} domain [Optional] Specify the base domain of this call. By default it uses DB.HOST.
        */
        constructor(domain?: string);
        /**
        * This function will make a POST request to the animate server
        * @param {string} url The URL we want to load
        * @param {any} data The post variables to send off to the server
        * @param {number} numTries The number of attempts allowed to make this load
        */
        load(url: string, data: any, numTries?: number, type?: string): void;
        /**
        * Called when we the ajax response has an error.
        * @param {any} e
        * @param {string} textStatus
        * @param {any} errorThrown
        */
        onError(e: any, textStatus: any, errorThrown: any): void;
        /**
        * Called when we get an ajax response.
        * @param {any} data
        * @param {any} textStatus
        * @param {any} jqXHR
        */
        onData(data: any, textStatus: any, jqXHR: any): void;
        /**
        * Cleans up the object
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Valid response codes for xhr binary requests
    */
    class BinaryLoaderResponses extends ENUM {
        constructor(v: string);
        static SUCCESS: BinaryLoaderResponses;
        static ERROR: BinaryLoaderResponses;
    }
    /**
    * Events associated with xhr binary requests
    */
    class BinaryLoaderEvent extends Event {
        buffer: ArrayBuffer;
        message: string;
        constructor(binaryResponse: BinaryLoaderResponses, buffer: ArrayBuffer, message?: string);
    }
    /**
    * Class used to download contents from a server into an ArrayBuffer
    */
    class BinaryLoader extends LoaderBase {
        private _xhr;
        private _onBuffers;
        private _onError;
        /**
        * Creates an instance of the Loader
        * @param {string} domain [Optional] Specify the base domain of this call. By default it uses DB.HOST.
        */
        constructor(domain?: string);
        /**
        * This function will make a GET request and attempt to download a file into binary data
        * @param {string} url The URL we want to load
        * @param {number} numTries The number of attempts allowed to make this load
        */
        load(url: string, numTries?: number): void;
        /**
        * If an error occurs
        */
        onError(event: any): void;
        /**
        * Cleans up and removes references for GC
        */
        dispose(): void;
        /**
        * Called when the buffers have been loaded
        */
        onBuffersLoaded(): void;
    }
}
declare module Animate {
    /**
    * A simple class to define portal behaviour.
    */
    class PortalTemplate {
        name: string;
        type: PortalType;
        dataType: ParameterType;
        value: any;
        /**
        * @param {string} name This is the name of the template
        * @param {PortalType} type The type of portal this represents. Defined in the Portal class.
        * @param {ParameterType} dataType The portal value type (see value types)
        * @param {any} value The default value of the portal
        */
        constructor(name: string, type: PortalType, dataType: ParameterType, value: string);
        constructor(name: string, type: PortalType, dataType: ParameterType, value: boolean);
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            color?: string;
            opacity?: number;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            className?: string;
            selected?: string;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            classNames?: Array<string>;
            selected?: string;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            choices: Array<string>;
            selected: string;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        });
        constructor(name: string, type: PortalType, dataType: ParameterType, value: any);
    }
}
declare module Animate {
    enum ResourceType {
        GROUP = 1,
        ASSET = 2,
        CONTAINER = 3,
        FILE = 4,
        SCRIPT = 5,
    }
    class ProjectEvents {
        value: string;
        constructor(v: string);
        toString(): string;
        static SAVED: ProjectEvents;
        static SAVED_ALL: ProjectEvents;
        static FAILED: ProjectEvents;
        static BUILD_SELECTED: ProjectEvents;
        static BUILD_SAVED: ProjectEvents;
    }
    /**
    * A simple project event. Always related to a project resource (null if not)
    */
    class ProjectEvent extends Event {
        resouce: ProjectResource<any>;
        constructor(type: string, data: ProjectResource<any>);
    }
    /**
    * A wrapper for project builds
    */
    class Build {
        entry: Engine.IBuild;
        /**
        * Creates an intance of the build
        * @param {Engine.IBuild} entry The entry token from the DB
        */
        constructor(entry: Engine.IBuild);
        /**
        * Attempts to update the build with new data
        * @param {Engine.IBuild} token The update token data
        */
        update(token: Engine.IBuild): Promise<boolean>;
    }
    /**
    * A project class is an object that is owned by a user.
    * The project has functions which are useful for comunicating data to the server when
    * loading and saving data in the scene.
    */
    class Project extends EventDispatcher {
        entry: Engine.IProject;
        saved: boolean;
        curBuild: Build;
        private _containers;
        private _assets;
        private _files;
        private _scripts;
        private _groups;
        private _restPaths;
        /**
        * @param{string} id The database id of this project
        */
        constructor();
        /**
        * Gets a resource by its ID
        * @param {string} id The ID of the resource
        * @returns {ProjectResource<Engine.IResource>} The resource whose id matches the id parameter or null
        */
        getResourceByID<T extends ProjectResource<Engine.IResource>>(id: string, type?: ResourceType): {
            resource: T;
            type: ResourceType;
        };
        /**
        * Gets a resource by its shallow ID
        * @param {string} id The shallow ID of the resource
        * @returns {ProjectResource<Engine.IResource>} The resource whose shallow id matches the id parameter or null
        */
        getResourceByShallowID<T extends ProjectResource<Engine.IResource>>(id: number, type?: ResourceType): T;
        /**
        * Attempts to update the project details base on the token provided
        * @returns {Engine.IProject} The project token
        * @returns {Promise<UsersInterface.IResponse>}
        */
        updateDetails(token: Engine.IProject): Promise<UsersInterface.IResponse>;
        /**
        * Loads a previously selected build, or creates one if none are selected
        * @returns {Promise<Build>}
        */
        loadBuild(): Promise<Build>;
        /**
        * Internal function to create a resource wrapper
        * @param {T} entry The database entry
        * @param {ResourceType} type The type of resource to create
        * @returns {ProjectResource<T>}
        */
        private createResourceInstance<T>(entry, type?);
        /**
        * This function is used to fetch the project resources associated with a project.
        * @param {ResourceType} type [Optional] You can specify to load only a subset of the resources (Useful for updating if someone else is editing)
        * @returns {Promise<Array<ProjectResource<any>>}
        */
        loadResources(type?: ResourceType): Promise<Array<ProjectResource<any>>>;
        /**
        * This function is used to fetch a project resource by Id
        * @param {string} id the Id of the resource to update
        * @param {ResourceType} type You can specify to load only a subset of the resources (Useful for updating if someone else is editing)
        * @returns {Promise<T>}
        */
        refreshResource<T extends ProjectResource<Engine.IResource>>(id: string, type?: ResourceType): Promise<T>;
        /**
        * Use this to edit the properties of a resource
        * @param {string} id The id of the object we are editing.
        * @param {T} data The new data for the resource
        * @param {ResourceType} type The type of resource we are editing
        * @returns {Promise<Modepress.IResponse>}
        */
        editResource<T>(id: string, data: T, type: ResourceType): Promise<Modepress.IResponse>;
        /**
        * Use this to save the properties of a resource
        * @param {string} id The id of the object we are saving.
        * @param {ResourceType} type [Optional] The type of resource we are saving
        * @returns {Promise<boolean>}
        */
        saveResource(id: string, type?: ResourceType): Promise<boolean>;
        /**
        * Use this to edit the properties of a resource
        * @param {ResourceType} type The type of resource we are saving
        * @returns {Promise<boolean>}
        */
        saveResources(type: ResourceType): Promise<boolean>;
        /**
        * Use this to delete a resource by its Id
        * @param {string} id The id of the object we are deleting
        * @param {ResourceType} type The type of resource we are renaming
        * @returns {Promise<boolean>}
        */
        deleteResource(id: string, type: ResourceType): Promise<boolean>;
        /**
        * Deletes several resources in 1 function call
        * @param {Array<string>} ids The ids An array of resource Ids
        * @returns {Promise<boolean>}
        */
        deleteResources(ids: Array<string>): Promise<boolean>;
        /**
        * This function is used to all project resources
        */
        saveAll(): Promise<boolean>;
        /**
        * Creates a new project resource.
        * @param {ResourceType} type The type of resource we are renaming
        * @returns { Promise<ProjectResource<any>>}
        */
        createResource<T>(type: ResourceType, data: T): Promise<ProjectResource<T>>;
        /**
        * This function is used to create an entry for this project on the DB.
        */
        selectBuild(major: string, mid: string, minor: string): void;
        /**
        * This function is used to update the current build data
        */
        saveBuild(notes: string, visibility: string, html: string, css: string): void;
        /**
        * This function is used to copy an asset.
        * @param {string} assetId The asset object we are trying to copy
        */
        copyAsset(assetId: string): void;
        /**
        * This function is called whenever we get a resonse from the server
        */
        onServer(response: LoaderEvents, event: AnimateLoaderEvent, sender?: EventDispatcher): void;
        containers: Array<Container>;
        files: Array<FileResource>;
        scripts: Array<ScriptResource>;
        assets: Array<Asset>;
        groups: Array<GroupArray>;
        /**
        * This will cleanup the project and remove all data associated with it.
        */
        reset(): void;
        plugins: Array<Engine.IPlugin>;
    }
}
declare module Animate {
    class TypeConverter {
        plugin: IPlugin;
        typeA: string;
        typeB: string;
        conversionOptions: Array<string>;
        constructor(typeA: string, typeB: string, conversionOptions: Array<string>, plugin: IPlugin);
        /** Checks if this converter supports a conversion. */
        canConvert(typeA: any, typeB: any): boolean;
        /** Cleans up the object. */
        dispose(): void;
    }
}
declare module Animate {
    class UserEvent extends Event {
        constructor(type: string, data: any);
    }
    /**
    * This class is used to represent the user who is logged into Animate.
    */
    class User extends EventDispatcher {
        private static _singleton;
        entry: UsersInterface.IUserEntry;
        meta: Engine.IUserMeta;
        project: Project;
        private _isLoggedIn;
        constructor();
        /**
        * Resets the meta data
        */
        resetMeta(): void;
        /**
        * Checks if a user is logged in or not. This checks the server using
        * cookie and session data from the browser.
        * @returns {Promise<boolean>}
        */
        authenticated(): Promise<boolean>;
        /**
        * Tries to log the user in asynchronously.
        * @param {string} user The username of the user.
        * @param {string} password The password of the user.
        * @param {boolean} rememberMe Set this to true if we want to set a login cookie and keep us signed in.
        * @returns {Promise<UsersInterface.IAuthenticationResponse>}
        */
        login(user: string, password: string, rememberMe: boolean): Promise<UsersInterface.IAuthenticationResponse>;
        /**
        * Tries to register a new user.
        * @param {string} user The username of the user.
        * @param {string} password The password of the user.
        * @param {string} email The email of the user.
        * @param {string} captcha The captcha of the login screen
        * @param {string} captha_challenge The captha_challenge of the login screen
        * @returns {Promise<UsersInterface.IAuthenticationResponse>}
        */
        register(user: string, password: string, email: string, captcha: string, captha_challenge: string): Promise<UsersInterface.IAuthenticationResponse>;
        /**
        * This function is used to resend a user's activation code
        * @param {string} user
        * @returns {Promise<UsersInterface.IResponse>}
        */
        resendActivation(user: string): Promise<UsersInterface.IResponse>;
        /**
        * This function is used to reset a user's password.
        * @param {string} user
        * @returns {Promise<UsersInterface.IResponse>}
        */
        resetPassword(user: string): Promise<UsersInterface.IResponse>;
        /**
        * Attempts to log the user out
        * @return {Promise<UsersInterface.IResponse>}
        */
        logout(): Promise<UsersInterface.IResponse>;
        /**
        * Fetches all the projects of a user. This only works if the user if logged in. If not
        * it will return null.
        * @param {number} index The index to  fetching projects for
        * @param {number} limit The limit of how many items to fetch
        * @return {Promise<ModepressAddons.IGetProjects>}
        */
        getProjectList(index: number, limit: number): Promise<ModepressAddons.IGetProjects>;
        /**
        * Creates a new user projects
        * @param {string} name The name of the project
        * @param {Array<string>} plugins An array of plugin IDs to identify which plugins to use
        * @param {string} description [Optional] A short description
        * @return {Promise<ModepressAddons.ICreateProject>}
        */
        newProject(name: string, plugins: Array<string>, description?: string): Promise<ModepressAddons.ICreateProject>;
        /**
        * Removes a project by its id
        * @param {string} pid The id of the project to remove
        * @return {Promise<Modepress.IResponse>}
        */
        removeProject(pid: string): Promise<Modepress.IResponse>;
        /**
        * Attempts to update the user's details base on the token provided
        * @returns {Engine.IUserMeta} The user details token
        * @returns {Promise<UsersInterface.IResponse>}
        */
        updateDetails(token: Engine.IUserMeta): Promise<UsersInterface.IResponse>;
        /**
        * @type public mfunc copyProject
        * Use this function to duplicate a project
        * @param {number} id The project ID we are copying
        * @extends {User}
        */
        copyProject(id: string): void;
        /**
        * This function is used to open an existing project.
        */
        openProject(id: string): void;
        /**
        * This will delete a project from the database as well as remove it from the user.
        * @param {string} id The id of the project we are removing.
        */
        deleteProject(id: string): any;
        /**
        * This is the resonse from the server
        * @param {LoaderEvents} response The response from the server. The response will be either Loader.COMPLETE or Loader.FAILED
        * @param {Event} data The data sent from the server.
        */
        onServer(response: LoaderEvents, event: AnimateLoaderEvent, sender?: EventDispatcher): void;
        isLoggedIn: boolean;
        /**
        * Gets the singleton instance.
        * @returns {User}
        */
        static get: User;
    }
}
declare module Animate {
    /**
    * Abstract class downloading content by pages
    */
    class PageLoader {
        updateFunc: (index: number, limit: number) => void;
        index: number;
        limit: number;
        last: number;
        protected searchTerm: string;
        constructor(updateFunction: (index: number, limit: number) => void);
        /**
        * Calls the update function
        */
        invalidate(): void;
        /**
        * Gets the current page number
        * @returns {number}
        */
        getPageNum(): number;
        /**
        * Gets the total number of pages
        * @returns {number}
        */
        getTotalPages(): number;
        /**
        * Sets the page search back to index = 0
        */
        goFirst(): void;
        /**
        * Gets the last set of users
        */
        goLast(): void;
        /**
        * Sets the page search back to index = 0
        */
        goNext(): void;
        /**
        * Sets the page search back to index = 0
        */
        goPrev(): void;
    }
}
declare module Animate {
    class ImageVisualizer implements IPreviewFactory {
        private _maxPreviewSize;
        constructor();
        /**
        * This function generates an html node that is used to preview a file
        * @param {Engine.IFile} file The file we are looking to preview
        * @param {(file: Engine.IFile, image: HTMLCanvasElement | HTMLImageElement) => void} updatePreviewImg A function we can use to update the file's preview image
        * @returns {Node} If a node is returned, the factory is responsible for showing the preview. The node will be added to the DOM. If null is returned then the engine
        * will continue looking for a factory than can preview the file
        */
        generate(file: Engine.IFile, updatePreviewImg: (file: Engine.IFile, image: HTMLCanvasElement | HTMLImageElement) => void): Node;
    }
}
declare module Animate {
    /**
    * The interface for all layout objects.
    */
    interface ILayout {
        /**
        * Sets the component offsets based the layout algorithm
        * @param {Component} component The {Component} we are setting dimensions for.
        */
        update(component: Component): void;
    }
}
declare module Animate {
    /**
    * A simple Percentile layout. Changes a component's dimensions to be a
    * percentage of its parent width and height.
    */
    class Percentile implements ILayout {
        widthPercent: number;
        heightPercent: number;
        constructor(widthPercent?: number, heightPercent?: number);
        /**
        * Sets the component width and height to its parent.
        * @param {Component} component The {Component} we are setting dimensions for.
        */
        update(component: Component): void;
    }
}
declare module Animate {
    /**
    * A simple fill layout. Fills a component to its parent width and height. Optional
    * offsets can be used to tweak the fill.
    */
    class Fill implements ILayout {
        offsetX: number;
        offsetY: number;
        offsetWidth: number;
        offsetHeight: number;
        resrtictHorizontal: boolean;
        resrtictVertical: boolean;
        constructor(offsetX?: number, offsetY?: number, offsetWidth?: number, offsetHeight?: number, resrtictHorizontal?: boolean, resrtictVertical?: boolean);
        /**
        * Sets the component width and height to its parent.
        * @param {Component} component The {Component} we are setting dimensions for.
        */
        update(component: Component): void;
    }
}
declare module Animate {
    /**
    * A singleton class that manages displaying the tooltips of various components.
    */
    class TooltipManager {
        private static _singleton;
        private label;
        constructor();
        /**
        * @description Called when we hover over an element.
        * @param {any} e The JQUery event object
        */
        onMove: (e: any) => void;
        /**
        * Gets the singleton instance
        */
        static create(): TooltipManager;
    }
}
declare module Animate {
    class ComponentEvents extends ENUM {
        constructor(v: string);
        static UPDATED: ComponentEvents;
    }
    /**
    * The base class for all visual elements in the application. The {Component} class
    * contains a reference of a jQuery object that points to the {Component}'s DOM representation.
    */
    class Component extends EventDispatcher implements IComponent {
        static idCounter: number;
        private _element;
        private _children;
        private _layouts;
        private _id;
        private _parent;
        private _tooltip;
        private _enabled;
        tag: any;
        savedID: string;
        constructor(html: string | JQuery, parent?: Component);
        /**
        * Diposes and cleans up this component and all its child {Component}s
        */
        dispose(): void;
        /**
        * This function is called to update this component and its children.
        * Typically used in sizing operations.
        * @param {boolean} updateChildren Set this to true if you want the update to proliferate to all the children components.
        */
        update(updateChildren?: boolean): void;
        /**
        * Add layout algorithms to the {Component}.
        * @param {ILayout} layout The layout object we want to add
        * @returns {ILayout} The layout that was added
        */
        addLayout(layout: ILayout): ILayout;
        /**
        * Removes a layout from this {Component}
        * @param {ILayout} layout The layout to remove
        * @returns {ILayout} The layout that was removed
        */
        removeLayout(layout: ILayout): ILayout;
        /**
        * Gets the ILayouts for this component
        * {returns} Array<ILayout>
        */
        layouts: Array<ILayout>;
        /**
        * Use this function to add a child to this component.
        * This has the same effect of adding some HTML as a child of another piece of HTML.
        * It uses the jQuery append function to achieve this functionality.
        * @param {string | IComponent | JQuery} child The child component we want to add
        * @returns {IComponent} The added component
        */
        addChild(child: string | IComponent | JQuery): IComponent;
        /**
        * Checks to see if a component is a child of this one
        * @param {IComponent} child The {IComponent} to check
        * @returns {boolean} true if the component is a child
        */
        contains(child: IComponent): boolean;
        /**
        * Use this function to remove a child from this component.
        * It uses the {JQuery} detach function to achieve this functionality.
        * @param {IComponent} child The {IComponent} to remove from this {IComponent}'s children
        * @returns {IComponent} The {IComponent} we have removed
        */
        removeChild(child: IComponent): IComponent;
        /**
        * Removes all child nodes
        */
        clear(): void;
        onDelete(): void;
        /**
        * Returns the array of Child {Component}s
        * @returns {Array{IComponent}} An array of child {IComponent} objects
        */
        children: Array<IComponent>;
        /**
        * Gets the jQuery wrapper
        */
        element: JQuery;
        /**
        * Gets the jQuery parent
        */
        parent: Component;
        /**
        * Gets the tooltip for this {Component}
        */
        /**
        * Sets the tooltip for this {Component}
        */
        tooltip: string;
        /**
        * Get or Set if the component is enabled and recieves mouse events
        */
        /**
        * Get or Set if the component is enabled and recieves mouse events
        */
        enabled: boolean;
        /**
        * Gets the ID of thi component
        */
        id: string;
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        selected: boolean;
    }
}
declare module Animate {
    class MenuListEvents extends ENUM {
        constructor(v: string);
        static ITEM_CLICKED: MenuListEvents;
    }
    /**
    * A specially designed type of list
    */
    class MenuList extends Component {
        private _items;
        private selectedItem;
        constructor(parent: Component);
        /**
        * Adds an HTML item
        * @returns {string} img The URL of the image
        * @returns {string} val The text of the item
        * @returns {boolean} prepend True if you want to prepend as opposed to append
        */
        addItem(img: string, val: string, prepend?: boolean): JQuery;
        /**
        * Removes an  item from this list
        * @param {JQuery} item The jQuery object we are removing
        */
        removeItem(item: JQuery): void;
        /**
        * Clears all the items added to this list
        */
        clearItems(): void;
        /**
        * Checks if we selected an item - if so it closes the context and dispatches the ITEM_CLICKED event.
        * @param {any} e The jQuery event object
        */
        onClick(e: any): void;
        items: Array<JQuery>;
    }
}
declare module Animate {
    class LogType extends ENUM {
        constructor(v: string);
        static MESSAGE: LogType;
        static WARNING: LogType;
        static ERROR: LogType;
    }
    /**
    * The Logger is a singleton class used to write message's to Animate's log window.
    */
    class Logger extends MenuList {
        private static _singleton;
        private context;
        private mDocker;
        private warningFlagger;
        private mContextProxy;
        constructor(parent: Component);
        /**
        * @type public mfunc onIconClick
        * When we click the error warning
        * @extends <Logger>
        */
        onIconClick(): void;
        /**
        * @type public mfunc getPreviewImage
        * This is called by a controlling ScreenManager class. An image string needs to be returned
        * which will act as a preview of the component that is being viewed or hidden.
        * @extends <Logger>
        * @returns <string>
        */
        getPreviewImage(): string;
        /**
        * This is called by a controlling Docker class when the component needs to be shown.
        */
        onShow(): void;
        /**
        * This is called by a controlling Docker class when the component needs to be hidden.
        */
        onHide(): void;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        * @returns {Docker}
        */
        getDocker(): Docker;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        * @param {Docker} val
        */
        setDocker(val: Docker): void;
        /**
        * Called when the context menu is about to open
        */
        onContextSelect(response: ContextMenuEvents, event: ContextMenuEvent, sender?: EventDispatcher): void;
        /**
        * Called when the context menu is about to open
        */
        onContext(e: any): void;
        /**
        * Adds an item to the Logger
        * @param {string} val The text to show on the logger.
        * @param {any} tag An optional tag to associate with the log.
        * @param {string} type The type of icon to associate with the log. By default its Logger.MESSAGE
        */
        static logMessage(val: string, tag: any, type?: LogType): JQuery;
        /**
        * Clears all the log messages
        */
        clearItems(): void;
        /**
        * Gets the singleton instance.
        * @param {Component} parent
        * @returns {Logger}
        */
        static getSingleton(parent?: Component): Logger;
    }
}
declare module Animate {
    /**
    * A Docker is used in Animate so that we can divide up screen real estate. A box is added to a parent component
    * which, when hovered or dragged, will enabled the user to move components around or explore hidden sections
    * of the application.
    */
    class Docker extends Component {
        private activeComponent;
        private _activePreview;
        private rollout;
        private mComponents;
        private mPreviews;
        private startProxy;
        private stopProxy;
        private clickPreview;
        private dropProxy;
        constructor(parent: Component);
        /** When we click on a preview.*/
        onClick(e: any): void;
        /** When we start draggin.*/
        onStart(e: any): void;
        /** When we stop draggin.*/
        onStop(e: any): void;
        /** Called when the mouse is over this element.*/
        onEnter(e: any): void;
        /** Called when the mouse leaves this element.*/
        onOut(e: any): void;
        /**Called when a draggable object is dropped onto the canvas.*/
        onObjectDropped(event: any, ui: any): void;
        /** Call this function to update the manager.*/
        update(): void;
        /** Gets the singleton instance. */
        setActiveComponent(comp: IDockItem, attach?: boolean): void;
        /** Removes an IDockItem from the manager */
        removeComponent(comp: IDockItem, completeRemoval?: boolean): void;
        /** Adds a IDockItem to the manager */
        addComponent(comp: any, attach: any): void;
        activePreview: JQuery;
    }
}
declare module Animate {
    class SplitOrientation extends ENUM {
        constructor(v: string);
        static VERTICAL: SplitOrientation;
        static HORIZONTAL: SplitOrientation;
    }
    /**
    * A Component that holds 2 sub Components and a splitter to split between them.
    */
    class SplitPanel extends Component {
        private offsetLeft;
        private offsetTop;
        private mPercent;
        private mDividerSize;
        private mPanel1;
        private mPanel2;
        private mDivider;
        private mDividerDragging;
        private mOrientation;
        private mPanelOverlay1;
        private mPanelOverlay2;
        private mMouseDownProxy;
        private mMouseUpProxy;
        private mMouseMoveProxy;
        /**
        * @param {Component} parent The parent to which this component is attached
        * @param {SplitOrientation} orientation The orientation of the slitter. It can be either SplitOrientation.VERTICAL or SplitOrientation.HORIZONTAL
        * @param {number} ratio The ratio of how far up or down, top or bottom the splitter will be. This is between 0 and 1.
        * @param {number} dividerSize The size of the split divider.
        */
        constructor(parent: Component, orientation?: SplitOrientation, ratio?: number, dividerSize?: number);
        /**
        * This function is called when the mouse is down on the divider
        * @param {any} e The jQuery event object
        */
        onDividerMouseDown(e: any): void;
        /**
        * This function is called when the mouse is up from the body of stage.
        * @param {any} e The jQuery event object
        */
        onStageMouseUp(e: any): void;
        /**
        * Call this function to update the panel.
        */
        update(): void;
        /**
        * This function is called when the mouse is up from the body of stage.
        * @param {any} e The jQuery event object
        */
        onStageMouseMove(e: any): boolean;
        /**
        * Call this function to get the ratio of the panel. Values are from 0 to 1.
        */
        /**
        * Call this function to set the ratio of the panel. Values are from 0 to 1.
        * @param {number} val The ratio from 0 to 1 of where the divider should be
        */
        ratio: number;
        /**
        * gets the orientation of this split panel
        */
        /**
        * Use this function to change the split panel from horizontal to vertcal orientation.
        * @param val The orientation of the split. This can be either SplitPanel.VERTICAL or SplitPanel.HORIZONTAL
        */
        orientation: SplitOrientation;
        /**
        * Gets the top panel.
        */
        top: Component;
        /**
        * Gets the bottom panel.
        */
        bottom: Component;
        /**
        * Gets the left panel.
        */
        left: Component;
        /**
        * Gets the right panel.
        */
        right: Component;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
    }
}
declare module Animate {
    class WindowEvents extends ENUM {
        constructor(v: string);
        static HIDDEN: WindowEvents;
        static SHOWN: WindowEvents;
    }
    class WindowEvent extends Event {
        window: Window;
        constructor(eventName: WindowEvents, window: Window);
    }
    /**
    * This class is the base class for all windows in Animate
    */
    class Window extends Component {
        private _autoCenter;
        private _controlBox;
        private _header;
        private _headerText;
        private _headerCloseBut;
        private _content;
        private _modalBackdrop;
        private _isVisible;
        private _externalClickProxy;
        private _closeProxy;
        private _resizeProxy;
        /**
        * @param {number} width The width of the window in pixels
        * @param {number} height The height of the window in pixels
        * @param {boolean} autoCenter Should this window center itself on a resize event
        * @param {boolean} controlBox Does this window have a draggable title bar and close button
        * @param {string} title The text for window heading.Only applicable if we are using a control box.
        */
        constructor(width: number, height: number, autoCenter?: boolean, controlBox?: boolean, title?: string);
        /**
        * When we click on the close button
        * @param {any} e The jQuery event object
        */
        onCloseClicked(e: any): void;
        /**
        * When the stage move event is called
        * @param {any} e The jQuery event object
        */
        onStageMove(e: any): void;
        /**
        * Removes the window and modal from the DOM.
        */
        hide(): void;
        /**
        * Centers the window into the middle of the screen. This only works if the elements are added to the DOM first
        */
        center(): void;
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} parent The parent Component we are adding this window to
        * @param {number} x The x coordinate of the window
        * @param {number} y The y coordinate of the window
        * @param {boolean} isModal Does this window block all other user operations?
        * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
        */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * When we click the modal window we flash the window
        * @param {object} e The jQuery event object
        */
        onModalClicked(e: any): void;
        /**
        * Updates the dimensions if autoCenter is true.
        * @param {object} val
        */
        onWindowResized(val: any): void;
        /**
        * Hides the window if its show property is set to true
        * @param {any} e The jQuery event object
        */
        onStageClick(e: any): void;
        /** Gets the content component */
        content: Component;
        visible: boolean;
        headerText: string;
        modalBackdrop: JQuery;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
    }
}
declare module Animate {
    class ContextMenuItem extends Component {
        private _text;
        private _imgURL;
        /**
        * Creates an instance of the item
        * @param {string} text The text of the item
        * @param {string} imgURL An optional image URL
        */
        constructor(text: string, imgURL: string, parent?: Component);
        /** Gets the text of the item */
        /** Sets the text of the item */
        text: string;
        /** Gets the image src of the item */
        /** Sets the image src of the item */
        imageURL: string;
    }
    class ContextMenuEvents extends ENUM {
        constructor(v: string);
        static ITEM_CLICKED: ContextMenuEvents;
    }
    class ContextMenuEvent extends Event {
        item: ContextMenuItem;
        constructor(item: ContextMenuItem, eventName: any);
    }
    /**
    * A ContextMenu is a popup window which displays a list of items that can be selected.
    */
    class ContextMenu extends Window {
        static currentContext: ContextMenu;
        private items;
        private selectedItem;
        /**
        */
        constructor();
        /**
        * Cleans up the context menu
        */
        dispose(): void;
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} parent The parent Component we are adding this window to
        * @param {number} x The x coordinate of the window
        * @param {number} y The y coordinate of the window
        * @param {boolean} isModal Does this window block all other user operations?
        * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
        */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * Adds an item to the ContextMenu
        * @param {ContextMenuItem} val The item we are adding
        * @returns {ContextMenuItem}
        */
        addItem(val: ContextMenuItem): ContextMenuItem;
        /**
        * Removes an item from the ContextMenu
        * @param {ContextMenuItem} val The item we are removing
        * @returns {ContextMenuItem}
        */
        removeItem(val: ContextMenuItem): ContextMenuItem;
        /**
        * Checks if we selected an item - if so it closes the context and dispatches the ITEM_CLICKED event.
        */
        onStageClick(e: any): void;
        /**
        * @description Called when we click an item
        * @param {ContextMenuItem} item The selected item
        * @param {JQuery} jqueryItem The jquery item
        */
        onItemClicked(item: ContextMenuItem, jqueryItem: JQuery): void;
        /**
        * Gets the number of items
        * @returns {number}
        */
        numItems: number;
        /**
        * Gets an item from the menu
        * @param {string} val The text of the item we need to get
        * @returns {ContextMenuItem}
        */
        getItem(val: string): ContextMenuItem;
        /**
        * Removes all items
        */
        clear(): void;
    }
}
declare module Animate {
    /**
    * This class is used to create tree view items.
    */
    class TreeView extends Component {
        private _selectedNode;
        private fixDiv;
        private _selectedNodes;
        constructor(parent: Component);
        /**
        * When we click the view
        * @param {any} e
        */
        onClick(e: any): void;
        /**
        * Selects a node.
        * @param {TreeNode} node The node to select
        * @param {boolean} expandToNode A bool to say if we need to traverse the tree down until we get to the node
        * and expand all parent nodes
        * @param {boolean} multiSelect If true then multiple nodes are selected
        */
        selectNode(node: TreeNode, expandToNode?: boolean, multiSelect?: boolean): void;
        /**
        * This will add a node to the treeview
        * @param {TreeNode} node The node to add
        * @returns {TreeNode}
        */
        addNode(node: TreeNode): TreeNode;
        /** @returns {Array<TreeNode>} The nodes of this treeview.*/
        nodes(): Array<TreeNode>;
        /**
        * This will clear and dispose of all the nodes
        * @returns Array<TreeNode> The nodes of this tree
        */
        clear(): void;
        /**
        * This removes a node from the treeview
        * @param {TreeNode} node The node to remove
        * @returns {TreeNode}
        */
        removeNode(node: any): TreeNode;
        /**
        * This will recursively look through each of the nodes to find a node with
        * the specified name.
        * @param {string} property The name property we are evaluating
        * @param {any} value The object we should be comparing against
        * @returns {TreeNode}
        */
        findNode(property: string, value: any): TreeNode;
        selectedNode: TreeNode;
        selectedNodes: Array<TreeNode>;
    }
}
declare module Animate {
    class TabEvents extends ENUM {
        constructor(v: string);
        static SELECTED: TabEvents;
        static REMOVED: TabEvents;
    }
    class TabEvent extends Event {
        private _pair;
        cancel: boolean;
        constructor(eventName: any, pair: TabPair);
        pair: TabPair;
    }
    /**
    * The Tab component will create a series of selectable tabs which open specific tab pages.
    */
    class Tab extends Component {
        static contextMenu: ContextMenu;
        private _tabSelectorsDiv;
        private _pagesDiv;
        private _tabPairs;
        private _selectedPair;
        private _dropButton;
        constructor(parent: Component);
        /**
        * When we click the tab
        * @param {TabPair} tab The tab pair object containing both the label and page <Comonent>s
        */
        onTabSelected(tab: TabPair): void;
        /**
        * @description When the context menu is clicked.
        */
        onContext(response: ContextMenuEvents, event: ContextMenuEvent): void;
        /**
        * Get the tab to select a tab page
        * @param {TabPair} tab
        */
        selectTab(tab: TabPair): TabPair;
        /**
        * Called just before a tab is closed. If you return false it will cancel the operation.
        * @param {TabPair} tabPair
        * @returns {boolean}
        */
        onTabPairClosing(tabPair: TabPair): boolean;
        /**
        * When we click the tab
        * @param {any} e
        */
        onClick(e: any): boolean;
        /**
        * When we update the tab - we move the dop button to the right of its extremities.
        */
        update(): void;
        /**
        * Adds an item to the tab
        * @param {string} val The label text of the tab or a {TabPair} object
        * @param {boolean} canClose
        * @returns {TabPair} The tab pair containing both the label and page <Component>s
        */
        addTab(val: string, canClose: boolean): TabPair;
        addTab(val: TabPair, canClose: boolean): TabPair;
        /**
        * Gets a tab pair by name.
        * @param {string} val The label text of the tab
        * @returns {TabPair} The tab pair containing both the label and page {Component}s
        */
        getTab(val: string): TabPair;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        /**
        * Removes all items from the tab. This will call dispose on all components.
        */
        clear(): void;
        /**
        * Removes an item from the tab
        * @param val The label text of the tab
        * @param {boolean} dispose Set this to true to clean up the tab
        * @returns {TabPair} The tab pair containing both the label and page <Component>s
        */
        removeTab(val: string, dispose: boolean): any;
        removeTab(val: TabPair, dispose: boolean): any;
        tabs: Array<TabPair>;
    }
}
declare module Animate {
    /**
    * This class is a small container class that is used by the Tab class. It creates TabPairs
    * each time a tab is created with the addTab function. This creates a TabPair object that keeps a reference to the
    * label and page as well as a few other things.
    */
    class TabPair {
        tab: Tab;
        tabSelector: Component;
        page: Component;
        name: string;
        private _savedSpan;
        private _modified;
        constructor(selector: Component, page: Component, name: string);
        /**
        * Gets if this tab pair has been modified or not
        * @returns {boolean}
        */
        /**
        * Sets if this tab pair has been modified or not
        * @param {boolean} val
        */
        modified: boolean;
        /**
        * Called when the editor is resized
        */
        onResize(): void;
        /**
        * Called by the tab class when the pair is to be removed.
        * @param {TabEvent} data An object that can be used to cancel the operation. Simply call data.cancel = true to cancel the closure.
        */
        onRemove(data: TabEvent): void;
        /**
        * Called by the tab when the save all button is clicked
        */
        onSaveAll(): void;
        /**
        * Called when the pair has been added to the tab
        */
        onAdded(): void;
        /**
        * Called when the pair has been selected
        */
        onSelected(): void;
        /**
        * Gets the label text of the pair
        */
        /**
        * Sets the label text of the pair
        */
        text: string;
        /**
        * Cleans up the references
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A simple label wrapper. This creates a div that has a textfield sub div. the
    * subdiv is the DOM element that actually contains the text.
    */
    class Label extends Component {
        private _text;
        textfield: Component;
        constructor(text: string, parent: Component, html?: string);
        /**
        * Gets the text of the label
        */
        /**
        * Sets the text of the label
        */
        text: string;
        /**
        * This will cleanup the {Label}
        */
        dispose(): void;
        /**
        * Returns the text height, in pixels, of this label. Use this function sparingly as it adds a clone
        * of the element to the body, measures the text then removes the clone. This is so that we get the text even if
        * the <Component> is not on the DOM
        * @extends <Label>
        * @returns <number>
        */
        textHeight: number;
    }
}
declare module Animate {
    /**
    * A simple button class
    */
    class Button extends Label {
        /**
        * @param {string} The button text
        * @param {Component} parent The parent of the button
        * @param {number} width The width of the button (optional)
        * @param {number} height The height of the button (optional)
        */
        constructor(text: string, parent: Component, html?: string, width?: number, height?: number);
        /**
        * A shortcut for jQuery's css property.
        */
        css(propertyName: any, value?: any): any;
        /**This will cleanup the component.*/
        dispose(): void;
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        selected: boolean;
    }
}
declare module Animate {
    /**
    * A simple {Component} that you can use to get user input by using the text function
    */
    class InputBox extends Component {
        private _limit;
        private _textfield;
        /**
        * @param {Component} parent The parent <Component> to which we add this box
        * @param {string} text The text of the input box
        * @param {boolean} isTextArea True if this is a text area (for larger text)
        * @param {boolean} isPassword True if this needs to be obscured for passwords
        * @param {string} html
        */
        constructor(parent: Component, text: string, isTextArea?: boolean, isPassword?: boolean, html?: string);
        /**
        * Called when the text property is changed. This function will only fire if a limit has been
        * set with the limitCharacters(val) function.
        * @param {any} e
        */
        onTextChange(e: any): void;
        /**
        * Use this function to get a limit on how many characters can be entered in this input
        * @returns {number} val The integer limit of characters
        */
        /**
        * Use this function to set a limit on how many characters can be entered in this input
        * @param {number} val The integer limit of characters
        */
        limitCharacters: number;
        /**
        * @returns {string}
        */
        /**
        * @param {string} val
        */
        text: string;
        /**
        * Highlights and focuses the text of this input
        * @param {boolean} focusInView If set to true the input will be scrolled to as well as selected. This is not
        * always desireable because the input  might be off screen on purpose.
        */
        focus(focusInView?: boolean): void;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        textfield: Component;
    }
}
declare module Animate {
    /**
    * A small holder div that emulates C# style grids. Use the content variable instead of the group directly
    */
    class Group extends Component {
        private heading;
        content: Component;
        constructor(text: any, parent: any);
        /**
        * Gets or sets the label text
        * @param {string} val The text for this label
        * @returns {string} The text for this label
        */
        text(val: any): JQuery;
        /**
        * This will cleanup the <Group>.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A wrapper class for checkboxes
    */
    class Checkbox extends Component {
        private checkbox;
        private textfield;
        /**
        * A wrapper class for checkboxes
        */
        constructor(parent: Component, text: string, checked: boolean, html?: string);
        /**Gets if the checkbox is checked.*/
        /**Sets if the checkbox is checked.*/
        checked: boolean;
        /**Gets the checkbox label text*/
        /**Sets the checkbox label text*/
        text: string;
        /**This will cleanup the component.*/
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A small component that represents a text - value pair
    */
    class LabelVal extends Component {
        private label;
        private _val;
        /**
        * @param {Component} parent The parent component
        * @param {string} text The label text
        * @param {Component} val The component we are pairing with the label
        * @param {any} css An optional css object to apply to the val component
        */
        constructor(parent: Component, text: string, val: Component, css?: any);
        /**This will cleanup the component.*/
        dispose(): void;
        val: Component;
        /**Gets the label text*/
        text: string;
    }
}
declare module Animate {
    /**
    * The ListViewItem class is used in the ListView class. These represent the items you can select.
    */
    class ListViewItem {
        private _fields;
        private _components;
        private _smallImg;
        private _largeIMG;
        private _rowNum;
        tag: any;
        /**
        * @param {Array<string>} fields An array of strings. These strings will be evenly distributed between columns of a list view.
        * @param {string} smallImg The URL of an image to use that can represent the small image of this item when in Image mode of the list view
        * @param {string} largeIMG The URL of an image to use that can represent the large image of this item when in Image mode of the list view
        */
        constructor(fields: Array<string>, smallImg?: string, largeIMG?: string);
        /**
        * This function clears the field's components
        */
        clearComponents(): void;
        /**
        * This function is used to cleanup the object before its removed from memory.
        */
        dispose(): void;
        /**
        * Creates a preview component for the list view.
        * @param {string} text Text to show under the preview
        * @param {number} imgSize The size of the image
        * @returns <Component>
        */
        preview(text: string, imgSize: number): Component;
        /**
        * Creates a field component
        * @param string content The text to show inside of the field
        * @returns {Component}
        */
        field(content: string): Component;
        components: Array<Component>;
        fields: Array<string>;
        smallImg: string;
        largeIMG: string;
    }
}
declare module Animate {
    /**
    * The ListViewHeader class is used in the ListView class. It acts as the first selectable item row in the list view.
    */
    class ListViewHeader extends Component {
        text: string;
        /**
        * @param {string} text The text of the header
        * @param {string} image The optional image of the header
        */
        constructor(text: string, image: string);
    }
}
declare module Animate {
    class ListViewEvents extends ENUM {
        constructor(v: string);
        static ITEM_CLICKED: ListViewEvents;
        static ITEM_DOUBLE_CLICKED: ListViewEvents;
    }
    class ColumnItem {
        text: string;
        image: string;
        constructor(text: string, image?: string);
    }
    class ListViewType {
        value: string;
        constructor(v: string);
        toString(): string;
        static DETAILS: ListViewType;
        static IMAGES: ListViewType;
    }
    class ListViewEvent extends Event {
        item: ListViewItem;
        constructor(eventType: ListViewEvents, item: ListViewItem);
    }
    /**
    * The ListView class is used to display a series of {ListViewItem}s. Each item can
    * organised by a series of columns
    */
    class ListView extends Component {
        private _mode;
        private _selectedItem;
        private _lists;
        private _items;
        private _columns;
        private _sortableColumn;
        private _imgSize;
        private _multiSelect;
        private _fix;
        private _divider;
        private _selectedColumn;
        private _dClickProxy;
        private _clickProxy;
        private _downProxy;
        private _upProxy;
        private _moveProxy;
        constructor(parent: Component);
        /**
        * @returns {ListViewType} Either ListViewType.DETAILS or ListViewType.IMAGES
        */
        /**
        * Toggle between the different modes
        * @param {ListViewType} mode Either DETAILS or IMAGES mode
        */
        displayMode: ListViewType;
        /**
        * Called when we hold down on this component
        * @param {any} e The jQuery event object
        */
        onDown(e: any): boolean;
        /**
        * Called when we move over this componeny
        * @param {any} e The jQuery event object
        */
        onMove(e: any): void;
        /**
        * Called when the mouse up event is fired
        * @param {any} e The jQuery event object
        */
        onUp(e: any): void;
        onDoubleClick(e: any): boolean;
        /**
        * Called when we click this component
        * @param {any} e The jQuery event object
        */
        onClick(e: any): void;
        /**
        * Gets all the items that are selected
        * @returns {Array<ListViewItem>}
        */
        getSelectedItems(): Array<ListViewItem>;
        /**
        * Sets which items must be selected. If you specify null then no items will be selected.
        */
        setSelectedItems(items: any): void;
        /**
        * This function is used to clean up the list
        */
        dispose(): void;
        /**
        * Redraws the list with the items correctly synced with the column names
        * @returns {any}
        */
        updateItems(): void;
        /**
        * Adds a column
        * @param {string} name The name of the new column
        * @param {string} image The image of the column
        */
        addColumn(name: string, image?: string): void;
        /**
        * Removes a column
        * @param {string} name The name of the column to remove
        */
        removeColumn(name: any): void;
        /**
        * Adds a {ListViewItem} to this list
        * @param {ListViewItem} item The item we are adding to the list
        * @returns {ListViewItem}
        */
        addItem(item: any): any;
        /**
        * Sets the length of a column by its index
        * @param <int> columnIndex The index of the column
        * @param {string} width A CSS width property. This can be either % or px
        * @returns {ListViewItem}
        */
        setColumnWidth(columnIndex: any, width: any): void;
        /**
        * Removes a {ListViewItem} from this list
        * @param {ListViewItem} item The {ListViewItem} to remove.
        * @param {boolean} dispose If set to true the item will be disposed
        * @returns {ListViewItem}
        */
        removeItem(item: ListViewItem, dispose?: boolean): ListViewItem;
        /**
        * This function is used to remove all items from the list.
        * @param {boolean} dispose If set to true the item will be disposed
        */
        clearItems(dispose?: boolean): void;
        items: Array<ListViewItem>;
        lists: Array<Component>;
    }
}
declare module Animate {
    class ListEvents extends ENUM {
        constructor(v: string);
        static ITEM_SELECTED: ListEvents;
    }
    class ListEvent extends Event {
        item: string;
        constructor(eventName: ListEvents, item: string);
    }
    /**
    * Use this class to create a select list.
    */
    class List extends Component {
        selectBox: Component;
        private selectProxy;
        items: Array<JQuery>;
        /**
        * @param {Component} parent The parent component of this list
        * @param {string} html An optional set of HTML to use. The default is <div class='list-box'></div>
        * @param {string} selectHTML
        * @param {boolean} isDropDown
        */
        constructor(parent: Component, html?: string, selectHTML?: string, isDropDown?: boolean);
        /**
        * Called when a selection is made
        * @param <object> val Called when we make a selection
        */
        onSelection(val: any): void;
        /**
        * Adds an item to the list
        * @param {string} val The text of the item
        * @returns {JQuery} The jQuery object created
        */
        addItem(val: string): JQuery;
        /**
        * Sorts  the  list alphabetically
        */
        sort(): void;
        /**
        * Removes an item from the list
        * @param <object> val The text of the item to remove
        * @returns <object> The jQuery object
        */
        removeItem(val: any): JQuery;
        /**
        * Gets the number of list items
        * @returns {number} The number of items
        */
        numItems(): number;
        /**
        * Gets thee selected item from the list.
        * @returns {JQuery} The selected jQuery object
        */
        /**
        * Sets thee selected item from the list.
        * @param {string} val The text of the item
        */
        selectedItem: string;
        /**
        * Gets the selected item index from the list by its
        * index.
        * @returns {number} The selected index or -1 if nothing was found.
        */
        /**
        * Sets the selected item index from the list by its index.
        * @param {number} val The text of the item
        */
        selectedIndex: number;
        /**
        * Gets item from the list by its value
        * @param {string} val The text of the item
        * @returns {JQuery} The jQuery object
        */
        getItem(val: string): JQuery;
        /**
        * Removes all items
        */
        clearItems(): void;
        /**
        * Diposes and cleans up this component and all its child <Component>s
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Use this class to create a drop down box of items.
    */
    class ComboBox extends List {
        constructor(parent?: Component);
    }
}
declare module Animate {
    /**
    * The main GUI component of the application.
    */
    class Application extends Component {
        private static _singleton;
        static bodyComponent: Component;
        private _focusObj;
        private _resizeProxy;
        private _downProxy;
        private _dockerlefttop;
        private _dockerleftbottom;
        private _dockerrighttop;
        private _dockerrightbottom;
        private _canvasContext;
        constructor(domElement?: string);
        /**
        * Deals with the focus changes
        * @param {object} e The jQuery event object
        */
        onMouseDown(e: any): void;
        /**
        * Sets a component to be focused.
        * @param {Component} comp The component to focus on.
        */
        setFocus(comp: Component): void;
        /**
        * Updates the dimensions of the application
        * @param {object} val The jQuery event object
        */
        onWindowResized(val: any): void;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        /**
        *  This is called when a project is unloaded and we need to reset the GUI.
        */
        projectReset(): void;
        /**
        * Gets the singleton instance
        */
        static getInstance(domElement?: string): Application;
        focusObj: Component;
        canvasContext: CanvasContext;
        dockerLeftTop: Docker;
        dockerLeftBottom: Docker;
        dockerRightTop: Docker;
        dockerRightBottom: Docker;
    }
}
declare module Animate {
    /**
    * Behaviours are the base class for all nodes placed on a <Canvas>
    */
    class Behaviour extends Component implements ICanvasItem, IRenamable {
        private _originalName;
        private _alias;
        private _canGhost;
        private _requiresUpdated;
        private _parameters;
        private _products;
        private _outputs;
        private _inputs;
        private _portals;
        private _fontSize;
        constructor(parent: Component, text: string, html?: string);
        /**
        * Adds a portal to this behaviour.
        * @param {PortalType} type The type of portal we are adding. It can be either Portal.INPUT, Portal.OUTPUT, Portal.PARAMETER & Portal.PRODUCT
        * @param {string} name The unique name of the <Portal>
        * @param {any} value The default value of the <Portal>
        * @param {ParameterType} dataType The data type that the portal represents. See the default data types.
        * @returns {Portal} The portal that was added to this node
        */
        addPortal(type: PortalType, name: string, value: any, dataType: ParameterType, update: boolean): Portal;
        /**
        * Removes a portal from this behaviour
        * @param {Portal} toRemove The portal object we are removing
        * @param {any} dispose Should the portal be disposed. The default is true.
        * @returns {Portal} The portal we have removed. This would be disposed if dispose was set to true.
        */
        removePortal(toRemove: Portal, dispose?: boolean): Portal;
        /**
        * Called when the behaviour is renamed
        * @param {string} name The new name of the behaviour
        */
        onRenamed(name: string): void;
        /**
        * A shortcut for jQuery's css property.
        */
        css(propertyName: any, value?: any): any;
        /**
        * Updates the behavior width and height and organises the portals
        */
        updateDimensions(): void;
        /** Gets the text of the behaviour */
        /**
        * sets the label text
        */
        text: string;
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        selected: boolean;
        /**
        * Diposes and cleans up this component and all its child components
        */
        dispose(): void;
        name: string;
        originalName: string;
        alias: string;
        canGhost: boolean;
        requiresUpdated: boolean;
        parameters: Array<Portal>;
        products: Array<Portal>;
        outputs: Array<Portal>;
        inputs: Array<Portal>;
        portals: Array<Portal>;
    }
}
declare module Animate {
    class BehaviourPortal extends Behaviour {
        private _portalType;
        private _dataType;
        private _value;
        constructor(parent: Component, text: string, portalType?: PortalType, dataType?: ParameterType, value?: any);
        /**This will cleanup the component.*/
        dispose(): void;
        portaltype: PortalType;
        dataType: ParameterType;
        value: any;
    }
}
declare module Animate {
    /**
    * A node used to ghost - or act as a shortcut - for an existing node. This node is created when you hold shift and
    * move a node on the canvas. The ghost can then be as if it were the original node.
    */
    class BehaviourShortcut extends Behaviour {
        private _originalNode;
        /**
        * @param {Canvas} parent The parent canvas
        * @param {Behaviour} originalNode The original node we are copying from
        */
        constructor(parent: Canvas, originalNode: Behaviour, text: string);
        setOriginalNode(originalNode: Behaviour, buildPortals: boolean): void;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        originalNode: Behaviour;
    }
}
declare module Animate {
    class BehaviourAsset extends Behaviour {
        private _asset;
        constructor(parent: Canvas, text?: string);
        /**
        * Diposes and cleans up this component and all its child <Component>s
        */
        dispose(): void;
        /**
        * Adds a portal to this behaviour.
        * @param {PortalType} type The type of portal we are adding. It can be either PortalType.INPUT, PortalType.OUTPUT, Portal.PARAMETER & PortalType.PRODUCT
        * @param {string} name The unique name of the Portal
        * @param {any} value The default value of the Portal
        * @param {ParameterType} dataType The data type that the portal represents. See the default data types.
        * @returns {Portal} The portal that was added to this node
        */
        addPortal(type: PortalType, name: string, value: any, dataType: ParameterType): Portal;
        asset: Asset;
    }
}
declare module Animate {
    /**
    * A node for displaying comments
    */
    class BehaviourComment extends Behaviour {
        private isInInputMode;
        private input;
        private stageClickProxy;
        private mStartX;
        private mStartY;
        private mOffsetX;
        private mOffsetY;
        constructor(parent: Component, text: string);
        /** Does nothing...*/
        updateDimensions(): void;
        /** When the mouse enters the behaviour*/
        onIn(e: any): void;
        /**
        * A shortcut for jQuery's css property.
        */
        css(propertyName: any, value?: any): any;
        /** When the mouse enters the behaviour*/
        onOut(e: any): void;
        /** When the resize starts.*/
        onResizeStart(event: any, ui: any): void;
        /** When the resize updates.*/
        onResizeUpdate(event: any, ui: any): void;
        /** When the resize stops.*/
        onResizeStop(event: any, ui: any): void;
        /** Call this to allow for text editing in the comment.*/
        enterText(): boolean;
        /** When we click on the stage we go out of edit mode.*/
        onStageClick(e: any): void;
        /**This will cleanup the component.*/
        dispose(): void;
    }
}
declare module Animate {
    class PortalType extends ENUM {
        constructor(v: string);
        static PARAMETER: PortalType;
        static PRODUCT: PortalType;
        static INPUT: PortalType;
        static OUTPUT: PortalType;
        /**
        * Returns an enum reference by its name/value
        * @param {string} val
        * @returns {PortalType}
        */
        static fromString(val: string): PortalType;
    }
    class ParameterType extends ENUM {
        constructor(v: string);
        static ASSET: ParameterType;
        static ASSET_LIST: ParameterType;
        static NUMBER: ParameterType;
        static GROUP: ParameterType;
        static FILE: ParameterType;
        static STRING: ParameterType;
        static OBJECT: ParameterType;
        static BOOL: ParameterType;
        static INT: ParameterType;
        static COLOR: ParameterType;
        static ENUM: ParameterType;
        static HIDDEN: ParameterType;
        static HIDDEN_FILE: ParameterType;
        static OPTIONS: ParameterType;
        /**
        * Returns an enum reference by its name/value
        * @param {string} val
        * @returns {ParameterType}
        */
        static fromString(val: string): ParameterType;
    }
    /**
    * A portal class for behaviours. There are 4 different types of portals -
    * INPUT, OUTPUT, PARAMETER and PRODUCT. Each portal acts as a gate for a behaviour.
    */
    class Portal extends Component {
        private _links;
        private _customPortal;
        private _name;
        private _type;
        private _dataType;
        value: any;
        behaviour: Behaviour;
        /**
        * @param {Behaviour} parent The parent component of the Portal
        * @param {string} name The name of the portal
        * @param {PortalType} type The portal type. This can be either Portal.INPUT, Portal.OUTPUT, Portal.PARAMETER or Portal.PRODUCT
        * @param {any} value The default value of the portal
        * @param {ParameterType} dataType The type of value this portal represents - eg: asset, string, number, file...etc
        */
        constructor(parent: Behaviour, name: string, type?: PortalType, value?: any, dataType?: ParameterType);
        /**
        * Edits the portal variables
        * @param {string} name The name of the portal
        * @param {PortalType} type The portal type. This can be either Portal.INPUT, Portal.OUTPUT, Portal.PARAMETER or Portal.PRODUCT
        * @param {any} value The default value of the portal
        * @param {ParameterType} dataType The type of value this portal represents - eg: asset, string, number, file...etc
        * @extends <Portal>
        */
        edit(name: string, type: PortalType, value: any, dataType: ParameterType): void;
        /**
        * This function will check if the source portal is an acceptable match with the current portal.
        * @param source The source panel we are checking against
        */
        checkPortalLink(source: Portal): boolean;
        /**
        * This function will check if the source portal is an acceptable match with the current portal.
        */
        dispose(): void;
        /**
        * When the mouse is down on the portal.
        * @param {object} e The jQuery event object
        */
        onPortalDown(e: any): void;
        /**
        * Adds a link to the portal.
        * @param {Link} link The link we are adding
        */
        addLink(link: Link): void;
        /**
        * Removes a link from the portal.
        * @param {Link} link The link we are removing
        */
        removeLink(link: Link): Link;
        /**
        * Makes sure the links are positioned correctly
        */
        updateAllLinks(): void;
        /**
        * Returns this portal's position on the canvas.
        */
        positionOnCanvas(): {
            left: number;
            top: number;
        };
        type: PortalType;
        name: string;
        dataType: ParameterType;
        customPortal: boolean;
        links: Array<Link>;
    }
}
declare module Animate {
    /**
    * A behaviour node that represents a Behaviour Container
    */
    class BehaviourInstance extends Behaviour {
        private _container;
        constructor(parent: Component, container: Container, createPotrals?: boolean);
        /**
        * Called when a behaviour is disposed
        */
        onContainerDeleted(response: EditorEvents, event: ContainerEvent): void;
        /**
        * This is called when a Canvas reports a portal being added, removed or modified.
        */
        onPortalChanged(response: EditorEvents, event: PluginPortalEvent): void;
        /**
        * Diposes and cleans up this component and all its child Components
        */
        dispose(): void;
        container: Container;
    }
}
declare module Animate {
    /**
    * A behaviour node that acts as a script. Users can create custom JS within the body. These nodes are connected to
    * database entries and so need to be cleaned up properly when modified by the user.
    */
    class BehaviourScript extends Behaviour {
        scriptId: string;
        scriptTab: ScriptTab;
        private _loading;
        constructor(parent: Component, scriptId: string, text: string, copied?: boolean);
        /**
        * Called when the behaviour is renamed
        * @param <string> name The new name of the behaviour
        */
        onRenamed(name: any): void;
        /**
        * This function will open a script tab
        */
        edit(): void;
        /**
        * Diposes and cleans up this component and all its child Components
        */
        dispose(): void;
    }
}
declare module Animate {
    class CanvasEvents extends ENUM {
        constructor(v: string);
        static MODIFIED: CanvasEvents;
    }
    class CanvasEvent extends Event {
        canvas: Canvas;
        constructor(eventName: CanvasEvents, canvas: Canvas);
    }
    /**
    * The canvas is used to create diagrammatic representations of behaviours and how they interact in the scene.
    */
    class Canvas extends Component {
        static lastSelectedItem: any;
        static snapping: boolean;
        private mUpProxy;
        private mDownProxy;
        private mContextProxy;
        private keyProxy;
        private mContextNode;
        private mX;
        private mY;
        name: string;
        private _container;
        private _containerReferences;
        private _proxyMoving;
        private _proxyStartDrag;
        private _proxyStopDrag;
        /**
        * @param {Component} parent The parent component to add this canvas to
        * @param {Container} cntainer Each canvas represents a behaviour.This container is the representation of the canvas as a behaviour.
        */
        constructor(parent: Component, container: Container);
        onStartingDrag(e: any, ui: any): void;
        /**
        * When an item is finished being dragged
        */
        onChildDropped(e: any, ui: any): void;
        /**
        * Called when a draggable object is dropped onto the canvas.
        * @param {any} event The jQuery UI event
        * @param {any} ui The event object sent from jQuery UI
        */
        onObjectDropped(event: any, ui: any): void;
        /**
        * Create an asset node at a location
        * @param {Asset} asset
        * @param {number} x
        * @param {number} y
        */
        addAssetAtLocation(asset: Asset, x: number, y: number): void;
        /**
        * This function is used to cleanup the object before its removed from memory.
        */
        dispose(): void;
        /**
        * This function will remove all references of an asset in the behaviour nodes
        * @param {Asset} asset The asset reference
        */
        removeAsset(asset: Asset): void;
        /**
        * Call this to remove an item from the canvas
        * @param {Component} item The component we are removing from the canvas
        * @extends <Canvas>
        */
        removeItem(item: any): void;
        /**
        * Removes all selected items
        */
        removeItems(): void;
        /**
        * Called when the canvas context menu is closed and an item clicked.
        */
        onContextSelect(e: ContextMenuEvents, event: ContextMenuEvent): void;
        getAssetList(asset: Asset, assetMap: Array<number>): void;
        onAssetEdited(e: ENUM, event: AssetEditedEvent, sender?: EventDispatcher): void;
        buildSceneReferences(): void;
        /**
        * Called when the property grid fires an edited event.
        * @param {PropertyGridEvents} response
        * @param {PropertyGridEvent} event
        */
        onPropertyGridEdited(response: PropertyGridEvents, event: PropertyGridEvent): void;
        /**
        * When we click ok on the portal form
        */
        OnPortalConfirm(response: OkCancelFormEvents, e: OkCancelFormEvent): void;
        /**
        * When the context is hidden we remove the event listeners.
        */
        onContextHide(response: WindowEvents, e: WindowEvent): void;
        /**
        * Called when the context menu is about to open
        * @param {any} e The jQuery event object
        */
        onContext(e: any): void;
        /**
        * When we have chosen a behaviour
        */
        onBehaviourPicked(response: BehaviourPickerEvents, event: BehaviourPickerEvent): void;
        /**
        * Iteratively goes through each container to check if its pointing to this behaviour
        */
        private isCyclicDependency(container, ref);
        /**
        * This will create a canvas node based on the template given
        * @param {BehaviourDefinition} template The definition of the node
        * @param {number} x The x position of where the node shoule be placed
        * @param {number} y The y position of where the node shoule be placed
        * @param {Container} container This is only applicable if we are dropping a node that represents another behaviour container. This last parameter
        * is the actual behaviour container
        * @param {string} name The name of the node
        * @returns {Behaviour}
        */
        createNode(template: BehaviourDefinition, x: number, y: number, container?: Container, name?: string): Behaviour;
        /**
        * Catch the key down events.
        * @param {any} e The jQuery event object
        */
        onKeyDown(e: any): boolean;
        /**
        * When we double click the canvas we show the behaviour picker.
        * @param {any} e The jQuery event object
        */
        onDoubleClick(e: any): void;
        /**
        * This is called to set the selected canvas item.
        * @param {Component} comp The component to select
        */
        selectItem(comp: Component): void;
        /**
        * Called when we click down on the canvas
        * @param {any} e The jQuery event object
        */
        onMouseDown(e: any): void;
        /**
        * Called when we click up on the canvas
        * @param {any} e The jQuery event object
        */
        onMouseUp(e: any): void;
        /**
        * This is called externally when the canvas has been selected. We use this
        * function to remove any animated elements
        */
        onSelected(): void;
        /**
        * Use this function to add a child to this component. This has the same effect of adding some HTML as a child of another piece of HTML.
        * It uses the jQuery append function to achieve this functionality.
        * @param {any} child The child to add. Valid parameters are valid HTML code or other Components.
        * @returns {Component} The child as a Component.
        */
        addChild(child: any): Component;
        /**
        * Use this function to remove a child from this component. It uses the jQuery detach function to achieve this functionality.
        * @param {Component} child The child to remove. Valid parameters are valid Components.
        * @returns {Component} The child as a Component.
        */
        removeChild(child: any): Component;
        /**
        * Called when an item is moving
        */
        onChildMoving(e: any, ui: any): void;
        /**
        * This function is called when animate is reading in saved data from the server.
        * @param {any} data
        */
        open(data: any): void;
        /**
        * This function is called when animate is writing data to the database.
        * @param {any} items The items we need to build
        * @returns {CanvasToken}
        */
        buildDataObject(items?: Array<IComponent>): CanvasToken;
        /**
        * This function is called when a behaviour is double clicked,
        * a canvas is created and we try and load the behavious contents.
        * @param {CanvasToken} dataToken You can optionally pass in an data token object. These objects must contain information on each of the items we are adding to the canvas.
        * @param {boolean} clearItems If this is set to true the function will clear all items already on the Canvas.
        * @returns {any}
        */
        openFromDataObject(dataToken?: CanvasToken, clearItems?: boolean, addSceneAssets?: boolean): void;
        /**
        * This function is called to make sure the canvas min width and min height variables are set
        */
        checkDimensions(): void;
        container: Container;
        containerReferences: {
            groups: Array<number>;
            assets: Array<number>;
        };
    }
}
declare module Animate {
    /**
    * The link class are the lines drawn from behavior portals
    */
    class Link extends Component implements ICanvasItem {
        startPortal: Portal;
        endPortal: Portal;
        _startBehaviour: any;
        _endBehaviour: any;
        private mMouseMoveProxy;
        private mMouseUpProxy;
        private mMouseUpAnchorProxy;
        private mPrevPortal;
        frameDelay: number;
        private mStartClientX;
        private mStartClientY;
        delta: number;
        private mStartX;
        private mStartY;
        private mCurTarget;
        private canvas;
        private graphics;
        private linePoints;
        private _selected;
        /**
        * @param {Canvas} parent The parent {Canvas} of the link
        */
        constructor(parent: Component);
        /**
        * This is called when we need a link to start drawing. This will
        * follow the mouse and draw a link from the original mouse co-ordinates to an
        * end portal.
        * @param {Portal} startPortal
        * @param {any} e
        */
        start(startPortal: Portal, e: any): void;
        /**
        * Check if a point is actually selecting the link
        * @param {any} e
        */
        hitTestPoint(e: any): boolean;
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        /**
        * Get or Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        selected: boolean;
        /**
        * Builds the dimensions of link based on the line points
        */
        buildDimensions(): void;
        /**
        * Use this function to build the line points that define the link
        */
        buildLinePoints(e: any): void;
        /**
        * Updates the link points (should they have been moved).
        */
        updatePoints(): void;
        /**
        * When the mouse moves we resize the stage.
        * @param {any} e
        */
        onMouseMove(e: any): void;
        /**
       * Draws a series of lines
       */
        draw(): void;
        /**
        * Remove listeners.
        * @param {any} e
        */
        onMouseUpAnchor(e: any): void;
        /**
        * Cleanup the link
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * This is the implementation of the context menu on the canvas.
    */
    class CanvasContext extends ContextMenu {
        private mCreateInput;
        private mCreateOutput;
        private mCreateParam;
        private mCreateProduct;
        private mEditPortal;
        private mDel;
        private mCreate;
        private mCreateComment;
        private mDelEmpty;
        constructor();
        /**
        * Shows the window by adding it to a parent.
        */
        showContext(x: number, y: number, item: Component): void;
    }
}
declare module Animate {
    /**
    * An implementation of the tree view for the scene.
    */
    class TreeViewScene extends TreeView {
        private static _singleton;
        private _sceneNode;
        private _assetsNode;
        private _groupsNode;
        private _pluginBehaviours;
        private _contextMenu;
        private _contextCopy;
        private _contextDel;
        private _contextAddInstance;
        private _contextSave;
        private _contextRefresh;
        private _contextAddGroup;
        private _quickCopy;
        private _quickAdd;
        private _contextNode;
        private _shortcutProxy;
        constructor(parent?: Component);
        onShortcutClick(e: any): void;
        onMouseMove(e: any): void;
        /**
        * Called when the project is loaded and ready.
        */
        projectReady(project: Project): void;
        /**
        * TODO: This is currently hooked on when a resource is created using the createResource call in project. Ideally this should be called whenever
        * any form of resource is created. I.e. try to get rid of addAssetInstance
        * Called whenever a project resource is created
        */
        onResourceCreated(type: string, event: ProjectEvent): void;
        /**
        * Called when the project is reset by either creating a new one or opening an older one.
        */
        projectReset(project: Project): void;
        /**
        * Catch the key down events.
        * @param e The event passed by jQuery
        */
        onKeyDown(e: any): void;
        /**
        * Creates an asset node for the tree
        * @param {Asset} asset The asset to associate with the node
        */
        addAssetInstance(asset: Asset, collapse?: boolean): boolean;
        /**
        * Called when we select a menu item.
        */
        onContextSelect(response: ContextMenuEvents, event: ContextMenuEvent, sender?: EventDispatcher): void;
        /**
        * When we double click the tree
        * @param <object> e The jQuery event object
        */
        onDblClick(e: any): void;
        /**
        * When the database returns from its command.
        * @param {ProjectEvents} response The loader response
        * @param {ProjectEvent} data The data sent from the server
        */
        /** When the rename form is about to proceed. We can cancel it by externally checking
        * if against the data.object and data.name variables.
        */
        onRenameCheck(response: string, event: RenameFormEvent, sender?: EventDispatcher): void;
        /**
        * This function will get a list of asset instances based on their class name.
        * @param {string|Array<string>} classNames The class name of the asset, or an array of class names
        * @returns Array<TreeNodeAssetInstance>
        */
        getAssets(classNames: string | Array<string>): Array<TreeNodeAssetInstance>;
        /**
        * This function will get a list of asset classes.
        * returns {Array<TreeNodeAssetClass>}
        */
        getAssetClasses(): Array<AssetClass>;
        /**
        * Called when the context menu is about to open.
        * @param <jQuery> e The jQuery event object
        */
        onContext(e: any): void;
        /**
        * Selects a node.
        * @param {TreeNode} node The node to select
        * @param {boolean} expandToNode A bool to say if we need to traverse the tree down until we get to the node
        * and expand all parent nodes
        * @param {boolean} multiSelect Do we allow nodes to be multiply selected
        */
        selectNode(node: TreeNode, expandToNode?: boolean, multiSelect?: boolean): void;
        /**
        * Gets the singleton instance.
        * @returns <TreeViewScene> The singleton instance
        */
        static getSingleton(): TreeViewScene;
        /**
        * This will add a node to the treeview to represent the behaviours available to developers
        * @param {BehaviourDefinition} template
        * @returns {TreeNodePluginBehaviour}
        */
        addPluginBehaviour(template: BehaviourDefinition): TreeNodePluginBehaviour;
        /**
        * This will remove a node from the treeview that represents the behaviours available to developers.
        * @param  {string} name The name if the plugin behaviour
        * @returns {TreeNode}
        */
        removePluginBehaviour(name: string, dispose?: boolean): TreeNode;
        sceneNode: TreeNode;
        assetsNode: TreeNode;
        groupsNode: TreeNode;
        pluginBehaviours: TreeNode;
        contextNode: TreeNode;
    }
}
declare module Animate {
    /**
    * This is the base class for all tree node classes
    */
    class TreeNode extends Component implements IRenamable {
        protected mText: string;
        private _expanded;
        private hasExpandButton;
        canDelete: boolean;
        canFocus: boolean;
        canUpdate: boolean;
        canCopy: boolean;
        treeview: TreeView;
        private _modified;
        private _loading;
        private _modifiedStar;
        /**
        * @param {string} text The text to use for this node
        * @param {string} img An optional image to use (image src text)
        * @param {boolean} hasExpandButton A bool to tell the node if it should use the expand button
        */
        constructor(text: any, img?: string, hasExpandButton?: boolean);
        /**
        * Gets if this tree node is in a modified state
        * @returns {boolean}
        */
        /**
        * Sets if this tree node is in a modified state
        * @param {boolean} val
        */
        modified: boolean;
        /**
        * Gets if this tree node is busy with a loading operation
        * @returns {boolean}
        */
        /**
        * Sets if this tree node is busy with a loading operation
        * @param {boolean} val
        */
        loading: boolean;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        /**
        * Called when the node is selected
        */
        onSelect(): void;
        /**
        * This function will rturn an array of all its child nodes
        * @param {Function} type This is an optional type object. You can pass a function or class and it will only return nodes of that type.
        * @param Array<TreeNode> array This is the array where data will be stored in. This can be left as null and one will be created
        * @returns Array<TreeNode>
        */
        getAllNodes(type: Function, array?: Array<TreeNode>): Array<TreeNode>;
        /**
        * This function will expand this node and show its children.
        */
        expand(): void;
        /**
        * This function will collapse this node and hide its children.
        */
        collapse(): void;
        /**
        * This will recursively look through each of the nodes to find a node with
        * the specified name.
        * @param {string} property The Javascript property on the node that we are evaluating
        * @param {any} value The value of the property we are comparing.
        * @returns {TreeNode}
        */
        findNode(property: string, value: any): TreeNode;
        /**
        * This will clear and dispose of all the nodes
        */
        clear(): void;
        /**
        * Get if the component is selected
        * @returns {boolean} If the component is selected or not.
        */
        /**
        * Set if the component is selected
        * @param {boolean} val Pass a true or false value to select the component.
        */
        selected: boolean;
        /**
        * Gets the text of the node
        * @returns {string} The text of the node
        */
        /**
        * Sets the text of the node
        * @param {string} val The text to set
        */
        text: string;
        /**
        * This will add a node to the treeview
        * @param {TreeNode} node The node to add
        * @param {boolean} collapse True if you want to make this node collapse while adding the new node
        * @returns {TreeNode}
        */
        addNode(node: TreeNode, collapse?: boolean): TreeNode;
        /**
        * The nodes of this treeview.
        * @returns {Array<TreeNode>}
        */
        nodes: Array<TreeNode>;
        /**
        * Gets if this treenode is expanded or not
        * @returns {boolean}
        */
        expanded: boolean;
        /**
        * Use this function to remove a child from this component.
        * It uses the {JQuery} detach function to achieve this functionality.
        * @param {IComponent} child The {IComponent} to remove from this {IComponent}'s children
        * @returns {IComponent} The {IComponent} we have removed
        */
        removeChild(child: IComponent): IComponent;
        /**
        * This removes a node from the treeview
        * @param {TreeNode} node The node to remove
        * @returns {TreeNode}
        */
        removeNode(node: TreeNode): TreeNode;
        name: string;
    }
}
declare module Animate {
    /**
    * This node represents a project resource
    */
    class TreeNodeResource<T extends ProjectResource<Engine.IResource>> extends TreeNode {
        resource: T;
        private _dropProxy;
        constructor(resource: T, text: string, img: string, hasExpand: boolean);
        /**
        * Called whenever the resource is re-downloaded
        */
        protected onRefreshed(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Called whenever the resource is modified
        */
        protected onDeleted(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Called whenever the resource is modified
        */
        protected onModified(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Called when a draggable object is dropped onto the node
        */
        protected onDropped(event: any, ui: any): void;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Treenodes are added to the treeview class. This treenode contains a reference to the
    * AssetClass object defined by plugins.
    */
    class TreeNodeAssetClass extends TreeNode {
        assetClass: AssetClass;
        className: string;
        /**
        * @param {AssetClas} assetClass The asset class this node represents
        * @param {TreeView} treeview The treeview to which this is added
        */
        constructor(assetClass: AssetClass, treeview: TreeView);
        /**
        * This will get all TreeNodeAssetInstance nodes of a particular class name
        * @param {string|Array<string>} classNames The class name of the asset, or an array of class names
        * @returns Array<TreeNodeAssetInstance>
        */
        getInstances(classNames: string | Array<string>): Array<TreeNodeAssetInstance>;
        /**
        * This will get all sub TreeNodeAssetClass nodes
        * @returns Array<AssetClass>
        */
        getClasses(): Array<AssetClass>;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * Treenodes are added to the treeview class. This treenode contains a reference to the
    * AssetClass object defined by plugins.
    */
    class TreeNodeAssetInstance extends TreeNodeResource<Asset> {
        assetClass: AssetClass;
        /**
        * @param {AssetClass} assetClass The name of the asset's template
        * @param {Asset} asset The asset itself
        */
        constructor(assetClass: AssetClass, asset: Asset);
        /**
        * Called when the node is selected
        */
        onSelect(): void;
        /**
        * When we click ok on the portal form
        * @param <object> response
        * @param <object> data
        */
        onPropertyGridEdited(response: PropertyGridEvents, data: PropertyGridEvent, sender?: EventDispatcher): void;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    *  A tree node class for behaviour container objects.
    */
    class TreeNodeBehaviour extends TreeNodeResource<Container> {
        /**
        * @param {Container} behaviour The container we are associating with this node
        */
        constructor(container: Container);
        /**
        * Called when the node is selected
        */
        onSelect(): void;
        /**
        * Whenever a container property is changed by the editor
        */
        onPropertyGridEdited(response: PropertyGridEvents, event: PropertyGridEvent, sender?: EventDispatcher): void;
        /**
        * This will cleanup the component
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * This node represents a group asset. Goups are collections of objects - think of them as arrays.
    */
    class TreeNodeGroup extends TreeNodeResource<GroupArray> {
        constructor(group: GroupArray);
        /**
        * Called whenever the resource is re-downloaded
        */
        protected onRefreshed(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Called when a draggable object is dropped onto the canvas.
        */
        protected onDropped(event: any, ui: any): void;
    }
}
declare module Animate {
    /**
    * This node represents a group instance. Goups are collections of objects - think of them as arrays.
    */
    class TreeNodeGroupInstance extends TreeNode {
        private _instanceID;
        private _group;
        constructor(instanceID: number, name: string, group: GroupArray);
        /**
        * This will cleanup the component
        */
        dispose(): void;
        shallowId: number;
    }
}
declare module Animate {
    /**
    * This node represents a behaviour created by a plugin.
    */
    class TreeNodePluginBehaviour extends TreeNode {
        private _template;
        constructor(template: BehaviourDefinition);
        /**
        * This will cleanup the component
        */
        dispose(): void;
        template: BehaviourDefinition;
    }
}
declare module Animate {
    /**
    * A Tab pair for the canvas tabs
    */
    class CanvasTabPair extends TabPair {
        private _canvas;
        forceClose: boolean;
        constructor(canvas: Canvas, name: string);
        /**
        * Called whenever the container is refreshed
        */
        onRefreshed(type: string, event: Event, sender: Container): void;
        /**
        * Whenever the container deleted
        */
        onContainerDeleted(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Whenever the container is modified, we show this with a *
        */
        onContainerModified(type: string, event: Event, sender: EventDispatcher): void;
        /**
        * Cleans up the pair
        */
        dispose(): void;
        /**
        * @returns {Canvas}
        */
        canvas: Canvas;
    }
}
declare module Animate {
    /**
    * A tab pair that uses the ace editor
    */
    abstract class EditorPair extends TabPair {
        private _originalName;
        private _proxyChange;
        private _proxyMessageBox;
        protected _close: boolean;
        private _editor;
        private _loadingGif;
        /**
        * @param {string} name The name of the tab
        */
        constructor(name: string);
        /**
        * When we acknowledge the message box.
        * @param {string} val
        */
        onMessage(val: string): void;
        /**
        * Sets if this tab pair is busy loading
        * @param {boolean} val
        */
        protected loading(val: boolean): void;
        /**
        * Called when the editor changes
        * @param {any} e
        */
        onChange(e: any): void;
        /**
        * Called by the tab class when the pair is to be removed.
        * @param {TabEvent} event An object that can be used to cancel the operation. Simply call data.cancel = true to cancel the closure.
        */
        onRemove(event: TabEvent): void;
        /**
        * Called when the tab is resized
        */
        onResize(): void;
        /**
        * Saves the content of the editor
        */
        abstract save(): any;
        /**
        * Gets the script content once added to the stage
        */
        abstract initialize(): {
            content: string;
            contentType: string;
        };
        /**
        * Called when the pair has been added to the tab. The ace editor is added and initialized
        */
        onAdded(): void;
        /**
        * Gets the ace editor
        * @returns {AceAjax.Editor}
        */
        editor: AceAjax.Editor;
    }
}
declare module Animate {
    /**
    * A tab pair that manages the build HTML
    */
    class HTMLTab extends EditorPair {
        static singleton: HTMLTab;
        /**
        * @param {string} name The name of the tab
        */
        constructor(name: string);
        /**
        * Called when the editor needs to save its content
        */
        save(): void;
        /**
         * Gets the script initial values
         */
        initialize(): {
            content: string;
            contentType: string;
        };
        /**
        * Called when the pair has been added to the tab. The ace editor is added and initialized
        */
        onAdded(): void;
        /**
        * Called by the tab class when the pair is to be removed.
        * @param {TabEvent} event An object that can be used to cancel the operation. Simply call data.cancel = true to cancel the closure.
        */
        onRemove(event: TabEvent): void;
    }
}
declare module Animate {
    /**
    * A tab pair that manages the build CSS
    */
    class CSSTab extends EditorPair {
        static singleton: CSSTab;
        /**
        * @param {string} name The name of the tab
        */
        constructor(name: string);
        /**
        * Called when the editor needs to save its content
        */
        save(): void;
        /**
        * Gets the script initial values
        */
        initialize(): {
            content: string;
            contentType: string;
        };
        /**
        * Called when the pair has been added to the tab. The ace editor is added and initialized
        */
        onAdded(): void;
        /**
        * Called by the tab class when the pair is to be removed.
        * @param {TabEvent} event An object that can be used to cancel the operation. Simply call data.cancel = true to cancel the closure.
        */
        onRemove(event: TabEvent): void;
    }
}
declare module Animate {
    /**
    * A tab pair that creates a javascript node
    */
    class ScriptTab extends TabPair {
        static singleton: HTMLTab;
        private originalName;
        private proxyFunctionClick;
        private scriptNode;
        saved: boolean;
        private close;
        private userDefinedChange;
        private _editor;
        private curFunction;
        private scripts;
        private right;
        private _editorComponent;
        private onEnter;
        private onFrame;
        private onInitialize;
        private onDispose;
        constructor(scriptNode: BehaviourScript);
        /**
        * When we click on one of the function buttons
        * @param <object> e
        */
        OnFunctionClick(e: any): void;
        /**
        * Called when the editor is resized
        */
        onResize(): void;
        /**
        * When we rename the script, we need to update the text
        */
        rename(newName: string): void;
        /**
        * Called when the pair has been added to the tab
        */
        onAdded(): void;
        /**
        * When the server responds after a save.
        * @param <object> event
        * @param <object> data
        */
        onServer(response: ProjectEvents, event: ProjectEvent): void;
        /**
        * Called when the save all button is clicked
        */
        onSaveAll(): void;
        /**
        * Called when the pair has been selected
        */
        onSelected(): void;
        /**
        * Called by the tab class when the pair is to be removed.
        * @param <object> data An object that can be used to cancel the operation. Simply call data.cancel = true to cancel the closure.
        */
        onRemove(data: any): void;
        /**
        * Call this function to save the script to the database
        * @returns <object>
        */
        save(): void;
    }
}
declare module Animate {
    /**
    * This is an implementation of the tab class
    */
    class SceneTab extends Tab {
        private static _singleton;
        private mDocker;
        assetPanel: Component;
        /**
        * @param {Component} parent The parent of the button
        */
        constructor(parent: Component);
        /**This is called by a controlling ScreenManager class. An image string needs to be returned
        * which will act as a preview of the component that is being viewed or hidden.*/
        getPreviewImage(): string;
        getDocker(): Docker;
        setDocker(val: any): void;
        onShow(): void;
        onHide(): void;
        /** Gets the singleton instance. */
        static getSingleton(parent?: Component): SceneTab;
    }
}
declare module Animate {
    class CanvasTabType extends ENUM {
        constructor(v: string);
        static CANVAS: CanvasTabType;
        static HTML: CanvasTabType;
        static CSS: CanvasTabType;
        static SCRIPT: CanvasTabType;
        static BLANK: CanvasTabType;
    }
    /**
    * This is an implementation of the tab class that deals with the canvas
    */
    class CanvasTab extends Tab {
        private static _singleton;
        private _currentCanvas;
        private welcomeTab;
        private closingTabPair;
        private mDocker;
        constructor(parent: Component);
        /**
        * This is called by a controlling ScreenManager class. An image string needs to be returned
        * which will act as a preview of the component that is being viewed or hidden.
        * @return {string}
        */
        getPreviewImage(): string;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        * @returns {Docker}
        */
        getDocker(): Docker;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        * @param {Docker} val
        */
        setDocker(val: Docker): void;
        /**
        * This is called by a controlling Docker class when the component needs to be shown.
        */
        onShow(): void;
        /**
        * Called when sall all is returned from the DB
        */
        saveAll(): void;
        /**
        * This is called by a controlling Docker class when the component needs to be hidden.
        */
        onHide(): void;
        /**
        * Called just before a tab is closed. If you return false it will cancel the operation.
        * @param {TabPair} tabPair An object that contains both the page and label of the tab
        * @returns {boolean} Returns false if the tab needs to be saved. Otherwise true.
        */
        onTabPairClosing(tabPair: TabPair): boolean;
        /**
        * After being asked if we want to save changes to a container
        * @param {string} choice The choice of the message box. It can be either Yes or No
        */
        onMessage(choice: string): void;
        /**
        * We use this function to remove any assets from the tabs
        * @param {Asset} asset The asset we are removing
        */
        removeAsset(asset: Asset): void;
        /**
        * You can use this function to fetch a tab's canvas by a behaviour local ID
        * @param {number} behaviourID The local id of the container
        * @returns {Canvas} The returned tab's canvas or null
        */
        getTabCanvas(behaviourID: string): Canvas;
        /**
        * When we click the tab
        * @param {TabPair} tab The tab pair object which contains both the label and page components
        */
        onTabSelected(tab: TabPair): void;
        /**
        * When we start a new project we load the welcome page.
        * @param {Project} project
        */
        projectReady(project: Project): void;
        /**
        * Called when the project is reset by either creating a new one or opening an older one.
        */
        projectReset(): void;
        /**
        * When the news has been loaded from webinate.
        */
        onNewsLoaded(response: LoaderEvents, event: AnimateLoaderEvent, sender?: EventDispatcher): void;
        /**
        * Gets the singleton instance.
        * @param {Component} parent The parent component of this tab
        * @returns {CanvasTab}
        */
        static getSingleton(parent?: Component): CanvasTab;
        /**
        * Renames a tab and its container
        * @param {string} oldName The old name of the tab
        * @param {string} newName The new name of the tab
        * @returns {TabPair} Returns the tab pair
        */
        renameTab(oldName: string, newName: string): TabPair;
        /**
        * Removes an item from the tab
        * @param val The label text of the tab
        * @param {boolean} dispose Set this to true to clean up the tab
        * @returns {TabPair} The tab pair containing both the label and page <Component>s
        */
        removeTab(val: string, dispose: boolean): TabPair;
        removeTab(val: TabPair, dispose: boolean): TabPair;
        /**
        * When a canvas is modified we change the tab name, canvas name and un-save its tree node.
        */
        onCanvasModified(response: CanvasEvents, event: CanvasEvent, sender?: EventDispatcher): void;
        /**
        * Adds an item to the tab
        * @param {string} text The text of the new tab
        * @param {CanvasTabType} type The type of tab to create
        * @param {any} tabContent Data associated with the tab
        * @returns {TabPair} The tab pair object
        */
        addSpecialTab(text: string, type?: CanvasTabType, tabContent?: any): TabPair;
        currentCanvas: Canvas;
    }
}
declare module Animate {
    /**
    * This small class is used to group property grid elements together
    */
    class PropertyGridGroup extends Component {
        name: string;
        content: JQuery;
        constructor(name: string);
        /**
        * This function is used to clean up the PropertyGridGroup
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * A property editor which edits objects and strings
    */
    class PropTextbox extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: any): void;
    }
}
declare module Animate {
    /**
    * A property editor which edits numbers
    */
    class PropNumber extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: any): void;
    }
}
declare module Animate {
    /**
    * This represents a combo property for booleans that the user can select from a list.
    */
    class PropComboBool extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: any): void;
    }
}
declare module Animate {
    /**
    * This represents a combo property for enums that the user can select from a list.
    */
    class PropComboEnum extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
    }
}
declare module Animate {
    /**
    * An editor which allows a user to select files on the local server.
    */
    class PropFile extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: any): void;
    }
}
declare module Animate {
    class ButtonOptions {
        onWindowShow: (component: Component) => void;
        onWindowClosing: (component: Animate.Component, e: OkCancelFormEvent) => void;
        getValue: () => any;
        constructor(onWindowShow?: (component: Component) => void, onWindowClosing?: (component: Animate.Component, e: OkCancelFormEvent) => void, getValue?: () => any);
    }
    /**
    * An editor which allows a user to click a button, which will popup a window  filled with options
    */
    class PropOptionsWindow extends PropertyGridEditor {
        private static _window;
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Updates the value of the editor object  because a value was edited externally.
        * @param {any} newValue The new value
        * @param {JQuery} editHTML The JQuery that was generated by this editor that needs to be updated because something has updated the value externally.
        */
        update(newValue: any, editHTML: any): void;
    }
}
declare module Animate {
    /**
    * This represents a combo property for assets that the user can select from a list.
    */
    class PropComboGroup extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
    }
}
declare module Animate {
    /**
    * This represents a combo property for assets that the user can select from a list.
    */
    class PropComboAsset extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
    }
}
declare module Animate {
    /**
    * This represents a property for choosing a list of assets
    */
    class PropAssetList extends PropertyGridEditor {
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
    }
}
declare module Animate {
    /**
    * This editor is used to pick colours from a colour dialogue.
    */
    class PropColorPicker extends PropertyGridEditor {
        private mIDs;
        constructor(grid: PropertyGrid);
        /**
        * Called when a property grid is editing an object. The property name, value and type are passed.
        * If this editor can edit the property it returns a valid JQuery object which is responsible for editing
        * the object. The property grid makes no effort to maintain this. It is up to the Editor to watch the JQuery through
        * events to see when its been interacted with. Once its been edited, the editor must notify the grid - to do this
        * call the notify method.
        * @param {string} propertyName The name of the property we are creating an HTML element for
        * @param {any} propertyValue The current value of that property
        * @param {ParameterType} objectType The type of property we need to create
        * @param {any} options Any options associated with the parameter
        * @returns {JQuery} A valid jQuery object or null if this editor does not support this property.
        */
        edit(propertyName: string, propertyValue: any, objectType: ParameterType, options: any): JQuery;
        /**
        * Called when the editor is being added to the DOM
        */
        onAddedToDom(): void;
    }
}
declare module Animate {
    class PropertyGridEvents extends ENUM {
        constructor(v: string);
        static PROPERTY_EDITED: PropertyGridEvents;
    }
    /**
    * A specialised event class for the property grid
    */
    class PropertyGridEvent extends Event {
        propertyName: string;
        id: any;
        propertyValue: any;
        propertyType: ParameterType;
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: string, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: boolean, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        }, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: {
            className?: string;
            selected?: string;
        }, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: {
            choices: Array<string>;
            selected: string;
        }, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        }, type: ParameterType);
        constructor(eventName: PropertyGridEvents, propName: string, id: any, value: any, type: ParameterType);
    }
    class EditableSetToken {
        name: string;
        category: string;
        value: any;
        type: string;
        options: any;
    }
    /**
    * Defines a property grid variable
    */
    class GridVariable {
        name: string;
        type: ParameterType;
        value: any;
        category: string;
        options: any;
        /**
        * Creates a {PropertyGridSet}
        */
        constructor(name: string, value: string, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: boolean, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        }, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: {
            className?: string;
            selected?: string;
        }, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: {
            choices: Array<string>;
            selected: string;
        }, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        }, type: ParameterType, category: string, options?: any);
        constructor(name: string, value: any, type: ParameterType, category: string, options?: any);
        /** Cleans up the class */
        dispose(): void;
    }
    /**
    * Defines a set of variables to use in the property grid
    */
    class EditableSet {
        private _variables;
        /**
        * Creates a {PropertyGridSet}
        */
        constructor();
        /** Adds a variable to the set */
        addVar(name: string, value: string, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: boolean, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: {
            min?: number;
            max?: number;
            interval?: number;
            selected?: number;
        }, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: {
            className?: string;
            selected?: string;
        }, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: {
            choices: Array<string>;
            selected: string;
        }, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: {
            extensions?: Array<string>;
            path?: string;
            id?: string;
            selectedExtension?: string;
        }, type: ParameterType, category: string, options: any): void;
        addVar(name: string, value: any, type: ParameterType, category: string, options: any): void;
        /** Gets a variable by name */
        getVar(name: string): GridVariable;
        /** Removes a variable */
        removeVar(variable: GridVariable): void;
        /**
        * Updates a variable with a new value
        *  @returns The value
        */
        updateValue(name: string, value: any): any;
        tokenize(): Array<EditableSetToken>;
        variables: Array<GridVariable>;
    }
    /**
    * A Component that you can use to edit objects. The Property grid will fill itself with Components you can use to edit a given object.
    * Each time the object is modified a <PropertyGrid.PROPERTY_EDITED> events are sent to listeners.
    */
    class PropertyGrid extends Component implements IDockItem {
        private static _singleton;
        private _header;
        private _editors;
        private _editorElements;
        private _idObject;
        private _docker;
        private _groups;
        private _endDiv;
        private _editableObject;
        private _targetPanel;
        private _activePanel;
        constructor(parent: Component);
        /**
        * This is called by a controlling ScreenManager class. An image string needs to be returned
        * which will act as a preview of the component that is being viewed or hidden.
        * @returns <string> The image url
        */
        getPreviewImage(): string;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        */
        getDocker(): Docker;
        /**
        * Each IDock item needs to implement this so that we can keep track of where it moves.
        * @param <object> val
        */
        setDocker(val: Docker): void;
        /**
        * This is called by a controlling Docker class when the component needs to be shown.
        */
        onShow(): void;
        /**
        * This is called by a controlling Docker class when the component needs to be hidden.
        */
        onHide(): void;
        /**
        * When we scroll on either of the scroll panel's we do the same to the other.
        * @param <jQuery> e The jQuery event object
        */
        scroll(e: any): void;
        /**
        * This function is used to update a property value in the property grid.
        * @param {string} name The name of the property
        * @param {any} value The new value of the property
        */
        updateProperty(name: string, value: any): void;
        /**
        * Sets the object we are going to edit.
        * @param {EditableSet} object The object we are editing. You should ideally create a new object {}, and then
        * use the function pGridEditble to create valid property grid variables.
        * @param {string} name The name of the object we are editing
        * @param {string} id You can give an ID to help identify this item once its edited.
        * @param {string} img An optional image string
        * @returns {any} Returns the object we are currently editing
        */
        editableObject(object: EditableSet, name: string, id?: any, img?: string): EditableSet;
        /**
        * Called when a property has been updated. This will inturn get the event <PropertyGrid.PROPERTY_EDITED> dispatched.
        * @param <string> name The name of the property
        * @param <object> value The new value of the property
        * @param <string> type The propert type
        */
        propUpdated(name: string, value: any, type: ParameterType): void;
        /**
        * called when we reset the project
        * @returns <object>
        */
        projectReset(): void;
        /**
        * Add a new editor to the property grid.
        * @param {PropertyGridEditor} editor The PropertyGridEditor object to add
        * @returns {PropertyGridEditor}
        */
        addEditor(editor: PropertyGridEditor): PropertyGridEditor;
        /**
        * Removes an editor from the property grid.
        * @param {PropertyGridEditor} editor The PropertyGridEditor object to remove.
        * @returns {PropertyGridEditor} The editor or null
        */
        removeEditor(editor: PropertyGridEditor): PropertyGridEditor;
        /**
        * This will cleanup the component.
        */
        dispose(): void;
        /**
        * Gets the singleton instance.
        * @returns <PropertyGrid>
        */
        static getSingleton(parent?: Component): PropertyGrid;
        currentObject: any;
        idObject: any;
    }
}
declare module Animate {
    /** A very simple class to represent tool bar buttons */
    class ToolBarButton extends Component {
        private _radioMode;
        private _pushButton;
        private _proxyDown;
        constructor(text: string, image: string, pushButton?: boolean, parent?: Component);
        /** Cleans up the button */
        dispose(): void;
        onClick(e: any): void;
        /**
        * Get if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        /**
        * Set if the component is selected. When set to true a css class of 'selected' is added to the {Component}
        */
        selected: boolean;
        /**
        * If true, the button will act like a radio button. It will deselect any other ToolBarButtons in its parent when its selected.
        */
        radioMode: boolean;
    }
}
declare module Animate {
    class ToolbarNumberEvents extends ENUM {
        constructor(v: string);
        static CHANGED: ToolbarNumberEvents;
    }
    class ToolbarNumberEvent extends Event {
        value: number;
        constructor(e: ToolbarNumberEvents, value: number);
    }
    /**
    *  A toolbar button for numbers
    */
    class ToolbarNumber extends Component {
        private static input;
        private static numInstances;
        private defaultVal;
        private minValue;
        private maxValue;
        private delta;
        private startPos;
        private label;
        private leftArrow;
        private rightArrow;
        private stageUpPoxy;
        private stageMovePoxy;
        private downProxy;
        private clickProxy;
        private wheelProxy;
        private keyProxy;
        /**
        * @param {Component} parent The parent of this toolbar
        */
        constructor(parent: Component, text: string, defaultVal: number, minValue: number, maxValue: number, delta?: number);
        /**
        * Called when the mouse is down on the DOM
        * @param <object> e The jQuery event
        */
        onStageUp(e: any): void;
        /**
        * Called when we move on the stage
        * @param <object> e The jQuery event
        */
        onStageMove(e: any): void;
        /**
        * Set or get the value
        * @param {number} val The value we are setting
        */
        /**
        * Set or get the value
        * @param {number} val The value we are setting
        */
        value: number;
        onWheel(event: any, delta: any, deltaX: any, deltaY: any): void;
        onKeyDown(e: any): void;
        onDown(e: any): void;
        onClick(e: any): void;
        /**
        * Cleans up the component
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    *  Use this tool bar button to pick a colour.
    */
    class ToolbarColorPicker extends Component {
        private numberInput;
        private picker;
        constructor(parent: Component, text: string, color: string);
        /**
        * Gets or sets the colour of the toolbar button
        */
        /**
        * Gets or sets the colour of the toolbar button
        */
        color: number;
        /**
        * Disposes of and cleans up this button
        */
        dispose(): void;
    }
}
declare module Animate {
    /**
    * The interface for all layout objects.
    */
    class ToolbarItem extends Component {
        text: String;
        img: String;
        /**
        * @param {string} img The image path.
        * @param {string} text The text to use in the item.
        */
        constructor(img: string, text: string, parent?: Component);
    }
    class ToolbarDropDownEvent extends Event {
        item: ToolbarItem;
        constructor(item: ToolbarItem, e: EventType);
        dispose(): void;
    }
    /**
    *  A toolbar button for selection a list of options
    */
    class ToolbarDropDown extends Component {
        items: Array<ToolbarItem>;
        private _popupContainer;
        private _selectedItem;
        private _clickProxy;
        private _stageDownProxy;
        /**
        * @param {Component} parent The parent of this toolbar
        * @param {Array<ToolbarItem>} items An array of items to list e.g. [{img:"./img1.png", text:"option 1"}, {img:"./img2.png", text:"option 2"}]
        */
        constructor(parent: Component, items: Array<ToolbarItem>);
        /**
        * Adds an item the drop down. The item must be an object with both img and text vars. eg: { img:"", text:"" }
        * @param {ToolbarItem} item The item to add.
        * @returns {Component}
        */
        addItem(item: ToolbarItem): IComponent;
        /**
        * Adds an item the drop down. The item must be an object with both img and text vars. eg: { img:"", text:"" }
        * @param {any} val This can be either the item object itself, its text or its component.
        * @param {boolean} dispose Set this to true if you want delete the item
        * @returns {Component} Returns the removed item component or null
        */
        removeItem(val: any, dispose?: boolean): any;
        /**
        * Clears all the items
        * @param {boolean} dispose Set this to true if you want to delete all the items from memory
        */
        clear(dispose?: boolean): void;
        /**
        * Gets the selected item
        * @returns {ToolbarItem}
        */
        /**
        * Sets the selected item
        * @param {any} item
        */
        selectedItem: ToolbarItem;
        /**
        * Called when the mouse is down on the DOM
        * @param {any} e The jQuery event
        */
        onStageUp(e: any): void;
        /**
        * When we click the main button
        * @param {any} e The jQuery event oject
        */
        onClick(e: any): void;
        /**
        * Cleans up the component
        */
        dispose(): void;
    }
}
declare module Animate {
    class OkCancelFormEvents extends ENUM {
        constructor(v: string);
        static CONFIRM: OkCancelFormEvents;
    }
    class OkCancelFormEvent extends Event {
        text: string;
        cancel: boolean;
        constructor(eventName: OkCancelFormEvents, text: string);
    }
    /**
    * A simple form which holds a heading, content and OK / Cancel buttons.
    */
    class OkCancelForm extends Window {
        okCancelContent: Component;
        private mButtonContainer;
        private mOk;
        private mCancel;
        private keyProxy;
        /**
        * @param {number} width The width of the form
        * @param {number} height The height of the form
        * @param {boolean} autoCenter Should this window center itself on a resize event
        * @param {boolean} controlBox Does this window have a draggable title bar and close button
        * @param {string} title The text for window heading. Only applicable if we are using a control box.
        */
        constructor(width?: number, height?: number, autoCenter?: boolean, controlBox?: boolean, title?: string, hideCancel?: boolean);
        /**
        * When we click on the close button
        * @param {any} e The jQuery event object
        */
        onCloseClicked(e: any): void;
        /**
        * Called when we click one of the buttons. This will dispatch the event OkCancelForm.CONFIRM
        * and pass the text either for the ok or cancel buttons.
        * @param {any} e The jQuery event
        */
        OnButtonClick(e: any): void;
        /**
        * Hides the window
        */
        hide(): void;
        /**
        * This function is used to cleanup the object before its removed from memory.
        */
        dispose(): void;
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} parent The parent Component we are adding this window to
        * @param {number} x The x coordinate of the window
        * @param {number} y The y coordinate of the window
        * @param {boolean} isModal Does this window block all other user operations?
        * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
        */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * Catch the key down events.
        * @param {any} e The jQuery event object
        */
        onKeyDown(e: any): void;
    }
}
declare module Animate {
    /**
    * Use this form to set the project meta and update build versions.
    */
    class BuildOptionsForm extends Window {
        static _singleton: BuildOptionsForm;
        private _projectElm;
        private _buildElm;
        private _userElm;
        private $user;
        private $project;
        private $projectToken;
        private $errorMsg;
        private $errorMsgImg;
        private $loading;
        private $loadingPercent;
        private _tab;
        private _buildVerMaj;
        private _buildVerMid;
        private _buildVerMin;
        private _visibility;
        private _notes;
        private _selectBuild;
        private _saveBuild;
        private _renameProxy;
        private _buildProxy;
        private _clickProxy;
        private _settingPages;
        constructor();
        /**
        * Opens the file viewer and lets the user pick an image for their avatar
        */
        pickAvatar(): void;
        /**
        * Opens the file viewer and lets the user pick an image for their project
        */
        pickProjectPick(): void;
        /**
        * Attempts to update the project
        */
        updateDetails(token: Engine.IPlugin): void;
        /**
        * Given a form element, we look at if it has an error and based on the expression. If there is we set the error message
        * @param {EngineForm} The form to check.
        * @param {boolean} True if there is an error
        */
        reportError(form: NodeForm): boolean;
        /**
        * Updates the user bio information
        * @param {string} bio The new bio data
        */
        updateBio(bio: string): void;
        /**
        * Called when we click on the settings tab
        * @param {any} event
        * @param {any} data
        */
        onTab(response: TabEvents, event: TabEvent, sender?: EventDispatcher): void;
        /**
        * Use this function to add a new settings page to the settings menu
        * @param {ISettingsPage} component The ISettingsPage component we're adding
        */
        addSettingPage(component: ISettingsPage): void;
        /**
        * When we click one of the buttons
        * @param {any} e
        * @returns {any}
        */
        onClick(e: any): void;
        /**
        * Catch the key down events.
        * @param {any} e The jQuery event object
        */
        onKeyDown(e: any): void;
        /**
        * When we recieve the server call for build requests
        * @param {ProjectEvents} event
        * @param {Event} data
        */
        onBuildResponse(response: ProjectEvents, event: ProjectEvent): void;
        /**
        * Updates some of the version fields with data
        * @param {Build} data
        */
        updateFields(data: Build): void;
        /**
        * When we recieve the server call for saving project data.
        * @param {UserEvents} event
        * @param {UserEvent} data
        */
        /**
        * Shows the build options form
        * @returns {any}
        */
        show(): void;
        /**
        * Use this function to print a message on the settings screen.
        * @param {string} message The message to print
        * @param <bool> isError Should this be styled to an error or not
        */
        /**
        * Gets the singleton instance.
        * @returns {BuildOptionsForm}
        */
        static getSingleton(): BuildOptionsForm;
    }
}
declare module Animate {
    /**
    * An event to deal with file viewer events
    * The event type can be 'cancelled' or 'change'
    */
    class FileViewerEvent extends Event {
        file: Engine.IFile;
        constructor(type: string, file: Engine.IFile);
    }
    /**
    * Defines which types of files to search through
    */
    enum FileSearchType {
        Global = 0,
        User = 1,
        Project = 2,
    }
    /**
    * This form is used to load and select assets.
    */
    class FileViewer extends Window {
        private static _singleton;
        private _browserElm;
        private _searchType;
        private _shiftkey;
        private _cancelled;
        private $pager;
        private $selectedFile;
        private $loading;
        private $errorMsg;
        private $search;
        private $entries;
        private $folders;
        private $confirmDelete;
        private $newFolder;
        private $editMode;
        private $fileToken;
        private $uploader;
        private $onlyFavourites;
        extensions: Array<string>;
        selectedEntities: Array<UsersInterface.IFileEntry>;
        selectedEntity: Engine.IFile;
        selectedFolder: string;
        multiSelect: boolean;
        /**
        * Creates an instance of the file uploader form
        */
        constructor();
        /**
        * Returns a URL of a file preview image
        * @returns {string}
        */
        getThumbnail(file: Engine.IFile): string;
        /**
        * Specifies the type of file search
        */
        selectMode(type: FileSearchType): void;
        /**
        * Attempts to open a folder
        */
        openFolder(folder: string): void;
        /**
        * Creates a new folder
        */
        newFolder(): Element;
        /**
        * Shows / Hides the delete buttons
        */
        confirmDelete(): void;
        /**
        * Called in the HTML once a file is clicked and we need to get a preview of it
        * @param {IFile} file The file to preview
        */
        getPreview(file: Engine.IFile): void;
        /**
        * Sets the selected status of a file or folder
        */
        selectEntity(entity: any): void;
        /**
        * Removes the window and modal from the DOM.
        */
        hide(): void;
        /**
        * Called whenever we select a file
        */
        fileChosen(file: Engine.IFile): void;
        /**
        * Removes the selected entities
        */
        removeEntities(): void;
        updateContent(index: number, limit: number): void;
        /**
        * Called when we are dragging over the item
        */
        onDragOver(e: any): void;
        /**
        * Called when we are no longer dragging items.
        */
        onDragLeave(e: any): void;
        /**
        * Checks if a file list has approved extensions
        * @return {boolean}
        */
        checkIfAllowed(files: FileList): boolean;
        /**
        * Makes sure we only view the file types specified in the exension array
        */
        filterByExtensions(): Array<Engine.IFile>;
        /**
        * Called when we are no longer dragging items.
        */
        onDrop(e: JQueryEventObject): boolean;
        /**
        * Attempts to upload an image or canvas to the users asset directory and set the upload as a file's preview
        * @param {Engine.IFile} file The target file we are setting the preview for
        * @param {HTMLCanvasElement | HTMLImageElement} preview The image we are using as a preview
        */
        uploadPreview(file: Engine.IFile, preview: HTMLCanvasElement | HTMLImageElement): void;
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} parent The parent Component we are adding this window to
        * @param {number} x The x coordinate of the window
        * @param {number} y The y coordinate of the window
        * @param {boolean} isModal Does this window block all other user operations?
        * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
        */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * Use this function to show the file viewer and listen for when the user has selected a file
        */
        choose(extensions: string | Array<string>): JQueryPromise<Engine.IFile>;
        /**
        * Attempts to update the selected file
        * @param {IFile} token The file token to update with
        */
        updateFile(token: Engine.IFile): void;
        /**
        * Gets the singleton instance.
        * @returns {FileViewer}
        */
        static get: FileViewer;
    }
}
declare module Animate {
    /**
    * A window to show a blocking window with a message to the user.
    */
    class MessageBox extends Window {
        private static _singleton;
        private $message;
        private $buttons;
        private _handle;
        private _callback;
        private _context;
        constructor();
        /**
        * Hide the window when ok is clicked.
        * @param {any} e The jQuery event object
        */
        onButtonClick(e: MouseEvent, button: string): void;
        /**
        * When the window resizes we make sure the component is centered
        * @param {any} e The jQuery event object
        */
        onResize(e: any): void;
        /**
        * Static function to show the message box
        * @param {string} caption The caption of the window
        * @param {Array<string>} buttons An array of strings which act as the forms buttons
        * @param { ( text : string ) => void} callback A function to call when a button is clicked
        * @param {any} context The function context (ie the caller object)
        */
        static show(caption: string, buttons?: Array<string>, callback?: (text: string) => void, context?: any): void;
        /**
        * Gets the message box singleton
        * @returns {MessageBox}
        */
        static getSingleton(): MessageBox;
    }
}
declare module Animate {
    /**
    * This form is used to create or edit Portals.
    */
    class PortalForm extends OkCancelForm {
        private static _singleton;
        private _typeCombo;
        private _assetClassCombo;
        private _assetType;
        private _name;
        private _type;
        private _warning;
        private _portalType;
        private _item;
        private _value;
        constructor();
        /** When the type combo is selected*/
        onTypeSelect(responce: ListEvents, event: ListEvent): void;
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} item The item we are editing
        * @param {PortalType} type The items current portal type
        * @param {string} caption The caption of the form
        */
        showForm(item: Portal, type: PortalType, caption: string): any;
        showForm(item: Behaviour, type: PortalType, caption: string): any;
        showForm(item: Canvas, type: PortalType, caption: string): any;
        /**Called when we click one of the buttons. This will dispatch the event OkCancelForm.CONFIRM
        and pass the text either for the ok or cancel buttons. */
        OnButtonClick(e: any): void;
        name: string;
        portalType: PortalType;
        value: any;
        parameterType: ParameterType;
        /** Gets the singleton instance. */
        static getSingleton(): PortalForm;
    }
}
declare module Animate {
    interface IRenameToken {
        newName: string;
        oldName: string;
        object: IRenamable;
        cancelled: boolean;
    }
    interface IRenamable {
        name?: string;
    }
    /**
    * Event used to describe re-naming of objects. Listen for either
    * 'renaming' or 'renamed' event types
    */
    class RenameFormEvent extends Event {
        cancel: boolean;
        name: string;
        oldName: string;
        object: IRenamable;
        reason: string;
        resourceType: ResourceType;
        constructor(type: string, name: string, oldName: string, object: IRenamable, rt: ResourceType);
    }
    /**
    * This form is used to rename objects
    */
    class RenameForm extends Window {
        private static _singleton;
        private object;
        $errorMsg: string;
        private $loading;
        private $name;
        private _projectElm;
        private _resourceId;
        private _type;
        private _fromOk;
        constructor();
        hide(): void;
        /**
         * Shows the window by adding it to a parent.
         * @param {Component} parent The parent Component we are adding this window to
         * @param {number} x The x coordinate of the window
         * @param {number} y The y coordinate of the window
         * @param {boolean} isModal Does this window block all other user operations?
         * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
         */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * Attempts to rename an object
        * @param {IRenamable} object
        * @extends {RenameForm}
        */
        renameObject(object: IRenamable, id: string, type: ResourceType): Promise<IRenameToken>;
        /**
        * @type public mfunc OnButtonClick
        * Called when we click one of the buttons. This will dispatch the event OkCancelForm.CONFIRM
        * and pass the text either for the ok or cancel buttons.
        * @param {any} e
        * @extends {RenameForm}
        */
        ok(): any;
        /**
        * Gets the singleton instance.
        * @returns {RenameForm}
        */
        static get: RenameForm;
    }
}
declare module Animate {
    class UserPrivilegesForm extends Window {
        private static _singleton;
        private mSave;
        private search;
        private mMenu;
        private keyDownProxy;
        private buttonProxy;
        constructor();
        /**
        * This function is called whenever we get a resonse from the server
        */
        onServer(response: LoaderEvents, event: AnimateLoaderEvent, sender?: EventDispatcher): void;
        /**
        * Gets the viewer to search using the terms in the search inut
        */
        searchItems(): void;
        /**
        * When we click a button on the form
        * @param {any} e The jQuery event object
        */
        onButtonClick(e: any): void;
        /**
        * When we hit a key on the search box
        * @param {any} e The jQuery event
        */
        onInputKey(e: any): void;
        /**
        * Shows the window by adding it to a Application route.
        */
        show(): void;
        /**
        * Gets the singleton reference of this class.
        * @returns {UserPrivilegesForm}
        */
        static getSingleton(): UserPrivilegesForm;
    }
}
declare module Animate {
    class BehaviourPickerEvents extends ENUM {
        constructor(v: string);
        static BEHAVIOUR_PICKED: BehaviourPickerEvents;
    }
    class BehaviourPickerEvent extends Event {
        behaviourName: string;
        constructor(eventName: BehaviourPickerEvents, behaviourName: string);
    }
    class BehaviourPicker extends Window {
        private static _singleton;
        private _input;
        private _list;
        private _X;
        private _Y;
        constructor();
        /**
        * Shows the window by adding it to a parent.
        * @param {Component} parent The parent Component we are adding this window to
        * @param {number} x The x coordinate of the window
        * @param {number} y The y coordinate of the window
        * @param {boolean} isModal Does this window block all other user operations?
        * @param {boolean} isPopup If the window is popup it will close whenever anything outside the window is clicked
        */
        show(parent?: Component, x?: number, y?: number, isModal?: boolean, isPopup?: boolean): void;
        /**
        * Called when we click the list.
        * @param {any} e
        * @returns {any}
        */
        onListClick(e: any): void;
        /**
        * Called when we double click the list.
        * @param {any} e
        * @returns {any}
        */
        onListDClick(e: any): void;
        /**
        * When the input text changes we go through each list item
        * and select it.
        * @param {any} e
        * @returns {any}
        */
        onKeyDown(e: any): void;
        /**
        * Gets the singleton instance.
        * @returns {BehaviourPicker}
        */
        static getSingleton(): BehaviourPicker;
        list: List;
    }
}
declare module Animate {
    /**
    * The main toolbar that sits at the top of the application
    */
    class Toolbar extends Component {
        private static _singleton;
        private _mainElm;
        private $itemSelected;
        private _topMenu;
        private _bottomMenu;
        private _tabHomeContainer;
        private _currentContainer;
        private _currentTab;
        private _copyPasteToken;
        constructor(parent?: Component);
        /**
        * This is called when an item on the canvas has been selected
        * @param {Component} item
        */
        itemSelected(item: Component): void;
        /**
        * This is called when we have loaded and initialized a new project.
        */
        newProject(project: Project): void;
        /**
        * Called when we click one of the top toolbar tabs.
        * @param {any} e
        */
        onMajorTab(e: any): void;
        /**
        * Opens the splash window
        */
        onHome(): void;
        /**
        * Opens the user privileges window
        */
        onShowPrivileges(): void;
        /**
        * Notifys the app that its about to launch a test run
        */
        onRun(): void;
        /**
        * When we click the paste button
        */
        onPaste(): void;
        /**
        * When we click the copy button
        */
        onDuplicate(cut?: boolean): void;
        /**
        * Shows the rename form - and creates a new behaviour if valid
        */
        newContainer(): void;
        /**
        * When we click the delete button
        */
        onDelete(): void;
        /**
        * This function is used to create a new group on the toolbar
        * @param {string} text The text of the new tab
        * @param {boolean} text The text of the new tab
        * @returns {Component} Returns the {Component} object representing the tab
        */
        createTab(text: string, isSelected?: boolean): Component;
        saveAll(): void;
        /**
        * Called when the key is pushed down
        * @param {any} event
        */
        onKeyDown(event: any): boolean;
        /**
        * Removes a tab by its name
        * @param {string} text The name of the tab
        */
        removeTab(text: string): void;
        /**
        * This function is used to create a new group on the toolbar
        * @param {Component} tab The {Component} tab object which represents the parent of this group.
        * @returns {Component} Returns the {Component} object representing the group
        */
        createGroup(tab: Component): Component;
        /**
        * Use this function to create a group button for the toolbar
        * @param {string} text The text for the button
        * @param {number} min The minimum limit
        * @param {number} max The maximum limit
        * @param {number} delta The incremental difference when scrolling
        * @param {Component} group The Component object representing the group
        * @returns {ToolbarNumber}
        */
        createGroupNumber(text: string, defaultVal: number, min?: number, max?: number, delta?: number, group?: Component): ToolbarNumber;
        /**
        * Use this function to create a group button for the toolbar
        * @param {string} text The text for the button
        * @param {string} image An image URL for the button icon
        * @param {Component} group The Component object representing the group
        * @param {boolean} isPushButton If true, the button will remain selected when clicked.
        * @returns {Component} Returns the Component object representing the button
        */
        createGroupButton(text: string, image?: string, group?: Component, isPushButton?: boolean): ToolBarButton;
        /**
        * Use this function to create a group button for the toolbar
        * @param {Component} parent The parent that will contain the drop down
        * @param {Array<ToolbarItem>} items An array of items to list
        * @returns {ToolbarDropDown} Returns the Component object representing the button
        */
        createDropDownButton(parent: Component, items: Array<ToolbarItem>): ToolbarDropDown;
        /**
        * Use this function to create a group button for the toolbar
        * @param {Component} parent The parent that will contain the drop down
        * @param {string} text The under the button
        * @param {string} color The hex colour as a string
        * @returns {ToolbarColorPicker} Returns the ToolbarColorPicker object representing the button
        */
        createColorButton(parent: Component, text: string, color: string): ToolbarColorPicker;
        /**
        * Gets the singleton instance
        */
        static getSingleton(parent?: Component): Toolbar;
    }
}
declare module Animate {
    /**
    * The splash screen when starting the app
    */
    class Splash {
        private static _singleton;
        private _splashElm;
        private _loginElm;
        private _welcomeElm;
        private _newProject;
        private _loadingProject;
        private _app;
        private _captureInitialized;
        private $user;
        private $theme;
        private $activePane;
        private $errorMsg;
        private $errorRed;
        private $loading;
        private $projects;
        private $plugins;
        private $selectedPlugins;
        private $selectedProject;
        private $selectedPlugin;
        private $pager;
        /**
        * Creates an instance of the splash screen
        */
        constructor(app: Application);
        show(): void;
        splashDimensions(): any;
        goState(state: string, digest?: boolean): void;
        removeProject(messageBoxAnswer: string): void;
        openProject(project: Engine.IProject): void;
        /**
        * Attempts to load the project and setup the scene
        */
        loadScene(): void;
        fetchProjects(index: number, limit: number): void;
        selectProject(project: Engine.IProject): void;
        selectPlugin(plugin: Engine.IPlugin): void;
        showVersions(plugin: Engine.IPlugin): void;
        isPluginSelected(plugin: any): boolean;
        reset(): void;
        /**
        * Given a form element, we look at if it has an error and based on the expression. If there is we set
        * the login error message
        * @param {EngineForm} The form to check.
        * @param {boolean} True if there is an error
        */
        reportError(form: NodeForm): boolean;
        /**
        * Creates a new user project
        * @param {EngineForm} The form to check.
        * @param {boolean} True if there is an error
        */
        newProject(name: string, description: string, plugins: Array<Engine.IPlugin>): void;
        loginError(err: Error): void;
        loginSuccess(data: UsersInterface.IResponse): void;
        /**
        * Attempts to log the user in
        * @param {string} user The username
        * @param {string} password The user password
        * @param {boolean} remember Should the user cookie be saved
        */
        login(user: string, password: string, remember: boolean): void;
        /**
        * Attempts to register a new user
        * @param {string} user The username of the user.
        * @param {string} password The password of the user.
        * @param {string} email The email of the user.
        * @param {string} captcha The captcha of the login screen
        * @param {string} captha_challenge The captha_challenge of the login screen
        */
        register(user: string, password: string, email: string, captcha: string, challenge: string): void;
        /**
        * Attempts to resend the activation code
        * @param {string} user The username or email of the user to resend the activation
        */
        resendActivation(user: string): void;
        /**
        * Attempts to reset the users password
        * @param {string} user The username or email of the user to resend the activation
        */
        resetPassword(user: string): void;
        /**
        * Attempts to resend the activation code
        */
        logout(): void;
        /**
        * Initializes the spash screen
        * @returns {Splash}
        */
        static init(app: Application): Splash;
        /**
        * Gets the singleton reference of this class.
        * @returns {Splash}
        */
        static get: Splash;
    }
}
declare var _users: string;
declare var _cache: string;
declare var __plugins: {
    [name: string]: Array<Engine.IPlugin>;
};
declare var __newPlugin: Animate.IPlugin;
/**
* Goes through each of the plugins and returns the one with the matching ID
* @param {string} id The ID of the plugin to fetch
*/
declare function getPluginByID(id: string): Engine.IPlugin;
/**
* Once the plugins are loaded from the DB
* @param {Array<Engine.IPlugin>} plugins
*/
declare function onPluginsLoaded(plugins: Array<Engine.IPlugin>): void;
/**
* Returns a formatted byte string
* @returns {string}
*/
declare function byteFilter(bytes: any, precision?: number): string;
declare module Animate {
    type ProgressCallback = (percent: number) => void;
    type CompleteCallback = (err?: Error, files?: Array<UsersInterface.IUploadToken>) => void;
    class FileUploader {
        private _dCount;
        private _downloads;
        percent: number;
        private _onProg;
        private _onComplete;
        constructor(onProg?: ProgressCallback, onComp?: CompleteCallback);
        numDownloads: number;
        uploadFile(file: File, meta?: any, parentFile?: string): void;
        upload2DElement(img: HTMLImageElement | HTMLCanvasElement, name: string, meta?: Engine.IFileMeta, parentFile?: string): void;
        uploadArrayBuffer(array: ArrayBuffer, name: string, meta?: any, parentFile?: string): void;
        uploadTextAsFile(text: string, name: string, meta?: any, parentFile?: string): void;
        upload(form: FormData, url: string, identifier: string, parentFile?: string): void;
    }
}
