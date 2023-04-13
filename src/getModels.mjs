import axios from "axios";
import { cfg } from "./config.mjs";

export async function models(message) {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${cfg.openai_key}`
    };

    const res = await axios.get('https://api.openai.com/v1/models', { headers })
    return res
}