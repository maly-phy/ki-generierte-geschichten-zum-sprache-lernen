import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';
import {getPocketBase} from '../../backend/src/create_database.js';

export const handle: Handle = async ({event, resolve}) => {
    const {pb, config} = await getPocketBase("../../config.toml");
    const token = event.cookies.get("session");
    if (token) {
        pb.authStore.save(token);
        try {
            const authData = await pb.collection(config.users.collection).authRefresh();
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
