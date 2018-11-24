function toValidInt(numb: any):number{
    try{
        return parseInt(numb);
    }catch{
        return null;
    }
}

export {toValidInt};