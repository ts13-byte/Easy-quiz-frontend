import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minutesSecondsFormat'
})
export class MinutesSecondsFormatPipe implements PipeTransform {

  transform(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`;
    return `${formattedMinutes} mins:${formattedSeconds} secs`;
  }

}
