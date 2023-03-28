import { ethereum } from "@graphprotocol/graph-ts";
import { Transaction } from "../generated/schema";

// generate unique ID
export function generateIdFromEvent(event: ethereum.Event): string {
  return event.transaction.hash.toHexString() + ":" + event.logIndex.toString();
}

export function createTransactionIfNotExists(event: ethereum.Event): string {
  let id = generateIdFromEvent(event);
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

  return id;
}
