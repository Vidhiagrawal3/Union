import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumniSearch'
})
export class AlumniSearchPipe implements PipeTransform {

  transform(value: any[] , name:string , course:string , stream:string , gyear:string) {
    console.log(course,name);
   if(!value || (!name && !course))
   {
     return value;
   }
   if(course == "B-Tech")
   {
      return value.filter(alumni =>
    alumni.fname.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
    alumni.course.toLocaleLowerCase().includes(course.toLocaleLowerCase())&&
    alumni.branch.includes(stream)&&
    alumni.gyear.toString().includes(gyear));
   }
   return value.filter(alumni =>
    alumni.fname.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
    alumni.course.toLocaleLowerCase().includes(course.toLocaleLowerCase())&&
    // alumni.branch.toLocaleLowerCase().includes(stream.toLocaleLowerCase())&&
    alumni.gyear.toString().includes(gyear));
  }

}
