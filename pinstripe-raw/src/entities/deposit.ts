import { Deposit, Transaction } from "../../generated/schema";
import { EventData } from "../utils/event_data";
import { ORDER_STATUS_CREATED, ORDER_STATUS_EXECUTED, ORDER_STATUS_CANCELLED } from "./common";

export function handleDepositCreated(eventData: EventData, transaction: Transaction): Deposit {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let deposit = new Deposit(key);

  deposit.from = eventData.getAddressItemString("account")!;
  deposit.receiver = eventData.getAddressItemString("receiver")!;
  deposit.callbackContract = eventData.getAddressItemString("callbackContract")!;
  deposit.market = eventData.getAddressItemString("market")!;
  deposit.initialLongToken = eventData.getAddressItemString("initialLongToken")!;
  deposit.initialShortToken = eventData.getAddressItemString("initialShortToken")!;
  deposit.longTokenSwapPath = eventData.getAddressArrayItemString("longTokenSwapPath")!;
  deposit.shortTokenSwapPath = eventData.getAddressArrayItemString("shortTokenSwapPath")!;
  deposit.initialLongTokenAmount = eventData.getUintItem("initialLongTokenAmount")!;
  deposit.initialShortTokenAmount = eventData.getUintItem("initialShortTokenAmount")!;
  deposit.minMarketTokens = eventData.getUintItem("minMarketTokens")!;
  deposit.updatedAtBlock = eventData.getUintItem("updatedAtBlock")!;
  deposit.executionFee = eventData.getUintItem("executionFee")!;
  deposit.callbackGasLimit = eventData.getUintItem("callbackGasLimit")!;
  deposit.shouldUnwrapNativeToken = eventData.getBoolItem("shouldUnwrapNativeToken");
  deposit.createdTxn = transaction.id;
  deposit.status = ORDER_STATUS_CREATED;
  deposit.save();

  return deposit;
}

export function handleDepositCancelled(eventData: EventData, transaction: Transaction): Deposit {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let deposit = Deposit.load(key);

  if (deposit == null) {
    throw new Error("deposit not found " + key);
  }
  deposit.status = ORDER_STATUS_CANCELLED;
  deposit.cancelledReason = eventData.getStringItem("reason")!;
  deposit.cancelledReasonBytes = eventData.getBytesItem("reasonBytes")!;
  deposit.cancelledTxn = transaction.id;

  deposit.save();

  return deposit;
}

export function handleDepositExecuted(eventData: EventData, transaction: Transaction): Deposit {
  let key = eventData.getBytes32Item("key")!.toHexString();

  let deposit = Deposit.load(key);

  if (deposit == null) {
    throw new Error("deposit not found " + key);
  }
  deposit.status = ORDER_STATUS_EXECUTED;
  deposit.executedLongTokenAmount = eventData.getUintItem("longTokenAmount")!;
  deposit.executedShortTokenAmount = eventData.getUintItem("shortTokenAmount")!;
  deposit.receivedMarketTokens = eventData.getUintItem("receivedMarketTokens")!;
  deposit.executedTxn = transaction.id;

  deposit.save();

  return deposit;
}
