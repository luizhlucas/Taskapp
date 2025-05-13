import { TouchableOpacity, TouchableOpacityProps  } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = TouchableOpacityProps & {
    iconName: keyof typeof MaterialIcons.glyphMap
    iconColor: string
}

export function Icon({iconName, iconColor, ...rest}: Props){
    return(
        <TouchableOpacity activeOpacity={0.6} {...rest}>
            <MaterialIcons name={iconName} size={32} color={iconColor} />
        </TouchableOpacity>
    )
}