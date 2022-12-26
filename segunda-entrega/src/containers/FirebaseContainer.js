/* import admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../../privi.json' assert { type: 'json' };



admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

console.log('me conecte');
const db = getFirestore();


class FirebaseContainer {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion);
        this.id = 1;
    }


    getAll = async () => {
        try {
            const querySnapshot = await this.coleccion.get();
            let docs = querySnapshot.docs;
            console.log(docs);
            return docs;

        } catch (e) {
            console.log(e);

        }
    }


    async save(timestamp, title, description, code, thumbnail, price, stock) {
        try {
          let res;
    
          res = await this.coleccion.add({
            timestamp: timestamp,
            title: title,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
          });
          return res.id;
        } catch (e) {
          console.log(e);
          
        }
      }

      async replace(num, timestamp, title, description, code, thumbnail, price, stock) {
        const lista = await this.coleccion.get();
        const validacion = validacionId(lista, num);
        if (validacion) {
          await this.coleccion.doc(num).update({
            timestamp: timestamp,
            title: title,
            description: description,
            code: code,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
          });
          return 'El producto se actualizó con exito';
        } else {
          return 'No existe el id elegido';
        }
      }

    getById = async (id) => {
        try {
            const doc = this.coleccion.doc(id)
            const object = await doc.get();
            const response = object.data();
            console.log(response);
            return response;

        } catch (e) {
            console.log(e);
        }
    }

    updateById = async (nuevoElem, id) => {
        try {
            const doc = this.colection.doc(id);
            const object = await doc.update({ ...nuevoElem });
            console.log(object);
            console.log(`Se actualizo el objeto con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteById = async (id) => {
        try {
            const doc = this.coleccion.doc(id);
            const object = await doc.delete();
            console.log(`Se borro el documento con el id: ${id}`);
            return object;

        } catch (e) {
            console.log(e);
        }
    }

    deleteAll = async () => {
        try {
            const doc = this.coleccion.doc();
            const object = await doc.delete();
            return object;

        } catch (e) {
            console.log(e);
        }
    }


    async desconectar() { }
}

export { FirebaseContainer }; */

import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

import serviceAccount from '../../privi.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

console.log('me conecte');
const db = getFirestore();

function validacionId(array, id) {
  array = array.docs.map((item) => {
    return { id: item.id, ...item.data() };
  });
  const index = array.findIndex((object) => object.id == id);
  if (array[index]) {
    return true;
  } else {
    return false;
  }
}

class FirebaseContainer {
  constructor(nombreColeccion) {
    this.coleccion = db.collection("products");
  }
  async getAll() {
    const res = await this.coleccion.get();
    let arrayRes = res.docs.map((item) => {
      return { id: item.id, ...item.data() };
    });
    return arrayRes;
  }

  async getById(num) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      let resultado = await this.coleccion.doc(num).get();
      return resultado.data();
    } else {
      return 'No existe el número de id elegido';
    }
  }

  async save(timestamp, title, description, code, thumbnail, price, stock) {
    try {
      let res;

      res = await this.coleccion.add({
        timestamp: timestamp,
        title: title,
        description: description,
        code: code,
        thumbnail: thumbnail,
        price: price,
        stock: stock,
      });
      return res.id;
    } catch (e) {
      console.log(e);
    }
  }

  async replace(num, timestamp, title, description, code, thumbnail, price, stock) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      await this.coleccion.doc(num).update({
        timestamp: timestamp,
        title: title,
        description: description,
        code: code,
        thumbnail: thumbnail,
        price: price,
        stock: stock,
      });
      return 'El producto se actualizó con exito';
    } else {
      return 'No existe el id elegido';
    }
  }

  async deleteById(num) {
    const lista = await this.coleccion.get();
    const validacion = validacionId(lista, num);
    if (validacion) {
      await this.coleccion.doc(num).delete();
      return `Se eliminó con exito`;
    } else {
      return 'No existe el número de id elegido';
    }
  }
}

export { FirebaseContainer };
