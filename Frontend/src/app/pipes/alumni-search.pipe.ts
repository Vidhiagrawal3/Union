import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'alumniSearch'
})
export class AlumniSearchPipe implements PipeTransform {

  transform(value: any[] , name:string , course:string) {
   if(!value || (!name && !course))
   {
     return value;
   }
   return value.filter(alumni =>
    alumni.fname.toLocaleLowerCase().includes(name.toLocaleLowerCase()) &&
    alumni.course.toLocaleLowerCase().includes(course.toLocaleLowerCase()));
  }

}
