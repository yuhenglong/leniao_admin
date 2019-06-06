import axios from 'axios'  
import { Message } from 'element-ui';  //element库的消息提示，可以不用

//创建axios实例
var service = axios.create({
    baseURL: '', 
    timeout: 5000, 
        headers: {
        'content-type': 'application/json',
        "token":'14a1347f412b319b0fef270489f'
    }
}) 
export default {
    //get请求，其他类型请求复制粘贴，修改method
    post(url, param) {
        return new Promise((cback, reject) => {
            service({
                method: 'post',
                url,
                params: param,
            }).then(res => { 
                console.log(res)
            }).catch(err => {
               console.log(err)
            })

        })
    }
} 