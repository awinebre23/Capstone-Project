import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedComponent } from './feed.component';
import { MoneyPipe } from 'src/app/shared/money.pipe';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [FeedComponent, FeedItemComponent, ManageComponent, MoneyPipe, ManageComponent],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
