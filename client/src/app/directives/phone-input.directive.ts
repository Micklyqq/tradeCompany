import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appPhoneInput]',
  standalone: true
})
export class PhoneInputDirective {

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInputChange(event: any) {
    const initialValue = this.el.nativeElement.value;
    const newValue = initialValue.replace(/[^0-9]/g, ''); // Удаление всех символов, кроме цифр
    this.el.nativeElement.value = this.formatPhoneNumber(newValue); // Форматирование телефонного номера
  }

  formatPhoneNumber(value: string): string {
    const countryCode = value.length > 0 ? '+' : ''; // Добавление знака "+" для странового кода
    let formattedValue = countryCode;

    if (value.length > 0) {
      formattedValue += '(' + value.substring(0, 3); // Добавление открывающей скобки после странового кода
    }
    if (value.length > 3) {
      formattedValue += ') ' + value.substring(3, 5); // Добавление закрывающей скобки и пробела после первых трех цифр
    }
    if (value.length > 5) {
      formattedValue += '-' + value.substring(5, 8); // Добавление тире после следующих двух цифр
      formattedValue += '-' + value.substring(8, 12); // Добавление тире после следующих четырех цифр
    }
    return formattedValue;
  }

}
