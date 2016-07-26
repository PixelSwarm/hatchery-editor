module Animate
{
    export enum LoginMode {
        LOGIN,
        REGISTER
    }

    export interface ILoginForm
    {
        mode?: LoginMode;
        loading?: boolean;
        logRemember?: boolean;
        logUsername?: string;
        regUsername?: string;
        regEmail?: string;
        regPassword?: string;
        logPassword?: string;
        regCaptcha?: string;
        regChallenge?: string;
        errorMsg?: string;
        error?: boolean;
    }

    export class LoginForm extends React.Component<{ onLogin: () => void }, ILoginForm>
    {
        private _user: User;

        constructor()
        {
            super();
            this._user = User.get;
            this.state = {
                mode : LoginMode.LOGIN,
                loading: false,
                logUsername : "",
                regUsername : "",
                regEmail : "",
                regPassword : "",
                logPassword : "",
                regCaptcha : "",
                regChallenge : "",
                logRemember : false,
                errorMsg : "",
                error : false
            };
        }

        /*
        * General error handler
        */
        loginError(err: Error)
        {
            this.setState({
                loading: false,
                errorMsg: err.message,
                error: true
            });
        }

        /*
        * General success handler
        */
        loginSuccess(data: UsersInterface.IResponse)
        {
            this.setState({
                loading: false,
                errorMsg: data.message,
                error: data.error
            });
        }

        /**
         * Attempts to reset the users password
         */
        resetPassword()
        {
            var that = this;
            if (this.state.logUsername == "")
            {
                return this.setState({
                    error : true,
                    errorMsg: "Please specify a username or email to fetch"
                });
            }

            this.setState({ loading: true });
            this._user.resetPassword(this.state.logUsername)
                .then(this.loginSuccess.bind(that))
                .catch(this.loginError.bind(that));
        }

        /**
         * Attempts to resend the activation code
         */
        resendActivation()
        {
            var user = this.state.logUsername || this.state.regUsername || this.state.regEmail;
            var that = this;

            if (user == "")
            {
                 return this.setState({
                    error : true,
                    errorMsg: "Please specify a username or email to fetch"
                });
            }

            this.setState({ loading: true });
            this._user.resendActivation(user)
                .then(this.loginSuccess.bind(that))
                .catch(this.loginError.bind(that));
        }

        /**
        * Attempts to register a new user
        */
        register( json : any )
        {
            var that = this;
            this.setState({ loading: true });
            this._user.register(this.state.regUsername, this.state.regPassword, this.state.regEmail, this.state.regCaptcha, this.state.regChallenge)
                .then(this.loginSuccess.bind(that))
                .catch(function (err: Error)
                {
                    grecaptcha.reset();
                    this.setState({
                        loading: false,
                        $error: true,
                        $errorMsg: err.message
                    });
                });
        }

        /**
        * Attempts to log the user in
        */
        login( json )
        {
            var that = this;
            this.setState({ loading: true });
            this._user.login(this.state.logUsername, this.state.logPassword, this.state.logRemember)
                .then(function (data)
                {
                    this.setState({
                        loading: false,
                        $errorMsg: data.message,
                        $error: data.error
                    });

                    if (that._user.isLoggedIn)
                        this.props.onLogin();
                })
                .catch(this.loginError.bind(that));
        }

        capitalize( str : string ): string
        {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        mountCaptcha(div : HTMLDivElement)
        {
            if (div && div.childNodes.length == 0)
                grecaptcha.render(div, { theme: "white", sitekey : "6LdiW-USAAAAAGxGfZnQEPP2gDW2NLZ3kSMu3EtT" } );
        }

        render()
        {
            var activePane : JSX.Element;
            if ( this.state.mode == LoginMode.LOGIN )
            {
                activePane = <div className='login animate-all fade-in'>
                    <div className="avatar"><img src="media/blank-user.png" /></div>
                    <VForm name="login"
                        autoComplete="off"
                        onValidationError={(errors, form)=> {
                            this.setState({
                                errorMsg: `${this.capitalize(errors[0].name)} : ${errors[0].error}`,
                                error : true
                             })
                        }}
                        onValidationsResolved={(form)=> {
                            this.setState({ errorMsg: '' })
                        }}
                        onSubmitted={(e, json, form) => {
                            this.login(json);
                        }}>
                        <VInput
                            autoComplete="off"
                            placeholder="Email or Username"
                            autoFocus=""
                            type='text'
                            name="username"
                            id="en-login-username"
                            onChange={(e)=>{ this.setState({ logUsername : (e.target as HTMLInputElement).value })}}
                            value={this.state.logUsername}
                            validator={ValidationType.NOT_EMPTY | ValidationType.ALPHA_EMAIL}
                            />

                        <VInput
                            autoComplete="off"
                            placeholder="Password"
                            autoFocus=""
                            type='password'
                            name="password"
                            id="en-login-password"
                            validator={ValidationType.NOT_EMPTY | ValidationType.ALPHANUMERIC_PLUS}
                            onChange={(e)=>{ this.setState({ logPassword : (e.target as HTMLInputElement).value })}}
                            value={this.state.logPassword}
                            />

                        <a id="forgot-pass" className={(this.state.loading ? 'disabled' : null)}
                            onClick={(e) => this.resetPassword()}>
                            Forgot
                        </a>
                        <div
                            className={
                                ( this.state.error ? 'error ' : '' ) +
                                ( this.state.errorMsg != '' ? 'show-msg ' : '' ) +
                                'label login-msg fade-in animate-slow'}>
                            {this.state.errorMsg}
                        </div>
                        <div className="checkbox">
                            <div className="tick-box" onClick={(e)=>this.setState({logRemember: !this.state.logRemember})}>
                                <div className="tick" style={( !this.state.logRemember ? { display : 'none' } : null )}></div>
                            </div>
                            Remember me
                        </div>
                        <a
                            className={(this.state.loading ? 'disabled' : '')}
                            onClick={(e) => this.resendActivation()}>
                            Resend Activation Email
                        </a>
                        <br />
                        <div className="double-column">
                            <button
                                type="button"
                                className={(this.state.loading ? 'disabled' : '') + " button reg-gradient en-register animate-all"}
                                onClick={(e) => this.setState({ mode : LoginMode.REGISTER })}>
                                Register
                            </button>
                        </div>
                        <div className="double-column">
                            <button type='submit' className={(this.state.loading ? 'disabled' : '') + " button reg-gradient en-login animate-all"}>
                            Login <span className='fa fa-sign-in' />
                            </button>
                        </div>
                    </VForm>
                </div>
            }
            else
            {
                activePane = <div className='login animate-all fade-in'>
                    <VForm
                        name="register"
                        autoComplete="off"
                        onValidationError={(errors, form)=> {
                            this.setState({
                                errorMsg: `${this.capitalize(errors[0].name)} : ${errors[0].error}`,
                                error : true
                            })
                        }}
                        onValidationsResolved={(form)=> {
                            this.setState({ errorMsg: '' })
                        }}
                        onSubmitted={(e, json, form) => {
                            this.register(json)
                        }}>

                        <VInput type='text'
                            placeholder="Username"
                            autoComplete="off"
                            name="username"
                            value={this.state.regUsername}
                            onChange={(e)=>this.setState({regUsername: (e.target as HTMLInputElement).value})}
                            validator={ValidationType.NOT_EMPTY | ValidationType.ALPHANUMERIC_PLUS}
                            id="en-reg-username"
                            />

                        <VInput type='text'
                            placeholder="Email"
                            autoComplete="off"
                            name="email"
                            validator={ValidationType.NOT_EMPTY | ValidationType.EMAIL}
                            value={this.state.regEmail}
                            onChange={(e)=>this.setState({regEmail: (e.target as HTMLInputElement).value})}
                            id="en-reg-email"
                            />

                        <VInput type='password'
                            placeholder="Password"
                            autoComplete="off"
                            name="password"
                            validator={ValidationType.NOT_EMPTY | ValidationType.ALPHANUMERIC_PLUS}
                            value={this.state.regPassword}
                            onChange={(e)=>this.setState({regPassword: (e.target as HTMLInputElement).value})}
                            id="en-reg-password"
                            />
                        <div
                            className={
                                ( this.state.error ? 'error ' : '' ) +
                                ( this.state.errorMsg != '' ? 'show-msg ' : '' ) +
                                'label login-msg fade-in animate-slow'}>
                                {this.state.errorMsg}
                        </div>
                        <div id='animate-captcha' ref={(e) => { this.mountCaptcha(e) }}></div>
                        <div className="double-column">
                            <button
                                type="button"
                                className={(this.state.loading ? 'disabled' : null) + "button reg-gradient en-register animate-all"}
                                onClick={(e) => this.setState({ mode : LoginMode.LOGIN })}>
                                <span className='fa-chevron-left fa' /> Login
                            </button>
                        </div>
                        <div className="double-column">
                            <button type='submit'  className={(this.state.loading ? 'disabled ' : '') + "button reg-gradient en-register animate-all"}>
                                Register
                            </button>
                        </div>
                    </VForm>
                </div>
            }

            return <div id="log-reg">{activePane}</div>;
        }
    }
}