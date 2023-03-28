import { afterAll, clearStore, describe, test, beforeAll, assert, newTypedMockEvent, afterEach } from "matchstick-as/assembly/index";
import { handleMarketCreated } from "../../src/market_factory";
import {
  MarketCreated
} from "../../generated/MarketFactory/MarketFactory";
import { ethereum, Address } from "@graphprotocol/graph-ts";
import { generateIdFromEvent } from "../../src/utils";
import { fakeEthereumAddress } from "./utils";
import { Market } from "../../generated/schema";

const MARKET_ENTITY_TYPE = "Market";

export function newMarketCreatedEvent(marketToken: string, indexToken: string, longToken: string, shortToken: string): MarketCreated {
  let marketCreatedEvent = newTypedMockEvent<MarketCreated>();
  marketCreatedEvent.parameters = new Array();
  let marketTokenParam = new ethereum.EventParam("marketToken", ethereum.Value.fromAddress(Address.fromString(marketToken)));
  let indexTokenParam = new ethereum.EventParam("indexToken", ethereum.Value.fromAddress(Address.fromString(indexToken)));
  let longTokenParam = new ethereum.EventParam("longToken", ethereum.Value.fromAddress(Address.fromString(longToken)));
  let shortTokenParam = new ethereum.EventParam("shortToken", ethereum.Value.fromAddress(Address.fromString(shortToken)));

  marketCreatedEvent.parameters.push(marketTokenParam);
  marketCreatedEvent.parameters.push(indexTokenParam);
  marketCreatedEvent.parameters.push(longTokenParam);
  marketCreatedEvent.parameters.push(shortTokenParam);

  return marketCreatedEvent;
}


describe("handleMarketCreated", () => {
  afterEach(() => {
    clearStore();
  });

  describe("When receive MarketCreated event", () => {
    test("it should create a new entity", () => {
      let marketToken = fakeEthereumAddress();
      let indexToken = fakeEthereumAddress();
      let longToken = fakeEthereumAddress();
      let shortToken = fakeEthereumAddress();
      let event = newMarketCreatedEvent(marketToken, indexToken, longToken, shortToken);
      let entityId = generateIdFromEvent(event);

      handleMarketCreated(event);

      assert.entityCount(MARKET_ENTITY_TYPE, 1);
      let market = Market.load(entityId);
      assert.assertNotNull(market);
      assert.addressEquals(Address.fromString(market!.marketToken), Address.fromString(marketToken));
      assert.addressEquals(Address.fromString(market!.indexToken), Address.fromString(indexToken));
      assert.addressEquals(Address.fromString(market!.longToken), Address.fromString(longToken));
      assert.addressEquals(Address.fromString(market!.shortToken), Address.fromString(shortToken));
    });
  });
})
