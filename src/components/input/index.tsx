import { TextInput, TextInputProps} from "react-native";

import { styles } from "./styles";


export function Input({...rest}: TextInputProps) {
    return(
        <TextInput placeholderTextColor="#555" placeholder="New Task..." 
        style = {styles.input} {...rest}
        />
    )
}