import {
  MarketCreated
} from "../generated/MarketFactory/MarketFactory"
import { Market } from "../generated/schema"
import { getIdFromEvent } from "./entities/common";

export function handleMarketCreated(event: MarketCreated): void {
  let id = getIdFromEvent(event);

  let market = new Market(id);
  market.marketToken = event.params.marketToken.toHexString();
  market.indexToken = event.params.indexToken.toHexString();
  market.longToken = event.params.longToken.toHexString();
  market.shortToken = event.params.shortToken.toHexString();
  market.blockNumber = event.block.number.toI32();
  market.timestamp = event.block.timestamp.toI32();

  market.save();
}


