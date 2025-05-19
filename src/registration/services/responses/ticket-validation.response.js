export class TicketValidationResponse {
  static RESULT = {
    INVALID: 'INVALID',
    ALREADY_CHECKED_IN: 'ALREADY_CHECKED_IN',
    SUCCESS: 'SUCCESS'
  };

  constructor(result, attendee = null, event = null) {
    this.result = result;
    this.attendee = attendee;
    this.event = event;
  }

  isValid() {
    return this.result !== TicketValidationResponse.RESULT.INVALID;
  }

  isAlreadyCheckedIn() {
    return this.result === TicketValidationResponse.RESULT.ALREADY_CHECKED_IN;
  }

  isSuccess() {
    return this.result === TicketValidationResponse.RESULT.SUCCESS;
  }
}
