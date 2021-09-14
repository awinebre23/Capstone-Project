import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedItemComponent } from './feed-item/feed-item.component';
import { FeedComponent } from './feed.component';
import { ManageComponent } from './manage/manage.component';
import { InvestorManageComponent } from './manage/investor-manage/investor-manage.component';
import { MemberManageComponent } from './manage/member-manage/member-manage.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FeedComponent,
    FeedItemComponent,
    ManageComponent,
    InvestorManageComponent,
    MemberManageComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class FeedModule { }
