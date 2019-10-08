import * as setting from 'electron-settings'
const setFollow = (mid:number)=>{
    let follows:number[] = <number[]>setting.get('follows');
    if(follows.includes(mid)){
        setting.set('follows',follows.filter(follow=>follow!=mid));
    }else if(!follows.includes(mid)){
        follows.push(mid);
        setting.set('follows',follows);
    }
}
const getFollows = ():number[]=>{
    return <number[]>setting.get('follows');
} 
const initFollows = ()=>{
    if(!setting.has('follows')){
        setting.set('follows',[]);
    }
}
export{
    setFollow,getFollows,initFollows
}