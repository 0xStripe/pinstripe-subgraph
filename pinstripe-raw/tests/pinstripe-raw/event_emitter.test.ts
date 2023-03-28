import { afterAll, clearStore, describe, test, beforeAll, assert, newTypedMockEvent, afterEach } from "matchstick-as/assembly/index";
import { log } from "matchstick-as/assembly/log";
import { EventLog1 } from "../../generated/EventEmitter/EventEmitter";
import { CreateDeposit } from "../../generated/schema";
import { handleEventLog1 } from "../../src/event_emitter";
import { Bytes, ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { fakeEthereumAddress, ZERO_ADDRESS, EventLogData } from "./utils";

export const CREATE_DEPOSIT_ENTITY_TYPE = "CreateDeposit";

export class DepositCreatedEventParams {
  key: Bytes;
  account: Address;
  receiver: Address;
  callbackContract: Address;
  market: Address;
  initialLongToken: Address;
  initialShortToken: Address;
  longTokenSwapPath: Array<Address>;
  shortTokenSwapPath: Array<Address>;
  initialLongTokenAmount: BigInt;
  initialShortTokenAmount: BigInt;
  minMarketTokens: BigInt;
  updatedAtBlock: BigInt;
  executionFee: BigInt;
  callbackGasLimit: BigInt;
  shouldUnwrapNativeToken: boolean;

  constructor(key: Bytes) {
    this.key = key;
    this.account = Address.fromString(fakeEthereumAddress());
    this.receiver = Address.fromString(fakeEthereumAddress());
    this.callbackContract = Address.fromString(fakeEthereumAddress());
    this.market = Address.fromString(fakeEthereumAddress());
    this.initialLongToken = Address.fromString(fakeEthereumAddress());
    this.initialShortToken = Address.fromString(fakeEthereumAddress());
    this.longTokenSwapPath = new Array();
    this.shortTokenSwapPath = new Array();
    this.initialLongTokenAmount = BigInt.fromString("0");
    this.initialShortTokenAmount = BigInt.fromString("0");
    this.minMarketTokens = BigInt.fromString("0");
    this.updatedAtBlock = BigInt.fromString("0");
    this.executionFee = BigInt.fromString("0");
    this.callbackGasLimit = BigInt.fromString("0");
    this.shouldUnwrapNativeToken = false;
  }
}

export function newEventLogData(inputs: DepositCreatedEventParams): EventLogData {
  let result = new EventLogData();

  result.addressItems.initItems(6);
  result.addressItems.setItem(0, "account", inputs.account);
  result.addressItems.setItem(1, "receiver", inputs.receiver);
  result.addressItems.setItem(2, "callbackContract", inputs.callbackContract);
  result.addressItems.setItem(3, "market", inputs.market);
  result.addressItems.setItem(4, "initialLongToken", inputs.initialLongToken);
  result.addressItems.setItem(5, "initialShortToken", inputs.initialShortToken);

  result.addressItems.initArrayItems(2);
  result.addressItems.setArrayItems(0, "longTokenSwapPath", inputs.longTokenSwapPath);
  result.addressItems.setArrayItems(1, "shortTokenSwapPath", inputs.shortTokenSwapPath);

  result.uintItems.initArrayItems(6);
  result.uintItems.setItem(0, "initialLongTokenAmount", inputs.initialLongTokenAmount);
  result.uintItems.setItem(1, "initialShortTokenAmount", inputs.initialShortTokenAmount);
  result.uintItems.setItem(2, "minMarketTokens", inputs.minMarketTokens);
  result.uintItems.setItem(3, "updatedAtBlock", inputs.updatedAtBlock);
  result.uintItems.setItem(4, "executionFee", inputs.executionFee);
  result.uintItems.setItem(5, "callbackGasLimit", inputs.callbackGasLimit);

  result.boolItems.initItems(1);
  result.boolItems.setItem(0, "shouldUnwrapNativeToken", inputs.shouldUnwrapNativeToken);

  result.bytes32Items.initItems(1);
  result.bytes32Items.setItem(0, "key", inputs.key);

  return result;
}

export function newDepositCreatedEvent(inputs: DepositCreatedEventParams): EventLog1 {
  let createDepositEvent = newTypedMockEvent<EventLog1>();
  createDepositEvent.parameters = new Array();

  let msgSender = fakeEthereumAddress();
  let msgSenderParam = new ethereum.EventParam("msgSender", ethereum.Value.fromAddress(Address.fromString(msgSender)));
  let eventNameHashParam = new ethereum.EventParam("eventNameHash", ethereum.Value.fromBytes(Bytes.fromUTF8("DepositCreated")));
  let eventNameParam = new ethereum.EventParam("eventName", ethereum.Value.fromString("DepositCreated"));
  let topic1Param = new ethereum.EventParam("topic1", ethereum.Value.fromBytes(Bytes.fromHexString(msgSender)));
  let eventDataParam = new ethereum.EventParam("eventData", newEventLogData(inputs).toEthereumValue());

  createDepositEvent.parameters.push(msgSenderParam);
  createDepositEvent.parameters.push(eventNameHashParam);
  createDepositEvent.parameters.push(eventNameParam);
  createDepositEvent.parameters.push(topic1Param);
  createDepositEvent.parameters.push(eventDataParam);
  return createDepositEvent;
}

describe("handleDepositCreated", () => {
  afterEach(() => {
    clearStore();
  });

  describe("When receive new EventLog1 event with event name DepositCreated", () => {
    test("it should create a new entity", () => {
      let inputs = new DepositCreatedEventParams(Bytes.fromI32(1));
      inputs.initialLongTokenAmount = BigInt.fromString('1000000000000000000');
      inputs.initialShortTokenAmount = BigInt.fromString("1000000000000000000");
      inputs.minMarketTokens = BigInt.fromString("1000000000000000000");
      inputs.updatedAtBlock = BigInt.fromString("10");
      inputs.executionFee = BigInt.fromString("50000000000000000")
      inputs.callbackGasLimit = BigInt.fromString("210000");
      inputs.shouldUnwrapNativeToken = true;

      let event = newDepositCreatedEvent(inputs);

      handleEventLog1(event);

      assert.entityCount(CREATE_DEPOSIT_ENTITY_TYPE, 1);
      let createDeposit = CreateDeposit.load(inputs.key.toHexString());
      assert.assertNotNull(createDeposit);
      assert.addressEquals(Address.fromString(createDeposit!.from), inputs.account);
      assert.addressEquals(Address.fromString(createDeposit!.receiver), inputs.receiver);
      assert.addressEquals(Address.fromString(createDeposit!.callbackContract), inputs.callbackContract);
      assert.addressEquals(Address.fromString(createDeposit!.initialLongToken), inputs.initialLongToken);
      assert.addressEquals(Address.fromString(createDeposit!.initialShortToken), inputs.initialShortToken);
      assert.arrayEquals(createDeposit!.longTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(Address.fromString(item))), inputs.longTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(item)));
      assert.arrayEquals(createDeposit!.shortTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(Address.fromString(item))), inputs.shortTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(item)));
      assert.bigIntEquals(createDeposit!.initialLongTokenAmount, inputs.initialLongTokenAmount);
      assert.bigIntEquals(createDeposit!.initialShortTokenAmount, inputs.initialShortTokenAmount);
      assert.bigIntEquals(createDeposit!.minMarketTokens, inputs.minMarketTokens);
      assert.i32Equals(createDeposit!.updatedAtBlocks, inputs.updatedAtBlock.toI32());
      assert.bigIntEquals(createDeposit!.executionFee, inputs.executionFee);
      assert.bigIntEquals(createDeposit!.callbackGasLimit, inputs.callbackGasLimit);
      assert.booleanEquals(createDeposit!.shouldUnwrapNativeToken, inputs.shouldUnwrapNativeToken);
    });

    test("it should not create a new entity with duplicated key", () => {
      let inputs = new DepositCreatedEventParams(Bytes.fromI32(1));
      let event = newDepositCreatedEvent(inputs);

      handleEventLog1(event);

      assert.entityCount(CREATE_DEPOSIT_ENTITY_TYPE, 1);

      let duplicatedEvent = newDepositCreatedEvent(inputs);

      handleEventLog1(duplicatedEvent);
      assert.entityCount(CREATE_DEPOSIT_ENTITY_TYPE, 1);
    });
  });
})
