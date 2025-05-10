import AsyncStorage from "@react-native-async-storage/async-storage";

const TASK_STORAGE_KEY = "task-storage"
const TASK_COMPLETE_STORAGE_KEY = "task-complete-storage"

export type TaskStorage = {
    id: string
    name: string
}

async function get(): Promise<TaskStorage[]> {
    const storage = await AsyncStorage.getItem(TASK_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : []
    return response
}
async function getComplete(): Promise<TaskStorage[]> {
    const storage = await AsyncStorage.getItem(TASK_COMPLETE_STORAGE_KEY)
    const response = storage ? JSON.parse(storage) : []
    return response
}

async function save(newTask: TaskStorage) {
    try {
        const storage = await get()
        const updated = JSON.stringify([...storage, newTask])

        await AsyncStorage.setItem(TASK_STORAGE_KEY, updated)
    } catch (error){
        throw error
    }
}

async function saveComplete(completedTask: TaskStorage) {
    try {
        const storage = await getComplete()
        const updated = JSON.stringify([...storage, completedTask])
        await AsyncStorage.setItem(TASK_COMPLETE_STORAGE_KEY, updated)
    } catch (error) {
        throw error
    }
}

async function remove(id: string) {
    try {
        const storage = await get()

        const updated = storage.filter((task) => task.id !== id)

        await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updated))
    }catch(error){
        throw error
    }
}
async function removeComplete(id: string) {
    try {
        const storage = await getComplete()

        const updated = storage.filter((task) => task.id !== id)

        await AsyncStorage.setItem(TASK_COMPLETE_STORAGE_KEY, JSON.stringify(updated))
    }catch(error){
        throw error
    }
}
async function complete(id: string) {
    try {
        const storage = await get()
        const taskToComplete = storage.find((task) => task.id === id)

        if (!taskToComplete) return

        const updated = storage.filter((task) => task.id !== id)
        await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updated))

        const completed = await getComplete()
        const updatedCompleted = [...completed, taskToComplete]
        await AsyncStorage.setItem(TASK_COMPLETE_STORAGE_KEY, JSON.stringify(updatedCompleted))
    }catch(error){
        throw error
    }
}

export const taskStorage = { get, getComplete, save, saveComplete, remove, removeComplete, complete }