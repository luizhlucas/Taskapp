import { useState } from "react";
import { View, Alert } from "react-native";
import { router } from "expo-router";

import { styles } from "./styles";
import { colors } from "@/app/colors";

import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { taskStorage } from "@/storage/task-storage"; 
import { Icon } from "@/components/Icon";

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
                <Icon iconName="arrow-back" iconColor={colors.green[100]} onPress={() => router.back()}/>
            </View>
            <View style={styles.form}>
                <Input onChangeText={setName} />
                <Button title="Submit" onPress={handleAdd}/>
            </View>
        </View>
    )
}