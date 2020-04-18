import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'showaoursupport';
  onClickSubmit(formData) {
   alert('Your Name is : ' + formData.name);
}
}
