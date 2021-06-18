import './index.css';
import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Auth extends React.Component{

    constructor(props){
        super(props);
        // this.state = {passvisb: true,email:'',password:'',error:false,isLogedIn: false};
        this.handleClick = this.handleClick.bind(this);
        this.gantiEmail = this.gantiEmail.bind(this);
        this.gantiPass = this.gantiPass.bind(this);
        this.loginHandle = this.loginHandle.bind(this);
        if(localStorage.getItem('user')&&localStorage.getItem('key')){
            // fetch(`${process.env.REACT_APP_APIBASEURL}/api/key?key=${localStorage.getItem('key')}&username=${localStorage.getItem('user')}`)
            // .then(res=>{
            //     if(res.status==201){
            //         console.log('Loged In');
            //         this.state = {passvisb: true,email:'',password:'',error:false,isLogedIn: true};
            //     }else{
            //         localStorage.removeItem('user');
            //         localStorage.removeItem('key');
            //         this.state = {passvisb: true,email:'',password:'',error:false,isLogedIn: false};
            //     }
            // });
            console.log('Loged In');
            this.state = {passvisb: true,email:'',password:'',error:false,isLogedIn: true};
        }else{
            console.log('Not Login');
            this.state = {passvisb: true,email:'',password:'',error:false,isLogedIn: false};
        }
    }

    handleClick() {
        this.setState(prevState => ({
          passvisb: !prevState.passvisb
        }));
    }

    gantiEmail(e){
        this.setState(
            {
                email:e.target.value
            }
        )
    }

    gantiPass(e){
        this.setState(
            {
                password:e.target.value
            }
        )
    }

    loginHandle(e){
        e.preventDefault()
        // cocokkan user pass
        fetch(`${process.env.REACT_APP_APIBASEURL}/api/key`,{
            method:'POST',
            body: JSON.stringify({
                username : this.state.email,
                password : this.state.password
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        }).
        then(res=>{
            console.log(res);
            if(res.ok){
                return res.json();
            }else{
                this.setState({
                    error: true
                })
                console.log('Error');
                return Promise.reject(res);  
            }
        }).then(
            (res)=>{
                console.log(res);
                localStorage.setItem("user",this.state.email);
                localStorage.setItem("key",res.key);
                this.setState({
                    isLogedIn: true
                })
            },
            (err)=>{
                this.setState({
                    error: true
                })
                console.log('error');
            }
        )
    }

    render(){
        if(this.state.isLogedIn){
            return(
                <Redirect to="/dashboard" />
            )
        }else{
            return(
            <div className="content-3-5" style={{fontFamily: "'Poppins', sans-serif"}}>
            <div className="flex flex-col items-center h-full lg:flex-row">
                <div className="relative hidden lg:block h-full width-left">
                <img className="absolute object-fill centered"
                    src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-5.png"
                    alt="" />
                </div>
                <div
                className="flex w-full h-full px-8 width-right sm:px-16 py-32 lg:mx-0 mx-auto items-left justify-left bg-medium-white">
                <div className="w-full sm:w-7/12 md:w-8/12 lg:w-9/12 xl:w-7/12 mx-auto lg:mx-0">
                    <div className="items-center justify-center lg:hidden flex">
                    <img
                        src="http://api.elements.buildwithangga.com/storage/files/2/assets/Empty%20State/EmptyState3/Empty-3-5.png"
                        alt="" />
                    </div>
                    <h3 className="text-3xl font-semibold mb-3">Covid-19 Tracker</h3>
                    <p className="caption leading-7 text-sm">
                    Please log in using that account has<br />
                    registered on the website.
                    </p>
                    {this.state.error
                        ? <p className="bg-red-400 text-white p-2 rounded text-bold my-2 text-center">Incorrect Username or Password</p>
                        : <p></p>
                    }
                    <form onSubmit={this.loginHandle}>
                    <div className="mb-7">
                        <label className="block text-lg font-medium text-label">Username</label>
                        <div className="flex w-full px-5 py-4 mt-3 text-base font-light rounded-xl input">
                        <svg className="mr-4 icon" width="24" height="24" viewBox="-42 0 512 512.002" xmlns="http://www.w3.org/2000/svg"><path fill="#CACBCE" d="m210.351562 246.632812c33.882813 0 63.222657-12.152343 87.195313-36.128906 23.972656-23.972656 36.125-53.304687 36.125-87.191406 0-33.875-12.152344-63.210938-36.128906-87.191406-23.976563-23.96875-53.3125-36.121094-87.191407-36.121094-33.886718 0-63.21875 12.152344-87.191406 36.125s-36.128906 53.308594-36.128906 87.1875c0 33.886719 12.15625 63.222656 36.132812 87.195312 23.976563 23.96875 53.3125 36.125 87.1875 36.125zm0 0"/><path fill="#CACBCE" d="m426.128906 393.703125c-.691406-9.976563-2.089844-20.859375-4.148437-32.351563-2.078125-11.578124-4.753907-22.523437-7.957031-32.527343-3.308594-10.339844-7.808594-20.550781-13.371094-30.335938-5.773438-10.15625-12.554688-19-20.164063-26.277343-7.957031-7.613282-17.699219-13.734376-28.964843-18.199219-11.226563-4.441407-23.667969-6.691407-36.976563-6.691407-5.226563 0-10.28125 2.144532-20.042969 8.5-6.007812 3.917969-13.035156 8.449219-20.878906 13.460938-6.707031 4.273438-15.792969 8.277344-27.015625 11.902344-10.949219 3.542968-22.066406 5.339844-33.039063 5.339844-10.972656 0-22.085937-1.796876-33.046874-5.339844-11.210938-3.621094-20.296876-7.625-26.996094-11.898438-7.769532-4.964844-14.800782-9.496094-20.898438-13.46875-9.75-6.355468-14.808594-8.5-20.035156-8.5-13.3125 0-25.75 2.253906-36.972656 6.699219-11.257813 4.457031-21.003906 10.578125-28.96875 18.199219-7.605469 7.28125-14.390625 16.121094-20.15625 26.273437-5.558594 9.785157-10.058594 19.992188-13.371094 30.339844-3.199219 10.003906-5.875 20.945313-7.953125 32.523437-2.058594 11.476563-3.457031 22.363282-4.148437 32.363282-.679688 9.796875-1.023438 19.964844-1.023438 30.234375 0 26.726562 8.496094 48.363281 25.25 64.320312 16.546875 15.746094 38.441406 23.734375 65.066406 23.734375h246.53125c26.625 0 48.511719-7.984375 65.0625-23.734375 16.757813-15.945312 25.253906-37.585937 25.253906-64.324219-.003906-10.316406-.351562-20.492187-1.035156-30.242187zm0 0"/></svg>
                        <input type="text" name="" value={this.state.email} onChange={this.gantiEmail} id="" placeholder="Your Username"
                            className="w-full focus:outline-none text-base font-light bg-medium-white" autoComplete="true" required />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label className="block text-lg font-medium text-label">Password</label>
                        <div className="flex items-center w-full px-5 py-4 mt-3 text-base font-light rounded-xl input">
                        <svg className="mr-4 icon" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                            d="M7.81592 4.25974C7.12462 5.48872 7 6.95088 7 8H6C4.34315 8 3 9.34315 3 11V19C3 20.6569 4.34315 22 6 22H18C19.6569 22 21 20.6569 21 19V11C21 9.34315 19.6569 8 18 8L17 7.99998C17 6.95087 16.8754 5.48871 16.1841 4.25973C15.829 3.62845 15.3194 3.05012 14.6031 2.63486C13.8875 2.22005 13.021 2 12 2C10.979 2 10.1125 2.22005 9.39691 2.63486C8.68058 3.05012 8.17102 3.62845 7.81592 4.25974ZM9.55908 5.24026C9.12538 6.01128 9 7.04912 9 8H15C15 7.04911 14.8746 6.01129 14.4409 5.24027C14.2335 4.87155 13.9618 4.57488 13.6 4.36514C13.2375 4.15495 12.729 4 12 4C11.271 4 10.7625 4.15495 10.4 4.36514C10.0382 4.57488 9.76648 4.87155 9.55908 5.24026ZM14 14C14 14.7403 13.5978 15.3866 13 15.7324V17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17V15.7324C10.4022 15.3866 10 14.7403 10 14C10 12.8954 10.8954 12 12 12C13.1046 12 14 12.8954 14 14Z"
                            fill="#CACBCE" />
                        </svg>
                        <input type={this.state.passvisb ? 'Password' : 'text'} value={this.password} onChange={this.gantiPass} name="" id="password-content-3-5" placeholder="Your Password" minLength="2"
                            className="w-full focus:outline-none text-base font-light bg-medium-white" required />
                        <div onClick={this.handleClick}>
                            <svg className="cursor-pointer ml-3" width="20" height="14"
                            viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd"
                                d="M0 7C0.555556 4.66667 3.33333 0 10 0C16.6667 0 19.4444 4.66667 20 7C19.4444 9.52778 16.6667 14 10 14C3.31853 14 0.555556 9.13889 0 7ZM10 5C8.89543 5 8 5.89543 8 7C8 8.10457 8.89543 9 10 9C11.1046 9 12 8.10457 12 7C12 6.90536 11.9934 6.81226 11.9807 6.72113C12.2792 6.89828 12.6277 7 13 7C13.3608 7 13.6993 6.90447 13.9915 6.73732C13.9971 6.82415 14 6.91174 14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C10.6389 3 11.2428 3.14979 11.7786 3.41618C11.305 3.78193 11 4.35535 11 5C11 5.09464 11.0066 5.18773 11.0193 5.27887C10.7208 5.10171 10.3723 5 10 5Z"
                                fill="#CACBCE" />
                            </svg>
                        </div>
                        </div>
                    </div>
                    {/* <div className="mt-3 text-right">
                        <a href="#" className="forgot-password text-sm italic">Forgot Password?</a>
                    </div> */}
                    <button type="submit" className="btn-fill block w-full px-4 py-3 mt-9 font-medium text-xl text-white transition duration-500 ease-in-out transform rounded-xl hover:bg-green-800 hover:to-black focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">
                        Log In To My Account
                    </button>
                    {/* <p className="mt-8 text-center text-sm text-foot">
                    Don't have an account yet?
                    <a href="#" className="font-medium hover:underline text-link">Register Here</a>
                    </p> */}
                    </form>
                </div>
                </div>
            </div>
            </div>
            )
        }
    }
}

export default Auth;