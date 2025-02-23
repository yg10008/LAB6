const taskValid = (req,res,next)=>{
    const {title,description,status,priority,dueDate} =req.body;

    if(!title || !description ||  !status ||  !priority ||  !dueDate){
        return res.status(400).json({message:"PLEASE_ENTER_THE_ESSENTIALITIES"})
    }

    if(title.length>50){
        return res.status(400).json({message:"TITLE_SHOULD_BE_LESS_THAN_50_CHARACTERS"})
    }

    if(description.length>100){
        return res.status(400).json({message:"DESCRIPTION_SHOULD_BE_LESS_THAN_100_CHARACTERS"})
    }

    const allowedStatus=["pending", "in progress", "completed"];

        if(!allowedStatus.includes(status)){
            return res.status(400).json({
                message:"INVALID STATUS"
            });
        }

    const allowedPriority=["low", "medium", "high"];

        if(!allowedPriority.includes(priority)){
            return res.status(400).json({
                message:"INVALID STATUS"
            });
        }

        next();
    
}

module.exports = taskValid;