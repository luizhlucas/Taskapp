import { FlatList, TouchableOpacityProps } from "react-native";
import { Tasks } from "../task";

type TaskItem = {
  id: string;
  name: string;
};

type Props = {
  data: TaskItem[];
  onPress: (item: TaskItem) => void
};

export function List({ data, onPress }: Props) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Tasks
            name={item.name}
            onPress={() => onPress(item)}
        />
      )}
    />
  );
}