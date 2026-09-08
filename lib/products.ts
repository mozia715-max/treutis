import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";
import { Product } from "./types";

const COLLECTION = "products";

export async function getAllProducts(): Promise<Product[]> {
  const q = query(collection(db, COLLECTION), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Product));
}

export async function getProduct(id: string): Promise<Product | null> {
  const ref = doc(db, COLLECTION, id);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() } as Product;
}

export async function createProduct(data: Omit<Product, "id" | "createdAt">) {
  return addDoc(collection(db, COLLECTION), {
    ...data,
    createdAt: Date.now(),
  });
}

export async function updateProduct(id: string, data: Partial<Product>) {
  const ref = doc(db, COLLECTION, id);
  return updateDoc(ref, data);
}

export async function deleteProduct(id: string) {
  const ref = doc(db, COLLECTION, id);
  return deleteDoc(ref);
}
