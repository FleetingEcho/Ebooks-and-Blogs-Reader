module.exports=(userKey,resList)=>{
		let nextKey,lastKey,nextTitle,lastTitle,lastTime,nextTime
		return new Promise((resolve,reject)=>{
	try{
		for(let i=0;i<resList.length;i++){
			let length=resList.length-1
			// first key
			if(userKey===resList[0].key){
				nextKey=resList[1].key
				lastKey=resList[length].key
				nextTitle=resList[1].title
				lastTitle=resList[length].title
				nextTime=resList[1].time
				lastTime=resList[length].time
				break
			}else if(userKey===resList[length].key){
				nextKey=resList[0].key
				lastKey=resList[length-1].key
				nextTitle=resList[0].key.title
				lastTitle=resList[length-1].title
				nextTime=resList[0].time
				lastTime=resList[length-1].time
				break
			}else if(resList[i].key===userKey){
				nextKey=resList[i+1].key
				lastKey=resList[i-1].key
				nextTitle=resList[i+1].title
				lastTitle=resList[i-1].title
				nextTime=resList[i+1].time
				lastTime=resList[i-1].time
				break
			}
		}
		resolve({
		lastKey, nextKey,nextTitle,lastTitle,lastTime,nextTime
		})
	}catch(err){
		reject(err)
	}
		})
	}
