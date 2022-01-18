import Client from "./api";

export const LoadAllSessions = async () => {
    try {
        const res = await Client.get(`/session`);
        return res.data;
    } catch (error) {
        throw error;
    };
};

export const LoadUserSessions = async (user_id) => {
    try {
        const res = await Client.get(`/session/user/${user_id}`);
        localStorage.setItem('sessions', JSON.stringify(res.data))
        return res.data;
    } catch (error) {
        throw error;
    };
};

export const EditSessionTag = async (sessionId, newTagId) => {
    try {
        const res = await Client.put(`/session/${sessionId}`, {
            tag_id: newTagId
        });
        return res.data;
    } catch (error) {
        throw error;
    };
};

export const DestroySession = async (sessionId) => {
    try {
        const res = await Client.delete(`/session/${sessionId}`);
        return res;
    } catch (error) {
        throw error;
    };
};