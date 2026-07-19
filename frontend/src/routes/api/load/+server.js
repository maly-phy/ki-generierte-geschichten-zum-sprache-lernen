import {json} from "@sveltejs/kit";
import { loadUserData } from "../../../../../backend/src/create_database.js"

export async function GET({url}) {
    const userRecordId = url.searchParams.get("userRecordId");
    const userData = await loadUserData(userRecordId);
    return json({userData});
};