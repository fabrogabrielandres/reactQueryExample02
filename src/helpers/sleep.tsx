
export const sleep = (time:number = 1):Promise<boolean> => {
  
    return (new Promise<boolean>((resolve, reject) => {
        setTimeout(() => {
            resolve(true)
        }, time*1000);
    }))
}
