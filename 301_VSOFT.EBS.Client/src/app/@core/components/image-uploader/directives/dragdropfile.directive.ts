import {Directive, EventEmitter, HostBinding, HostListener, Input, Output} from '@angular/core';

@Directive({
  selector: '[aimDragdropfile]'
})
export class DragdropfileDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  @HostBinding('style.background-color') private background = '#f5fcff';
  @HostBinding('style.opacity') private opacity = '1';
  @HostBinding('style.border') private border = '1px dashed #000000';

  @Input() maxSize: number;

  // Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.border = '3px dashed #000000';
    this.opacity = '0.8';

    // const files = evt.dataTransfer.files;
    // console.log(files);
  }

  // Dragleave listener
  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.border = '1px dashed #000000';
    this.opacity = '1';

    // const files = evt.dataTransfer.files;
    // console.log(files);
  }

  // Drop listener
  @HostListener('drop', ['$event'])
  public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();

    const files = evt.dataTransfer.files;
    // console.log(this.maxSize);
    // files?.forEach(el => {
    //   console.log(el);
    // });
    for (let index = 0; index < files.length; index++) {
      if (files[index].size > this.maxSize) {
        this.background = '#f5fcff';
        this.border = '3px dashed red';
        this.opacity = '1';


      }
    }

    setTimeout(() => {
      this.background = '#f5fcff';
      this.border = '1px dashed #000000';
      this.opacity = '1';
    }, 300);

    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }
}
