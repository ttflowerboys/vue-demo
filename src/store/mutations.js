import {
	HEAD_SHOW_SUCCESS,
	HEAD_SHOW_FAIL,
	FOOTER_HIDE,
	FOOTER_SHOW
} from './type'

const state={
	headShow:true,
	footerShow:true
};

const mutations={
	/*头部*/
	[HEAD_SHOW_SUCCESS](state){
		state.headShow=true;
	},
	[HEAD_SHOW_FAIL](state){
		state.headShow=false;
	},
	/*footer*/
	[FOOTER_HIDE](state){
		state.footerShow=false;
	},
	[FOOTER_SHOW](state){
		state.footerShow=true;
	}
};

const getters={
	headShow(state){
		return state.headShow;
	},
	footerShow(state){
		return state.footerShow;
	}
};

export default{
	state,
	mutations,
	getters
}