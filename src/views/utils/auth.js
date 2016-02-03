const auth={
	// 设置人员
	setUser(account,pwd,isAway){
		var user={
			account:account,
			pwd:pwd,
			isAway:isAway
		}
		if(isAway){
			localStorage.user=user;
		}else{
			sessionStorage.user=user;
		}
	},
	//检查该对象是否存在
	isLogin(){
		return localStorage.user||sessionStorage.user;
	},
	//获取用户
	getUser(){
		var user=localStorage.user||sessionStorage.user;
		if(user){
			return user;
		}else{
			return false;
		}
	}
}

export default auth