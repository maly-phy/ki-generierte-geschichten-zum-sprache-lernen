import {redirect} from "@sveltejs/kit";

export function load({ locals }: { locals: { user?: unknown } }) {
    if (!locals.user) {
        throw redirect(302, "/login");
    }
};