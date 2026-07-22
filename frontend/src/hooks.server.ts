import type { Handle } from '@sveltejs/kit';
import PocketBase from 'pocketbase';

// export const handle: Handle = async ({event, resolve}) => {
//     const session = event.cookies.get("session");
//     event.locals.user = session ? {authenticated: true} : null;
//     return resolve(event);
// };

export const handle: Handle = async ({event, resolve}) => {
    const pb = new PocketBase('http://127.0.0.1:8090');
    const token = event.cookies.get("session");
    if (token) {
        pb.authStore.save(token);
        try {
            const authData = await pb.collection('vocab_users').authRefresh();
            event.locals.user = {
                id: authData.record?.id,
                email: authData.record?.email,
                authenticated: true
            }
        } catch {
            pb.authStore.clear();
            event.locals.user=null;
        }
    } else {
        event.locals.user=null;
    }
    return resolve(event);
};