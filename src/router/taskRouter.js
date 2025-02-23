const router = require('express').Router();
const taskModel = require('../model/task');
const taskValid = require('../utils/taskValidater');


router.post("/task/add",taskValid,async(req,res)=>{
    try{
        
        const {title,description,status,priority,dueDate} =req.body;

        const taskInstance = new taskModel({
            title,
            description,
            status,
            priority,
            dueDate   
        })

        await taskInstance.save();
        res.json({message:"TASK_ADDED_SUCCESFULLY"})
    }
    catch(err){
        res.status(400).json({message:err})
    }
})

router.patch("/task/update", taskValid, async (req, res) => {
    try {
        const { _id, title, description, status, priority, dueDate } = req.body;

        const updatedTask = await taskModel.findByIdAndUpdate(
            _id,
            { title, description, status, priority, dueDate },
            { new: true } 
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "TASK_NOT_FOUND" });
        }

        res.json({ message: "TASK_UPDATED_SUCCESSFULLY", updatedTask });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete("/task/delete", async (req, res) => {
    try {
        const { _id } = req.body;

        const deletedTask = await taskModel.findByIdAndDelete(_id);

        if (!deletedTask) {
            return res.status(404).json({ message: "TASK_NOT_FOUND" });
        }

        res.json({ message: "TASK_DELETED_SUCCESSFULLY" });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.get("/task/watch", async (req, res) => {
    try {
        const taskList = await taskModel.find({});

        if (!taskList || taskList.length === 0) {
            return res.status(404).json({ message: "NO_TASKS_AVAILABLE" });
        }

        res.json({ tasks: taskList });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports=router;