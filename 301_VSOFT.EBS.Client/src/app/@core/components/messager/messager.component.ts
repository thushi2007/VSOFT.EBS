import {
  Component,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {MessageComponent} from '@core/components/messager/message/message.component';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'ebs-messager',
  templateUrl: './messager.component.html',
  styleUrls: ['./messager.component.scss']
})
export class MessagerComponent implements OnDestroy {
  @ViewChild('alertContainer', {read: ViewContainerRef, static: true}) container;

  @Input() duration = 0;
  @Input() onlyOneInstance = false;

  componentRef: ComponentRef<MessageComponent>;

  constructor(private resolver: ComponentFactoryResolver) {
  }

  public popErrorMessage(title: string, text: string): void {
    if (this.onlyOneInstance) {
      this.container.clear();
    }

    const factory: ComponentFactory<MessageComponent> = this.resolver.resolveComponentFactory(MessageComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.popErrorMessage(title, text);
    this.hideContainerTimer(this.componentRef);
  }

  public popInfoMessage(title: string, text: string): void {
    if (this.onlyOneInstance) {
      this.container.clear();
    }

    const factory: ComponentFactory<MessageComponent> = this.resolver.resolveComponentFactory(MessageComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.popInfoMessage(title, text);
    this.hideContainerTimer(this.componentRef);
  }

  public popWarningMessage(title: string, text: string): void {
    if (this.onlyOneInstance) {
      this.container.clear();
    }

    const factory: ComponentFactory<MessageComponent> = this.resolver.resolveComponentFactory(MessageComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.popWarningMessage(title, text);
    this.hideContainerTimer(this.componentRef);
  }

  public popSuccessMessage(title: string, text: string): void {
    if (this.onlyOneInstance) {
      this.container.clear();
    }

    const factory: ComponentFactory<MessageComponent> = this.resolver.resolveComponentFactory(MessageComponent);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.popSuccessMessage(title, text);
    this.hideContainerTimer(this.componentRef);
  }

  public hide(): void {
    this.container.clear();
  }

  /**
   * For hiding the new message component by a timer and user setted duration
   * @param cRef the target component
   */
  private hideContainerTimer(cRef: ComponentRef<MessageComponent>): void {
    cRef.instance.hideContainer.subscribe(event => {
      if (this.onlyOneInstance) {
        this.container.clear();
      } else {
        if (cRef != null) {
          cRef.destroy();
        }
      }
    });

    this.destroyCompontentByTimer(cRef);
  }

  /**
   * Hiding the component by destroying it
   * @param cRef the target component
   */
  private destroyCompontentByTimer(cRef: ComponentRef<MessageComponent>): void {
    if (this.duration > 0) {
      setTimeout(() => {
        if (cRef != null) {
          cRef.destroy();
        }
      }, this.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef != null) {
      this.componentRef.destroy();
    }
  }
}
