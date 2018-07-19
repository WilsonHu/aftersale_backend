/**
 * Created by HT on 2018-07-19.
 */
import request from '@/utils/request'

export function getAllAgent() {
    let params = new URLSearchParams();
    return request({
        url: 'agent/list',
        method: 'post',
        data: params
    })
}