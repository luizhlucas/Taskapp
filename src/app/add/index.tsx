import { useState } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/app/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { taskStorage } from "@/storage/task-storage"; 

export default function Add() {
    const [name, setName] = useState("");

    async function handleAdd() {
        try{
            if (!name.trim()) {
                return Alert.alert("No Task","enter some task")
            }

            await taskStorage.save({
                id: new Date().getTime().toString(),
                name, 
            })

            Alert.alert("success", "New task added", [
                {
                    text: "Ok",
                    onPress: () => router.back()
                }
            ])
        }catch(error) {
            Alert.alert("erro", "não foi possivel salvar a task")
            console.log("error")
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => router.back()}>
                    <MaterialIcons name="arrow-back" size={32} color={colors.green[100]} />
                </TouchableOpacity>
            </View>
            <View style={styles.form}>
                <Input onChangeText={setName} />
                <Button title="Submit" onPress={handleAdd}/>
            </View>
        </View>
    )
}