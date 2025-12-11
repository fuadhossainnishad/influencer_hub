import apiList from "./apiList";
import apiCall, { TMethods } from "./apiMethodList";

export const getAllCampaigns = async () => {
    const res = await apiCall(TMethods.get, apiList.getCampaign)

    return res;

};
// export const getMyCampaigns = async (token: string) => {
//     console.log("mycmapaing data:", token)
//     const res = await apiCall(TMethods.get, apiList.getMyCampaigns, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     })

//     return res;

// };

import axios from "axios";

export const getMyCampaigns = async (token: string) => {
    try {
        const res = await axios.get("http://localhost/influencer_hub_server/campaign/getMyCampaign.php", {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true, // required for cross-origin cookies/auth
        });
        return res.data;
    } catch (error: any) {
        console.error("getMyCampaigns error:", error.response?.data || error.message);
        return error.response?.data || { success: false, message: "Server error" };
    }
};
