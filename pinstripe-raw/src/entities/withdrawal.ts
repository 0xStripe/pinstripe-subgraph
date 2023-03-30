import { Transaction, Withdrawal } from "../../generated/schema";
import { EventData } from "../utils/event_data";
import { ORDER_STATUS_CANCELLED, ORDER_STATUS_CREATED, ORDER_STATUS_EXECUTED } from "./common";

export function handleWithdrawalCreated(eventData: EventData, transaction: Transaction): Withdrawal {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let withdrawal = new Withdrawal(key);

  withdrawal.account = eventData.getAddressItemString("account")!;
  withdrawal.receiver = eventData.getAddressItemString("receiver")!;
  withdrawal.callbackContract = eventData.getAddressItemString("callbackContract")!;
  withdrawal.market = eventData.getAddressItemString("market")!;
  withdrawal.marketTokenAmount = eventData.getUintItem("marketTokenAmount")!;
  withdrawal.minLongTokenAmount = eventData.getUintItem("minLongTokenAmount")!;
  withdrawal.minShortTokenAmount = eventData.getUintItem("minShortTokenAmount")!;
  withdrawal.updatedAtBlock = eventData.getUintItem("updatedAtBlock")!;
  withdrawal.executionFee = eventData.getUintItem("executionFee")!;
  withdrawal.callbackGasLimit = eventData.getUintItem("callbackGasLimit")!;
  withdrawal.shouldUnwrapNativeToken = eventData.getBoolItem("shouldUnwrapNativeToken");
  withdrawal.createdTxn = transaction.id;
  withdrawal.status = ORDER_STATUS_CREATED;
  withdrawal.save();

  return withdrawal;
}

export function handleWithdrawalCancelled(eventData: EventData, transaction: Transaction): Withdrawal {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let withdrawal = Withdrawal.load(key);

  if (withdrawal == null) {
    throw new Error("withdrawal not found " + key);
  }

  withdrawal.status = ORDER_STATUS_CANCELLED;
  withdrawal.cancelledReason = eventData.getStringItem("reason")!;
  withdrawal.cancelledReasonBytes = eventData.getBytesItem("reasonBytes")!;
  withdrawal.cancelledTxn = transaction.id;
  withdrawal.save();
  return withdrawal;
}

export function handleWithdrawalExecuted(eventData: EventData, transaction: Transaction): Withdrawal {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let withdrawal = Withdrawal.load(key);

  if (withdrawal == null) {
    throw new Error("withdrawal not found " + key);
  }

  withdrawal.status = ORDER_STATUS_EXECUTED;
  withdrawal.executedTxn = transaction.id;
  withdrawal.save();
  return withdrawal;
}
