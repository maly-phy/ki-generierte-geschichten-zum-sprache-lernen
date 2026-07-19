import {json} from "@sveltejs/kit";
import { storeUserData } from "../../../../../backend/src/create_database.js";

export async function POST({request}) {
    const {offsetWords, story, userRecordId} = await request.json();
    await storeUserData(offsetWords, story, userRecordId);
    return json({success: true});
};