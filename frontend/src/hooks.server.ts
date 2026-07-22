import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import {openConfig} from '../../backend/src/create_database.js';

export const handle: Handle = async ({event, resolve}) => {
    const config= await openConfig("../../config.toml");
    const pb = new PocketBase(config.pocketbase.url);
    const token = event.cookies.get("session");

    if (token) {
        pb.authStore.save(token);
        try {
            const authData = await pb.collection(config.users.collection).authRefresh();
            console.log(authData)
            event.locals.user = {
                id: authData.record?.id ?? "",
                email: authData.record?.email ?? "",
                verified: authData.record?.verified ?? false
            }
        } catch (error) {
            console.error("Error refreshing auth:", error);
            pb.authStore.clear();
            event.locals.user=null;
        }
    } else {
        event.locals.user=null;
    }
    return resolve(event);
};