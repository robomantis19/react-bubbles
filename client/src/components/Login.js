import React, {useState} from "react";
import axiosWithAuth from "../utils/axiosWithAuth";


const Login = (props) => {
  const [credentials, setCredentials] = useState({username: "", password: ""})
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [error, setError] = useState();
  const login = e => { 
    e.preventDefault()
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => { 
        console.log('response', res)
        localStorage.setItem('token', res.data.payload);
        props.history.push('/BubblePage');
      
      }).catch(err => { 
        console.log(err); 
        setError("error logging in"); 
      })
      setCredentials({username: "", password: ""})
  }
  const handleChange = (e) => {
    setError("")
    setCredentials({...credentials, [e.target.name]: e.target.value}); 
  }
  return (
    <>      <div>
              <h2 style={{color: 'darkGrey', fontWeight: "bold", marginLeft: `300px`}}>Login</h2>
               
               <form onSubmit={login} style= {{zIndex: `100`, backgroundColor: `#8a2be2`, position: `relative`, left: `200px`, height: `250px`, width: `200px`, display: `flex`, flexDirection: `column`, padding: `35px`}}>
                   <label>Username</label>
                   <input style={{margin: `auto`, width: `120px`}}
                   type = "text"
                   name = "username" 
                   value = {credentials.username}
                   onChange = {handleChange}
                   /> 
                   <label>Password</label>
                   <input style={{margin: `auto`, width: `120px`}}
                   type = "text" 
                   name = "password" 
                   value = {credentials.password}
                   onChange = {handleChange}
                   /> 
                   <button style={{margin: `auto`, width: `80px`, height: `30px`}} >Log in</button>
                   {error}
               </form>
            </div>
    </>
  );
};

export default Login;
