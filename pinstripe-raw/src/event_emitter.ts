import { EventLog, EventLog1, EventLog2, EventLogEventDataStruct } from "../generated/EventEmitter/EventEmitter";
import { getIdFromEvent, getOrCreateTransaction } from "./entities/common";
import { handleDepositCancelled, handleDepositCreated, handleDepositExecuted } from "./entities/deposit";
import { handleWithdrawalCancelled, handleWithdrawalCreated, handleWithdrawalExecuted } from "./entities/withdrawal";
import { EventData } from "./utils/event_data";

const EVENT_DEPOSIT_CREATED = "DepositCreated";
const EVENT_DEPOSIT_CANCELLED = "DepositCancelled";
const EVENT_DEPOSIT_EXECUTED = "DepositExecuted";
const EVENT_WITHDRAWAL_CREATED = "WithdrawalCreated";
const EVENT_WITHDRAWAL_CANCELLED = "WithdrawalCancelled";
const EVENT_WITHDRAWAL_EXECUTED = "WithdrawalExecuted";

export function handleEventLog(event: EventLog): void {
  let eventName = event.params.eventName;
  let eventData = new EventData(changetype<EventLogEventDataStruct>(event.params.eventData));

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

  if (eventName == EVENT_WITHDRAWAL_CANCELLED) {
    let transaction = getOrCreateTransaction(event);
    handleWithdrawalCancelled(eventData, transaction);
    return;
  }

  if (eventName == EVENT_WITHDRAWAL_EXECUTED) {
    let transaction = getOrCreateTransaction(event);
    handleWithdrawalExecuted(eventData, transaction);
    return;
  }

}

export function handleEventLog1(event: EventLog1): void {
  let eventName = event.params.eventName;
  let eventData = new EventData(changetype<EventLogEventDataStruct>(event.params.eventData));

  if (eventName == EVENT_DEPOSIT_CREATED) {
    let transaction = getOrCreateTransaction(event);
    handleDepositCreated(eventData, transaction);
    return;
  }

  if (eventName == EVENT_WITHDRAWAL_CREATED) {
    let transaction = getOrCreateTransaction(event);
    handleWithdrawalCreated(eventData, transaction);
    return;
  }

}

export function handleEventLog2(event: EventLog2): void {

}
