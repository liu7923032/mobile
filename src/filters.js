

/**
 * 字符串替换过滤器
 * data 字符串
 * src 要替换的字符
 * dest 最终要换的字符
 */
exports.replace=(data,src,dest)=>{
	var reg=new RegExp(src,"g");
	return data.replace(reg,dest);
}