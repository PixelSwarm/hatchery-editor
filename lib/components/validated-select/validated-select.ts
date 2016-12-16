import { JML } from '../../jml/jml';
import { ValidationErrorType } from '../../setup/enums';
import { ValidationError } from '../../core/utils';

/**
 * A wrapper for a select box that adds some simple validation logic
 * e.g.
 *
 * const select = new ValidatedSelect();
 * select.allowEmpty = false;
 * select.options = ['', 'Option 1', 'Option 2']
 * select.value = 'Option 2';
 */
export class ValidatedSelect extends HTMLElement {

    // We keep a reference of value until the element
    // is added to the DOM. This is because you might
    // set the value before the options have been added
    private _value?: string;
    private _options: string[];

    public allowEmpty: boolean;
    public onChange?: ( sender: ValidatedSelect ) => void;
    public onValidationError?: ( sender: ValidatedSelect, error: ValidationError ) => void;
    public onValidationResolved?: ( sender: ValidatedSelect ) => void;

    static get observedAttributes() {
        return [
            'value',
            'allow-empty'
        ];
    }

    /**
     * Creates an instance
     */
    constructor() {
        super();
        this.allowEmpty = false;
        this._options = [];
        this.appendChild( JML.select( {
            onchange: ( e ) => this.onSelectChange( e )
        }) );
    }

    /**
     * If the attributes change we update the internal state
     */
    attributeChangedCallback( name: string, oldValue: string, newValue: string ) {
        switch ( name ) {
            case 'value':
                this[ name ] = newValue;
                break;
            case 'allow-empty':
                this.allowEmpty = newValue === 'true' ? true : false;
                break;
        }
    }

    /**
     * Once the component is added to the DOM we re-evaluate the value value
     * to see if there are options added now that match it
     */
    connectedCallback() {
        if ( this._value !== undefined ) {
            ( this.children[ 0 ] as HTMLSelectElement ).value = this._value;
            this._value = undefined;
        }
    }

    /**
     * Called whenever the value changes
     */
    private onSelectChange( e: Event ) {

        this.pristine = false;
        const wasAnError = this.invalid;
        const select = this.children[ 0 ] as HTMLSelectElement;
        const value = select.value;

        const err = this.validate( value );
        this.invalid = err ? true : false;

        // Call the optional error callbacks
        if ( err && this.onValidationError )
            this.onValidationError( this, err );
        else if ( wasAnError && !err && this.onValidationResolved )
            this.onValidationResolved( this );

        if ( this.onChange )
            this.onChange( this );
    }

    /**
     * Checks the selected option to see if its valid
     */
    private validate( val: string ): ValidationError | null {
        if ( !this.allowEmpty && ( !val || val === '' ) )
            return new ValidationError( 'Selection is required', ValidationErrorType.NOT_EMPTY );

        return null;
    }

    /**
     * Sets if the select is highlighted or not
     */
    set highlight( val: boolean ) {
        this.classList.toggle( 'highlight-error', val );
    }

    /**
     * Gets if the select is highlighted or not
     */
    get highlight(): boolean {
        return this.classList.contains( 'highlight-error' );
    }

    /**
     * Sets if the select is in a pristine state
     */
    set pristine( val: boolean ) {
        this.classList.toggle( 'dirty', !val );
    }

    /**
     * Gets if the select is in a pristine state
     */
    get pristine(): boolean {
        return this.classList.contains( 'dirty' );
    }

    /**
     * Sets if the select is invalid in its current form
     */
    set invalid( val: boolean ) {
        this.classList.toggle( 'invalid', val );
    }

    /**
     * Gets if the select is invalid in its current form
     */
    get invalid(): boolean {
        return this.classList.contains( 'invalid' );
    }

    /**
     * Sets the select value
     */
    set value( val: string ) {
        this._value = val;
        ( this.children[ 0 ] as HTMLSelectElement ).value = val;
    }

    /**
     * Gets the select value
     */
    get value(): string {
        return ( this.children[ 0 ] as HTMLSelectElement ).value;
    }

    /**
     * Gets the options array
     */
    get options(): string[] {
        return this._options;
    }

    /**
     * Sets the options array
     */
    set options( val: string[] ) {
        this._options = val;
        const select = this.children[ 0 ] as HTMLSelectElement;
        for ( const option of this._options )
            select.add( JML.option( { text: option }) );
    }
}