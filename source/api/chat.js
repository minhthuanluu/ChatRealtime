import { push, ref, set } from "firebase/database";
import { db, Table } from "./constant";

export const createMessage = async (uid, message, roomId) => {
    try {
        return await push(ref(db, Table.Chat), { uid, message, roomId });
    } catch (error) {
        return error;
    }
}