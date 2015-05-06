var React = require('react');
var MainStore = require('../../store/MainStore');
var mainActions = require('../../actions/mainActions');
var Utils = require('../../utils/Utils');


var SignUp = React.createClass({
	handleRes: function(){
		var regData = {
			"email": React.findDOMNode(this.refs.emailInput).value,
			"password" : React.findDOMNode(this.refs.passInput).value,
			"first_name": React.findDOMNode(this.refs.firstNameInput).value,
			"last_name": React.findDOMNode(this.refs.lastNameInput).value
		};
		mainActions.signUp(regData);
	},
	render: function() {
		return(
			<div>
				<span>E-mail:</span>
				<input type="text" ref="emailInput" />

				<span>Пароль:</span>
				<input type="password" ref="passInput" />

				<span>Имя:</span>
				<input type="text" ref="firstNameInput" />

				<span>Фамилия:</span>
				<input type="text" ref="lastNameInput" />

				<div className = 'resBtn' onClick={this.handleRes}>Зарегистрироваться</div>
			</div>

		)
	}
});

function getState() {
    return {
        auth_error: false
    };
}

var SignIn = React.createClass({
	getInitialState: function() {
        return getState();
    },
	handleRes: function(e){
		e.preventDefault();
		var auth_data = {
			"email"	   : e.target.email.value,
			"password" : e.target.password.value,
		};

		var data;

    	Utils.post({
    	    url : 'check_auth',
    	    async :  true,
    	    data: { 'email' : auth_data.email, 'password' : auth_data.password },
    	    success: function(request){
    	    	data = request;
    	    }.bind(this)
    	});

     	if(data.status_code == 0){
    	    e.target.submit();
    	}
    	else{
    	    this.setState({ auth_error: true });
    	}
	},
	render: function() {
		return(
					<div className='sign-in'>
						<form action="/auth" method="post" onSubmit={this.handleRes}>
							<span>E-mail:</span>
							<input autoComplete="on" type="text" name="email" />

							<span>Пароль:</span>
							<input type="password" name="password" />

							{this.state.auth_error ? <span className='error-span'>Ошибка авторизации</span> : null}
							<div className = 'resBtn' onClick={this.handleRes}>Войти</div>
							<input type='submit' value='Войти' />
						</form>
					</div>	
					
		)
	},
    componentDidMount: function() {
    	MainStore.addAuthErrorListener(this.onAuthError);
    },

    componentWillUnmount: function() {
    	MainStore.removeAuthErrorListener(this.onAuthError);
    },

    onAuthError: function() {
    	this.setState(getState());
    }
});

var AuthForm = React.createClass({
	getInitialState: function() {
    	return {
    		sign     : 'in',
    		signTitle: 'Создать аккаунт',
    		resBtn   : 'Войти'
    	};
  	},
  	handeSign: function(){
  		if(this.state.sign == 'in'){
  			this.setState({
	  			sign     : 'up',
	  			signTitle: 'У меня есть аккаунт',
	  			resBtn   : 'Регистрация'
  			});
  		}
  		else{
  			this.setState({
	  			sign     : 'in',
	  			signTitle: 'Создать аккаунт',
	  			resBtn   : 'Войти'
  			});
  		}	
  	},
  	closeForm: function(){
  		mainActions.closeForm();
  	},
	render: function() {
		return(
			<div>
				<div className='black-flow'></div> 
				<div className ='sign-in-div'>
					<span className = 'auth-title' onClick={this.handeSign}>{this.state.signTitle}</span><span className='auth-title close-btn' onClick={this.closeForm}>Закрыть</span>
					{this.state.sign == 'in' ? <SignIn />:<SignUp />}
				</div>
			</div>	
			
		)
	}
});

module.exports = AuthForm;