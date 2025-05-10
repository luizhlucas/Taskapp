import { useState } from "react"
import { View, TouchableOpacity, Alert, FlatList, Modal, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { styles } from "./styles";
import { colors } from "@/app/colors";

import { Tasks } from "@/components/task";
import { TaskStorage, taskStorage } from "@/storage/task-storage"; 
import { Option } from '@/components/option'

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
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.green[100]} />
                </TouchableOpacity>
            </View>
            <FlatList
            data={tasks}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Tasks 
                name={item.name}
                onDetails={() => console.log("clicou")}
                onPress={() => handleDetails(item)}
                />
            )}
        />

        <Modal transparent visible={modalVisible}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.modalCategory}>Curso</Text>
                                <TouchableOpacity activeOpacity={0.6} onPress={() => setModalVisible(false)}>
                                    <MaterialIcons name="close" size={32} color={colors.gray[100]} />
                                </TouchableOpacity>
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