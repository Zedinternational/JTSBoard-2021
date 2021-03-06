import { APP } from './actionsTypes';

export const ROOT_OUTSIDE = 'outside';
export const ROOT_INSIDE = 'inside';
export const ROOT_LOADING = 'loading';
export const ROOT_AGREEMENT = 'agreement';

export function appStart({ root, ...args }) {
	return {
		type: APP.START,
		root,
		...args
	};
}

export function appReady() {
	return {
		type: APP.READY
	};
}

export function appInit() {
	return {
		type: APP.INIT
	};
}

export function appInitLocalSettings() {
	return {
		type: APP.INIT_LOCAL_SETTINGS
	};
}

export function setMasterDetail(isMasterDetail) {
	return {
		type: APP.SET_MASTER_DETAIL,
		isMasterDetail
	};
}
