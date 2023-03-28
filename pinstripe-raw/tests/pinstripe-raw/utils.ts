import { EventLog1EventDataBytes32ItemsItemsStruct, EventLog1EventDataAddressItemsStruct, EventLog1EventDataAddressItemsItemsStruct, EventLog1EventDataUintItemsItemsStruct, EventLog1EventDataAddressItemsArrayItemsStruct, EventLog1EventDataBoolItemsItemsStruct } from "../../generated/EventEmitter/EventEmitter";
import { Bytes, ethereum, Address, BigInt } from "@graphprotocol/graph-ts";
export const ZERO_ADDRESS = Address.fromHexString("0x0000000000000000000000000000000000000000");

export function fakeEthereumAddress(): string {
  return "0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7";
}

export class EventLogData {
  addressItems: AddressItems;
  uintItems: UintItems;
  intItems: IntItems;
  boolItems: BoolItems;
  bytes32Items: Bytes32Items;
  bytesItems: BytesItems;
  stringItems: StringItems;

  constructor() {
    this.addressItems = new AddressItems();
    this.uintItems = new UintItems();
    this.intItems = new IntItems();
    this.boolItems = new BoolItems();
    this.bytes32Items = new Bytes32Items();
    this.bytesItems = new BytesItems();
    this.stringItems = new StringItems();
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(this.addressItems.toEthereumValue())
    tuple.push(this.uintItems.toEthereumValue())
    tuple.push(this.intItems.toEthereumValue())
    tuple.push(this.boolItems.toEthereumValue())
    tuple.push(this.bytes32Items.toEthereumValue())
    tuple.push(this.bytesItems.toEthereumValue())
    tuple.push(this.stringItems.toEthereumValue())
    return ethereum.Value.fromTuple(tuple);
  }
}

export class AddressItems {
  items: Array<AddressKeyValue>;
  arrayItems: Array<AddressArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: Address): void {
    this.items[index] = new AddressKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<Address>): void {
    this.arrayItems[index] = new AddressArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class UintItems {
  items: Array<UintKeyValue>;
  arrayItems: Array<UintArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: BigInt): void {
    this.items[index] = new UintKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<BigInt>): void {
    this.arrayItems[index] = new UintArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class IntItems {
  items: Array<IntKeyValue>;
  arrayItems: Array<IntArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: BigInt): void {
    this.items[index] = new IntKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<BigInt>): void {
    this.arrayItems[index] = new IntArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BoolItems {
  items: Array<BoolKeyValue>;
  arrayItems: Array<BoolArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: boolean): void {
    this.items[index] = new BoolKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<boolean>): void {
    this.arrayItems[index] = new BoolArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class Bytes32Items {
  items: Array<Bytes32KeyValue>;
  arrayItems: Array<Bytes32ArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: Bytes): void {
    this.items[index] = new Bytes32KeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<Bytes>): void {
    this.arrayItems[index] = new Bytes32ArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BytesItems {
  items: Array<BytesKeyValue>;
  arrayItems: Array<BytesArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: Bytes): void {
    this.items[index] = new BytesKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<Bytes>): void {
    this.arrayItems[index] = new BytesArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class StringItems {
  items: Array<StringKeyValue>;
  arrayItems: Array<StringArrayKeyValue>;

  constructor() {
    this.items = new Array();
    this.arrayItems = new Array();
  }

  initItems(itemLength: i32): void {
    this.items = new Array(itemLength);
  }

  initArrayItems(itemLength: i32): void {
    this.arrayItems = new Array(itemLength);
  }

  setItem(index: i32, key: string, value: string): void {
    this.items[index] = new StringKeyValue(key, value);
  }

  setArrayItems(index: i32, key: string, value: Array<string>): void {
    this.arrayItems[index] = new StringArrayKeyValue(key, value);
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromArray(this.items.map<ethereum.Value>(item => item.toEthereumValue())));
    tuple.push(ethereum.Value.fromArray(this.arrayItems.map<ethereum.Value>(item => item.toEthereumValue())));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class AddressKeyValue {
  key: string;
  value: Address;

  constructor(key: string, value: Address) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromAddress(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class AddressArrayKeyValue {
  key: string;
  value: Array<Address>;

  constructor(key: string, value: Array<Address>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromAddressArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class UintKeyValue {
  key: string;
  value: BigInt;

  constructor(key: string, value: BigInt) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromUnsignedBigInt(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class UintArrayKeyValue {
  key: string;
  value: Array<BigInt>;

  constructor(key: string, value: Array<BigInt>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromUnsignedBigIntArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class IntKeyValue {
  key: string;
  value: BigInt;

  constructor(key: string, value: BigInt) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromSignedBigInt(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class IntArrayKeyValue {
  key: string;
  value: Array<BigInt>;

  constructor(key: string, value: Array<BigInt>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromSignedBigIntArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BoolKeyValue {
  key: string;
  value: boolean;

  constructor(key: string, value: boolean) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBoolean(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BoolArrayKeyValue {
  key: string;
  value: Array<boolean>;

  constructor(key: string, value: Array<boolean>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBooleanArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class Bytes32KeyValue {
  key: string;
  value: Bytes;

  constructor(key: string, value: Bytes) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBytes(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class Bytes32ArrayKeyValue {
  key: string;
  value: Array<Bytes>;

  constructor(key: string, value: Array<Bytes>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBytesArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BytesKeyValue {
  key: string;
  value: Bytes;

  constructor(key: string, value: Bytes) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBytes(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class BytesArrayKeyValue {
  key: string;
  value: Array<Bytes>;

  constructor(key: string, value: Array<Bytes>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromBytesArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class StringKeyValue {
  key: string;
  value: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromString(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}

export class StringArrayKeyValue {
  key: string;
  value: Array<string>;

  constructor(key: string, value: Array<string>) {
    this.key = key;
    this.value = value;
  }

  toEthereumValue(): ethereum.Value {
    let tuple = new ethereum.Tuple();
    tuple.push(ethereum.Value.fromString(this.key));
    tuple.push(ethereum.Value.fromStringArray(this.value));
    return ethereum.Value.fromTuple(tuple);
  }
}
