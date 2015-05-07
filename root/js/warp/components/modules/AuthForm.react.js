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
				<div className="note">E-mail:</div>
				<input type="text" ref="emailInput" />

				<div className="note">Пароль:</div>
				<input type="password" ref="passInput" />

				<div className="note">Имя:</div>
				<input type="text" ref="firstNameInput" />

				<div className="note">Фамилия:</div>
				<input type="text" ref="lastNameInput" />

				<button onClick={this.handleRes}>Зарегистрироваться</button>
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
							<div className="note">E-mail:</div>
							<input autoComplete="on" type="text" name="email" />

							<div className="note">Пароль:</div>
							<input type="password" name="password" />

							{this.state.auth_error ? <div className='error'>Ошибка авторизации</div> : null}
							<input type='submit' value='Войти' />
						</form>
					</div>	
					
		)
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
				<div className='black-flow' onClick={this.closeForm}></div> 
				<div className ='sign-in-div'>
					<div className='auth-title' onClick={this.handeSign}>{this.state.signTitle}</div><div className='auth-title close-btn' onClick={this.closeForm}>Закрыть</div>
					{this.state.sign == 'in' ? <SignIn />:<SignUp />}
				</div>
			</div>	
			
		)
	}
});

module.exports = AuthForm;