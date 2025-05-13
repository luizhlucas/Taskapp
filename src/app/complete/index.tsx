import { useState } from "react"
import { View, Alert, Modal, Text } from "react-native";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { styles } from "./styles";
import { colors } from "@/app/colors";

import { TaskStorage, taskStorage } from "@/storage/task-storage"; 
import { Option } from '@/components/option'
import { Icon } from "@/components/Icon";
import { List } from "@/components/list";

export default function Complete() {
    const [tasks, setTasks] = useState<TaskStorage[]>([])
    const [task, setTask] = useState<TaskStorage>({} as TaskStorage)
    const [modalVisible, setModalVisible] = useState(false)

    async function getTasks() {
        try {
            const response = await taskStorage.getComplete()
            setTasks(response)
        }catch (error){

        }
    }
    async function taskRemove() {
        try {
            await taskStorage.removeComplete(task.id)
            getTasks()
            setModalVisible(false)
        } catch (error) {
            Alert.alert("Erro", "Não foi possível excluir")
            console.log(error)
        }
    }
    function handleRemove() {
        Alert.alert("Delete", "Do you really want to delete?", [
            {style: "cancel", text: "No"},
            { text: "Yes", onPress: taskRemove}
        ])
        
    }

    function handleDetails(selected: TaskStorage) {
        setModalVisible(true)
        setTask(selected)
    }

    useFocusEffect(
        useCallback(() => {
            getTasks()
        }, [])
    )

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Icon iconName="arrow-back" iconColor={colors.green[100]} onPress={() => router.back()}/>
            </View>

        <List data={tasks} onPress={handleDetails}/>

        <Modal transparent visible={modalVisible}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalCategory}>Curso</Text>
                                <Icon iconName="close" iconColor={colors.gray[100]} onPress={() => setModalVisible(false)}/>
                            </View>
        
                            <Text style={styles.modalTaskName}>{task.name}</Text>
        
                            <View style={styles.modalFooter}>
                                <Option name="Delete" icon="delete" variant="secondary" onPress={handleRemove}/>
                            </View>
        
                        </View>
                    </View>
                </Modal>
        </View>

    )
}