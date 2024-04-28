import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyAjxjGgc1_HHBUGoXM1kFq4aXiV--plwZE",
  authDomain: "pasarcemerlang-11fa3.firebaseapp.com",
  projectId: "pasarcemerlang-11fa3",
  storageBucket: "pasarcemerlang-11fa3.appspot.com",
  messagingSenderId: "390685080124",
  appId: "1:390685080124:web:6a69ed5fd39c3fc21da139",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambilDaftarPembeli() {
  const refDokumen = collection(db, "pembeli");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      harga: dok.data().harga,
      stok: dok.data().stok,
    });
  });

  return hasil;
}

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export async function tambahPembeli(nama, harga, stok) {
  try {
    const dokRef = await addDoc(collection(db, 'produk'), {
      nama: nama,
      harga: harga,
      stok: stok
    });
    console.log('Berhasil menambah pembeli ' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah pembeli ' + e);
  }
}

export async function hapusPembeli(docid) {
  await deleteDoc(doc(db, "pembeli", docid));
}