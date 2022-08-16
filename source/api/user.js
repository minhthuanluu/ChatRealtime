import { push, ref, set } from "firebase/database";
import { db, Table } from "./constant";

export const createUser = async (uid,name,email) => {
    try {
        return await push(ref(db, Table.User), {uid,name,email });
    } catch (error) {
        console.log(error)
        return error;
    }
}