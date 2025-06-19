import {cacheManager } from '../utils/cache.js';

const cache = new cacheManager();
const tasks = [];

// obtiene todas las tareas
export const get_tasks = () => {
    const keys = cache.keys();
    for (const key of keys) {
        const task = cache.get(key);
        if (task) {
            tasks.push(task);
        }
    }
    return tasks;
}

//crea una nueva tarea
export const create_task = (task) => {
    const newCache = new cacheManager();
    const taskId = Math.floor(Math.random() * 1000);
    newCache.set(taskId, task);
    return {
        ...task,
        created_at: new Date().toISOString(),
    };
}

// Actualiza una tarea existente en base a su ID
export const update_task = (id, task) => {
    const existingTask = cacheManager.get(`task${id}`);
    if (!existingTask) {
        throw new Error(`Tarea con ID ${id} no encontrada.`);
    }
    cacheManager.set(`task${id}`, task);
    return {
        id,
        ...task,
    };
}

// Elimina una tarea existente en base a su ID
export const delete_task = (id) => {
    cacheManager.del(`task${id}`); // Eliminar la tarea del caché
    return { message: `La tarea con el ${id} fue eliminada exitosamente.` };
}