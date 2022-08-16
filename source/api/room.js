import { get, push, ref, set, update } from "firebase/database";
import { db, Table } from "./constant";
import {convertObjectToArray} from "../utils/functions"

export default class RoomApi {
    static createRoom = async (roomName) => {
        try {
            const _ref = await push(ref(db, Table.Room, roomName));
            const roomId = _ref.key;
            await update(ref(db, `${Table.Room}/${roomId}`), { roomId, roomName });
            return {
                roomId,
                roomName
            }
        } catch (error) {
            console.log(error)
            return error;
        }
    }
    static getRoomList = async()=>{
        try {
            const roomList = await get(ref(db, `${Table.Room}`));
            return convertObjectToArray(roomList.val())
        } catch (error) {
            
        }
    }
    static updateRoomName=async(roomId,roomName)=>{
        try {
            await update(ref(db, `${Table.Room}/${roomId}`), { roomId, roomName });
        } catch (error) {
            
        }
    }
}