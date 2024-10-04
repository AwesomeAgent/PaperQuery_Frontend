import api from '@/api/api'


// 获取笔记内容
export const getDocumentNote = async (
    knowledgeID: string,
    documentID: string,
) => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const params = {
            knowledgeID: knowledgeID,
            documentID: documentID,
        }
        const resp = await api.get('/note/getnote', {
            headers: {
                Authorization: token,
            },
            params: params,
        })
        return resp.data
    } catch (e: any) {
        throw new Error(e.response.data.msg)
    }
}

export const updateDocumentNote = async (
    knowledgeID: string,
    documentID: string,
    note: string,
) => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const data = {
            knowledgeID: knowledgeID,
            documentID: documentID,
            note: note,
        }
        const resp = await api.post('/note/updatenote', data, {
            headers: {
                Authorization: token,
            },
        })
        return resp.data
    } catch (e: any) {
        throw new Error(e.response.data.msg)
    }
}