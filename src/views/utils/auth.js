const auth={
	// 设置人员
	setUser(account,pwd,isAway,userId){
		var user={
			account:account,
			pwd:pwd,
			userId:userId||0,
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
		console.log("人员是否登陆:"+localStorage.user||sessionStorage.user);
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