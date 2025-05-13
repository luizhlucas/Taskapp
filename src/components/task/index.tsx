import { View, Text, TouchableOpacity, TouchableOpacityProps } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

import {styles} from "./styles"
import { colors } from "@/app/colors";

type Props = TouchableOpacityProps &{
    name: string
}

export function Tasks({ name, ...rest }: Props){
    return(
        <View style={styles.container}>
            <View style={styles.details}>
                <Text style={styles.name} numberOfLines={1}>
                    {name}
                </Text>
            </View>

            <TouchableOpacity {...rest}>
                <MaterialIcons name="more-horiz"size={26} color={colors.gray[100]} />
            </TouchableOpacity>

        </View>
    )
}