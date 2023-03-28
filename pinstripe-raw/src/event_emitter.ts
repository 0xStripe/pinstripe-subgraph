import { Address } from "@graphprotocol/graph-ts";
import { EventLog, EventLog1, EventLog2 } from "../generated/EventEmitter/EventEmitter";
import { CancelDeposit, CreateDeposit, ExecuteDeposit } from "../generated/schema";
import { createTransactionIfNotExists, generateIdFromEvent } from "./utils";

const EVENT_DEPOSIT_CREATED = "DepositCreated";
const EVENT_DEPOSIT_CANCELLED = "DepositCancelled";
const EVENT_DEPOSIT_EXECUTED = "DepositExecuted";

export function handleEventLog(event: EventLog): void {
}

export function handleEventLog1(event: EventLog1): void {
  let eventName = event.params.eventName;
  if (eventName == EVENT_DEPOSIT_CREATED) {
    let id = event.params.eventData.bytes32Items.items[0].value.toHexString();
    let createDeposit = CreateDeposit.load(id);

    if (createDeposit == null) {
      createDeposit = new CreateDeposit(id);
      createDeposit.from = event.params.eventData.addressItems.items[0].value.toHexString();
      createDeposit.receiver = event.params.eventData.addressItems.items[1].value.toHexString();
      createDeposit.callbackContract = event.params.eventData.addressItems.items[2].value.toHexString();
      createDeposit.market = event.params.eventData.addressItems.items[3].value.toHexString();
      createDeposit.initialLongToken = event.params.eventData.addressItems.items[4].value.toHexString();
      createDeposit.initialShortToken = event.params.eventData.addressItems.items[5].value.toHexString();
      createDeposit.longTokenSwapPath = event.params.eventData.addressItems.arrayItems[0].value.map<string>(item => item.toHexString());
      createDeposit.shortTokenSwapPath = event.params.eventData.addressItems.arrayItems[1].value.map<string>(item => item.toHexString());
      createDeposit.initialLongTokenAmount = event.params.eventData.uintItems.items[0].value;
      createDeposit.initialShortTokenAmount = event.params.eventData.uintItems.items[1].value;
      createDeposit.minMarketTokens = event.params.eventData.uintItems.items[2].value;
      createDeposit.updatedAtBlocks = event.params.eventData.uintItems.items[3].value.toI32();
      createDeposit.executionFee = event.params.eventData.uintItems.items[4].value;
      createDeposit.callbackGasLimit = event.params.eventData.uintItems.items[5].value;
      createDeposit.shouldUnwrapNativeToken = event.params.eventData.boolItems.items[0].value;
      createDeposit.transaction = createTransactionIfNotExists(event);

      createDeposit.save();
    }

  } else if (eventName == EVENT_DEPOSIT_CANCELLED) {
    let id = event.params.eventData.bytes32Items.items[0].value.toHexString();
    let cancelDeposit = CancelDeposit.load(id);

    if (cancelDeposit == null) {
      cancelDeposit = new CancelDeposit(id);
      cancelDeposit.reason = event.params.eventData.stringItems.items[0].value;
      cancelDeposit.reasonBytes = event.params.eventData.bytesItems.items[0].value;
      // cancelDeposit.transaction = createTransactionIfNotExists(event);

      cancelDeposit.save();
    }
  } else if (eventName == EVENT_DEPOSIT_EXECUTED) {
    let id = event.params.eventData.bytes32Items.items[0].value.toHexString();
    let executeDeposit = ExecuteDeposit.load(id);

    if (executeDeposit == null) {
      executeDeposit = new ExecuteDeposit(id);
      executeDeposit.longTokenAmount = event.params.eventData.uintItems.items[0].value;
      executeDeposit.shortTokenAmount = event.params.eventData.uintItems.items[1].value;
      executeDeposit.receivedMarketTokens = event.params.eventData.uintItems.items[2].value;
      // executeDeposit.transaction = createTransactionIfNotExists(event);

      executeDeposit.save();
    }
  }
}

export function handleEventLog2(event: EventLog2): void {

}
