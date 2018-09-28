import { Component, OnInit } from '@angular/core';
import {FeedbackManagementService} from 'src/app/admin/Shared/feedback-management.service';
import { Global } from 'src/app/Shared/global';
import {UserRating} from 'src/app/Shared/user-rating';
import {FeedbackDetails} from 'src/app/admin/Shared/FeedbackDetails';
@Component({
  selector: 'app-feedback-management',
  templateUrl: './feedback-management.component.html',
  styleUrls: ['./feedback-management.component.css']
})
export class FeedbackManagementComponent implements OnInit {
  feedback=null;
  editFeedback=null;
  APIPATH=this.global.WebApiPath;  
  feedupdate:UserRating=new UserRating();
  public id:number;
  p:number = 1;
startRating=[1,2,3,4,5];
  constructor(private global: Global, private feedbackManagementService:FeedbackManagementService) { }

  ngOnInit() {
    this.getFeedbackdetails();
  }
  getFeedbackdetails()
  {
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Fetching Feedbacks....";
    this.feedbackManagementService.getFeedbackDetailsService().subscribe(data=> {
      this.feedback=data
      console.log(this.feedback);
      document.getElementById("loading_text").innerHTML="Feedbacks sucessfully fetched....";
      setTimeout(()=>{
        document.getElementById("loading_div").style.display="none";
      },1000);
    });
  }
  EditFeedbacks(Fid:number)
  {
    this.id=Fid;
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Intiating Your Feedback Edit...";
    this.feedbackManagementService.getFeedbackbyId(Fid).subscribe(data=>{
      document.getElementById("loading_div").style.display="none";
      document.getElementById("loading_text").innerHTML="";
      document.getElementById("feedbackEditModal").style.display="block";
      this.editFeedback=data;
      this.editFeedback.reviews=data[0].reviews;
    });
  }
  closeEdit(){
    document.getElementById("feedbackEditModal").style.display="none";
  }
  UpdateFeedbackReset(){
  this.editFeedback=null;
  }
  UpdateFeedbacks()
  {if(confirm("Are you sure to update???"))
  {
    
    document.getElementById("feedbackEditModal").style.display="none";
    document.getElementById("loading_div").style.display="block";
    document.getElementById("loading_text").innerHTML="Intiating Your Request....";
    this.editFeedback[0].reviews=this.editFeedback.reviews;
      this.feedbackManagementService.UpdateFeedbacks(this.editFeedback[0]).subscribe(data=>{
        var result=data;
        console.log(result);
        document.getElementById("loading_text").innerHTML=result;
        setTimeout(()=>{
          document.getElementById("loading_div").style.display="none";
          this.getFeedbackdetails();
          this.ngOnInit();
        },1000); 
        this.UpdateFeedbackReset();
      })
    }
  }
  DeleteFeedback(Fid:number)
  {
if(confirm("Are you sure to delete???"))
  {
    this.feedbackManagementService.DeleteFeedbacks(Fid).subscribe(data=>{
      this.ngOnInit();
     
    })
  }
  }


}
