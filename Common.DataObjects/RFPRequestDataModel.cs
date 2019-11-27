using System;
using System.Collections.Generic;
using System.Text;

namespace Common.DataObjects
{
    
    public class Schedule
    {
        public string milestone { get; set; }
        public DateTime scheduleStartDate { get; set; }
        public DateTime scheduleEndDate { get; set; }
        public string remarks { get; set; }
    }

    public class Question
    {
        public string question { get; set; }
        public string answer { get; set; }
    }

    public class Questionnaire
    {
        public string questionnaireArea { get; set; }
        public List<Question> questions { get; set; }
    }

    public class ProposalStatus
    {
        public int RFPRequestID { get; set; }
        public string Date { get; set; }
        public string Status { get; set; }
        public string Accceptance { get; set; }
        public string RFPUserID { get; set; }
    }

    public class RFPRequestDataModel
    {
        public int Id { get; set; }
        public RFPUsersInformation RFPUser { get; set; }
        public string RFPCode { get; set; }
        public string status { get; set; }
        public string requestType { get; set; }
        public string practiceType { get; set; }
        public string practiceLead { get; set; }
        public string customer { get; set; }
        public string location { get; set; }
        public DateTime requestedDate { get; set; }
        public string title { get; set; }
        public string scope { get; set; }
        public string description { get; set; }
        public string additionalInformation { get; set; }
        public List<Schedule> schedule { get; set; }
        public List<Questionnaire> questionnaire { get; set; }
    }

    public class RFPRequestDataGridModel
    {
        public int Id { get; set; }
        public RFPUsersInformation RFPUser { get; set; }
        public string RFPCode { get; set; }
        public string status { get; set; }
        public string requestType { get; set; }       
        public DateTime requestedDate { get; set; }
        public string title { get; set; }
        public string scope { get; set; }
    }
}
