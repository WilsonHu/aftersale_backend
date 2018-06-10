const APIConfig = {

	request_server_url: 'http://127.0.0.1:8080/',  // for axios ajax url
	ajax_header_token: 'security_token',    // for axios request header
	ajax_header_role: 'security_role',      // for axios request header


	/*
	 ****************************************************************************************
	 ****************************************************************************************
	 *               response data format
	 *              (json)
	 **************************************
	 */
	response_token: 'token',    // 可能不需要， 直接在 response_data中传递
	response_status: 'status',  // *必须*   执行状态 [success, error]
	response_data: 'data',      // *必须*   应该是  json 格式
	/*
	 ****************************************************************************************
	 ****************************************************************************************
	 *               ajax (axios)
	 *                    # 除了 base_url 其他变量 计划放到 header中传递给后端
	 *                    # 这样就可以 直接在 utils/fetch.js 中统一处理所有 操作请求， 验证操作有效性
	 **************************************
	 */


	/*
	 ****************************************************************************************
	 ****************************************************************************************
	 *               cookie (js-cookie)
	 **************************************
	 */
	cookie_user_name: 'user_name',
	cookie_user_role: 'user_role',
	cookie_user_id: 'user_id',
	cookie_user_session: 'user_session',
	cookie_user_token: 'user_token',
	/*
	 ****************************************************************************************
	 ****************************************************************************************
	 *               store_user (vuex)
	 **************************************
	 */
	store_user_token: 'user_token', // for store to save token
	store_user_role: 'user_role',   // for store to save role
	store_user_name: 'user_name',
	store_user_id: 'user_id',
	store_user_session: 'user_session',
	/*
	 ****************************************************************************************
	 ****************************************************************************************
	 *               store_getters (vuex)
	 **************************************
	 */
	store_getters_username: 'user_name',
	store_getters_id: 'user_id',
	store_getters_role: 'user_role',
	store_getters_session: 'user_session',
	store_getters_token: 'user_token',
	store_getters_table_count: 'record_total',
	store_getters_table_records: 'table_records',
	store_getters_table_page_size: 'table_page_size',
	store_getters_table_exec_result: 'table_exec_result',
}

export  {APIConfig}