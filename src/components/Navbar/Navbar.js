import React, {useState, useEffect} from 'react'
import { AppBar, Avatar, Typography, Toolbar, Button} from '@material-ui/core'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import memories from '../../images/memories.png'
import headImage from '../../images/memoryLane.jpg'
import useStyles from './style'
import { useDispatch } from 'react-redux'
import decode from 'jwt-decode'


const Navbar = () =>{
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
   
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')))

    const logout = () =>{
        dispatch({type: "LOGOUT"})
        setUser(null)
        navigate('/auth')
    }

    useEffect(() =>{
        const token = user?.token;
        if(token){
            const decodedToken = decode(token)
          
            if(decodedToken.exp * 1000 < new Date().getTime()) {
                console.log('logout')
                logout()
            }
        }

        setUser(JSON.parse(localStorage.getItem('profile')))
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return(
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={headImage} alt="icon" height="45px"/>
                <img className={classes.image} src={memories} alt="icon" height="40px"/>
            </Link>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar