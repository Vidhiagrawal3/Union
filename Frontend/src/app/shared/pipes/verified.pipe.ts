import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verified'
})
export class VerifiedPipe implements PipeTransform {

  transform(value: any[], verify:boolean, ) {
    return value.filter(alumni=>
      alumni.verified == verify 
    );
  }

}
