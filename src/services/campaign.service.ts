import apiList from "./apiList";
import apiCall, { TMethods } from "./apiMethodList";

export const getAllCampaigns = async () => {
    const res = await apiCall(TMethods.get, apiList.getCampaign)

    return res;

};
