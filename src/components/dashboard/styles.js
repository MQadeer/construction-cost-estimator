import { makeStyles } from '@material-ui/core';
const useStyles = makeStyles((theme) => ({
    items: {
        color: "white",
        fontSize: 20,
        '&:hover': {
            backgroundColor: "#01a9b4",
            color:"white",
            textDecoration:"none"

            
        }
    },
    tab: {
        color: "white",
        marginTop:"2%",
        marginLeft:"5%",
        borderRadius: 5,
        
    },
    signinButton:{
        backgroundColor:"#0594a9",
        float:"right",
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