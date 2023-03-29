import { afterAll, clearStore, describe, test, beforeAll, assert, newTypedMockEvent, afterEach, logStore } from "matchstick-as/assembly/index";
import { log } from "matchstick-as/assembly/log";
import { EventLog1 } from "../../generated/EventEmitter/EventEmitter";
import { Deposit } from "../../generated/schema";
import { handleEventLog1 } from "../../src/event_emitter";
import { Bytes, ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
import { fakeEthereumAddress, ZERO_ADDRESS, EventLogData } from "./utils";
import { DEPOSIT_ENTITY_TYPE, TRANSACTION_ENTITY_TYPE } from "./types";

class DepositCreatedEventParams {
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

class DepositCancelledEventParams {
  key: Bytes;
  reason: string;
  reasonBytes: Bytes;

  constructor(key: Bytes) {
    this.key = key;
    this.reason = "";
    this.reasonBytes = Bytes.fromUTF8("");
  }
}

class DepositExecutedEventParams {
  key: Bytes;
  longTokenAmount: BigInt;
  shortTokenAmount: BigInt;
  receivedMarketTokens: BigInt;

  constructor(key: Bytes) {
    this.key = key;
    this.longTokenAmount = BigInt.fromString("0");
    this.shortTokenAmount = BigInt.fromString("0");
    this.receivedMarketTokens = BigInt.fromString("0");
  }
}

function newDepositCreatedEventData(inputs: DepositCreatedEventParams): EventLogData {
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

function newDepositCancelledEventData(inputs: DepositCancelledEventParams): EventLogData {
  let result = new EventLogData();

  result.bytes32Items.initItems(1);
  result.bytes32Items.setItem(0, "key", inputs.key);

  result.stringItems.initItems(1);
  result.stringItems.setItem(0, "reason", inputs.reason);

  result.bytesItems.initItems(1);
  result.bytesItems.setItem(0, "reasonBytes", inputs.reasonBytes);

  return result;
}

function newDepositExecutedEventData(inputs: DepositExecutedEventParams): EventLogData {
  let result = new EventLogData();
  result.bytes32Items.initItems(1);
  result.bytes32Items.setItem(0, "key", inputs.key);

  result.uintItems.initItems(3);
  result.uintItems.setItem(0, "longTokenAmount", inputs.longTokenAmount);
  result.uintItems.setItem(1, "shortTokenAmount", inputs.shortTokenAmount);
  result.uintItems.setItem(2, "receivedMarketTokens", inputs.receivedMarketTokens);

  return result;
}

function newDepositCreatedEvent(inputs: DepositCreatedEventParams): EventLog1 {
  let createDepositEvent = newTypedMockEvent<EventLog1>();
  createDepositEvent.parameters = new Array();

  let msgSender = fakeEthereumAddress();
  let msgSenderParam = new ethereum.EventParam("msgSender", ethereum.Value.fromAddress(Address.fromString(msgSender)));
  let eventNameHashParam = new ethereum.EventParam("eventNameHash", ethereum.Value.fromBytes(Bytes.fromUTF8("DepositCreated")));
  let eventNameParam = new ethereum.EventParam("eventName", ethereum.Value.fromString("DepositCreated"));
  let topic1Param = new ethereum.EventParam("topic1", ethereum.Value.fromBytes(Bytes.fromHexString(msgSender)));
  let eventDataParam = new ethereum.EventParam("eventData", newDepositCreatedEventData(inputs).toEthereumValue());

  createDepositEvent.parameters.push(msgSenderParam);
  createDepositEvent.parameters.push(eventNameHashParam);
  createDepositEvent.parameters.push(eventNameParam);
  createDepositEvent.parameters.push(topic1Param);
  createDepositEvent.parameters.push(eventDataParam);
  return createDepositEvent;
}

function newDepositCancelledEvent(inputs: DepositCancelledEventParams): EventLog1 {
  let event = newTypedMockEvent<EventLog1>();
  event.parameters = new Array();

  let msgSender = fakeEthereumAddress();
  let msgSenderParam = new ethereum.EventParam("msgSender", ethereum.Value.fromAddress(Address.fromString(msgSender)));
  let eventNameHashParam = new ethereum.EventParam("eventNameHash", ethereum.Value.fromBytes(Bytes.fromUTF8("DepositCancelled")));
  let eventNameParam = new ethereum.EventParam("eventName", ethereum.Value.fromString("DepositCancelled"));
  let topic1Param = new ethereum.EventParam("topic1", ethereum.Value.fromBytes(Bytes.fromHexString(msgSender)));
  let eventDataParam = new ethereum.EventParam("eventData", newDepositCancelledEventData(inputs).toEthereumValue());

  event.parameters.push(msgSenderParam);
  event.parameters.push(eventNameHashParam);
  event.parameters.push(eventNameParam);
  event.parameters.push(topic1Param);
  event.parameters.push(eventDataParam);
  return event;
}

function newDepositExecutedEvent(inputs: DepositExecutedEventParams): EventLog1 {
  let event = newTypedMockEvent<EventLog1>();
  event.parameters = new Array();

  let msgSender = fakeEthereumAddress();
  let msgSenderParam = new ethereum.EventParam("msgSender", ethereum.Value.fromAddress(Address.fromString(msgSender)));
  let eventNameHashParam = new ethereum.EventParam("eventNameHash", ethereum.Value.fromBytes(Bytes.fromUTF8("DepositExecuted")));
  let eventNameParam = new ethereum.EventParam("eventName", ethereum.Value.fromString("DepositExecuted"));
  let topic1Param = new ethereum.EventParam("topic1", ethereum.Value.fromBytes(Bytes.fromHexString(msgSender)));
  let eventDataParam = new ethereum.EventParam("eventData", newDepositExecutedEventData(inputs).toEthereumValue());

  event.parameters.push(msgSenderParam);
  event.parameters.push(eventNameHashParam);
  event.parameters.push(eventNameParam);
  event.parameters.push(topic1Param);
  event.parameters.push(eventDataParam);
  return event;
}

describe("handleDeposit", () => {
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

      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 1);

      let deposit = Deposit.load(inputs.key.toHexString());
      assert.assertNotNull(deposit);
      assert.addressEquals(Address.fromString(deposit!.from), inputs.account);
      assert.addressEquals(Address.fromString(deposit!.receiver), inputs.receiver);
      assert.addressEquals(Address.fromString(deposit!.callbackContract), inputs.callbackContract);
      assert.addressEquals(Address.fromString(deposit!.initialLongToken), inputs.initialLongToken);
      assert.addressEquals(Address.fromString(deposit!.initialShortToken), inputs.initialShortToken);
      assert.arrayEquals(deposit!.longTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(Address.fromString(item))), inputs.longTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(item)));
      assert.arrayEquals(deposit!.shortTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(Address.fromString(item))), inputs.shortTokenSwapPath.map<ethereum.Value>(item => ethereum.Value.fromAddress(item)));
      assert.bigIntEquals(deposit!.initialLongTokenAmount, inputs.initialLongTokenAmount);
      assert.bigIntEquals(deposit!.initialShortTokenAmount, inputs.initialShortTokenAmount);
      assert.bigIntEquals(deposit!.minMarketTokens, inputs.minMarketTokens);
      assert.bigIntEquals(deposit!.updatedAtBlocks, inputs.updatedAtBlock);
      assert.bigIntEquals(deposit!.executionFee, inputs.executionFee);
      assert.bigIntEquals(deposit!.callbackGasLimit, inputs.callbackGasLimit);
      assert.booleanEquals(deposit!.shouldUnwrapNativeToken, inputs.shouldUnwrapNativeToken);
      assert.stringEquals(deposit!.status, "Created");
    });

    test("it should not create a new entity with duplicated key", () => {
      let inputs = new DepositCreatedEventParams(Bytes.fromI32(1));
      let event = newDepositCreatedEvent(inputs);

      handleEventLog1(event);

      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);

      let duplicatedEvent = newDepositCreatedEvent(inputs);

      handleEventLog1(duplicatedEvent);
      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 1);
    });
  });


  describe("When receive a new EventLog1 event with event name DepositCancelled", () => {
    test("it should throw error if no Deposit is created", () => {
      let inputs = new DepositCancelledEventParams(Bytes.fromI32(1));
      let event = newDepositCancelledEvent(inputs);

      handleEventLog1(event);

      assert.entityCount(DEPOSIT_ENTITY_TYPE, 0);
    }, true);


    test("it should update Deposit entity if Deposit entity existed", () => {
      let depositCreatedParams = new DepositCreatedEventParams(Bytes.fromI32(1));
      let depositCreatedEvent = newDepositCreatedEvent(depositCreatedParams);
      depositCreatedEvent.logIndex = BigInt.fromString("1");

      handleEventLog1(depositCreatedEvent);
      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 1);

      let depositCancelledParams = new DepositCancelledEventParams(Bytes.fromI32(1));
      depositCancelledParams.reason = "Test reason";
      let depositCancelledEvent = newDepositCancelledEvent(depositCancelledParams);
      depositCancelledEvent.logIndex = BigInt.fromString("2");

      handleEventLog1(depositCancelledEvent);
      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 2);

      let deposit = Deposit.load(depositCreatedParams.key.toHexString());
      assert.assertNotNull(deposit);
      assert.stringEquals(deposit!.status, "Cancelled");
      assert.stringEquals(deposit!.cancelledReason!, depositCancelledParams.reason);
      assert.bytesEquals(deposit!.cancelledReasonBytes!, depositCancelledParams.reasonBytes);
      assert.assertNotNull(deposit!.cancelledTxn);
    });
  });

  describe("When receive a new EventLog1 event with event name DepositExecuted", () => {
    test("it should throw error if no Deposit is created", () => {
      let inputs = new DepositExecutedEventParams(Bytes.fromI32(1));
      let event = newDepositExecutedEvent(inputs);

      handleEventLog1(event);

      assert.entityCount(DEPOSIT_ENTITY_TYPE, 0);
    }, true);


    test("it should update Deposit entity if Deposit entity existed", () => {
      let depositCreatedParams = new DepositCreatedEventParams(Bytes.fromI32(1));
      let depositCreatedEvent = newDepositCreatedEvent(depositCreatedParams);
      depositCreatedEvent.logIndex = BigInt.fromString("1");

      handleEventLog1(depositCreatedEvent);
      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 1);

      let depositExecutedParams = new DepositExecutedEventParams(Bytes.fromI32(1));
      let depositExecutedEvent = newDepositExecutedEvent(depositExecutedParams);
      depositExecutedEvent.logIndex = BigInt.fromString("2");

      handleEventLog1(depositExecutedEvent);
      assert.entityCount(DEPOSIT_ENTITY_TYPE, 1);
      assert.entityCount(TRANSACTION_ENTITY_TYPE, 2);

      let deposit = Deposit.load(depositCreatedParams.key.toHexString());
      assert.assertNotNull(deposit);
      assert.stringEquals(deposit!.status, "Executed");
      assert.bigIntEquals(deposit!.executedLongTokenAmount!, depositExecutedParams.longTokenAmount);
      assert.bigIntEquals(deposit!.executedShortTokenAmount!, depositExecutedParams.shortTokenAmount);
      assert.bigIntEquals(deposit!.receivedMarketTokens!, depositExecutedParams.receivedMarketTokens)
      assert.assertNotNull(deposit!.executedTxn);
    });
  });
})
