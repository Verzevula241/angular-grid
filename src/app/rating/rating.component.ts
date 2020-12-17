import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'kendo-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {
  @Input() public value: number = 0;
  @Input() public max: number = 5;

  public stars: number[] = [];

  public ngOnInit(): void {
    this.stars = new Array(this.max).fill(1).map((item, index) => item + index);
  }

  public ratingIcon(item: number): string {
    return (item <= this.value) ? 'k-icon k-i-star yellow' : 'k-icon k-i-star-outline';
  }
}
