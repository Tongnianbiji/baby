import BaseRequest from '../../common/baseRequest'

const adminRequest = new BaseRequest('admin')

const request = new BaseRequest()

export default {
    getAdminData() {
        return adminRequest.get('api/get_user_list', {}).then(ret => ret)
    },

    getData() {
        return request.post('test/get_normal_list', {}).then(({ data }) => data)
    }
}