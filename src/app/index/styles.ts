import { StyleSheet } from "react-native";
import { colors } from "../colors";
import { Button } from "@/components/button";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        backgroundColor: "#121214",
        gap: 16,
    },
    header: {
        width:"100%",
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems: "center",
        marginBottom: 32,

    },
    content: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 16,

    },
    title: {
        color: colors.gray[100],
        fontSize: 20
    },
    button: {
        padding: 14,
        backgroundColor: colors.green[100],
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 10, 
        gap: 8,

    },
    titleButton: {
        color: "#121214",
        fontWeight: "600",
        fontSize: 16
    },
    logo: {
        width:32 ,
        height:32
    },
    modal: {
        flex: 1,
        justifyContent: "flex-end"
    },
    modalContent : {
        backgroundColor: colors.gray[800],
        borderTopWidth: 1,
        borderTopColor: colors.gray[700],
        paddingBottom: 52,
        padding: 24
    },
    modalHeader: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 32
    },
    modalCategory: {
        flex: 1,
        fontSize: 16,
        fontWeight: "500",
        color: colors.gray[300]
    },
    modalTaskName: {
        fontSize: 18,
        fontWeight: "600",
        color: colors.gray[200]
    },
    modalFooter: {
        flexDirection: "row",
        marginTop: 32,
        width: "100%",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: colors.gray[600],
        paddingVertical: 14,
      },
    navigate: {
        flexDirection: "row",
        gap: 16
      }
})