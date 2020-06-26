import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    items: {
        color: "white",
        fontSize: 20,
        borderRadius: 5,
        '&:hover': {
            backgroundColor: "black",
            color:"white",
            textDecoration:"none"

            
        }
    },
    signinButton:{
        backgroundColor:"#0594a9",
        '&:hover': {
            color:"#0594a9",
            backgroundColor: "white",
        }
    },
    formItems:{
        marginTop:"3%"
    }

}));

export default useStyles