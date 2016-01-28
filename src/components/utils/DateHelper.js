const DateHelper={
	//获取档期的日期
	getCurrentDate(formate){
		var date=new Date();
		var year= date.getFullYear();
		var month=parseInt((date.getMonth()+1))<10?("0"+(date.getMonth()+1)):(date.getMonth()+1);
		var day=date.getDate();
		var hour=date.getHours();
		var min=date.getMinutes();
		var sec=date.getSeconds();
		var result="";
		if(formate.indexOf("yyyy")>=0){
			result=year;
		}
		if(formate.indexOf("MM")>=0){
			result+="-"+month;
		}
		if(formate.indexOf("dd")>=0){
			result+="-"+day;
		}
		if(formate.indexOf("HH")>=0){
			result+="-"+hour;
		}

		if(formate.indexOf("mm")>=0){
			result+="-"+min;
		}
		if(formate.indexOf("ss")>=0){
			result+="-"+sec;

		}
		return result;
	}
}