// todo use me somehow.
export class Tests {


  public static assertEquals<T>(o1: T, o2: T) {

    if (typeof o1 !== 'boolean' && typeof o2 !== 'boolean' && !(o1 || o2)) // if (!o1 && !o2) de morgans law ,look it up !
      return false;
    
    if (typeof o1 !== typeof o2) 
      return false;
    
  
    if (Array.isArray(o1) && Array.isArray(o2)) 
    {
      if (o1.length !== o2.length) return false;
      return o1.every(entry => o2.includes(entry));
    }
    return o1 === o2;
  }
  


}