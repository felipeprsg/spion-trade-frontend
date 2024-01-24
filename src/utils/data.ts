import { Timestamp } from 'firebase-admin/firestore';

type Serializable =
  | string
  | number
  | boolean
  | null
  | Date
  | SerializableObject
  | SerializableArray;

interface SerializableObject {
  [key: string]: Serializable;
}

type SerializableArray = Serializable[];

export function serialize(obj: any): Serializable {
  if (obj === null) {
    return null;
  }

  if (typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((value) => serialize(value));
  }

  if (obj instanceof Map) {
    return Array.from(obj.entries());
  }

  if (obj instanceof Set) {
    return Array.from(obj);
  }

  if (obj instanceof Timestamp) {
    return obj.toDate();
  }

  const serializedObj: { [key: string]: Serializable } = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      serializedObj[key] = serialize(obj[key]);
    }
  }

  return serializedObj;
}
