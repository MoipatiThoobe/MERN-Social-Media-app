import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
//import { GoogleLogin } from 'react-google-login';
//import Icon from './icon';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from "./styles";
import Input from './Input';
import { signin, signup } from '../../actions/auth';

const intialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(intialState)
    const dispatch = useDispatch();
    const handleShowPassword = () => setShowPassword(!showPassword);
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if(isSignUp){
            dispatch(signup(formData, history))

        } else{
            dispatch(signin(formData, history))

        }

    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })


    };
    
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    /*const googleSuccess = async (res) =>{
        console.log(res);

    }

    const googleError = (error) => {
        console.log(error);
        console.log('Google Sign In was unsucessful. Try Again');
    }*/


  return (
    <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp && (
                            <>
                                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                                <Input name="lastName" label="Last Name" handleChange={handleChange} half/>
                            </>
                        )}
                        <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
                        <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? "text" : "password"} handleShowPassword={handleShowPassword}/>
                        { isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password"/> }
                </Grid>
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Button>
                {/*<GoogleLogin
                            clientId="106139478757-ohtb9boka7lu6144dubjiobmk9c5i4i5.apps.googleusercontent.com"
                            render={(renderProps) => (
                            <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                                Google Sign In
                            </Button>
                            )}
                            onSuccess={googleSuccess}
                            onFailure={googleError}
                            cookiePolicy="single_host_origin"
                            />*/}
                <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Button onClick={switchMode}>
                            { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                        </Button>
                        
                    </Grid>
                </Grid>

            </form>
        </Paper>
    </Container>
  )
}

export default Auth
