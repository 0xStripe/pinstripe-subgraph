import { EventLog, EventLog1, EventLog2, EventLogEventDataStruct } from "../generated/EventEmitter/EventEmitter";
import { getIdFromEvent, getOrCreateTransaction } from "./entities/common";
import { handleDepositCancelled, handleDepositCreated, handleDepositExecuted } from "./entities/deposit";
import { EventData } from "./utils/event_data";

const EVENT_DEPOSIT_CREATED = "DepositCreated";
const EVENT_DEPOSIT_CANCELLED = "DepositCancelled";
const EVENT_DEPOSIT_EXECUTED = "DepositExecuted";

export function handleEventLog(event: EventLog): void {
}

export function handleEventLog1(event: EventLog1): void {
  let eventName = event.params.eventName;
  let eventData = new EventData(changetype<EventLogEventDataStruct>(event.params.eventData));
  let eventId = getIdFromEvent(event);

  if (eventName == EVENT_DEPOSIT_CREATED) {
    let transaction = getOrCreateTransaction(event);
    handleDepositCreated(eventData, transaction);
    return;
  }

  if (eventName == EVENT_DEPOSIT_CANCELLED) {
    let transaction = getOrCreateTransaction(event);
    handleDepositCancelled(eventData, transaction);
    return;
  }

  if (eventName == EVENT_DEPOSIT_EXECUTED) {
    let transaction = getOrCreateTransaction(event);
    handleDepositExecuted(eventData, transaction);
    return;
  }
}

export function handleEventLog2(event: EventLog2): void {

}
