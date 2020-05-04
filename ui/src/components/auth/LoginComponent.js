import React from 'react';
import AuthService from './AuthService';
import './SigninForm.css'

class LoginComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: '',
        }
        this.login = this.login.bind(this);
    }

    componentDidMount() {
        localStorage.clear();
    }

    login = (e) => {
        e.preventDefault();
        const credentials = {username: this.state.username, password: this.state.password};
        AuthService.login(credentials).then(res => {
            if (res.status === 200) {
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                console.log("Success" + localStorage.getItem("userInfo"))
                this.props.history.push('/');
            } else {
                this.setState({message: res.data.message});
            }
        });
    };

    onChange = (e) =>
        this.setState({[e.target.name]: e.target.value});

    render() {
        return (
                <div className="text-center">
                    <form className="form-signin">
                        <h1 className="h3 mb-3 font-weight-normal">Авторизация</h1>
                        <label htmlFor="inputEmail" className="sr-only">Логин</label>
                        <input type="email" id="username" name="username" className="form-control" placeholder="Логин"
                               required autoFocus value={this.state.username} onChange={this.onChange}/>
                        <label htmlFor="inputPassword" className="sr-only">Пароль</label>
                        <input type="password" id="password" name="password" className="form-control" placeholder="Пароль"
                               required value={this.state.password} onChange={this.onChange}/>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.login}>Войти
                        </button>
                    </form>
                </div>
        )
    }

}

export default LoginComponent;