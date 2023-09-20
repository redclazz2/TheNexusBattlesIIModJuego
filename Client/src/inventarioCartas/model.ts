import Carta from "./cartaClass.js";
import CartaHeroe from "./cartaHeroeClass.js";

export default class InventarioModel {
  constructor() {}

  async getArmaCard(e:any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/armas/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Arma";
      _current_card.urlImagen = card.UrlImagen;
      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getArmaduraCard(e:any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/armaduras/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = "Armadura " + card.Tipo;
      _current_card.coleccion = "Armadura";
      _current_card.desc = card.Desc;
      _current_card.urlImagen = card.UrlImagen;
      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getItemCard(e:any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/items/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Item";
      _current_card.urlImagen = card.UrlImagen;
      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getEpicaCard(e:any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/epicas/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new Carta();
      _current_card.id = card.Id;
      _current_card.nombre = card.Nombre;
      _current_card.desc = card.Desc;
      _current_card.coleccion = "Epica";
      _current_card.urlImagen = card.UrlImagen;
      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  async getHeroeCard(e:any) {
    try {
      const response = await fetch(
        'https://cards.thenexusbattles2.cloud/api/heroes/' + e.id_carta
      );
      const card = await response.json();
      const _current_card = new CartaHeroe();
      _current_card.ataqueBase = card.AtaqueBase;
      _current_card.ataqueDado = card.AtaqueDado;
      _current_card.clase = card.Clase;
      _current_card.danoMax = card.DanoMax;
      _current_card.defensa = card.Defensa;
      _current_card.desc = card.Desc;
      _current_card.id = card.Id;
      _current_card.poder = card.Poder;
      _current_card.tipo = card.Tipo;
      _current_card.urlImagen = card.UrlImagen;
      _current_card.vida = card.Vida;
      _current_card.coleccion = "Heroe";
      return _current_card;
    } catch (error) {
      throw error;
    }
  }

  // En InventarioModel
  async getUserInventory() {
      const _dataSource = "../cartas.json"; // Cambiar esta línea por la API
      try {
       //const userInventory = await fetch(_dataSource);
        //const cartasJSON = await userInventory.json();
        
        const cartasJSON = [
          {
              "id": 2,
              "user": "Administrador",
              "id_carta": "64e582f509a1f203598f17ed",
              "type":"Arma"
          },
          {
              "id": 3,
              "user": "Administrador",
              "id_carta": "64e582f509a1f203598f17ed",
              "type":  "Arma"
          },
          {
              "id": 1,
              "user": "Administrador",
              "id_carta": "64e5830109a1f203598f17f9",
              "type":"Armadura"
          },
          {
              "id": 4,
              "user": "Administrador",
              "id_carta": "64e5830a09a1f203598f17ff",
              "type": "Item"
          },
          {
              "id": 6,
              "user": "Administrador",
              "id_carta": "64eb906091c55d02fe369b27",
              "type": "Epica"
          },
          {
              "id": 7,
              "user": "Administrador",
              "id_carta": "64eb906091c55d02fe369b27",
              "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b27",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b27",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b27",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b28",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b28",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b28",
            "type": "Epica"
          },
          {
            "id": 7,
            "user": "Administrador",
            "id_carta": "64eb906091c55d02fe369b28",
            "type": "Epica"
          },
          {
              "id": 15,
              "user": "Administrador",
              "id_carta": "65035fefcd1283c97b876fa1",
              "type":"Heroe"
          }
        ]
        
        const cartasPromises = [];

        for (const e of cartasJSON) {
          switch (e.type) {
            case "Arma":
              cartasPromises.push(this.getArmaCard(e));
              break;

            case "Armadura":
              cartasPromises.push(this.getArmaduraCard(e));
              break;

            case "Item":
              cartasPromises.push(this.getItemCard(e));
              break;

            case "Epica":
              cartasPromises.push(this.getEpicaCard(e));
              break;

            case "Heroe":
              cartasPromises.push(this.getHeroeCard(e));
              break;
          }
        }

        const cartas = await Promise.all(cartasPromises);
        return cartas;
      } catch (error) {
        throw error;
      }
  }
}



