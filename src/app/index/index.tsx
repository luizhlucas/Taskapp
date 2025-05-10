import { useState, useEffect } from "react"
import { Text, View, Image, TouchableOpacity, Modal, FlatList, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback } from "react";

import { styles } from "./styles";
import { colors } from "@/app/colors";

import { Tasks } from "@/components/task";
import { TaskStorage, taskStorage } from "@/storage/task-storage"; 
import { Option } from '@/components/option'

export default function Index() {
    const [tasks, setTasks] = useState<TaskStorage[]>([])
    const [task, setTask] = useState<TaskStorage>({} as TaskStorage)
    const [modalVisible, setModalVisible] = useState(false)

    async function getTasks() {
        try {
            const response = await taskStorage.get()
            setTasks(response)
        }catch (error){

        }
    }

    function handleDetails(selected: TaskStorage) {
        setModalVisible(true)
        setTask(selected)
    }

    async function taskRemove() {
        try {
            await taskStorage.remove(task.id)
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
    async function handleComplete() {
        try{
            await taskStorage.complete(task.id)
            getTasks()
            setModalVisible(false)

            Alert.alert("success", "New task added", [
                {
                    text: "Ok"
                }
            ])

            setModalVisible(false)
        }catch(error) {
            Alert.alert("erro", "não foi possivel salvar a task")
            console.log("error")
        }
    }

    useFocusEffect(
        useCallback(() => {
            getTasks()
        }, [])
    )


    return (
    <View style={styles.container}>
        <View style={styles.header}>
            <Image source={require("@/assents/logo.png")} style={styles.logo} />
            <View style={styles.navigate}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.navigate("/complete")}>
                    <MaterialIcons name="check" size={32} color={colors.green[100]} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.navigate("/add")}>
                    <MaterialIcons name="add" size={32} color={colors.green[100]} />
                </TouchableOpacity>
            </View>
        </View>
            {tasks.length === 0 && (
                <View style={styles.content}>
                    <Text style={styles.title}>There are no tasks yet...</Text>
                    <TouchableOpacity style={styles.button} onPress={() => router.navigate("/add")}>
                            <MaterialIcons name="add" size={32} color="#121214" />
                            <Text style={styles.titleButton}>Create New Task</Text>
                    </TouchableOpacity>
                </View>
            )}
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

                    <View></View>

                    <Text style={styles.modalTaskName}>{task.name}</Text>

                    <View style={styles.modalFooter}>
                        <Option name="Delete" icon="delete" variant="secondary" onPress={handleRemove}/>
                        <TouchableOpacity activeOpacity={0.6} onPress={handleComplete}>
                            <MaterialIcons name="check" size={32} color={colors.gray[100]} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    </View>
    
)}
