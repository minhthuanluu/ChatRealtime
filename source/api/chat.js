import { get, orderByChild, push, query, ref, set, update } from "firebase/database";
import instance from ".";
import { convertObjectToArray } from "../utils/functions";
import { auth, db, Table } from "./constant";
import axios from "axios";

export const createMessage = async (uid, message, roomId) => {
    try {
        return await push(ref(db, Table.Chat), { uid, message, roomId });
    } catch (error) {
        return error;
    }
}

export default class ChatApi {
    static createMessage = async (uid, message, messageEn, roomId) => {
        const time = Date.now();
        try {
            const _ref = await push(ref(db, Table.Chat));
            const key = _ref.key;
            await update(ref(db, `${Table.Chat}/${key}`), { uid, message, messageEn, roomId, time });
            return true;
        } catch (error) {
            return error;
        }
    }
    static getMessageByRoomId = async (roomId) => {
        try {
            const chat = await (await get(ref(db, `${Table.Chat}`, orderByChild(roomId)))).val();
            const resultArray = convertObjectToArray(chat);
            const filteredData = resultArray.filter((value, index) => (value.roomId === roomId))
            return {
                result: filteredData,
                error: null
            }
        } catch (error) {
            return {
                result: null,
                error
            };
        }
    }
    static translateMessage = async (text, to) => {
        try {
            var params = {
                'text_need_trans': text,
                to
            };

            const _params = encodeFormData(params);

            const {data} = await instance.request({
                method: "POST", url: 'https://autotranslationagl.herokuapp.com/api/trans',
                data:_params
            });
            
            return {
                data,
                error: null
            }
        } catch (error) {
            return {
                result: null,
                error: error
            }
        }
    }
}

const encodeFormData = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');
}