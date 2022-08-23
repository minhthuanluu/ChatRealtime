import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { get, push, ref, set, update } from "firebase/database";
import { SPLASH } from "../utils/screens";
import { auth, db, Table } from "./constant";

export default class UserApi {
    static create = async (uid, name, email) => {
        try {
            return await push(ref(db, Table.User), { uid, name, email });
        } catch (error) {
            return error;
        }
    }
    static signin = async (email, password) => {
        try {
            return {
                result: await signInWithEmailAndPassword(auth, email, password),
                error: null
            };
        } catch (error) {
            return {
                result: null,
                error
            };
        }
    }
    static signout = async(navigation)=>{
        await signOut(auth);
        if(auth===null){
            navigation.reset();
            navigation.navigate(SPLASH);
        }
    }
    static getUserByUid = async () => {
        try {
            const uid = auth.currentUser.uid;
            const user = await (await get(ref(db, `${Table.User}/${uid}`))).val();
            return {
                result: user,
                error: null
            }
        } catch (error) {
            return {
                result: null,
                error
            };
        }
    }
    static updateVoiceMode=async(voiceMode)=>{
        try {
            const uid = auth.currentUser.uid;
            await update(ref(db, `${Table.User}/${uid}`), { voiceMode });
            return {
                result: true,
                error: null
            }
        } catch (error) {
            return {
                result:null,
                error
            };
        }
    }

}