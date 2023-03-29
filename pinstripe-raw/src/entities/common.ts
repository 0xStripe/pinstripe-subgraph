import { ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from "../../generated/schema";

// generate unique ID
export function getIdFromEvent(event: ethereum.Event): string {
  return event.transaction.hash.toHexString() + ":" + event.logIndex.toString();
}

export function getOrCreateTransaction(event: ethereum.Event): Transaction {
  let id = getIdFromEvent(event);
  let entity = Transaction.load(id);

  if (entity == null) {
    entity = new Transaction(id);
    entity.transactionHash = event.transaction.hash.toHexString();
    entity.transactionIndex = event.transaction.index.toI32();
    entity.logIndex = event.logIndex.toI32();
    entity.timestamp = event.block.timestamp.toI32();
    entity.blockNumber = event.block.number.toI32();
    entity.from = event.transaction.from.toHexString();
    if (event.transaction.to) {
      entity.to = event.transaction.to!.toHexString();
    } else {
      entity.to = "";
    }
    entity.save();
  }

  return entity as Transaction;
}

export const ORDER_STATUS_CREATED = "Created";
export const ORDER_STATUS_CANCELLED = "Cancelled";
export const ORDER_STATUS_EXECUTED = "Executed";
