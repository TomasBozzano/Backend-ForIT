import { Router} from "express";
import { get_tasks, update_task, delete_task } from "../controller/controller.js";

const router = Router();

router.use(express.json());

router
// Obtiene todas las tareas
.get("/tasks", (res, req) => {
    try {
        res.json(get_tasks());
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

// Crea una nueva tarea
.post("/tasks", (req, res) => {
    const task = req.body;
    try {
        if (!task || !task.title) {
            return res.status(400).json({ error: "El titulo de la tarea es requerido" });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// Actualiza una tarea existente en base a su ID
.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const task = req.body;

    if (!task || !task.title) {
        return res.status(400).json({ error: "El titulo de la tarea es requerido" });
    }
    if (!id) {
        return res.status(400).json({ error: "El ID de la tarea es requerido" });
    }

    try {
        const existingTask = get_tasks().find(t => t.id === id);
        if (!existingTask) {
            return res.status(404).json({ error: `Task with ID ${id} not found` });
        }else {
            const updatedTask = update_task(id, task);
            return res.json(updatedTask);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

// Elimina una tarea existente en base a su ID
.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ error: "El ID de la tarea es requerido" });
    }
    try {
        const existingTask = get_tasks().find(t => t.id === id);
        if (!existingTask) {
            return res.status(404).json({ error: `La tarea con el ID ${id} no fue encontrada` });
        }else {
            const deletedTask = delete_task(id);
            return res.json(deletedTask);
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
