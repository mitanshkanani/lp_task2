
import { Avatar, Box, Grid,IconButton,List,ListItem,ListItemAvatar,ListItemSecondaryAction,ListItemText,Paper,TextField, Typography} from '@mui/material';


import React, { useState } from 'react';
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { green, red } from '@mui/material/colors';

export default function Formcomp() {

    // const classes=usestyles()
    const [inputData,setInputData]=useState("");
    const [inputerror,setInputerror]=useState("");

    const [remainingTaskList,setremainingTaskList]=useState([
        {
        id: Math.random(),
        title:"First Title",
        },
    ]);


    const [completedTaskList,setcompletedTaskList]=useState([
        // {id:Math.random(),title:"day of task",currentTime:"12:30pm"}
    ]);


    const handleSubmit =(e) =>{
        e.preventDefault();
        console.log("Form Submitted");
        if(inputData.length>5 && inputData !==""){
            const tasklist={
                id:Math.random(),
                title:inputData,
            };

            const list=[...remainingTaskList];
            list.push(tasklist);

            setremainingTaskList(list);
            setInputData("");
        }
    };

    const handleonchange=({target})=>{
        console.log("event",target.value);
        target.value.length <=5 ? setInputerror("atleast have 5 character"):setInputerror("")
        setInputData(target.value);
    };

    const handleCheck=(id)=>{
        const intial =[...remainingTaskList];
        const intialcompletetask =[...completedTaskList];
        const currentTime=getCurrentTime(new Date());

        const index= intial.findIndex((item)=>item.id===id);
        
        
        remainingTaskList[index].currentTime=currentTime;
        intialcompletetask.push(remainingTaskList[index]);

        const updatedremtask=intial.filter((item)=>item.id!==id);

        setremainingTaskList(updatedremtask);
        setcompletedTaskList(intialcompletetask);
    };

    const handleDelete=(id)=>{
        const intial =[...remainingTaskList];
        const updated =intial.filter((item)=>item.id !==id);
        setremainingTaskList(updated);
    };

    const getCurrentTime=(date=new Date()) =>{
        let hour=date.getHours()
        let minutes=date.getMinutes()
        let ampm=hour>=12?"pm" :"am"

        hour =hour % 12;
        hour =hour ?hour :12;
        minutes =minutes<10?"0"+minutes: minutes;

        let currentTime=hour+":"+minutes+ampm;
        return currentTime;
    }

  return (
    <Box mt={3} mb={2} ml={30}  mr={30} justify="center" padding={2} display={'flex'}> 
        <Grid container maxWidth={1140}>
            <Grid item xs={12}>
            <Paper elevation={3}>
                <form onSubmit={handleSubmit}>
                    <Box  justifyContent="center" mb={2} display="flex" mr={40}>
                        <Typography variant='h5'color="primary">Todo List</Typography>
                    </Box>
                    <Grid container justify="center" textAlign={'center'} mb={3}>
                            <Grid item xs={8}>
                            <TextField id="inputTaskField" label="Press Enter to Add A Task"
                             variant="outlined" fullWidth={true} size='small' value={inputData} 
                             onChange={handleonchange} error={inputerror ? true : false} helperText={inputerror}/>
                            </Grid>
                    </Grid>
                </form>
            </Paper>
            </Grid>

            {/*task container*/ }
            <Grid item xs={12} flexDirection={'row'} mt={4} mb={3}>
                <Grid container spacing={2}>


                    <Grid item xs={12} sm={6} lg={6}>
                        <List sx={{ width: '100%', height: 'auto', maxWidth: 360, bgcolor: 'background.paper', padding:2, minHeight:300}} dense={true}>
                            <Typography paddingLeft={2} mb={2} >Remaining Task</Typography>
                            {/* mapping*/}
                            {
                                remainingTaskList.length>0?
                                remainingTaskList.map((item,i)=>
                                <ListItem key={i}>
                                <ListItemAvatar>
                                    <Avatar style={{bgcolor:'indigo[500]',color:'inherit'}}>
                                    {item.title[0]}
                                    </Avatar>    
                                </ListItemAvatar>
                                <ListItemText primary={item.title}  />
                                <ListItemSecondaryAction>
                                    <IconButton style={{color: green[500]}} onClick={()=>handleCheck(item.id)}>
                                        <DoneOutlineOutlinedIcon/>
                                    </IconButton>
                                    <IconButton style={{color: red[500]}} onClick={()=>handleDelete(item.id)}>
                                    <DeleteForeverOutlinedIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>)
                            : <Typography marginTop={3} textAlign={'center'} color="GrayText">no task added yet !....</Typography>}
                                
                        </List>


                    </Grid>


                    <Grid item xs={12} sm={6} lg={6}>
                        <List sx={{ width: '100%', height: 'auto', maxWidth: 360, bgcolor: 'background.paper', padding:2, minHeight:300}} dense={true}>
                            <Typography paddingLeft={2} mb={2} >COMPLETED Task</Typography>
                            {/* mapping*/}
                            {
                                completedTaskList.length>0?
                                completedTaskList.map((item,i)=>
                                <ListItem key={i}>
                                <ListItemAvatar>
                                    <Avatar style={{bgcolor:'indigo[500]',color:'inherit'}}>
                                    {item.title[0]}
                                    </Avatar>    
                                </ListItemAvatar>
                                <ListItemText primary={item.title} secondary={item.currentTime} />   
                            </ListItem>)
                            : <Typography marginTop={3} textAlign={'center'} color="GrayText">no task COMPLETED yet !....</Typography>}        
                        </List>
                    </Grid>  
                    
                </Grid>
            </Grid>        
        </Grid>
    </Box>
  )
}
