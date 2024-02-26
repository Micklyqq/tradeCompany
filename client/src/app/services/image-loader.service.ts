import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageLoaderService {

  constructor() { }

  onImageLoadError(event:any){
    event.target.src = '../../assets/img/default.png'
  }
}
