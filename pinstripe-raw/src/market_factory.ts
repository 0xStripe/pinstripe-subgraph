import { BigInt, ethereum } from "@graphprotocol/graph-ts"
import {
  MarketFactory,
  MarketCreated
} from "../generated/MarketFactory/MarketFactory"
import { Market } from "../generated/schema"

export function handleMarketCreated(event: MarketCreated): void {
  let id = _generateIdFromEvent(event);

  let market = new Market(id);
  market.marketToken = event.params.marketToken.toHexString();
  market.indexToken = event.params.indexToken.toHexString();
  market.longToken = event.params.longToken.toHexString();
  market.shortToken = event.params.shortToken.toHexString();
  market.blockNumber = event.block.number.toI32();
  market.timestamp = event.block.timestamp.toI32();

  market.save();
}

function _generateIdFromEvent(event: ethereum.Event): string {
  return event.transaction.hash.toHexString() + ":" + event.logIndex.toString();
}
