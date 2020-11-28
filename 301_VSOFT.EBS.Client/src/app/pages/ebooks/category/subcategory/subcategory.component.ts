import {Component, Input, OnInit} from '@angular/core';
import {SubCategoryDto} from '../../models/subcategorydto';

@Component({
  selector: 'ebs-subcategory',
  templateUrl: './subcategory.component.html',
  styleUrls: ['./subcategory.component.scss']
})
export class SubcategoryComponent implements OnInit {
  @Input() category: SubCategoryDto;

  constructor() {
  }

  ngOnInit(): void {
  }

}
