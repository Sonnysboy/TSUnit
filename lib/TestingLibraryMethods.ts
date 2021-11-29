export class Tests {


  public static assertEquals<T>(o1: T, o2: T) {

    if (!(o1 || o2)) // if (!o1 && !o2)
      return false;
    
    
    if (typeof o1 !== typeof o2) 
      return false;
    
  
    if (Array.isArray(o1) && Array.isArray(o2)) 
    {
      if (o1.length !== o2.length) return false;
      if (o1.flat().length !== o2.flat().length) return false;  
    }
    return o1 === o2;
  }
  


}