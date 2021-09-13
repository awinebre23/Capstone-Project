import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { InvestorEditComponent } from './investor-edit/investor-edit.component';
import { FeedComponent } from './feed.component';
import { MoneyPipe } from 'src/app/shared/money.pipe';


@NgModule({
  declarations: [FeedComponent, FeedItemComponent, MemberEditComponent, InvestorEditComponent, MoneyPipe],
  imports: [
    CommonModule
  ]
})
export class FeedModule { }
