export class EventStatistics {
    constructor(
      event,
      registeredAttendeesCount,
      checkedInAttendeesCount
    ) {
      this.event = event;
      this.registeredAttendeesCount = registeredAttendeesCount;
      this.checkedInAttendeesCount = checkedInAttendeesCount;
      this.attendancePercentage = registeredAttendeesCount > 0 
        ? (checkedInAttendeesCount / registeredAttendeesCount) * 100 
        : 0;
    }
  }