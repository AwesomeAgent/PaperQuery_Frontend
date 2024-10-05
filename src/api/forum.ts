import api from '@/api/api'



// 获取所有帖子
export const getForumPosts = async () => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const resp = await api.get('/forum/getallpost', {
            headers: {
                Authorization: token,
            },
        })
        return resp.data
    } catch (e: any) {
        throw new Error(e.response.data.msg)
    }
}

// 根据帖子id获取帖子全部内容
export const getForumPost = async (postid: string) => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const params = {
            postid: postid,
        }
        const resp = await api.get('/forum/getpostcommit', {
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

// 发布帖子
export const postForumPost = async (title: string, content: string) => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const data = {
            title: title,
            content: content,
        }
        const resp = await api.post('/forum/createpost', data, {
            headers: {
                Authorization: token,
            },
        })
        return resp.data
    } catch (e: any) {
        throw new Error(e.response.data.msg)
    }
}

// 发布评论
export const postForumComment = async (postid: string, content: string) => {
    try {
        let token = localStorage.getItem('token')
        if (token) {
            token = `Bearer ${token}`
        }
        const data = {
            postid: postid,
            content: content,
        }
        const resp = await api.post('/forum/createcommit', data, {
            headers: {
                Authorization: token,
            },
        })
        return resp.data
    } catch (e: any) {
        throw new Error(e.response.data.msg)
    }
}